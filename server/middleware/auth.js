const jwt = require('jsonwebtoken')
const User = require('../models/User');

const isAuth = (req,res,next) => {
        try {
            const token = req.headers["x-access-token"];
            if(!token){
                res.json({message:"You need token, please try again."})
            }else{
                jwt.verify(token,process.env.SECRET_KEY, (err, decode) => {
                    if(err){
                        res.json({auth: false, message:"You failed to authenticate"})
                    }else{
                        req.userId = decode.id;
                        next()
                    }
                })
            }
            // const decode = jwt.verify(token,process.env.SECRET_KEY)
            // if(decode){
            //     next();
            // }else{
            //     return res.json({success:false,message:"unauthorized access, Not Verify"})
            // }
        } catch (error) {
            if(error.name === 'JsonWebTokenError'){
                return res.status(401).json({success:false,message:"unauthorized access, Json Token"})
            }
            if(error.name === 'TokenExpiredError'){
                return res.json({success:false, message: "Token Expired Error, Please login again."})
            }
            return res.json({success:false,message:"Internal Server Error!"})
        } 
}

module.exports = isAuth;