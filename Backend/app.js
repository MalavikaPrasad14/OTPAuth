const express=require('express')
const app=express()
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const cors=require('cors')
app.use(cors())

require('./db/connection');

const otpRout=require('./route/otpRoutes');
app.use('/otp',otpRout);

require('dotenv').config()
port=process.env.PORT

app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})