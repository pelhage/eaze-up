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

/**
 *
 */
export function composeResponse(userMessage, { desiredStrains }, twiml) {
  var userCommand = userMessage.slice(0, 1).join(" ")
  var userStrain = userMessage.slice(1).join(" ")
  // List all of the user's strains
  switch (userCommand.toUpperCase()) {
    case 'LIST':
      if (desiredStrains.length) {
        twiml.message('The following strains are being watched: \n'
          + desiredStrains.map(strain => {
            return '- ' + strain
          })
          .join('\n')
        )
      } else {
        twiml.message('You don\'t have any strains being watched.\n\nTo add a strain, reply with "ADD <strain>". For more info, reply with MORE')
      }
      break
    // User adds a strain to their watch list
    case 'ADD':
      if (isValidStrain(userStrain) && desiredStrains.indexOf(userStrain) === -1) {
        desiredStrains.push(userStrain)
        twiml.message('Adding [' + userStrain + '] to your watch list')
      } else {
        twiml.message('Invalid request. Reply with MORE for more commands')
      }
      break
    // User removes a strain from their watch list
    case 'REMOVE':
      if (isValidStrain(userStrain) && desiredStrains.indexOf(userStrain) > -1) {
        desiredStrains.splice(desiredStrains.indexOf(userStrain), 1)
        twiml.message('Removing [' + userStrain + '] to your watch list')
      } else {
        twiml.message('Invalid request. Reply with MORE for more commands')
      }
      break
    // User asks for help
    case 'MORE':
      twiml.message('Reply with: \n' +
        'LIST to list all strains being watched\n' +
        'ADD <strain> to add a strain to your watch list\n' +
        'REMOVE <strain>. For more information about')
      break
    default:
      twiml.message('Sorry, I couldn\'t understand that. Reply with MORE to get an overview of what I understand.')
  }
}
