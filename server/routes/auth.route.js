const mongoose =  require('mongoose')
const express = require('express');
const bcrypt  =  require('bcryptjs')
const router   = express.Router();

// Register Model

const userSchema = require('../models/User');
const { json } = require('body-parser');

// register 
router.post('/register',async(req,res) => {
    try {
        const password = req.body.password;
        const confirmpassword = req.body.confirmpassword;
        if(password === confirmpassword){
            const user = new userSchema({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password,
                confirmpassword:req.body.confirmpassword
            })

            const token = await user.generateAuthToken(); 
            // console.log(token);

            // This res.cookie() function is used to set the cookie name to value
            // The value parameter may be a string or object coverted to json
            
            // res.cookie('jwt',token,{expires:new Date(Date.now()+100000),httpOnly:true})

            const savedUser = await user.save()
            res.send({ id: savedUser._id, token: token,user: savedUser});
        }
        else{
            res.send('Password not match.')
        }
    } catch (error) {
        console.log(error)
    }
})

// Login

router.post('/login', async(req,res) => {
    try{
        const email = req.body.email
        const password = req.body.password

        const user = await userSchema.findOne({email:email})
        const isMatch = await bcrypt.compare(password, user.password)

        if(isMatch){
  
            const token = await user.generateAuthToken();             
            // res.cookie('jwt', token)
            res.status(200).json({status:200, token: token, user:user})
        }
        else{
            res.status(400).json({status:400})
        }
    }
    catch(err){
        res.status(401).json({status:401})
    }
})

module.exports = router