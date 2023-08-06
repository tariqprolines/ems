const mongoose =require('mongoose');
const Schema = mongoose.Schema;

let employeeSchema = new Schema({
    name:{
        type: String
    },
    email:{
        type: String
    },
    address:{
        type: String
    },
    
},{ timestamps: true },{
    collation: 'employees'
})

module.exports = mongoose.model('Employee', employeeSchema)

