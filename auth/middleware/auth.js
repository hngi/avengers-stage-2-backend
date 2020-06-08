const jwt = require('jsonwebtoken');
import dotenv from "dotenv";

dotenv.config();

module.exports = function(req,res,next){
    
    const token = req.header('x-auth-token');
    //if no token is found

    if(!token){
        return res.status(401).json({ message: "No Token, Authorization Denied" });
    }

    try {
        
        const decoded = jwt.verify(token,process.env.SECRET);
        req.user = decoded.user;
        next();

    } catch (error) {
        return res.status(401).json({ message: "Invalid Token Found" })
    }
}