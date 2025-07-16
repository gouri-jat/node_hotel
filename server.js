
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = require('./db');
 require('dotenv').config();
 const bodyParser = require('body-parser');
 app.use(bodyParser.json());

 const logRequest = (req,res,next)=>{
  console.log(`[${new Date().toLocaleString()}] Request Made to:${req.originalUrl}`);
  next();
 }

 const passport = require('passport');
 const LocalStrategy = require('passport-local').Strategy;

 app.use(logRequest);
 app.get('/', passport.authenticate('local',{session:false}),(req, res)=> {
  res.send('🚀 Welcome to Node Hotel API!');
});
 
passport.use(passport.initialize());
//authentication logic here
passport.use(new LocalStrategy(async({USERNAME},password,done)=>{
  try{
    console.log('Received credentials: ',USERNAME,password);
    const user = await Person.findOne({username:USERNAME});
    if(!user)
      return done(null,false,{message:'Incorrect username.'});
    const isPasswordMatch = user.password === password ? true:false;
    if(isPasswordMatch){
      return done(null,user);
    }else{
      return done(null,false,{message:'Incorrect password'});
    }
  } catch(err){
    return done(err);
  }
}));

const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');
app.use('/person',personRoutes);
app.use('/menu',menuItemRoutes);
const PORT = process.env.PORT||3000;
app.listen(PORT,()=> {
    console.log('served started succesfully')
});
