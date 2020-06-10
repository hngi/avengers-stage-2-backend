const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendMail = (to, subject, msg) => {
    return new Promise((resolve, reject) => {
        const mail = {
            to: to,
            from: process.env.MAIL_SENDER,
            subject: subject,
            html: msg,
        }

        sgMail.send(mail).then(() => {
            resolve(true)
        }, error => {
            reject(error)
        })
    })
}