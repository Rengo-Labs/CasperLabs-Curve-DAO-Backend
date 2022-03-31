var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const poolSchema = new Schema({

    //Pool address
    id: {
        type:String
    },
  
    //Pool's human-readable name
    name: {
        type:String
    },
  
    //Reference asset type
    assetType: {
        type:String
    },
  
    //Identify whether pool is a metapool 
    isMeta:  {
        type:Boolean
    },
  
    //Registry contract address from where this pool was registered "
    registryAddress: {
        type:String
    },
  
    //Swap contract address
    swapAddress: {
        type:String
    },
  
    // Address of the token representing LP share
    lpToken: {
        type:String
    },
    // Number of coins composing the pool
    coinCount: {
        type:String
    },
  
    // List of the swappable coins within the pool
    coins: [{
        type:String
    }],
  
    // Number of underlying coins composing the pool
    underlyingCount: {
        type:String
    },
  
    // List of the swappable underlying coins within the pool
    underlyingCoins: [{
        type:String
    }],
  
    // #
    // # Parameters
    // #
  
    // Amplification coefficient multiplied by n * (n - 1)
    A: {
        type:String
    },
  
    // Fee to charge for exchanges
    fee: {
        type:String
    },
  
    // Admin fee is represented as a percentage of the total fee collected on a swap
    adminFee: {
        type:String
    },
  
    // Admin address
    owner: {
        type:String
    },

    //Average dollar value of pool token 
    virtualPrice:{
        type:String
    },
  
    locked: {
        type:String
    },
  
    addedAt: {
        type:String
    },
    addedAtBlock: {
        type:String
    },
    addedAtTransaction: {
        type:String
    },
  
    removedAt: {
        type:String
    },
    removedAtBlock: {
        type:String
    },
    removedAtTransaction: {
        type:String
    },
  
    events: [{
        type:String
    }], 
  
    exchangeCount: {
        type:String
    },
  
    exchanges: [{
        type:String
    }] ,
  
    gaugeCount: {
        type:String
    },
  
    //List of gauge contracts associated with the pool
    gauges: [{
        type:String
    }] ,
  
    //Cumulative hourly trade volume
    hourlyVolumes: [{
        type:String
    }],
  
    //Cumulative daily trade volume
    dailyVolumes: [{
        type:String
    }] ,
  
    //Cumulative weekly trade volume
    weeklyVolumes: [{
        type:String
    }]
  
});

var pool = mongoose.model("pool", poolSchema);
module.exports = pool;
