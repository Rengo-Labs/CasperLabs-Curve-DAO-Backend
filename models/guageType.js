var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const gaugeTypeSchema = new Schema({

    id:{
      type:String
    },
    name:{
      type:String
    },
    gaugeCount:{
      type:String
    },
    gauges:[{
        type:String
    }],
    weights:[{
        type:String
    }],
  
  
});

var gaugeType = mongoose.model("gaugeType", gaugeTypeSchema);
module.exports = gaugeType;
