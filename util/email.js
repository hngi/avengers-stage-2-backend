// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const nodemailer = require('nodemailer')

exports.sendMail = (to, subject, msg) => {
    return new Promise((resolve, reject) => {
        const smtpTransport = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                type: 'OAuth2',
                user: 'mamudseun@gmail.com',
                clientId: '115118855190-nf6g5enqktl3uhqb1883tlr02m6f69pr.apps.googleusercontent.com',
                clientSecret: 'e1e6Ul-7s-RAm20uVKT0W_An',
                refreshToken: '1//04RP77MTu11fcCgYIARAAGAQSNwF-L9IrMYYXlpXARG-vKe_HkqGyfLuaMD9WdJZsQJ0sP2Hyd_RrF9NIx9FIlviAmxUfvpiPyx4',
                accessToken: 'ya29.a0AfH6SMC1wtax57Kq3tRYHp0D25rhuczTFVUaAEjsP_PV4qMRSZzYU2qoYQ07ItIuAT-hvSRJaPEHQvZrgFfEslSaVtze8cl5l5yechPXxp917uAYMsjnc2zAykbYq0ANVcs4GonCl_C6P_O3tcLRmkgz9bMwsGGF5gE',
                expires: 1484314697598
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
            from: 'mamudseun@gmail.com',
            to: to,
            subject: subject,
            text: msg
        };
  
        smtpTransport.sendMail(mailOptions, function(err) {
            resolve(true);
        });
    })
}
