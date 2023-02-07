const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    if(req.user._id !== '63e1dfe2a456cf1669e06139'){
        return res.status(401).send('Access belongs to Admin')
    }
    next();
}