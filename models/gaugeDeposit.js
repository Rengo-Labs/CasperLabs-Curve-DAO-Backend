var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const gaugeDepositSchema = new Schema({

    id:{
      type:String
    },
    gauge:{
      type:String
    },
    provider:{
        type:String
    },
    value:{
        type:String
    },
    block:{
      type:String
  },
});

var gaugeDeposit = mongoose.model("gaugeDeposit", gaugeDepositSchema);
module.exports = gaugeDeposit;
