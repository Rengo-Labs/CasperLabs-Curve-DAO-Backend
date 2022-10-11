var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userBalanceSchema = new Schema({

    id:{
      type:String
    },
    user:{
      type:String
    },
    CRVLocked:{
      type:String
    },
    unlock_time : {
      type:String
    },
});

var userBalance = mongoose.model("userBalance", userBalanceSchema);
module.exports = userBalance;
