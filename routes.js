import express from 'express'
const Router = express.Router()
import bodyParser from 'body-parser'
import Patient from './lib/patient/patient-model'
// Middleware
Router.use(bodyParser.json())
Router.use(bodyParser.urlencoded({ extended: true }))

/*
 * API
 */
Router.get('/', (req, res) => {
  res.send('Hello worlds')
})

Router.post('/message', (req, res) => {
  // console.log('req', req.body);
  let twiml = new TwimlResponse()
  var patient = Patients

  var patientMsg = req.body.Body.trim().split(" ")
  var patientPhoneNumber = req.body.From

  // console.log('patientCommand', patientCommand);
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

  });
})

export default Router
