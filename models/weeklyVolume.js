var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const weeklyVolumeSchema = new Schema({

    id: {
        type:String
    },
    pool:{
        type:String
    },
    timestamp: {
        type:String
    },
    volume: {
        type:String
    },
    TradeVolume: {
        type:String
    },
  
});

var weeklyVolume = mongoose.model("weeklyVolume", weeklyVolumeSchema);
module.exports = weeklyVolume;
