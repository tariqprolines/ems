const mongoose = require('mongoose')
const {isEmail} = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const schema = mongoose.Schema;

const userSchema = new schema({
    name:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required:[true,'Please enter your email Id'],
        unique:true,
        lowercase:true,
        validate:[isEmail, 'Please enter valid email address']
    },
    phone:{
        type:String,
        required:[true, "Please enter your Phone"],
        unique:true
    },
    password:{
        type: String,
        required:[true, "Please enter your password"],
        minlength:[6, "Password Length is 6 Charecter"],
    },
    confirmpassword:{
        type:String,
        required:true,
        minlength:6
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
},{timestamps:true},{collection:"users"})

//Genetating Jwt Token

userSchema.methods.generateAuthToken = async function(req,res){
    try {
        const token = jwt.sign({_id: this._id.toString},process.env.SECRET_KEY,{expiresIn:'1d',})
        this.tokens = this.tokens.concat({token:token})
        await this.save();
        return token
    } 
    catch (error) {
        console.log(`The error is ${error}`)
    }
}

//Hash Password
userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password,salt)
        this.confirmpassword = await bcrypt.hash(this.password,salt)
    }
    next()
})

module.exports = mongoose.model('User', userSchema)