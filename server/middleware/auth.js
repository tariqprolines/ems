const jwt = require('jsonwebtoken')
const User = require('../models/User');

const isAuth = (req,res,next) => {
    // if(req.headers && req.headers.authorization){
        try {
            // const token = req.headers.authorization;
            const token = localStorage.getItem('jwt');
            const decode = jwt.verify(token,process.env.SECRET_KEY)
            if(decode){
                next();
            }else{
                return res.json({success:false,message:"unauthorized access, Not Verify"})
            }
        } catch (error) {
            if(error.name === 'JsonWebTokenError'){
                return res.json({success:false,message:"unauthorized access, Json Token"})
            }
            if(error.name === 'TokenExpiredError'){
                return res.json({success:false, message: "Token Expired Error, Please login again."})
            }
            return res.json({success:false,message:"Internal Server Error!"})
        }
        
    // }
    // else{
    //     res.json({success:false,message:"unauthorized access"})
    // }
    
}

module.exports = isAuth;