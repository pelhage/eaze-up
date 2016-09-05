import moment from 'moment'
import axios from 'axios'
import {accountSid, authToken, sendingNumber} from '../config'
import twilio from 'twilio'

// Instances
let twilioClient = twilio(accountSid, authToken)


/**
 * composeTextMessage - generates the text message string sent
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
  twilioClient.sendSms({
    body: textMessage,
    to: phoneNumber,
    from: sendingNumber
  }, function(err, data) {
    if (err) {
      console.error('Could not notify admin');
      console.error(err);
    } else {
      console.log('message data: ', data);
      console.log('Admin notified');
    }
  })

}


// axios.post('http://textbelt.com/text', {
//   'number': phoneNumber,
//   'message': textMessage
// }).then((response) => {
//   console.log(response.data)
// }).catch((error) => {
//   console.log(error)
// })
