


//---creating my own server-------------------
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = require('./db');
//const menuItem = require('./menuItem');

 const Person = require('./person');
 const bodyParser = require('body-parser');
 app.use(bodyParser.json());



app.post('/person',async(req,res)=>{
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

// app.get('/person',async(req,res)=>{
//     try{
//         const data = await savedPerson.find();
//         console.log('data fetched');
//         res.status(200).json(data);
//     }catch(err){
//         console.log(err);
//         res.status(500).json({error:'Invalid server error'});
//     }
// })

// app.post('/menu',async(req,res) =>{
//     try{
//         const data = req.body;
//         const newMenu = new menuItem(data);
//         const response = await newMenu.save();
//         console.log('data savede in menu');
//         res.status(200).json(response);
//     }
//     catch(err){
//         console.log(err);
//         res.status(500).json({error:'Internal server error'});
//     }
// })

//------parametrised api
// app.get('/menu/:taste/',async(req,res)=>{
//  try{
//     const taste = req.params.taste;
//     if(taste=='Sweet' || taste=='Sour' || taste=='Spicy'){
//         const response = await menuItem.find({taste:taste});
//         res.status(200).json(response);
//     }
//     else{
//         res.status(404).json({error:'invalid work'});
//     }
//  } 
//  catch(err){
//     console.log(err);
//     res.status(500).json({error:'Internal server error'});
//  }
// })

app.get('/person',async(req,res)=>{
    try{
        const data = await Person.find();
        console.log('Data fetched');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Invalid server error'});
    }
});

// 
//   app.put('/person/:id', async (req, res) => {
//  try {
//  const personId = req.params.id; 
 
//  const updatedPersonData = req.body; 
//  // Assuming you have a Person model
//  const updatedPerson = await Person.findByIdAndUpdate(personId, updatedPersonData, {
//  new: true, 
//  runValidators: true, 
// });
//  if (!updatedPerson) {
//  return res.status(404).json({ error: 'Person not found'
//  });
//  }
//  // Send the updated person data as a JSON response
//  res.json(updatedPerson);
//  } catch (error) {
//  console.error('Error updating person:', error);
//  res.status(500).json({ error: 'Internal server error' });
//  }
//  });


 //--delete crud
 app.delete('/person/:id', async (req, res) => {
 try {
 const personId = req.params.id; 
 
const deletedPerson = await Person.findByIdAndRemove(personId);
 if (!deletedPerson) {
 return res.status(404).json({ error: 'Person not found' });
 }
 
 res.json({ message: 'Person deleted successfully' });
 } catch (error) {
 console.error('Error deleting person:', error);
 res.status(500).json({ error: 'Internal server error' });
 }
 })

app.listen(3000,()=> {
    console.log('served started succesfully')
});