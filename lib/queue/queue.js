import kue from 'kue'
const queue = kue.createQueue()
// DB Stuff
import mongoose from 'mongoose'
const { ObjectId } = mongoose.Types
import Strain from '../strain/strain-model'
import DayStrains from '../strains/strains-model'
import Patient from '../patient/patient-model'

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
      strainDoc.save((err, savedDoc) => {
        addToDailyStrains(ObjectId(savedDoc._id), cohortId)
        return done()
      })
    } else {
      const newStrain = new Strain({ strainName })
      newStrain.save((err, savedStrain) => {
        if (err) {
          console.log('Error...: ',  err);
          return done(err)
        } else {
          addToDailyStrains(savedStrain._id, cohortId)
        }

        return done()
      })
    }
  })
}

//
function addToDailyStrains(strainId, cohortId) {
  DayStrains.findOne({_id: ObjectId(cohortId)}, (err, dailyStrains) => {
    dailyStrains.strains.push(ObjectId(strainId))
    dailyStrains.sizeOfCollection += 1

    dailyStrains.save((err, updatedDoc) => {
      const { sizeOfCollection, numOfStrains } = updatedDoc
      if (err) {console.log(err)}
      else {
        // If all strains are in DB...
        if (sizeOfCollection === numOfStrains) {
          aggregatePatients(cohortId)
        }
      }
    })
  })
}

import {sendTextMessage, composeTextMessage} from '../sms-notify/textMessage'
import checkForStrains from '../strain/strain'

queue.process('send-sms', (job, done) => {
  const { firstName, phoneNumber, desiredStrains, cohortStrains } = job.data
  const strainsFound = checkForStrains(desiredStrains, cohortStrains)
  const textMessage = composeTextMessage(firstName, strainsFound)
  sendTextMessage(phoneNumber, textMessage, done)
})

function addPatientToSMSQueue(patient, cohortId, cohortStrains) {
  const { _id, firstName, phoneNumber, desiredStrains} = patient
  queue.create('send-sms', {
    title: _id,
    firstName,
    phoneNumber,
    desiredStrains,
    cohortStrains,
    cohort: cohortId
  }).ttl(10000).save()
}

// Get list of patients who have a strain
// on their watchlist that is featured
// today
function aggregatePatients(cohortId) {
  DayStrains.findOne({_id: ObjectId(cohortId)})
    .populate('strains')
    .exec((err, doc) => {
      const strains = doc.strains
      const strainArr = strains.map((strain) => {
        return strain.strainName
      })

      Patient.find({
        'receivesNotifs': true,
        'desiredStrains': { $in: strainArr }},
        'firstName phoneNumber desiredStrains'
        ).exec((err, patients) => {
          patients.forEach((patient) => {
            addPatientToSMSQueue(patient, cohortId, strainArr)
          })
        })
      })
}

kue.app.listen(1337)
export default queue
