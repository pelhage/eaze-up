import express from 'express'
import path from 'path'
const Router = express.Router()
import bodyParser from 'body-parser'

import chatMessage from './lib/sms-chat/chatMessage'
import welcomeMessage from './lib/sms-chat/welcomeMessage'

// Middleware
Router.use(bodyParser.json())
Router.use(bodyParser.urlencoded({ extended: true }))
Router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin': 'https://pelhage.github.io/eaze-up')
  res.header('Access-Control-Allow-Methods': 'GET, POST')
  next()
})

Router.use('/eaze-up', express.static('dist'));

// API
Router.get('/', function(req, res) {
  // console.log('Doing it...');
  res.sendFile(path.join(__dirname + '/index.html'))
  // res.send('Hello')
  // res.send('Hello')
})
// The chat bot interface:
Router.post('/message', chatMessage)
// Upon text request
Router.post('/welcome', welcomeMessage)

export default Router
