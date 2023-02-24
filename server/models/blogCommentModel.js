
const mongoose = require('mongoose')
const blogCommentSchema = mongoose.Schema(
    {
        comment:{
            type: String,
            required:[true]
        },
        blog_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Blog'
            
        },
        user_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        date:{
            type: Date,
            default: Date.now
        }
        
        
    },
    {
        timestamps: true
    }
)

const BlogComment = mongoose.model('BlogComment', blogCommentSchema)
module.exports = BlogComment;