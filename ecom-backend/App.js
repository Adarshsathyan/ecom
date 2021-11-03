const express = require('express');
const app = express();
require('dotenv').config();
const db = require('./config/connection');
const userRouter = require('./routes/user')
var session=require('express-session');
var fileUpload = require("express-fileupload")
var cors = require('cors')
const bodyParser = require('body-parser');

app.use(cors())
app.use(session({secret:process.env.SESSION_KEY,cookie:{maxAge:600000}}));
app.use(express.json())
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload())
app.use('/',userRouter);



//port listening
app.listen(7000,console.log("Connected to port 7000"));

//db connection
db.connect((err)=>{
    if(err) console.log('Database not connected'+err);
    else console.log("Database Connected ");
  })
