var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const removeLiquidityOneEventSchema = new Schema({

    id: {
        type:String
    },
    pool:{
        type:String
    },
    provider:{
        type:String
    },
    tokenAmounts: {
        type:String
    },
    coinAmounts:{
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

var removeLiquidityOneEvent = mongoose.model("removeLiquidityOneEvent", removeLiquidityOneEventSchema);
module.exports = removeLiquidityOneEvent;
