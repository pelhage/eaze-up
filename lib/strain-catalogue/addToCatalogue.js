import mongoose from 'mongoose'
const { ObjectId } = mongoose.Types
import Catalogue from './Catalogue'

import addPatientsToSMSQueue from '../queue/addPatientsToSMSQueue'

function addToCatalogue(strainId, cohortId) {
  Catalogue.findOne({_id: ObjectId(cohortId)}, (err, cohort) => {
    cohort.strains.push(ObjectId(strainId))
    cohort.sizeOfCollection += 1

    cohort.save((err, updatedDoc) => {
      const { sizeOfCollection, numOfStrains } = updatedDoc
      if (err) {console.log(err)}
      else {
        if (sizeOfCollection === numOfStrains) {
          addPatientsToSMSQueue(cohortId)
        }
      }
    })
  })
}

export default addToCatalogue
