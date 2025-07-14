const express = require('express');
const router = express.Router();

const Person = require('../models/person');

router.post('/',async(req,res)=>{
    try{
        const newPerson = req.body;
        const savedPerson = new Person(newPerson);
        const saved2Person  = await savedPerson.save();
        console.log('Saved person to database');
        res.status(201).json(saved2Person);

    }catch(err){
        console.log('Error in saving person: ',err);
        res.status(500).json({err : 'Internal server error'});
    }
});

router.get('/',async(req,res)=>{
    try{
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Invalid server error'});
    }
});

router.get('/:workType/',async(req,res)=>{
 try{
    const workType = req.params.workType;
    if(workType=='chef' || workType=='waiter' || workType=='manager'){
        const response = await Person.find({work:workType});
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
