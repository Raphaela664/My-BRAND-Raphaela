const app = require('express').Router();
const Blog = require('../models/blogModel');
const blogLike = require('../models/blogLikeModel');
const verify = require('./verifyToken');
const isAdmin = require('./isAdmin');
const BlogLike = require('../models/blogLikeModel');
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

app.post("/viewblog/:id/like",verify,async(req,res)=>{
    try{
        let blog_id = req.params.blog_id;
        if(!mongoose.Types.ObjectId.isValid(blog_id)){
            return response.status(500).send({
                message: 'Invalid blog id'
               
            })
        }
        Blog.findOne({_id:blog_id}).then(async(blog)=>{
            if(!blog){
                return res.status.apply(404).send({
                    message: 'No blog found'
                })
            }else{
                let current_user = req.user;
                blogLike.findOne({
                    blog_id: blog_id,
                    user_id: current_user._id
                }).then(async(blog_like)=>{
                    try{
                        if(!blog_like){
                            let blogLikeDoc = new blogLike({
                                blog_id:blog_id,
                                user_id:current_user.id
                            })
                            
                            let likeBlog = await blogLikeDoc.save();
                            await Blog.updateOne({
                                _id:blog_id
                            },{
                                $push:{blog_likes:likeBlog._id}
                            })
                           return res.status(200).json('Like added!');
                        }else{
                           await blogLike.deleteOne({
                                _id:blog_like.id
                            })
                            await Blog.updateOne({
                                _id:blog_like.blog_id
                            },{
                                $pull:{blog_likes:likeBlog._id}
                            })
                            return res.status(200).json('successfully unliked the blog!');
                        }
                    }catch(error){
                        res.status(500).json({message:error.message})
                    }
                    
                }).catch((error)=>{
                    res.status(500).json({message:error.message})
                })
            }
        })
        
    }catch(error){
        res.status(500).json({message:error.message})
    }
})

module.exports = app;