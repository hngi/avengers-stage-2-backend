const Joi = require('joi');

const validateCreateSession = (body) => {
	const sessionSchema = Joi.object().keys({
        email: Joi.string().email({ minDomainAtoms: 2 }).min(5).max(256).required(),
        password: Joi.string().min(8).max(256).required(),
    });

    return new Promise((resolve, reject) => {
    	Joi.validate(body, sessionSchema, (err, value) => {
    		if (err) {
    			reject(new Error(err.details[0]['message']));
    		} else {
    			resolve()
    		}
    	})
    })
}

const validatePasswordReset = (body) => {
    const sessionSchema = Joi.object().keys({
        email: Joi.string().email({ minDomainAtoms: 2 }).min(5).max(256).required(),
    });
    
    return new Promise((resolve, reject) => {
        Joi.validate(body, sessionSchema, (err, value) => { 
            if (err) {
                reject(new Error(err.details[0]['message']));
            } else {
                resolve();
            }
        });  // err === null -> valid
    });
    
}

const validateResetPassword = (body) => {
    const sessionSchema = Joi.object().keys({
        password: Joi.string().min(8).max(256).required(),
        password: Joi.string().min(8).max(256).required(),
        password_confirmation: Joi.any().valid(Joi.ref('password')).required().options({language: {any: {allowOnly: 'must match password'}}})
    });
    
    return new Promise((resolve, reject) => {
        Joi.validate(body, sessionSchema, (err, value) => { 
            if (err) {
                reject(new Error(err.details[0]['message']));
            } else {
                resolve();
            }
        });  // err === null -> valid
    });
    
}

module.exports.validateCreateSession = validateCreateSession;
module.exports.validatePasswordReset = validatePasswordReset;
module.exports.validateResetPassword = validateResetPassword;