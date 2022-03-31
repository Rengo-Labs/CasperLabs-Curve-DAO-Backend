var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const hourlyVolumeSchema = new Schema({

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

var hourlyVolume = mongoose.model("hourlyVolume", hourlyVolumeSchema);
module.exports = hourlyVolume;
