const mongoose = require('mongoose')
const Schema = mongoose.Schema

const googleUserSchema = new Schema({
    username: String,
    googleId: String

  });
  const Users= mongoose.model('user',googleUserSchema)// create model for schema
  module.exports=Users;//exports the user model