import kue from 'kue'
const queue = kue.createQueue()
// DB Stuff
import mongoose from 'mongoose'
const { ObjectId } = mongoose.Types
import Strain from '../strain/strain-model'
import DayStrains from '../strains/strains-model'
import User from '../user/user-model'

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
    // update
    dailyStrains.strains.push(ObjectId(strainId))
    dailyStrains.sizeOfCollection += 1
    // save
    dailyStrains.save((err, updatedDoc) => {
      const { sizeOfCollection, numOfStrains } = updatedDoc
      if (err) {console.log(err)}
      else {
        console.log('size: ', sizeOfCollection, ' == ', 'num: ', numOfStrains);
        if (sizeOfCollection === numOfStrains) {
          console.log('Num is equal to size! Lets aggregate users!');
          aggregateUsers(cohortId)
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

// Get list of users who have a strain
// on their watchlist that is featured
// today
function aggregateUsers(cohortId) {
  console.log('Aggregating users...');
  DayStrains.findOne({_id: ObjectId(cohortId)})
    .populate('strains')
    .exec((err, doc) => {
      const strains = doc.strains
      const strainArr = strains.map((strain) => {
        return strain.strainName
      })

      User.find({
        'receivesNotifs': true,
        'desiredStrains': { $in: strainArr }},
        'firstName phoneNumber desiredStrains'
        ).exec((err, users) => {
          console.log('USERS: ', users);
          users.forEach((user) => {
            console.log('USER to be passed down', user);
            addPatientToSMSQueue(user, cohortId, strainArr)
          })
        })
      })
}
// User.find({})
kue.app.listen(1337)
export default queue


/*
TODO: Use MongoDB queries for aggregating what i want


DayStrains.update(
  {_id: ObjectId(cohortId)},
  {
    { $inc: {sizeOfCollection: 1} },
    { $push: {strains: strainId} },
  },
  (err, doc) {
    console.log('I am updating);
  }
)

*/
