const router = require('express').Router();
const User = require('../models/userModel');
const jwt = require('jsonwebtoken')
const {registerValidation, loginValidation} = require('../routes/validation')
const bcrypt = require('bcryptjs');
const isAdmin = require('./isAdmin');
const verify = require('./verifyToken');

router.post('/register', async(req, res)=>{

    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message)
    const emailExist = await User.findOne({email: req.body.email})
    const usernameExist = await User.findOne({username: req.body.username})
    if(emailExist){
        return res.status(500).send('Email already exists')
    }
    if(usernameExist){
        return res.status(500).send('Username already taken')
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    // create new user
    const user = new User({
        username: req.body.username,
        email:req.body.email,
        password: hashedPassword
    });
    try{
        const savedUser = await user.save();
        res.send({user: user._id, username: user.username, email: user.email});
    }catch(error){
        res.status(500).send(error)
}
});

router.post('/login', async(req,res)=>{

        const {error} = loginValidation(req.body);
        if(error) return res.status(500).send(error.details[0].message)
        const user = await User.findOne({username: req.body.username})
        if(!user){
                return  res.status(500).send('Wrong Email/Password combination')
        }
        const validPass = await bcrypt.compare(req.body.password, user.password)
        if(!validPass){
                return  res.status(500).send('Invalid Password')
        }
        //create and assigning token
        const token = jwt.sign({ _id: user._id}, process.env.secret_token )
        res.header('bearer-token', token).json(token)

        
});



router.get('/login/admin/listOfUsers',verify,isAdmin, async(req,res)=>{
    try{
        const users = await User.find({})
        res.status(200).json(users)
    }catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})



router.delete('/login/admin/deleteUser/:id',verify,isAdmin,async(req,res)=>{
    try{
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        if(!user){
            return res.status(404).json({message: `User with ID: ${id} doesn't exist`})
        }
        res.status(200).json(user);
    }catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})
module.exports = router;