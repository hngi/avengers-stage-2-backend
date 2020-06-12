const businessConfigure = require("../services/businessConfigure.service");

exports.configure = async (req, res, next) => {
  const company_id = req.body.company_id;

  if (!company_id) {
    res.status(400).send({ response: "Company ID is required" });
  }
  try {
    const business = await businessConfigure(company._id);
    res.status(200).send({ success: true, business });
  } catch (e) {
    return res.status(400).send({ response: e.message });
  }
};
