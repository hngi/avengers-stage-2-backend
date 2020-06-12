const {
  createConnection,
  getGooglePlusApi
} = require("./config/googleAPIconfig.service");

module.exports = async code => {
  const auth = createConnection();
  const data = await auth.getToken(code);
  const tokens = data.tokens;

  auth.setCredentials(tokens);
  const plus = getGooglePlusApi(auth);
  const me = await plus.people.get({
    resourceName: "people/me",
    personFields: "emailAddresses,names"
  });
  const googleId = me.data.resourceName.split("/")[1];
  const email =
    me.data.emailAddresses &&
    me.data.emailAddresses.length &&
    me.data.emailAddresses[0].value;
  return { email, googleId };
};
