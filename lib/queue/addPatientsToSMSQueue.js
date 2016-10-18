import mongoose from 'mongoose'
const { ObjectId } = mongoose.Types

import Catalogue from '../strain-catalogue/Catalogue'
import Patient from '../patient/Patient'
import Queue from '../queue/Queue'
// Get list of patients who have a strain
// on their watchlist that is featured
// today
function addPatientsToSMSQueue(cohortId) {
  Catalogue
    .findOne({_id: ObjectId(cohortId)})
    .populate('strains')
    .exec((err, cohort) => {
      const strainArr = cohort.strains
        .map(strain => strain.strainName)

      Patient
        .find({
          'receivesNotifs': true,
          'desiredStrains': { $in: strainArr }},
          'firstName phoneNumber desiredStrains')
        .exec((err, patients) => {
          console.log('patients: ', patients);
          patients.forEach((patient) => {
            const { _id, firstName, phoneNumber, desiredStrains } = patient
            Queue
              .create('send-sms', {
                title: _id,
                firstName,
                phoneNumber,
                desiredStrains,
                cohortStrains,
                cohort: cohortId
              })
              .ttl(10000)
              .save()
          })
        })

      })
}

export default addPatientsToSMSQueue
