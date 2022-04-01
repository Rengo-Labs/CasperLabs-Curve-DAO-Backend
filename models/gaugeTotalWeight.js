var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const gaugeTotalWeightSchema = new Schema({

    id:{
      type:String
    },
    time:{
        type:String
    },
    weight:{
        type:String
    },
  
});

var gaugeTotalWeight = mongoose.model("gaugeTotalWeight", gaugeTotalWeightSchema);
module.exports = gaugeTotalWeight;
