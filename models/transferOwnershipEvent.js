var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const transferOwnershipEventSchema = new Schema({

    id: {
        type:String
    },
    pool:{
        type:String
    },
    newAdmin: {
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

var transferOwnershipEvent = mongoose.model("transferOwnershipEvent", transferOwnershipEventSchema);
module.exports = transferOwnershipEvent;
