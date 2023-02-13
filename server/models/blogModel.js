const mongoose = require('mongoose');
const { countDocuments } = require('./blogLikeModel');
const BlogLike = require('./blogLikeModel');
const BlogComment = require('./blogCommentModel');
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
        blog_likes:[{type:mongoose.Schema.Types.ObjectId, ref: BlogLike}],
        blog_comments:[{type:mongoose.Schema.Types.Mixed }]
        

    },
    
    {
        timestamps: true
    }
)

const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog;