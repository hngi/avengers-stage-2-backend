const mongoose = require('mongoose')
const findOrCreate = require('mongoose-findorcreate')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String
    //required: true
  },
  password: {
    type: String
    //required: true
  },
  googleId:String,
  resetPasswordToken: String,
  resetPasswordExpires: Date
})
userSchema.plugin(findOrCreate)

module.exports = User = mongoose.model('users', userSchema)
