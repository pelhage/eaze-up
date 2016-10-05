// Dependencies
import Nightmare from 'nightmare'
// import kue from'kue'
import express from 'express'
import bodyParser from 'body-parser'
const app = express()

const mongoose = require('mongoose');
const configDB = require('./config/database');
mongoose.connect(configDB.url); // connect to DB
var User = require('./models/user')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// Data & Helpers
import Patients from './data'
import addToQueue from './lib/queue'
import { sendTextMessage, composeResponse } from './lib/textMessage'
import { TwimlResponse } from 'twilio'
// Instances
const nightmare = Nightmare({ show: true })
// const queue = kue.createQueue()

// class incomingText {
//   constructor(message) {
//     this.userCommand = message.slice(0, 1).join(' ')
//     this.userStrain = userMsg.slice(1).join(' ')
//   }
// }

app.post('/message', (req, res) => {
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
    console.log(user);
    composeResponse(userMsg, user, twiml)

    user.save(function(err) {
      if (err) { console.log(err) }
    })
    res.writeHead(200, {'Content-Type': 'text/xml'})
    res.end(twiml.toString())

  });
})


// var CronJob = require('cron').CronJob;
// var job = new CronJob({
//   cronTime: '00 30 11 * * 1-5',
//   onTick: function() {
//     /*
//      * Runs every weekday (Monday through Friday)
//      * at 11:30:00 AM. It does not run on Saturday
//      * or Sunday.
//      */
//      // Begin Scraping
//      nightmare
//        .goto('https://www.eazeup.com/menu')
//        .wait('button')
//        .click('button + button')
//        .wait('form')
//        .type('form > input', '930 Pine Street, San Francisco, CA')
//        .click('place-group > place-item')
//        .wait('.product h2')
//        .evaluate(() => {
//          return [].slice.call(document.querySelectorAll('.product')).map((el) => {
//            return el.querySelector('h2').innerText
//          })
//        })
//        .end()
//        .then((eazeStrains) => {
//          console.log(eazeStrains)
//          const messageQueue = Patients.reduce(addToQueue(eazeStrains), [])
//          messageQueue.forEach(sendTextMessage)
//          console.log(messageQueue);
//        })
//        .catch((error) => {
//          console.error('Search failed:', error)
//        })
//   },
//   start: false,
//   timeZone: 'America/Los_Angeles'
// });
// job.start();


app.listen(3000)
