const authResponseMessages = {
    sessionCreated: 'Session successfully created!',
    sessionDeleted: 'Session successfully deleted!',
    sessionCreateFailed: 'You entered a wrong email or password!',
    passwordReset: 'A new password has been sent to your email!',
    passwordChanged: 'Your password has been successfully changed!',
    authorisationFailed: 'Access Denied! Please login to continue.',
    invalidAuthorisationToken: 'Invalid token.',
    verifyYourEmail: 'Access denied because email has not been verified.',
    emailVerified: 'Your email has been successfully verified',
    invalidVerificationCode: 'The code you entered is invalid',
    accessDenied: 'Access Denied!'
}

const userResponseMessages = {
    userCreated: "You've successfully registered",
    userExists: 'The email you entered already exist!',
    verificationCodeSent: 'A verification code has been sent to your email.',
    photoUploaded: 'Your photo was successfully uploaded',
    noPhotoUploaded: 'Please upload a photo',
    profileUpdated: 'Your profile was successfully updated.',
    passwordUpdated: 'Your password was successfully updated.',
    deactivateUser: 'User successfully deactivated',
    activateUser: 'User successfully activated'
}

const errorResponseMessages = {
    internalServerError: 'Something went wrong!'
}

module.exports.authResponseMessages = authResponseMessages;
module.exports.userResponseMessages = userResponseMessages;
module.exports.errorResponseMessages = errorResponseMessages;
