var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const contractSchema = new Schema({

    id:{
      type:String
    },
    description:{
      type:String
    },
    added:{
        type:String
    },
    addedAtBlock:{
        type:String
    },
    addedAtTransaction:{
        type:String
    },
    modified:{
        type:String
    },
    modifiedAtBlock:{
        type:String
    },
    modifiedAtTransaction:{
        type:String
    },
    versions:[{
        type:String
    }],
  
});

var contract = mongoose.model("contract", contractSchema);
module.exports = contract;
