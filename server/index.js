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
        components:{
            securitySchemas:{
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        }
        ,
        security:[
            {
                bearerAuth:[]
            }
        ]
        ,
        servers :[{
            url:"http://127.0.0.1:3001/"
        }]
    },
    apis: ['./index.js','./routes/blogs.js',"./routes/queries.js",'./routes/auth.js','./models/userModel.js',
    './models/queryModel.js','./models/blogModel.js','./models/blogCommentModel.js','./models/blogLikeModel.jscy']
}
/**
 * @swagger
 *  components:
 *      schema:
 *          newUser:
 *              type: object
 *              properties:
 *                  username:
 *                      type: string
 *                  email:
 *                      type: string
 *                  password: 
 *                      type: string
 * 
 */


/**
 * @swagger
 * /home :
 *  get:
 *      tags:
 *          - Home
 *      summary: This api is used to check if get method is working
 *      description: This api is working properly if it renders the words "WELCOME!"
 *      responses:
 *          200:
 *                  description: Test method is a success
 * 
 * /user/register :
 *  post:
 *      tags:
 *          - Users
 *      summary: REGISTER A USER
 *      description: This api is working properly 
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      items:
 *                          $ref: '#/components/schema/newUser'
 *      responses:
 *          200:
 *              
 * 
 * 
 *
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