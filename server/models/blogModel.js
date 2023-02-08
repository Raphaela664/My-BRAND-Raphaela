const mongoose = require('mongoose');
const BlogLike = require('./blogLikeModel');

const blogSchema = mongoose.Schema(
    {
        title:{
            type: String,
            required:[true, "Add Blog Title"]
        },
        image:{
            type: String,
            required:[true]
        }
        ,
        blogContent :{
            type: String,
            required:[true,"Add some Blog Content"]
        },
        blog_likes:[{type:mongoose.Schema.Types.ObjectId,ref: BlogLike}]
    },
    
    {
        timestamps: true
    }
)

const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog;