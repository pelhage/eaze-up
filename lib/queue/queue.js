import kue from 'kue'
const queue = kue.createQueue()
// Import Models
import Strain from '../strain/strain-model'
import { ObjectId } from 'mongoose'

queue.process('update-strains', (job, done) => {
  const { strainName, cohort } = job.data
  updateStrains(strainName, cohort, done)
})

/*
 * updateStrains adds any strains currently
 * on eaze and adds them to our DB
 * @param {string} strainName - name of strain
 * @param {ObjectId} cohort - object id of cohort
 */
 function updateStrains(strainName, cohort, done) {
  console.log('updateStrains');
  Strain.findOne({'strainName': strainName}, (err, strainDoc) => {
    if (err) { console.log('error: ', err); return done(err) }
    console.log(strainDoc);
    // Add to the UpdateStrains queue
    if (strainDoc) {
      strainDoc.daysFeatured++
      strainDoc.save()
      addToDailyStrains(strainDoc._id)
      done()
    } else {
      const newStrain = new Strain({strainName})
      newStrain.save((err) => {
        if (err) { done(err) }
        else {
          done()
          console.log(this)
        }
      })
    }
    // Add it to today's strain
  })
}

function addToDailyStrains(strainId, dayId) {
  Strains.findOne({_id: ObjectId(dayId)}, (err, dailyStrains) => {
    dailyStrains.strains.push(strainId)
    dailyStrains.save()
  })
}

kue.app.listen(1337)
export default queue
