// Dependencies
import Nightmare from 'nightmare'
import axios from 'axios'
import moment from 'moment'

// Instances
const nightmare = Nightmare({ show: true })

const Clients = [
  {
    firstName: 'Patrick',
    phoneNumber: 4159365087,
    desiredStrains: ['Blue Dream', 'Sage'],
  },
  // {
  //   name: 'Steve',
  //   phoneNumber: 6508087017,
  //   strains: ['Blue Dream', 'Sage']
  // }
]


// Begin Scraping
nightmare
  .goto('https://www.eazeup.com/menu')
  .wait('button')
  .click('button + button')
  .wait('form')
  .type('form > input', '930 Pine Street, San Francisco, CA')
  .click('place-group > place-item')
  // .type('form > input', '\u000d') // hit enter button
  .wait('.product h2')
  .evaluate(() => {
    return [].slice.call(document.querySelectorAll('.product')).map((el) => {
      return el.querySelector('h2').innerText
    })
  })
  .end()
  .then((eazeStrains) => {
    console.log(eazeStrains)
    const messageQueue = []
    // Check to see if each subscriber's strains are available
    Stoners.forEach((stoner) => {
      const { firstName, phoneNumber, desiredStrains } = stoner
      // Regex for the client's strains
      const userStrains = new RegExp(desiredStrains.join("|"), 'gi')
      const strainsFound = []
      // Go through each strain on Eaze and see if there's a match
      eazeStrains.forEach((eazeStrain) => {
        if (eazeStrain.match(userStrains)) {
          strainsFound.push(eazeStrain)
        }
      })
      // If the user's strains are available, add user to queue
      if (strainsFound.length) {
        const textMessage = createTextMessage(firstName, strainsFound)
        messageQueue.push({
          firstName,
          phoneNumber,
          textMessage,
          strainsFound
        })
      }
    })
    console.log('messageQueue', messageQueue)
    if (messageQueue.length) {
      messageQueue.forEach(({ phoneNumber, textMessage }) => {
        axios.post('http://textbelt.com/text', {
          'number': phoneNumber,
          'message': textMessage
        }).then((response) => {
          console.log(response.data)
        }).catch((error) => {
          console.log(error)
        })
      })
    }
  })
  .catch((error) => {
    console.error('Search failed:', error)
  })



/**
 * createTextMessage - generates the text message string sent
 * to users
 *
 * @param  {String} firstName       recipients first name
 * @param  {Array} availableStrains requested strains available on eaze
 * @return {String} message         message for recipient
 */
function createTextMessage(firstName, availableStrains) {
  const dateTime = moment().format('MM/DD/YY')

  let message = '\nHi ' + firstName +
  ', the following strains are available today (' +
  dateTime + ') on eazeup.com:\n'
  availableStrains.forEach((strain) => {
    message += '\n' + strain
  })
  return message
}
