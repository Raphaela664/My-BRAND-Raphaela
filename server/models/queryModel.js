const mongoose = require('mongoose')

const querySchema = mongoose.Schema(
    {
        name:{
            type: String,
            required:[true, "Your name"]
        },
        email:{
            type: String,
            required:[true,"Your email"]
        }
        ,
        message :{
            type: String,
            required:[true,"Your message"]
        }
    },
    {
        timestamps: true
    }
)

const Query = mongoose.model('Query', querySchema)
module.exports = Query;