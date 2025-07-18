
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = require('./db');
 require('dotenv').config();
 const bodyParser = require('body-parser');
 app.use(bodyParser.json());
//  const Person = require('./models/person');

 
 
//  const LocalStrategy = require('passport-local').Strategy;
 const passport = require('./auth');
 

 const logRequest = (req,res,next)=>{
  console.log(`[${new Date().toLocaleString()}] Request Made to:${req.originalUrl}`);
  next();
 }
 app.use(logRequest);
 app.get('/',function(req, res) {
  res.send('🚀 Welcome to Node Hotel API!');
});
 
passport.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local',{session:false});
 
//authentication logic here
 

const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');
app.use('/person',localAuthMiddleware,personRoutes);
app.use('/menu',menuItemRoutes);
const PORT = process.env.PORT||3000;
app.listen(PORT,()=> {
    console.log('served started succesfully');
});
