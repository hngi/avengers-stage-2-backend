const google = require("googleapis").google;
const JWT = requir(JWT);
const User = require("../models/User");

export const googleConfig = {
  clientId: process.env.GOOGLE_CLIENT_ID, // e.g. asdfghjkljhgfdsghjk.apps.googleusercontent.com
  clientSecret: process.env.GOOGLE_CLIENT_SECRET, // e.g. _ASDFA%DFASDFASDFASD#FAD-
  redirect: process.env.GOOGLE_REDIRECT_URL, // this must match your google api settings
  jwt_secret: process.env.JWT_SECRET, //random string
};

const defaultScope = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];

function createConnection() {
  return new google.auth.OAuth2(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect
  );
}

function getConnectionUrl(auth) {
  return auth.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: defaultScope,
  });
}

function getGooglePeopleApi(auth) {
  return google.people({ version: "v1", auth });
}

export const urlGoogle = (req, res) => {
  const auth = createConnection();
  const url = getConnectionUrl(auth);
  res.send({ url }).end();
};

export const googleRedirect = async (req, res) => {
  if (req.query.error) {
    res.status(400).send({ message: "couldnt sign in with google" });
  }
  const code = req.query.code;
  const auth = createConnection();
  const data = await auth.getToken(code);
  const tokens = data.tokens;
  const jwt = JWT.sign(tokens, jwt_secret);
  auth.credentials = JWT.verify(jwt, jwt_secret);
  const people = getGooglePeopleApi(auth);
  const response = await people.people.get({
    resourceName: "people/me",
    personFields: "emailAddresses",
  });

  const email = response.data.emailAddresses[0].value;
  const password = BCrypt.genSaltSync(10);

  let user = await User.findOne({ email });

  if (!user) {
    const salt = BCrypt.genSaltSync(10);
    const hash = BCrypt.hashSync(password, salt);
    user = new User({
      email,
      password: hash,
    });
    await user.save();
  }
  const token = JWT.sign({ user: user._id, email: user.email }, jwt_secret, {
    expiresIn: "4800s",
  });

  res.status(200).send({
    message: "Successfully logged in",
    _id: user._id,
    token,
  });
};
