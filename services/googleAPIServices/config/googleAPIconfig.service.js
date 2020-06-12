const { google } = require("googleapis");
require("dotenv").config();
const OAuth2Client = google.auth.OAuth2;

//Config google api
const googleConfig = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirect: process.env.GOOGLE_REDIRECT_URL
};

//Google Scope
const defaultScope = [
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/plus.me",
  "https://www.googleapis.com/auth/userinfo.email"
];

//Initializing connection to google OAuth2
function createConnection() {
  return new OAuth2Client(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect
  );
}

function getConnectionUrl(auth) {
  return auth.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: defaultScope
  });
}

function getGooglePlusApi(auth) {
  return google.people({ version: "v1", auth });
}

module.exports = {
  createConnection,
  getConnectionUrl,
  getGooglePlusApi
};
