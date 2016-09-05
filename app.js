// Dependencies
import Nightmare from 'nightmare'
// import kue from'kue'
// Data & Helpers
import Stoners from './data'
import addToQueue from './lib/queue'
import { sendTextMessage } from './lib/textMessage'

// Instances
const nightmare = Nightmare({ show: true })
// const queue = kue.createQueue()

// Begin Scraping
nightmare
  .goto('https://www.eazeup.com/menu')
  .wait('button')
  .click('button + button')
  .wait('form')
  .type('form > input', '930 Pine Street, San Francisco, CA')
  .click('place-group > place-item')
  .wait('.product h2')
  .evaluate(() => {
    return [].slice.call(document.querySelectorAll('.product')).map((el) => {
      return el.querySelector('h2').innerText
    })
  })
  .end()
  .then((eazeStrains) => {
    console.log(eazeStrains)
    const messageQueue = Stoners.reduce(addToQueue(eazeStrains), [])
    messageQueue.forEach(sendTextMessage)
    console.log(messageQueue);
  })
  .catch((error) => {
    console.error('Search failed:', error)
  })
