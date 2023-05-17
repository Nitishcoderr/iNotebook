// establishing mongodb server
const mongoose = require('mongoose');

const mongoURI = "mongodb://127.0.0.1:27017/inotebook?directConnection=true";

connectToMongo().catch(err => console.log(err));

async function connectToMongo() {
  await mongoose.connect(mongoURI);

  console.log("Mongo connected");
}

module.exports = connectToMongo;