const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config()



const app = express()

app.use(express.json());
mongoose.set("strictQuery", false)
mongoose.connect("mongodb://127.0.0.1:27017/brandDB",{
    useNewUrlParser:true, useUnifiedTopology:true
},(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("successfully connected")
    }
})



//querries
const queriesRoute = require('./routes/queries');
app.use('/queries', queriesRoute)

//blogs
const blogsRoute = require('./routes/blogs');
app.use('/blogs', blogsRoute)

//AUTHENTICATION STARTS
const authRoute = require('./routes/auth');
app.use('/user', authRoute)

//AUTHENTICATION OVER

app.listen(3000,()=>{
    console.log('on port 3000')
})