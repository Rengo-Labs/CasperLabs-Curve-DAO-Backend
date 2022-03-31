var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const poolEventSchema = new Schema({

    id: {
        type:String
    },
    pool:{
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
    Exchange: {
        type:String
    },
    AdminFeeChangelog: {
        type:String
    },
    AmplificationCoeffChangelog: {
        type:String
    },
    FeeChangelog: {
        type:String
    },
    TransferOwnershipEvent: {
        type:String
    },
    AddLiquidityEvent: {
        type:String
    },
    RemoveLiquidityEvent: {
        type:String
    },
    RemoveLiquidityOneEvent: {
        type:String
    },
});

var poolEvent = mongoose.model("poolEvent", poolEventSchema);
module.exports = poolEvent;
