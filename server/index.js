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
 * 
 */
/**
 * @swagger
 *  components:
 *      schema:
 *          logUser:
 *              type: object
 *              properties:
 *                  username:
 *                      type: string
 *                  password:
 *                      type: string
 */

/**
 * @swagger
 *  components:
 *      schema:
 *          sendQuery:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  email:
 *                      type: string
 *                  message:
 *                      type: string
 */

/**
 * @swagger
 *  components:
 *      schema:
 *          createBlog:
 *              type: object
 *              properties:
 *                  title: 
 *                      type: string
 *                  image:
 *                      type: string
 *                  blogContent:
 *                      type: string
 *                  blog_likes: 
 *                      type: array
 *                  blog_comments:
 *                      type: array
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
 *                  description: Test method is a success
 *              
 * /user/login :
 *  post:
 *      tags:
 *          - Users
 *      summary: USER LOGIN
 *      description: This api is working properly 
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      items:
 *                          $ref: '#/components/schema/logUser'
 *      responses:
 *          200:
 *                  description: Test method is a success
 * 
 * /user/login/admin/listOfUsers :
 *  get:
 *      tags:
 *          - Users
 *      summary: List of Users
 *      description: This api is working properly 
 *      parameters:
 *          - in: header
 *            name: bearer-token
 *            description: add token here
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *                  description: Test method is a success
 * 
 * /user/login/admin/deleteUser/{id} :
 *  delete:
 *      tags:
 *          - Users
 *      summary: Delete a user account
 *      description: This api serves to delete a a user account by the admin
 *      parameters:
 *          - in: header
 *            name: bearer-token
 *            description: add token here
 *            required: true
 *            schema:
 *              type: string
 *          - in : path
 *            name: id
 *            description: add user id
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *                  description: User is deleted successfully
 * 
 * 
 * /blogs/newblog :
 *  post:
 *      tags:
 *          - Blogs
 *      summary: BLOG CREATION
 *      description: Blog will be posted by admin
 *      parameters:
 *          - in: header
 *            name: bearer-token
 *            description: add token here
 *            required: true
 *            schema:
 *              type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      items:
 *                          $ref: '#/components/schema/createBlog'
 *      responses:
 *          200:
 *              description: Test method is a success          
 * 
 * /blogs/All :
 *  get: 
 *      tags:
 *          - Blogs
 *      summary: View All Blogs
 *      description: This api serves to view all blogs that exist in the database
 *      responses:
 *          200:
 *                  description: Test method is a success
 * 
 * /blogs/viewblog/{id} :
 *  get:
 *      tags:
 *          - Blogs
 *      summary: View a single blog
 *      description: This api serves to view a single blog
 *      parameters:
 *          - in: header
 *            name: bearer-token
 *            description: add token here
 *            required: true
 *            schema:
 *              type: string
 *          - in : path
 *            name: id
 *            description: add blog id
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *                  description: Test method is a success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              items: 
 *                                  $ref: '#/components/schema/createBlog'
 * 
 * /blogs/updateBlog/{id}:
 *  put:
 *      tags:
 *          - Blogs
 *      summary: Update a blog
 *      description: This api serves to update a single blog
 *      parameters:
 *          - in: header
 *            name: bearer-token
 *            description: add token here
 *            required: true
 *            schema:
 *              type: string
 *          - in : path
 *            name: id
 *            description: add blog id
 *            required: true
 *            schema:
 *              type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      items:
 *                          $ref: '#/components/schema/createBlog'
 *      responses:
 *          200:
 *                  description: Test method is a success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              items: 
 *                                  $ref: '#/components/schema/createBlog'
 * 
 * 
 * /blogs/deleteBlog/{id} :
 *  delete:
 *      tags:
 *          - Blogs
 *      summary: Delete a single blog
 *      description: This api serves to delete a single blog
 *      parameters:
 *          - in: header
 *            name: bearer-token
 *            description: add token here
 *            required: true
 *            schema:
 *              type: string
 *          - in : path
 *            name: id
 *            description: add blog id
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *                  description: Blog is deleted
 * 
 * /blogs/viewblog/like/{id} :
 *  post:
 *      tags:
 *          - Blogs
 *      summary: Like or unlike a blog
 *      description: This api serves to like or unlike a single blog
 *      parameters:
 *          - in: header
 *            name: bearer-token
 *            description: add token here
 *            required: true
 *            schema:
 *              type: string
 *          - in : path
 *            name: id
 *            description: add blog id
 *            required: true
 *            schema:
 *              type: string
 *      
 *      responses:
 *          200:
 *                  description: Like added /deleted
 * 
 * /blogs/comments/create/{id} :
 *  post:
 *      tags:
 *          - Blogs
 *      summary: Comment on a blog
 *      description: This api serves to comment on a blog
 *      parameters:
 *          - in: header
 *            name: bearer-token
 *            description: add token here
 *            required: true
 *            schema:
 *              type: string
 *          - in : path
 *            name: id
 *            description: add blog id
 *            required: true
 *            schema:
 *              type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      items:
 *                          $ref: '#/components/schema/commentBlog'
 *      
 *      responses:
 *          200:
 *                  description: Comment added successfuly
 * 
 * 
 * /blogs/comments/delete/{comment_id} :
 *  delete:
 *      tags:
 *          - Blogs
 *      summary: Delete Comments
 *      description: This api serves to delete a comment from a blog
 *      parameters:
 *          - in: header
 *            name: bearer-token
 *            description: add token here
 *            required: true
 *            schema:
 *              type: string
 *          - in : path
 *            name: comment_id
 *            description: add comment id
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *                  description: comment successfully is deleted
 * 
 * /queries/sendQuery :
 *  post:
 *      tags:
 *          - Queries
 *      summary: Sending a query
 *      description: This api is for contacting the admin
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      items:
 *                          $ref: '#/components/schema/sendQuery'
 *      responses:
 *          200:
 *              description: Test method is a success          
 * /queries/queriesList :
 *  get: 
 *      tags:
 *          - Queries
 *      summary: View All queries
 *      description: This api serves to view all queries that exist in the database
 *      parameters:
 *          - in: header
 *            name: bearer-token
 *            description: add token here
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *                  description: Test method is a success
 * 
 * /queries/viewQuery/{id} :
 *  get:
 *      tags:
 *          - Queries
 *      summary: Retrieve queries
 *      description: This api is retrieving all queries
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      items:
 *                          $ref: '#/components/schema/sendQuery'
 *      responses:
 *          200:
 *              description: Test method is a success 
 * 
 * /queries/deleteQuery/{id} :
 *  delete:
 *      tags:
 *          - Queries
 *      summary: Delete Query
 *      description: This api serves to delete a query
 *      parameters:
 *          - in: header
 *            name: bearer-token
 *            description: add token here
 *            required: true
 *            schema:
 *              type: string
 *          - in : path
 *            name: id
 *            description: add query id
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *                  description: query successfully is deleted
 * 
 * 
 */

const swaggerSpec = swaggerJSDoc(options)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))






mongoose.set("strictQuery", true)
mongoose.connect("mongodb+srv://mahoraphy02:fiacre02@cluster0.xisovsw.mongodb.net/BrandDB?retryWrites=true&w=majority",{
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
app.use('/user', authRoute);

//AUTHENTICATION OVER

app.listen(3001,()=>{
    console.log('on port 3001');
})

module.exports=app;