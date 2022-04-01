var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const gaugeLiquiditySchema = new Schema({

    id:{
      type:String
    },
    user:{
      type:String
    },
    gauge:{
        type:String
    },
    originalBalance:{
        type:String
    },
    originalSupply:{
        type:String
    },
    workingBalance:{
        type:String
    },
    workingSupply:{
        type:String
    },
    timestamp:{
        type:String
    },
    block:{
        type:String
    },
    transaction:{
        type:String
    },
  
});

var gaugeLiquidity = mongoose.model("gaugeLiquidity", gaugeLiquiditySchema);
module.exports = gaugeLiquidity;
