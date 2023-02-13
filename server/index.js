const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config()
const Blog = require('./models/blogModel');
const verify = require('./routes/verifyToken');

const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express');
const app = express()

app.use(express.json());

  const options = {
    definition:{
        openapi:'3.0.0',
        info:{
            title: 'Node JS API Project',
            version:'1.0.0'
        },
        servers :[{
            url:"http://127.0.0.1:3001/"
        }]
    },
    apis: ['./index.js','./routes/blogs.js',"./routes/queries.js",'./routes/auth.js']
}

/**
 * @swagger
 * /home :
 *  get:
 *      summary: This api is used to check if get method is working
 *      description: This api is working properly if it renders the words "WELCOME!"
 *      responses:
 *          200:
 *                  description: Test method is a success
 * 
 * 
 * /user/login : 
 *   post:
 *      summary: This api is used to check if login POST method is working
 *      description: This api is working properly if and only if a registered user can login"
 *      responses:
 *          200:
 *                  description: Test method is a success
 */

const swaggerSpec = swaggerJSDoc(options)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))
 



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
const { version } = require("chai");
app.use('/user', authRoute)

//AUTHENTICATION OVER

app.listen(3001,()=>{
    console.log('on port 3001')
})

module.exports=app;