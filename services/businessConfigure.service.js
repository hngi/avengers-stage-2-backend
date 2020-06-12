const Business = require("../models/business.model");

module.exports = async companyId => {
  const business = await Business.findById(companyId);

  if (business) {
    throw new Error("Company with the ID already exist");
  }
  const newBusiness = new Business({
    company_id
  });
  await newBusiness.save();
  return newBusiness;
};
