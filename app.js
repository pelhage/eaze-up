// Dependencies
import Nightmare from 'nightmare'
import axios from 'axios'
// Helper functions
import createTextMessage from './lib/textMessage'
import checkForStrains from './lib/strains'

// Instances
const nightmare = Nightmare({ show: true })

const Stoners = [
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
      const strainsFound = checkForStrains(desiredStrains, eazeStrains)

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
