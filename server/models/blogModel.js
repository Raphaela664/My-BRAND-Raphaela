const mongoose = require('mongoose')

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
        }
    },
    {
        timestamps: true
    }
)

const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog;