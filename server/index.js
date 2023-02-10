const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config()
const Blog = require('./models/blogModel');
const verify = require('./routes/verifyToken');


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
app.get('/home', (req,res)=>{
    try{
        res.status(200).json({message: 'WELCOME!'});
    }catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})



//AUTHENTICATION STARTS
const authRoute = require('./routes/auth');
app.use('/user', authRoute)

//AUTHENTICATION OVER

app.listen(3001,()=>{
    console.log('on port 3001')
})

module.exports=app;