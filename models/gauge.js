var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const gaugeSchema = new Schema({

    id:{
      type:String
    },
    address:{
      type:String
    },
    type:{
        type:String
    },
    pool:{
        type:String
    },
    created:{
        type:String
    },
    createdAtBlock:{
        type:String
    },
    createdAtTransaction:{
        type:String
    },
    weights:[{
        type:String
    }],
    weightVotes:[{
        type:String
    }],
});

var gauge = mongoose.model("gauge", gaugeSchema);
module.exports = gauge;
