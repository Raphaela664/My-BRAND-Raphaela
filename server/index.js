const express = require("express");
const mongoose = require("mongoose");
const Query = require('./models/queryModel')
const Blog = require('./models/blogModel')
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

app.get('/queries', async(req, res)=>{
    try{
        const queries = await Query.find({})
        res.status(200).json(queries);
    }catch(error){
        res.status(500).json({message:error.message})
    }
})
app.get("/queries/:id", async(req,res)=>{
    try{
        const {id} = req.params;
        const query = await Query.findById(id)
        res.status(200).json(query);
    }catch(error){
        res.status(500).json({message:error.message})
    }
   
})

app.delete("/queries/:id", async(req,res)=>{
    try{
        const {id} = req.params;
        const query = await Query.findByIdAndDelete(id);
        if(!query){
            return res.status(404).json({message: `The message with ID: ${id} was not found`})
        }
        res.status(200).json(query);
    }catch(error){
        res.status(500).json({message:error.message})
    }
})
app.post('/queries', async(req,res)=>{
    try{
        const query = await Query.create(req.body)
        res.status(200).json(query);
    }catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})



app.post('/blogs/newblog', async(req,res)=>{
    try{
        const blog = await Blog.create(req.body)
        res.status(200).json(blog);
    }catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})
app.get('/blogs/All', async(req,res)=>{
    try{
        const blogs = await Blog.find({})
        res.status(200).json(blogs);
    }catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.get("/blogs/viewblog/:id", async(req,res)=>{
    try{
        const {id} = req.params;
        const blog = await Blog.findById(id)
        res.status(200).json(blog);
    }catch(error){
        res.status(500).json({message:error.message})
    }
   
})
app.delete("/blogs/deleteBlog/:id", async(req,res)=>{
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
app.put("/blogs/updateBlog/:id", async(req,res)=>{
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

app.listen(3000,()=>{
    console.log('on port 3000')
})