 
const mongoose  = require('mongoose');

//const mongoURL = 'mongodb://localhost:27017/hotel'
const mongodb = process.env.MONGODB_URI;

mongoose.connect(mongodb)
  .then(() => console.log("✅ Connected to MongoDB Server"))
  .catch((err) => console.error("❌ MongoDB Connection error:", err));


const db = mongoose.connection;
db.on('connected',()=>{
    console.log("connected to MongoDB Server");
})

db.on('error',(err)=>{
    console.log("MongoDB Connection error: ",err);
})

db.on('disconnected',()=>{
    console.log("MongoDB  Disconnected");
})

module.exports = db;