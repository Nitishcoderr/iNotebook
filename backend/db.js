// establishing mongodb server
const mongoose = require('mongoose');

// For mongo compass
// const mongoURI = "mongodb://127.0.0.1:27017/inotebook?directConnection=true"; 
// for mongo atlas
const mongoURI = "mongodb+srv://nitishcoderr:Nitish25@cluster0.icw48xp.mongodb.net/";

connectToMongo().catch(err => console.log(err));

async function connectToMongo() {
  await mongoose.connect(mongoURI);

  console.log("Mongo connected");
}

module.exports = connectToMongo;