var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const feeChangeLogSchema = new Schema({

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

var feeChangeLog = mongoose.model("feeChangeLog", feeChangeLogSchema);
module.exports = feeChangeLog;
