const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

import dotenv from "dotenv";

dotenv.config();

class UsersController{
    
    //methods
    static async store(req,res,validationResult){

        //check for errors
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array()});
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            //check if user already exists

            if(user){
                return res.status(400).json({errors: [{message:"User already exist. Use another email"}] });
            }


            user = new User( {
                email,
                password,
            });

            // generate salt
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password,salt);

            await user.save();

            //JSONWEBTOKEN
            //payload

            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(payload,
                process.env.SECRET,
                { expiresIn: 360000},
                (error,token) => {
                    if(error) throw error;
                    return res.send({ success: 200, message: "User registered successfully", data: token});
            })
    
        } catch (error) {
            console.log(error.message);
            return res.status(500).send('Server Error');
        }
        
    }


}


module.exports = UsersController;
