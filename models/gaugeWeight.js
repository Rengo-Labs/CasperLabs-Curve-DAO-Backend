var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const gaugeWeightSchema = new Schema({

    id:{
      type:String
    },
    gauge:{
      type:String
    },
    time:{
        type:String
    },
    weight:{
        type:String
    },
    block:{
      type:String
    },
});

var gaugeWeight = mongoose.model("gaugeWeight", gaugeWeightSchema);
module.exports = gaugeWeight;
