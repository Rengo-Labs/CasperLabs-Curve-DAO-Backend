var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const underlyingCoinSchema = new Schema({

    id:{
      type:String
    },
    index:{
      type:String
    },
    pool:{
        type:String
    },
    token:{
        type:String
    },
    coin:{
        type:String
    },
    balance:{
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

var underlyingCoin = mongoose.model("underlyingCoin", underlyingCoinSchema);
module.exports = underlyingCoin;
