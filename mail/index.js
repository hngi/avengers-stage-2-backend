/**==========================================================
 * THIS MODULE USES SENDGRID API TO HANDLE ALL MAILING LOGIC
 * ==========================================================*/


const sendGrid = require('@sendgrid/mail');
const signupHtml = require("./signupEmailTemplate");
const signinHtml = require("./signinEmailTemplate");
// const dateFormat = require('dateformat');

sendGrid.setApiKey(process.env.SENDGRID_APIKEY);

module.exports = {

  /* code for Sign Up mail here */
  sendMail : (emailAddr, subject, msg) => {
  
    const mailData = {
      to: emailAddr,
      from: process.env.SENDER_EMAIL, // optional
      subject: subject,
      html: signupHtml.getBody(msg)

    }
    console.log('sending....')
    return new Promise((resolve, reject) => {
      sendGrid.send(mailData).then((reolve) => {
        console.log('sent');
        resolve
      }).catch(reject);
    })

    
  },

  /* code for Sign In mail here */
  sendSigninMail : (emailAddr) => {
    const msg = {
      to: emailAddr,
      from: process.env.SENDER_EMAIL,
      subject: 'USER SIGNED IN TO AVENGERS APP',
      html: signinHtml.getBody("You just signed in"),
     
    };
    return new Promise((resolve, reject) => {
      sendGrid.send(msg).then(resolve).catch(reject);
    
    })
    

  },

  /* code for Forgot Password mail here */
  sendForgotpasswordMail : (emailAddr) => {
    const mailData = {
      to: emailAddr,
      cc: '', // optional
      subject: 'Successful Signup to Avengers App',
      html: ``

    }

    return new Promise((resolve, reject) => {
      sendGrid.send(mailData).then(resolve).catch(reject);
    })
  }

} //end module