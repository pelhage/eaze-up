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
  twilioClient.messages.create({
    body: textMessage,
    to: phoneNumber,
    from: sendingNumber
  }, function(err, data) {
    if (err) {
      console.error('Error sending text: ', err);
    } else {
      console.log('Message successfully sent', data);
    }
  })
}

function isValidStrain(strain) {
  return strain.length
}
