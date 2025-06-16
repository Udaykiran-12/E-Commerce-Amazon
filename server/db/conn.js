const mongoose = require("mongoose");

const DB = process.env.DATABASE;

mongoose.connect(DB)
 .then(() =>{
    console.log("MongoDb connected succcesfully");
 })
 .catch((err) =>{
    console.log("error" + err.message);
 })