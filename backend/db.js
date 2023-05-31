// establishing mongodb server
const mongoose = require('mongoose');
require('dotenv').config();

// For mongo compass
// const mongoURI = "mongodb://127.0.0.1:27017/inotebook?directConnection=true"; 
// for mongo atlas
const mongoURI = process.env.MONGODB_COMPASS;


connectToMongo().catch(err => console.log(err));

async function connectToMongo() {
  await mongoose.connect(mongoURI);

  console.log("Mongo connected");
}

module.exports = connectToMongo;