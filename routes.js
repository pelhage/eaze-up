import express from 'express'
const Router = express.Router()
import bodyParser from 'body-parser'
import User from './lib/user/user-model'
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
  var user = Patients

  var userMsg = req.body.Body.trim().split(" ")
  var userPhoneNumber = req.body.From

  // console.log('userCommand', userCommand);
  User.findOne({
    'phoneNumber': userPhoneNumber
  }, function(err, existingUser) {
    if (err) { return next(err); }

    var user = existingUser || new User({phoneNumber: userPhoneNumber})

    composeResponse(userMsg, user, twiml)

    user.save(function(err) {
      if (err) { console.log(err) }
    })
    res.writeHead(200, {'Content-Type': 'text/xml'})
    res.end(twiml.toString())

  });
})

export default Router
