import kue from 'kue'
const queue = kue.createQueue()
// Import Models
import Strain from '../strain/strain-model'
import Strains from '../strains/strains-model'
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
 function updateStrains(strainName, cohortId, done) {
  Strain.findOne({'strainName': strainName}, (err, strainDoc) => {
    if (err) return done(err)
    // Add to the UpdateStrains queue
    if (strainDoc) {
      strainDoc.daysFeatured++
      strainDoc.save()
      addToDailyStrains(strainDoc._id, cohortId)

      return done()
    } else {
      const newStrain = new Strain({ strainName })
      addToDailyStrains(newStrain._id, cohortId)
      newStrain.save((err) => {
        if (err) return done(err)

        return done()
      })
    }
  })
}

//
function addToDailyStrains(strainId, cohortId, done) {
  Strains.findOne({_id: ObjectId(cohortId)}, (err, dailyStrains) => {
    dailyStrains.strains.push(ObjectId(strainId))
    dailyStrains.save()
    return done()
  })
}

kue.app.listen(1337)
export default queue
