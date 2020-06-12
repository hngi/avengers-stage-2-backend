const {google} = require('googleapis')
require('dotenv').config()
const TokenUtil = require('../util/token')
const User = require('../models/user.model')
const OAuth2Client =google.auth.OAuth2

//Config google api
const googleConfig = {
    clientId: process.env.GOOGLE_CLIENT_ID, 
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirect: process.env.GOOGLE_REDIRECT_URL,
};

//Google Scope
const defaultScope = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/userinfo.email',
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
        access_type: 'offline',
        prompt: 'consent',
        scope: defaultScope
    });
}

function getGooglePlusApi(auth) {
    return google.people({ version: 'v1', auth});
}

//Generate a google URL
exports.urlGoogle = (req, res) => {
    const auth = createConnection();
    const url = getConnectionUrl(auth);
    res.status(201).send({success: true, response: url})
}

//response from login
exports.getGoogleAccountFromCode = async (req, res) => {
    const auth = createConnection();
    const data = await auth.getToken(req.query.code);
    const tokens = data.tokens;
    
    auth.setCredentials(tokens);
    const plus = getGooglePlusApi(auth);
    const me = await plus.people.get({
        resourceName: 'people/me',
        personFields: 'emailAddresses,names'
    });
    const googleId = me.data.resourceName.split('/')[1];
    const email = me.data.emailAddresses && me.data.emailAddresses.length && me.data.emailAddresses[0].value;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            const newUser = new User({
                email,
                googleId
            });
            user = await newUser.save();
        }
        return res.status(200).send({
            success: true,
            userID: user._id,
            token: TokenUtil.signedJWT(email)
        });           
    } catch (e) {
        res.status(400).send({response: "Error signing you in"});
    }
}