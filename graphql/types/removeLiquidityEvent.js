const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLBoolean,
  } = require("graphql");
  
const removeLiquidityEventType = new GraphQLObjectType({
    name: "removeLiquidityEvent",
    description: "removeLiquidityEvent type",
    fields: () => ({
        _id: {type: GraphQLID },
        id: {type:GraphQLString},
        pool:{type:GraphQLString},
        provider:{type:GraphQLString},
        tokenAmounts: {type: GraphQLList(GraphQLString)},
        fees: {type: GraphQLList(GraphQLString)},
        invariant: {type:GraphQLString},
        tokenSupply: {type:GraphQLString},
        block: {type:GraphQLString},
        timestamp: {type:GraphQLString},
        transaction: {type:GraphQLString},
        PoolEvent: {type:GraphQLString},
    })
});
  
module.exports = { removeLiquidityEventType };
  