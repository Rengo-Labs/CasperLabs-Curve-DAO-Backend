var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const gaugeWithdrawSchema = new Schema({

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
  
});

var gaugeWithdraw = mongoose.model("gaugeWithdraw", gaugeWithdrawSchema);
module.exports = gaugeWithdraw;
