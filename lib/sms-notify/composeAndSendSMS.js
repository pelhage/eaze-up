import checkForStrains from './checkForStrains'
import composeSMS from './composeSMS'
import sendSMS from './sendSMS'

function composeAndSendSMS(smsData, done) {
  console.log('Composing SMS');
  const { firstName, phoneNumber, desiredStrains, cohortStrains } = smsData
  console.log('cohort strains: ', cohortStrains);
  const strainsFound = checkForStrains(desiredStrains, cohortStrains)
  const textMessage = composeSMS(firstName, strainsFound)

  sendSMS(phoneNumber, textMessage, done)
}

export default composeAndSendSMS
