const app = require('express').Router();
const Blog = require('../models/blogModel');
const verify = require('./verifyToken');
const isAdmin = require('./isAdmin')
app.post('/newblog', verify,isAdmin, async(req,res)=>{
    try{
        const blog = await Blog.create(req.body)
        res.status(200).json(blog);
    }catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})
app.get('/All', verify,async(req,res)=>{
    try{
        const blogs = await Blog.find({})
        res.status(200).json(blogs);
    }catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.get("/viewblog/:id",verify, async(req,res)=>{
    try{
        const {id} = req.params;
        const blog = await Blog.findById(id)
        res.status(200).json(blog);
    }catch(error){
        res.status(500).json({message:error.message})
    }
   
})
app.delete("/deleteBlog/:id", verify,isAdmin, async(req,res)=>{
    try{
        const {id} = req.params;
        const blog = await Blog.findByIdAndDelete(id);
        if(!blog){
            return res.status(404).json({message: `Blog with ID: ${id} was not found`})
        }
        res.status(200).json(blog);
    }catch(error){
        res.status(500).json({message:error.message})
    }
})
app.put("/updateBlog/:id",verify,isAdmin, async(req,res)=>{
    try{
        const {id} = req.params;
        const blog = await Blog.findByIdAndUpdate(id, req.body);
        if(!blog){
            return res.status(404).json({message: `Blog with ID: ${id} was not found`})
        }
        const updateBlog = await Blog.findById(id)
        res.status(200).json(updateBlog);
    }catch(error){
        res.status(500).json({message:error.message})
    }
})

module.exports = app;