import mongoose from 'mongoose'
const { ObjectId } = mongoose.Types

import Strain from './Strain'
import addToCatalogue from './addToCatalogue'
/*
 * updateStrains adds any strains currently
 * on eaze and adds them to our DB
 * @param {string} strainName - name of strain
 * @param {ObjectId} cohort - object id of cohort
 */
function updateStrains(strainName, cohortId, done) {
  Strain.findOne({'strainName': strainName}, (err, strainDoc) => {
    if (err) { console.log(err); return done(err) }
    // Add to the UpdateStrains queue
    if (strainDoc) {
      strainDoc.daysFeatured++
      strainDoc.save((err, savedDoc) => {
        addToCatalogue(ObjectId(savedDoc._id), cohortId)
        return done()
      })
    } else {
      const newStrain = new Strain({ strainName })
      newStrain.save((err, savedStrain) => {
        if (err) {
          console.log('Error...: ',  err);
          return done(err)
        } else {
          addToCatalogue(savedStrain._id, cohortId)
        }

        return done()
      })
    }
  })
}

export default updateStrains
