const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    if(req.user._id !== '63ef7ecb81ce07bf6698c2de'){
        return res.status(401).send('Access belongs to Admin')
    }
    next();
}