var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const votingPowerSchema = new Schema({

    id:{
      type:String
    },
    power:{
      type:String
    },
    block:{
      type:String
    },
});

var votingPower = mongoose.model("votingPower", votingPowerSchema);
module.exports = votingPower;
