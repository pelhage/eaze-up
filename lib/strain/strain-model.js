import mongoose from 'mongoose'
const { Schema } = mongoose

const strainSchema = Schema({
  strainName: String,
  isAvailable: Boolean,
  daysFeatured: {type: Number, default: 0},
  updated: {type: Date, default: Date.now}
})

export default mongoose.model('Strain', strainSchema)
