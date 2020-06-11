const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const companySchema = new Schema({
  company_id: {
    type: String,
    required: true
  }
});

module.exports = Company = mongoose.model('company', companySchema);
