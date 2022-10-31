/* src/database.js */

const mongoose = require('mongoose');
const { MongoMemoryReplSet } = require('mongodb-memory-server');
const fs =require("fs");
const eventsData = require('../../models/eventsData');

async function startReplicaSet() {
  try{ 
    let mongoReplicaSet = await MongoMemoryReplSet.create({ replSet: { count: 2 } });
    let mongoDBURL = await mongoReplicaSet.getUri();
    fs.writeFileSync('mongoTestConnectionString.txt', mongoDBURL); 
    await mongoose.connect(mongoDBURL);
    
    await eventsData.create({
      _id : "635fb3b4a89eacba3cd149a5",
      status : ""
    });
    return mongoReplicaSet;
  }catch(err){
    console.log(err);
  }
}

async function connectReplicaSet(){
  let connectionString;
  if(fs.existsSync("mongoTestConnectionString.txt"))
  connectionString =  fs.readFileSync('mongoTestConnectionString.txt').toString();
  return await mongoose.connect(connectionString);
}


module.exports = {
  startReplicaSet,connectReplicaSet
};