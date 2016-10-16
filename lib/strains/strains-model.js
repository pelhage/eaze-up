import mongoose from 'mongoose'
const { Schema } = mongoose

import Strain from '../strain/strain-model'

const strainsSchema = Schema({
  strains: [Schema.Types.ObjectId],
  dateOfCollection: Date
})

export default mongoose.model('Strains', strainsSchema)
