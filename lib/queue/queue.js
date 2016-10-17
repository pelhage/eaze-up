// Job Queue
import kue from 'kue'
const queue = kue.createQueue()
// Mongoose Stuff
import mongoose from 'mongoose'
const { ObjectId } = mongoose.Types
// Import Mongoose Models
import Strain from '../strain/strain-model'
import DayStrains from '../strains/strains-model'

// After scrape, we update the DB of strains
// and create the session's collection
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
 function updateStrains(strainName, cohortId, done) {
  Strain.findOne({'strainName': strainName}, (err, strainDoc) => {
    if (err) return done(err)
    // Add to the UpdateStrains queue
    if (strainDoc) {
      strainDoc.daysFeatured++
      strainDoc.save((err) => {
        addToDailyStrains(ObjectId(strainDoc._id), cohortId)
      })


      return done()
    } else {
      const newStrain = new Strain({ strainName })
      newStrain.save((err) => {
        if (err) return done(err)
        addToDailyStrains(newStrain._id, cohortId)
        return done()
      })
    }
  })
}

//
function addToDailyStrains(strainId, cohortId, done) {
  console.log('Im doing it with: ', strainId, cohortId);
  DayStrains.findOne({_id: ObjectId(cohortId)}, (err, dailyStrains) => {
    dailyStrains.strains.push(strainId)
    dailyStrains.save((err) => {if (err){console.log(err);} else{
      console.log('success');
    }})
    // return done()
  })
}

kue.app.listen(1337)
export default queue
