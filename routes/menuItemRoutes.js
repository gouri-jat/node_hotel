const express = require('express');
const router = express.Router();
const menuItem = require('../models/menuItem');

router.post('/',async(req,res) =>{
    try{
        const data = req.body;
        const newMenu = new menuItem(data);
        const response = await newMenu.save();
        console.log('data savede in menu');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
});

router.get('/',async(req,res)=>{
    try{
        const data = await menuItem.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Invalid server error'});
    }
});

router.get('/:tasteType/',async(req,res)=>{
 try{
    const tasteType = req.params.tasteType;
    if(tasteType=='Sweet' || tasteType=='Sour' || tasteType=='Spicy'){
        const response = await menuItem.find({taste:tasteType});
        res.status(200).json(response);
    }
    else{
        res.status(404).json({error:'invalid work'});
    }
 } 
 catch(err){
    console.log(err);
    res.status(500).json({error:'Internal server error'});
 }
});

module.exports = router;