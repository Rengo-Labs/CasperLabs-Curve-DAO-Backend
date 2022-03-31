var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const adminFeeChangeLogSchema = new Schema({

    id: {
        type:String
    },
    pool:{
        type:String
    },
    value: {
        type:String
    },
    block: {
        type:String
    },
    timestamp: {
        type:String
    },
    transaction: {
        type:String
    },
    PoolEvent: {
        type:String
    },
    
});

var adminFeeChangeLog = mongoose.model("adminFeeChangeLog", adminFeeChangeLogSchema);
module.exports = adminFeeChangeLog;
