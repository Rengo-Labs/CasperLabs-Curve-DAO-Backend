const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
  } = require("graphql");
  
const poolType = new GraphQLObjectType({
    name: "Pool",
    description: "Pool type",
    fields: () => ({
        _id: {type: GraphQLID },
        //Pool address
        id: {type:GraphQLString},
    
        //Pool's human-readable name
        name: {type:GraphQLString},
    
        //Reference asset type
        assetType: {type:GraphQLString},
    
        //Identify whether pool is a metapool 
        isMeta:  {type:GraphQLBoolean},
    
        //Registry contract address from where this pool was registered "
        registryAddress: {type:GraphQLString},
    
        //Swap contract address
        swapAddress: {type:GraphQLString},
    
        // Address of the token representing LP share
        lpToken: {type:GraphQLString},
        // Number of coins composing the pool
        coinCount: {type:GraphQLString},
    
        // List of the swappable coins within the pool
        coins: {type: GraphQLList(GraphQLString)},
    
        // Number of underlying coins composing the pool
        underlyingCount: {type:GraphQLString},
    
        // List of the swappable underlying coins within the pool
        underlyingCoins: {type: GraphQLList(GraphQLString)},
    
        // #
        // # Parameters
        // #
    
        // Amplification coefficient multiplied by n * (n - 1)
        A: {type:GraphQLString},
    
        // Fee to charge for exchanges
        fee: {type:GraphQLString},
    
        // Admin fee is represented as a percentage of the total fee collected on a swap
        adminFee: {type:GraphQLString},
    
        // Admin address
        owner: {type:GraphQLString},

        //Average dollar value of pool token 
        virtualPrice:{type:GraphQLString},
    
        locked: {type:GraphQLString},
    
        addedAt: {type:GraphQLString},
        addedAtBlock: {type:GraphQLString},
        addedAtTransaction: {type:GraphQLString},
    
        removedAt: {type:GraphQLString},
        removedAtBlock: {type:GraphQLString},
        removedAtTransaction: {type:GraphQLString},
    
        events: {type: GraphQLList(GraphQLString)},
    
        exchangeCount: {type:GraphQLString},
    
        exchanges: {type: GraphQLList(GraphQLString)},
    
        gaugeCount: {type:GraphQLString},
    
        //List of gauge contracts associated with the pool
        gauges: {type: GraphQLList(GraphQLString)},
    
        //Cumulative hourly trade volume
        hourlyVolumes: {type: GraphQLList(GraphQLString)},
    
        //Cumulative daily trade volume
        dailyVolumes: {type: GraphQLList(GraphQLString)},
    
        //Cumulative weekly trade volume
        weeklyVolumes: {type: GraphQLList(GraphQLString)}
 
    })
});
  
module.exports = { poolType };
