const express = require("express");
const mongoose = require("mongoose");
const Query = require('./models/queryModel')
const app = express()

app.use(express.json());
mongoose.set("strictQuery", false)
mongoose.connect("mongodb://127.0.0.1:27017/brandDB",{
    useNewUrlParser:true, useUnifiedTopology:true
},(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("successfully connected")
    }
})
app.get('/',(req,res)=>{
    res.send('Hello NODE API')
})
app.get('/blog',(req,res)=>{
    res.send('Hello Blog')
})
app.get('/queries', async(req, res)=>{
    try{
        const queries = await Query.find({})
        res.status(200).json(queries);
    }catch(error){
        res.status(500).json({message:error.message})
    }
})
app.get("/queries/:id", async(req,res)=>{
    try{
        const {id} = req.params;
        const query = await Query.findById(id)
        res.status(200).json(query);
    }catch(error){
        res.status(500).json({message:error.message})
    }
   
})

app.delete("/queries/:id", async(req,res)=>{
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
app.post('/queries', async(req,res)=>{
    try{
        const query = await Query.create(req.body)
        res.status(200).json(query);
    }catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})
app.listen(3000,()=>{
    console.log('on port 3000')
})