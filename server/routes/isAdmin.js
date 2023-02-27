const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    if(req.user._id !== '63fc3d1642046d6b9fa5212a'){
        return res.status(401).send('Access belongs to Admin')
    }
    next();
}