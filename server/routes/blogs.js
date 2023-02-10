const app = require('express').Router();
const BlogComment = require('../models/blogCommentModel')
const mongoose = require("mongoose");
const Blog = require('../models/blogModel');
const blogLike = require('../models/blogLikeModel');
const verify = require('./verifyToken');
const isAdmin = require('./isAdmin');
app.post('/newblog', verify,isAdmin, async(req,res)=>{
    try{
        const blog = await Blog.create(req.body)
        res.status(200).json(blog);
    }catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})
app.get('/All',/*verify*/async(req,res)=>{
    try{

        const blogs = await Blog.find({})
        res.status(200).json(blogs);
    }catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.get("/viewblog/:id",/*verify*/async(req,res)=>{
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

app.post("/viewblog/like/:blog_id",verify,async(req,res)=>{
    try{
        const {blog_id} = req.params;
       await Blog.findOne({_id:blog_id}).then(async(blog)=>{
            if(!blog){
                return res.status(500).json({message:'No blog found'})
                
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
                                user_id:current_user._id
                            })
                            
                            let likeBlog = await blogLikeDoc.save();
                            await Blog.updateOne({
                                _id:blog_id
                            },{
                                $push:{blog_likes:likeBlog.user_id}
                            })
                           return res.status(200).json('Like added!');
                        }else{
                           await blogLike.deleteOne({
                                _id:blog_like._id
                            })
                            await Blog.updateOne({
                                _id:blog_like.blog_id
                            },{
                                $pull:{blog_likes:blog_like.user_id}
                            })
                            return res.status(200).json('Like removed');
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


app.post('/comments/create/:id',verify,(req,res)=>{
    const {id} = req.params;
    Blog.findOne({_id:id}).then(async(blog)=>{
        if(!blog){
            return res.status(500).json({message:'No blog found'})
        }else{
            try{
                let  newCommentDoc = new BlogComment({
                    comment: req.body.comment,
                    blog_id: blog._id,
                    user_id:req.user._id
                })

                let commentData= await newCommentDoc.save();
                await Blog.updateOne(
                    {_id:blog._id},
                    {$push:{ blog_comments:commentData.comment}}
    
                )
                return res.status(200).json(commentData);
            } catch(error){
                res.status(500).json({message:error.message})
            }
            
        } 
    }).catch((error)=>{
        res.status(500).json({message:error.message})
    })
   
})
    
app.delete('/comments/delete/:comment_id',verify,isAdmin,async(req,res)=>{
    try{

        const {comment_id} = req.params;
        const blogcom = await BlogComment.findByIdAndDelete(comment_id);
        if(!blogcom){
            return res.status(404).json({message: `comment with ID: ${comment_id} was not found`})
        }else{
            
            await Blog.updateOne({
                _id:blogcom.blog_id
            },{
                $pull:{ blog_comments: blogcom.comment}
            })
        }
        res.status(200).json(blogcom);
    }catch(error){
        res.status(500).json({message:error.message})
    }
})




module.exports = app;