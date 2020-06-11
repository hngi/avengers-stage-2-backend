const mailgun = require('mailgun-js')({apiKey: process.env.MAILGUN_API_KEY, domain: encodeURIComponent(process.env.MAILGUN_DOMAIN)});
 
async function sendMail(recipient, subject, message, attachment = null) {
    message = message + `
        <br><br>
        Warm Regards,<br>
        <name of the organisation>.
    `;
    const data = {
        from: process.env.MAIL_FROM_NAME,
        to: recipient,
        subject: subject,
        html: message,
        attachment
    };
    
    mailgun.messages().send(data, function (_error, _body) {
        //console.log(body);
    });
}

module.exports.sendMail = sendMail;