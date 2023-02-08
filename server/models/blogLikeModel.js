const mongoose = require('mongoose')

const blogLikeSchema = mongoose.Schema(
    {
        blog_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Blog'
            
        },
        user_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
        ,
        
    },
    {
        timestamps: true
    }
)

const BlogLike = mongoose.model('BlogLike', blogLikeSchema)
module.exports = BlogLike;