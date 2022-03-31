var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const exchangeSchema = new Schema({

    id: {
        type:String
    },
    pool:{
        type:String
    },
    buyer:  {
        type:String
    },
    receiver:  {
        type:String
    },
    tokenSold: {
        type:String
    },
    tokenBought: {
        type:String
    },
    amountSold: {
        type:String
    },
    amountBought:  {
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

var exchange = mongoose.model("exchange", exchangeSchema);
module.exports = exchange;
