var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const systemStateSchema = new Schema({

    id:{
      type:String
    },
    registryContract:{
      type:String
    },
    contractCount:{
        type:String
    },
    gaugeCount:{
        type:String
    },
    gaugeTypeCount:{
        type:String
    },
    poolCount:{
        type:String
    },
    tokenCount:{
        type:String
    },
    totalPoolCount:{
        type:String
    },
    updated:{
        type:String
    },
    updatedAtBlock:{
        type:String
    },
    updatedAtTransaction:{
        type:String
    },
  
});

var systemState = mongoose.model("systemState", systemStateSchema);
module.exports = systemState;
