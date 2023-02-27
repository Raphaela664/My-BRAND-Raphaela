const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    if(req.user._id !== '63fc3d1642046d6b9fa5212a' || req.user._id ){
        return res.status(401).send('You should either be admin or the owner')
    }
    next();
}