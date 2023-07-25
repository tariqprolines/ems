const mongoose = require('mongoose')
express   = require('express')
router    = express.Router()

//emp model

let employeeSchema = require('../models/Employee')

// Middleware

const isAuth = require('../middleware/auth')

//Create Employee

router.post('/create-employee',(req, res, next) => {
    employeeSchema.create(req.body, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  });

// Read Employees

router.get('/', isAuth ,async(req, res) => {
    try {
      let data = await employeeSchema.find().sort({_id:-1})
      res.json({
          success:true, data:data
      })
    } catch (error) {
      console.log(error)
    }
    
})

//Edit Employee
router.get('/update-employee/:id', (req,res, next) => {
  employeeSchema.findById(
    req.params.id,(error, data) => {
      if(error){
        next(error)
      }
      else{
        res.json(data)
      }
    }
  )
})

// Update Employee
router.put('/update-employee/:id',(req,res,next) => {
  employeeSchema.findByIdAndUpdate(
    req.params.id, 
    {$set:req.body},
    (error, data) => {
      if(error){
        next(error)
      }
      else{
        res.json(data);
      }
    }
  )
})

//Delete Employee
router.delete('/delete-employee/:id',(req,res,next) => {
  employeeSchema.findByIdAndRemove(
    req.params.id,(error, data) => {
      if(error){
        next(error)
      }
      else{
        res.status(200).json({
          success: true,
          data: data
        })
      }
    }
  )
})
module.exports =router