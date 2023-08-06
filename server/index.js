require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
let dbConfig = require('./database/db')
let employeeRoute = require('./routes/employee.route') 
let authRoute = require('./routes/auth.route')
let contactSchema = require('./models/Contact')
let cors = require('cors');
let bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

// Connecting MongoDB Database
const connectionParams={
  useNewUrlParser: true,
  useUnifiedTopology: true 
}
mongoose.connect(dbConfig.db, connectionParams)
.then(() => {
    console.log('Database successfully connected!')
  })
 .catch((err) => console.log(err)) 

const app = express()
//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(cookieParser())

app.use(cors({
   origin: ["http://localhost:3000"],
   methods:["*"],
   credentials: true,
   }));


//Employee Routes
app.use('/employees', employeeRoute)

// Auth Routes

app.use('/auth', authRoute)

// Contact Us
app.get('/contact',(req,res) => {
  res.send('contact page');
})
app.post('/contact',(req, res, next) => {
  contactSchema.create(req.body, (error, data) => {
    console.log(data)
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})