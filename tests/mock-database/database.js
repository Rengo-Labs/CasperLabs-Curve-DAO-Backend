/* src/database.js */

const mongoose = require('mongoose');
const { MongoMemoryReplSet } = require('mongodb-memory-server');
const fs =require("fs");

async function startReplicaSet() {
    
try{ 
  let connectionString;
  if(fs.existsSync("mongoConnectionString.txt"))
    connectionString =  fs.readFileSync('mongoConnectionString.txt').toString();
  else
fs.writeFileSync('mongoConnectionString.txt', ""); 
  
      
      if(connectionString){
        // fs.writeFileSync('mongoConnectionString.txt', ""); 
        fs.unlink("mongoConnectionString.txt", (err => {
          if (err) console.log(err);
          else {
            console.log("\nDeleted file: example_file.txt");
          }
        }));
        return await mongoose.connect(connectionString);
      }
      
      let mongoReplicaSet = await MongoMemoryReplSet.create({ replSet: { count: 2 } });
      let mongoDBURL = await mongoReplicaSet.getUri();
      fs.writeFileSync('mongoConnectionString.txt', mongoDBURL); 
      await mongoose.connect(mongoDBURL);
      return mongoReplicaSet;
    }catch(err){
      console.log(err);
    }
}

module.exports = {
  startReplicaSet,
};