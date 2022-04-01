var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const accountSchema = new Schema({

    id:{
      type:String
    },
    address:{
      type:String
    },
    gauges:[{
        type:String
    }],
    gaugeWeightVotes:[{
        type:String
    }],
    proposals:[{
        type:String
    }],
    proposalVotes:[{
        type:String
    }],
  
});

var account = mongoose.model("account", accountSchema);
module.exports = account;
