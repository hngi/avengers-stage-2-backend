/**==========================================================
 * THIS MODULE USES SENDGRID API TO HANDLE ALL MAILING LOGIC
 * ==========================================================*/


const sendGrid = require('@sendgrid/mail');
const dateFormat = require('dateformat');

sendGrid.setApiKey(process.env.SENDGRID_APIKEY);

module.exports = {

  /* code for Sign Up mail here */
  sendSignupMail : (emailAddr) => {

    // TODO: kindly finish up the code
    const mailData = {
      to: emailAddr,
      cc: '', // optional
      subject: '',
      html: ``

    }

    return new Promise((resolve, reject) => {
      sendGrid.send(mailData).then(resolve).catch(reject);
    })

    
  },

  /* code for Sign In mail here */
  sendSigninMail : (emailAddr) => {
    let time = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
    const msg = {
      to: emailAddr,
      from: process.env.SENDER_EMAIL,
      subject: 'Avengers APP',
      text: 'Hello, \nYou just signed into your account at ' + time + '\n Best Regards! ',
     
    };
    return new Promise((resolve, reject) => {
      sendGrid.send(msg).then(resolve).catch(reject);
    
    })
    

  },

  /* code for Forgot Password mail here */
  sendForgotpasswordMail : (emailAddr) => {

  }

} //end module