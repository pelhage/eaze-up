import checkForStrains from './checkForStrains'
import composeSMS from './composeSMS'
import sendSMS from './sendSMS'

function composeAndSendSMS(smsData, done) {
  const { firstName, phoneNumber, desiredStrains, cohortStrains } = smsData
  const strainsFound = checkForStrains(desiredStrains, cohortStrains)
  const textMessage = composeSMS(firstName, strainsFound)

  sendSMS(phoneNumber, textMessage, done)
}

export default composeAndSendSMS
