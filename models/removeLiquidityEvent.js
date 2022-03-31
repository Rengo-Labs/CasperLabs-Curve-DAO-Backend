var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const removeLiquidityEventSchema = new Schema({

    id: {
        type:String
    },
    pool:{
        type:String
    },
    provider:{
        type:String
    },
    tokenAmounts: [{
        type:String
    }],
    fees: [{
        type:String
    }],
    invariant: {
        type:String
    },
    tokenSupply: {
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

var removeLiquidityEvent = mongoose.model("removeLiquidityEvent", removeLiquidityEventSchema);
module.exports = removeLiquidityEvent;
