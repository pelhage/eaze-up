import axios from 'axios'
import { accountSid, authToken, sendingNumber } from '../../config/twilio'
import twilio from 'twilio'
// Instances
let twilioClient = twilio(accountSid, authToken)

/**
 * sendSMS - make a POST request to SMS
 *
 * @param  {Integer} phoneNumber Patient's phone #
 * @param  {String} textMessage Message to patient
 */
function sendSMS(phoneNumber, textMessage, done) {
  twilioClient.messages.create({
    body: textMessage,
    to: phoneNumber,
    from: sendingNumber
  }, function(err, data) {
    if (err) {
      console.error('Error sending text: ', err);
      return done(err)
    }
    console.log('Message successfully sent', data);
    return done()
  })
}

export default sendSMS
