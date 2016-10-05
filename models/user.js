var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = Schema({
  firstName: String,
  phoneNumber: {type: String, unique: true },
  desiredStrains: [String]
})

module.exports = mongoose.model('User', userSchema)
