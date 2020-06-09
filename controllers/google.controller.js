const google = require('googleapis');
require('dotenv').config()
const jwt = require('jsonwebtoken')

//Config google api
const googleConfig = {
    clientId: '585502711890-ubdghi2or9gqf6s0h5utr3o9d4ald3e2.apps.googleusercontent.com', 
    clientSecret: 'K3-Aa2dzRO-SgWaRmSvx8MCt',
    redirect: 'localhost:3000/google-signin',
};

//Google Scope
const defaultScope = [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/userinfo.email',
];

//Initializing connection to google OAuth2
function createConnection() {
    return new google.auth.OAuth2(
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
    return google.plus({ version: 'v1', auth });
}

//Generate a google URL
exports.urlGoogle = (req, res) => {
    const auth = createConnection();
    const url = getConnectionUrl(auth);
    res.status(201).send({msg: 'Copy login url', url})
}

//response from login
exports.getGoogleAccountFromCode = async (req, res) => {
    const data = await auth.getToken(req.body.code);
    const tokens = data.tokens;
    const auth = createConnection();
    auth.setCredentials(tokens);
    const plus = getGooglePlusApi(auth);
    const me = await plus.people.get({ userId: 'me' });
    // const userGoogleId = me.data.id;
    const userGoogleEmail = me.data.emails && me.data.emails.length && me.data.emails[0].value;
    const token = jwt.sign(
        {
            email: userGoogleEmail
        },
        process.env.SECRET_TOKEN,
        {
            expiresIn: '4800s'
        }
    )

    return res.status(200).send({
        success: true,
        token
    })
    // return {
    //     id: userGoogleId,
    //     email: userGoogleEmail,
    //     tokens: tokens,
    // };
}