// Nightmare + Nightmare instance
import Nightmare from 'nightmare'
const nightmare = Nightmare({ show: true })

// Models
import Strain from '../strain/strain-model'
import Strains from '../strains/strains-model'
import User from '../user/user-model'
// Event Queue
import queue from '../queue/queue'

function Scraper(userAddress='San Francisco, CA') {
  // Begin Scraping
  nightmare
    .goto('https://www.eazeup.com/menu')
    .wait('button')
    .click('button + button')
    .wait('form')
    .type('form > input', userAddress)
    .click('place-group > place-item')
    .wait('.product h2')
    .evaluate(() => {
      return [].slice.call(document.querySelectorAll('.product')).map((el) => {
        return el.querySelector('h2').innerText
      })
    })
    .end()
    .then((eazeStrains) => {
      const numOfStrains = eazeStrains.length

      const dailyStrains = new Strains({ numOfStrains })
      dailyStrains.save((err) => {
        if (err) console.log('ERR', err)

        eazeStrains.forEach((strain, index) => {
          queue.create('update-strains', {
            title: strain,
            strainName: strain,
            cohort: dailyStrains._id,
          }).ttl(10000).save()
        })
      })
      console.log(dailyStrains._id);
    })
    .catch((error) => {
      console.error('Search failed:', error)
    })
}

export default Scraper
// Update the record of today's strains

//   messageQueue.forEach(sendTextMessage)
//   console.log(messageQueue);
