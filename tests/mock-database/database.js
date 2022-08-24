/* src/database.js */

const mongoose = require('mongoose');
const { MongoMemoryReplSet } = require('mongodb-memory-server');
const fs =require("fs");
let mongoReplicaSet;

async function startDatabase() {
    
try{ 
  let connectionString;
  if(fs.existsSync("mongoConnectionString.txt"))
    connectionString =  fs.readFileSync('mongoConnectionString.txt').toString();
  else
fs.writeFileSync('mongoConnectionString.txt', ""); 
  
      
      if(connectionString){
        fs.writeFileSync('mongoConnectionString.txt', ""); 
        return await mongoose.connect(connectionString);
      }
      
      mongoReplicaSet = await MongoMemoryReplSet.create({ replSet: { count: 2 } });
      let mongoDBURL = await mongoReplicaSet.getUri();
      fs.writeFileSync('mongoConnectionString.txt', mongoDBURL); 
     return await mongoose.connect(mongoDBURL);
    }catch(err){
      console.log(err);
    }
}

async function stopDatabase() {
  await mongoReplicaSet.stop();
}

module.exports = {
  startDatabase,
  stopDatabase,
};