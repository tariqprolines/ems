const mongoose = require('mongoose')
const schema = mongoose.Schema;

const contactSchema = new schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    comment:{
        type:String
    }
}, {timestamps:true},{collection:"contacts"})

module.exports = mongoose.model('Contact', contactSchema)
