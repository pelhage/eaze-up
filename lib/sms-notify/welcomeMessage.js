import { TwimlResponse } from 'twilio'

import Patient from '../patient/Patient'
import phone from 'phone'
import sendSMS from './sendSMS'

function welcomeMessage(req, res) {

  let twiml = new TwimlResponse()

  var patientPhoneNumber = phone(req.body.phoneNumber)[0]

  Patient.findOne({
    'phoneNumber': patientPhoneNumber
  }, function(err, existingPatient) {
    console.log('received message from ', existingPatient);
    if (err) { return next(err); }

    var patient = existingPatient || new Patient({phoneNumber: patientPhoneNumber})

    let textMessage = 'Welcome to Eaze! To get started, add a strain with the ADD command. For an overview of available commands reply with MORE'

    patient.save(function(err, savedPatient) {
      if (err) { console.log(err) }
    })
    let response = res.status(200).send.bind(res, {
        success: true,
        message: 'You registered for eaze.'
    })

    sendSMS(patientPhoneNumber, textMessage, response)
    // res.writeHead(200, {'Content-Type': 'text/xml'})
    // res.end(twiml.toString())
    // res.end()

  })
}

export default welcomeMessage
