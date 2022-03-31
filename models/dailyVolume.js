var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const dailyVolumeSchema = new Schema({

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

var dailyVolume = mongoose.model("dailyVolume", dailyVolumeSchema);
module.exports = dailyVolume;
