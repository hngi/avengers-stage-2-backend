/**==========================================================
 * THIS MODULE USES SENDGRID API TO HANDLE ALL MAILING LOGIC
 * ==========================================================*/


const sendGrid = require('@sendgrid/mail');

sendGrid.setApiKey(process.env.SENDGRID_APIKEY);

module.exports = {

  /* code for Sign Up mail here */
  sendSignupMail = (emailAddr) => {

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
  sendSigninMail = (emailAddr) => {

  },

  /* code for Forgot Password mail here */
  sendForgotpasswordMail = (emailAddr) => {

  }

} //end module