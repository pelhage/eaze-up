// Dependencies
import Nightmare from 'nightmare'
// import kue from'kue'
import express from 'express'
import bodyParser from 'body-parser'
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// Data & Helpers
import Patients from './data'
import addToQueue from './lib/queue'
import { sendTextMessage } from './lib/textMessage'
import { TwimlResponse } from 'twilio'
// Instances
const nightmare = Nightmare({ show: true })
// const queue = kue.createQueue()


app.post('/message', (req, res) => {
  console.log('req', req.body);
  let twiml = new TwimlResponse()
  var user = Patients

  var userMsg = req.body.Body.trim().split(" ")
  var userCommand = userMsg.splice(0, 1).join(" ")
  var userStrain = userMsg.splice(1).join(" ")


  if (userMsg[0] === ('LIST')) {
    twiml.message('The following strains are being watched: ', )
  } else if (userMsg.indexOf('WATCH') === 0) {

    twiml.message('Adding ' + userStrain + ' to your watch list')
  }
  else {
    twiml.message('Unknown command. The following commands are available: LIST, WATCH <Strain>, UNWATCH <Strain>')
  }

  res.writeHead(200, {'Content-Type': 'text/xml'})
  res.end(twiml.toString())
})

// // Begin Scraping
// nightmare
//   .goto('https://www.eazeup.com/menu')
//   .wait('button')
//   .click('button + button')
//   .wait('form')
//   .type('form > input', '930 Pine Street, San Francisco, CA')
//   .click('place-group > place-item')
//   .wait('.product h2')
//   .evaluate(() => {
//     return [].slice.call(document.querySelectorAll('.product')).map((el) => {
//       return el.querySelector('h2').innerText
//     })
//   })
//   .end()
//   .then((eazeStrains) => {
//     console.log(eazeStrains)
//     const messageQueue = Patients.reduce(addToQueue(eazeStrains), [])
//     messageQueue.forEach(sendTextMessage)
//     console.log(messageQueue);
//   })
//   .catch((error) => {
//     console.error('Search failed:', error)
//   })

app.listen(3000)
