var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const coinSchema = new Schema({

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
    underlying:{
        type:String
    },
    balance:{
        type:String
    },
    rate:{
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

var coin = mongoose.model("coin", coinSchema);
module.exports = coin;
