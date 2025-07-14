
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = require('./db');
 require('dotenv').config();
 const bodyParser = require('body-parser');
 app.use(bodyParser.json());

 app.get('/', (req, res) => {
  res.send('🚀 Welcome to Node Hotel API!');
});


const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');
app.use('/person',personRoutes);
app.use('/menu',menuItemRoutes);
const PORT = process.env.PORT||3000;
app.listen(PORT,()=> {
    console.log('served started succesfully')
});