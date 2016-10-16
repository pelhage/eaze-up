import mongoose from 'mongoose'
const { Schema } = mongoose

const userSchema = Schema({
  firstName: String,
  phoneNumber: {type: String, unique: true},
  address: String,
  desiredStrains: [{type: Schema.Types.ObjectId, ref:'Strain'}]
})

export default mongoose.model('User', userSchema)


// For each strain
// Get list of today's strains
  // For each strain
    // Get list of users who have that strain
  //
  //
  //
  // })
