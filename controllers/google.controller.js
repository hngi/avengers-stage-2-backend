const {google} = require('googleapis')
require('dotenv').config()
const MailerUtil = require('../util/email')
const TokenUtil = require('../util/token')
const User = require('../models/user.model')
const OAuth2Client =google.auth.OAuth2

//Config google api
const googleConfig = {
    clientId: process.env.GOOGLE_CLIENT_IDD, 
    clientSecret: process.env.GSOOGLE_CLIENT_SECRETT,
    redirect: 'http://localhost:3000/api/v1/google/callback',
};

//Google Scope
const defaultScope = [
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
    return google.plus({ version: 'v1', auth });
}

//Generate a google URL
exports.urlGoogle = (req, res) => {
    const auth = createConnection();
    const url = getConnectionUrl(auth);
    res.status(201).send({success: true, response: url})
}

//response from login
exports.getGoogleAccountFromCode = async (req, res) => {
    console.log(req.query);
    const auth = createConnection();
    auth.getToken(req.query).then((data) => {
        console.log(data);
        const tokens = data.tokens;
        console.log(tokens);
    }).catch(e => console.log(e));
    
    // auth.setCredentials(tokens);
    // const plus = getGooglePlusApi(auth);
    // const me = await plus.people.get({ userId: 'me' });
    // const userGoogleId = me.data.id;
    // const userGoogleEmail = me.data.emails && me.data.emails.length && me.data.emails[0].value;

    // User.findOne({email: userGoogleEmail}, (err, resp) => {
    //     if(err) res.status(400).send({response: "Error signing you in"})
    //     if(res){
    //         return res.status(200).send({
    //             success: true,
    //             token: TokenUtil.signedJWT(userGoogleEmail)
    //         })
    //     }else{
    //         const newUser = new User({
    //             email: userGoogleEmail,
    //             password: userGoogleId
    //         })

    //         bcrypt.genSalt(10, (err, salt) => {
    //             bcrypt.hash(newUser.password, salt, (err, hash) => {
    //                 if (err) throw err
    //                 newUser.password = hash
    //                 newUser.save().then(user => {
    //                     res.status(200).send({ success: true, token: TokenUtil.signedJWT(userGoogleEmail)}) 
    //                 }).catch(err => console.log(err))
    //             })
    //         })
    //     }
    // }) 
}