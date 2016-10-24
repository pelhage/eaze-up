import { TwimlResponse } from 'twilio'

import Patient from '../patient/Patient'
import composeResponse from './chat-bot'

function welcomeMessage(req, res) {

  let twiml = new TwimlResponse()

  var patientPhoneNumber = req.body.phoneNumber

  Patient.findOne({
    'phoneNumber': patientPhoneNumber
  }, function(err, existingPatient) {
    console.log('received message from ', existingPatient);
    if (err) { return next(err); }

    var patient = existingPatient || new Patient({phoneNumber: patientPhoneNumber})

    twiml.message('Welcome to Eaze! To get started, add a strain with the ADD command. For an overview of available commands reply with MORE')

    patient.save(function(err, savedPatient) {
      if (err) { console.log(err) }
    })
    res.writeHead(200, {'Content-Type': 'text/xml'})
    res.end(twiml.toString())

  })
}

export default welcomeMessage
