import mongoose from 'mongoose'
const { Schema } = mongoose

const strainsSchema = Schema({
  strains: [Schema.Types.ObjectId],
  dateOfCollection: Date
})

export default mongoose.model('DayStrains', strainsSchema)
