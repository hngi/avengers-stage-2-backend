
const sgMail = require('@sendgrid/mail');
require('dotenv').config()

sgMail.setApiKey(process.env.SENDGRID_API);

exports.sendMail = (to, subject, msg) => {
    return new Promise((resolve, reject) => {
        const mailOptions = {
            from: '"Team Avengers 👻" <dasther@outlook.com>',
            to: to,
            subject: subject,
            text: msg,
            html: msg
        };
  
        sgmail.send(mailOptions, (err) => {
            if(err){
                reject(err);
            }
            resolve(true);
        });
    })
}
