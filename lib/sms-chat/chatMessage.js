import { TwimlResponse } from 'twilio'

import Patient from '../patient/Patient'
import composeResponse from './chat-bot'

function chatMessage(req, res) {
  let twiml = new TwimlResponse()

  var patientMsg = req.body.Body.trim().split(" ")
  var patientPhoneNumber = req.body.From

  Patient.findOne({
    'phoneNumber': patientPhoneNumber
  }, function(err, existingPatient) {
    if (err) { return next(err); }

    var patient = existingPatient || new Patient({phoneNumber: patientPhoneNumber})

    composeResponse(patientMsg, patient, twiml)

    patient.save(function(err) {
      if (err) { console.log(err) }
    })
    res.writeHead(200, {'Content-Type': 'text/xml'})
    res.end(twiml.toString())

  })
}

export default chatMessage
