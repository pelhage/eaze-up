// Nightmare + Nightmare instance
import Nightmare from 'nightmare'
const nightmare = Nightmare({ show: true })

// Models
import Strain from '../strain-catalogue/Strain'
import Catalogue from '../strain-catalogue/Catalogue'
import Patient from '../patient/Patient'
// Event Queue
import queue from '../queue/Queue'
import addStrainToUpdateQueue from '../queue/addStrainToUpdateQueue'

function Scraper(patientAddress='San Francisco, CA') {
  // Begin Scraping
  nightmare
    .goto('https://www.eazeup.com/menu')
    .wait('button')
    .click('button + button')
    .wait('form')
    .type('form > input', patientAddress)
    .click('place-group > place-item')
    .wait('.product h2')
    .evaluate(() => {
      return [].slice.call(document.querySelectorAll('.product'))
        .map(el => el.querySelector('h2').innerText)
    })
    .end()
    .then((eazeStrains) => {
      const numOfStrains = eazeStrains.length
      const cohort = new Catalogue({
        addressOfStrains: patientAddress,
        numOfStrains
      })

      cohort.save((err) => {
        if (err) console.log('ERR', err)

        eazeStrains.forEach((strain) => {
          addStrainToUpdateQueue(strain, cohort._id)
        })
      })
    })
    .catch((error) => {
      console.error('Search failed:', error)
    })
}

export default Scraper
