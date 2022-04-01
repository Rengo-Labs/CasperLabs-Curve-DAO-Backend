var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const tokenSchema = new Schema({

    id:{
      type:String
    },
    address:{
      type:String
    },
    decimals:{
      type:String
    },
    name:{
        type:String
    },
    symbol:{
        type:String
    },
    pools:[{
          type:String
    }],
    coins:[{
        type:String
    }],
    underlyingCoins:[{
        type:String
    }],
  
  
});

var token = mongoose.model("token", tokenSchema);
module.exports = token;
