const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
import dotenv from "dotenv";

dotenv.config();

class AuthController{
    

    //methods
    static async index(req,res){
        const { id } = req.user;

        //find user by id

        try {
            const user = await User.findById(id).select('-password');
            return res.send(user);    
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server Error');
        }
    }

    static async login(req,res,validationResult){
        //check for errors
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array()});
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if(!user){
                return res.status(400).json({errors: [{message:"Invalid Credentials"}] });
            }

            const isMatch = await bcrypt.compare(password,user.password);

            if(!isMatch){
                return res.status(400).json({errors: [{message:"Invalid Credentials"}] });
            }

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
                    return res.send({ success: 200, message: "User logged in successfully", data: token});
            })
    
        } catch (error) {
            console.log(error.message);
            return res.status(500).send('Server Error');
        }
    }
    
}



module.exports = AuthController;