var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const tradeVolumeSchema = new Schema({

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
    HourlyVolume: {
        type:String
    },
    DailyVolume: {
        type:String
    },
    WeeklyVolume:{
        type:String
    },
  
});

var tradeVolume = mongoose.model("tradeVolume", tradeVolumeSchema);
module.exports = tradeVolume;
