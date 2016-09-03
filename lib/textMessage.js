import moment from 'moment'
import axios from 'axios'

/**
 * createTextMessage - generates the text message string sent
 * to users
 *
 * @param  {String} firstName       recipients first name
 * @param  {Array} availableStrains requested strains available on eaze
 * @return {String} message         message for recipient
 */
export function composeTextMessage(firstName, availableStrains) {
  const dateTime = moment().format('MM/DD/YY')

  let message = '\nHi ' + firstName +
  ', the following strains are available today (' +
  dateTime + ') via eazeup.com:\n'
  availableStrains.forEach((strain) => {
    message += '\n' + strain
  })
  return message
}

/**
 * sendTextMessage - make a POST request to SMS
 *
 * @param  {Integer} phoneNumber User's phone #
 * @param  {String} textMessage Message to user
 */
export function sendTextMessage({ phoneNumber, textMessage }) {
  axios.post('http://textbelt.com/text', {
    'number': phoneNumber,
    'message': textMessage
  }).then((response) => {
    return response.data
    console.log(response.data)
  }).catch((error) => {
    console.log(error)
  })
}
