import express from 'express'
import path from 'path'
const Router = express.Router()
import bodyParser from 'body-parser'

import chatMessage from './lib/sms-chat/chatMessage'

// Middleware
Router.use(bodyParser.json())
Router.use(bodyParser.urlencoded({ extended: true }))
Router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin': 'https://pelhage.github.io/eaze-up'),
  res.header('Access-Control-Allow-Methods': 'GET, POST')
})
// API
Router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'))
})
// The chat bot interface:
Router.post('/message', chatMessage)

export default Router
