var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const lpTokenSchema = new Schema({

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
    gauge:{
        type:String
    },
    pool:{
        type:String
    },
  
});

var lpToken = mongoose.model("lpToken", lpTokenSchema);
module.exports = lpToken;
