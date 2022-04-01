var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const gaugeTypeWeightSchema = new Schema({

    id:{
      type:String
    },
    type:{
      type:String
    },
    time:{
        type:String
    },
    weight:{
        type:String
    },
  
});

var gaugeTypeWeight = mongoose.model("gaugeTypeWeight", gaugeTypeWeightSchema);
module.exports = gaugeTypeWeight;
