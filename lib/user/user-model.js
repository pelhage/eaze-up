import mongoose from 'mongoose'
const { Schema } = mongoose

const userSchema = Schema({
  firstName: String,
  phoneNumber: {type: String, unique: true},
  address: String,
  desiredStrains: [String],
  desiredStrainsId: [{type: Schema.Types.ObjectId, ref:'Strain'}],
  receivesNotifs: Boolean
})

export default mongoose.model('User', userSchema)
