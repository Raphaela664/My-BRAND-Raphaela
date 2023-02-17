const app = require('express').Router();
const Query = require('../models/queryModel')
const verify = require('./verifyToken');
const isAdmin = require('./isAdmin')
app.get('/queriesList', verify,isAdmin, async(req, res)=>{
    try{
        const queries = await Query.find({})
        res.status(200).json(queries);
    }catch(error){
        res.status(500).json({message:error.message})
    }
})
app.get("/viewQuery/:id", verify,isAdmin, async(req,res)=>{
    try{
        const {id} = req.params;
        const query = await Query.findById(id)
        res.status(200).json(query);
    }catch(error){
        res.status(500).json({message:error.message})
    }
   
})

app.delete("/deleteQuery/:id", verify,isAdmin, async(req,res)=>{
    try{
        const {id} = req.params;
        const query = await Query.findByIdAndDelete(id);
        if(!query){
            return res.status(404).json({message: `The message with ID: ${id} was not found`})
        }
        res.status(200).json(query);
    }catch(error){
        res.status(500).json({message:error.message})
    }
})
app.post('/SendQuery', async(req,res)=>{
    try{
        const query = await Query.create(req.body)
        res.status(200).json(query);
    }catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})



module.exports = app;