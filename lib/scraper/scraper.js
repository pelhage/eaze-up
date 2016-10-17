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
      const dailyStrains = new Strains()
      dailyStrains.save((err) => {
        if (err) {
          console.log('ERR', err);
        }
        eazeStrains.forEach((strain) => {
          queue.create('update-strains', {
            title: strain,
            strainName: strain,
            cohort: dailyStrains._id
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
// eazeStrains.forEach((strain) => {
//   Strain.find({'strainName': strain}, function(err, strainDoc) {
//     // Add to the UpdateStrains queue
//     if (strainDoc) {
//       strainDoc.daysFeatured++
//       strainDoc.save()
//     }
//   })

  // const mostRecentStrains = Strains.find().limit(1).sort({$natural:-1})
  //
  // User
  //   .find({desiredStrains: {$in: mostRecentStrains}})
  //   .exec((err, userDoc) => {
  //     console.log('found desiredStrains: ', userDoc);
  //   })
// })
//
// User.find({}, function(err, users) {
//   var usersArr = []
//   users.forEach(function(user) {
//     console.log('user', user);
//     if (user.desiredStrains.length) {
//       usersArr.push(user)
//     }
//   })
//   const messageQueue = usersArr.reduce(addToQueue(eazeStrains), [])
//   .reduce(function(queue, patient) {
//
//   })
// })

//   messageQueue.forEach(sendTextMessage)
//   console.log(messageQueue);
