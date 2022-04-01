var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const contractVersionSchema = new Schema({

    id:{
      type:String
    },
    contract:{
      type:String
    },
    address:{
        type:String
    },
    version:{
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
  
});

var contractVersion = mongoose.model("contractVersion", contractVersionSchema);
module.exports = contractVersion;
