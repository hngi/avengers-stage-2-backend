const nodemailer = require('nodemailer')
require('dotenv').config()

exports.sendMail = (to, subject, msg) => {
    return new Promise((resolve, reject) => {
        const smtpTransport = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: false,
            auth: {
                user: process.env.MAIL_USERNAME, // generated ethereal user
                pass: process.env.MAIL_PASSWORD, // generated ethereal password
            }
        });
  
        smtpTransport.verify(function(error, success) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log("Server is ready to take our messages");
            }
        });
  
        const mailOptions = {
            from: '"Team Avengers 👻" <dasther@outlook.com>',
            to: to,
            subject: subject,
            text: msg,
            html: msg
        };
  
        smtpTransport.sendMail(mailOptions, (err) => {
            if(err){
                reject(err);
            }
            resolve(true);
        });
    })
}
