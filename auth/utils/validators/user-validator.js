const Joi = require('joi');

console.log('user validator');
const validateCreateUser = (body) => {
    console.log(body)
	const userSchema = Joi.object().keys({
        firstname: Joi.string().alphanum().min(3).max(60).required(),
        lastname: Joi.string().min(3).max(60).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(8),
        password_confirmation: Joi.any().valid(Joi.ref('password')).required().options({language: {any: {allowOnly: 'must match password'}}}),
        email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        phone_number: Joi.string().regex(/^[0]+[0-9]{10}$/).min(5).max(50).required(),
    });

    return new Promise((resolve, reject) => {
    	Joi.validate(body, userSchema, (err, value) => {
    		if(err) {
                console.log('validator err')
    			reject(new Error(err.details[0]['message']))
    		} else {
                console.log('pass validation')
    			resolve();
    		}
    	})
    })
}

const validateChangePassword = (body) => {
    const passwordSchema = Joi.object().keys({
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(8),
        password_confirmation: Joi.any().valid(Joi.ref('password')).required().options({language: {any: {allowOnly: 'must match password'}}}),
     
    });
    
    return new Promise((resolve, reject) => {
        Joi.validate(body, passwordSchema, (err, value) => { 
            if (err) {
                reject(new Error(err.details[0]['message']));
            } else {
                resolve();
            }
        });  // err === null -> valid
    });
    
}

module.exports.validateCreateUser = validateCreateUser;
module.exports.validateChangePassword = validateChangePassword;



