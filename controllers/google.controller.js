const getGoogleUrl = require("../services/googleAPIServices/urlGoogle.service");
const getGoogleAccount = require("../services/googleAPIServices/getGoogleAccount.service");
const saveGoogleUser = require("../services/googleAPIServices/saveGoogleUser.service");

//Generate a google URL
exports.urlGoogle = (req, res) => {
  const url = getGoogleUrl();
  res.status(201).send({ success: true, response: url });
};

//response from login
exports.getGoogleAccountFromCode = async (req, res) => {
  try {
    const { email, googleId } = await getGoogleAccount(req.query.code);
    const resObject = await saveGoogleUser(email, googleId);
    res.status(200).send(resObject);
  } catch (e) {
    res.status(400).send({ response: "Error signing you in" });
  }
};
