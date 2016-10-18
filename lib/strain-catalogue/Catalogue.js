import mongoose from 'mongoose'
const { Schema } = mongoose

const catalogueSchema = Schema({
  addressOfStrains: String,
  numOfStrains: {type: Number, default: 0 },
  sizeOfCollection: {type: Number, default: 0 },
  strains: [{type: Schema.Types.ObjectId, ref: 'Strain'}],
  dateOfCollection: Date
})

export default mongoose.model('Catalogue', catalogueSchema)
