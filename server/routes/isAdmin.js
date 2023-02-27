const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    if(req.user._id !== 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2ZjM2QxNjQyMDQ2ZDZiOWZhNTIxMmEiLCJpYXQiOjE2Nzc0NzUyNTB9.qF40F1DRBTABFNPDDDU3-MweJZU_d_k663OsUFSJ_70'){
        return res.status(401).send('Access belongs to Admin')
    }
    next();
}