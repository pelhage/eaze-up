import express from 'express'
const Router = express.Router()
import bodyParser from 'body-parser'

import chatMessage from './lib/sms-chat/chat-message'

// Middleware
Router.use(bodyParser.json())
Router.use(bodyParser.urlencoded({ extended: true }))

/*
 * API
 */
Router.get('/', (req, res) => {
  res.send('Hello worlds')
})

Router.post('/message', chatMessage)

export default Router
