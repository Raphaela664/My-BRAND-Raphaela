const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    if(req.user._id !== '63e1dfe2a456cf1669e06139' || req.user._id ){
        return res.status(401).send('You should either be admin or the owner')
    }
    next();
}