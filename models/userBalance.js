var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userBalanceSchema = new Schema({

    id:{
      type:String
    },
    startTx:{
      type:String
    },
    user:{
        type:String
      },
      CRVLocked:{
        type:String
    },
    lock_start:{
        type:String
    },
    unlock_time : {type:String},
    weight : {type:String},
});

var userBalance = mongoose.model("userBalance", userBalanceSchema);
module.exports = userBalance;
