const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLBoolean,
  } = require("graphql");
  
const removeLiquidityOneEventType = new GraphQLObjectType({
    name: "removeLiquidityOneEvent",
    description: "removeLiquidityOneEvent type",
    fields: () => ({
        _id: {type: GraphQLID },
        id: {type:GraphQLString},
        pool:{type:GraphQLString},
        provider:{type:GraphQLString},
        tokenAmounts: {type:GraphQLString},
        coinAmounts: {type:GraphQLString},
        block: {type:GraphQLString},
        timestamp: {type:GraphQLString},
        transaction: {type:GraphQLString},
        PoolEvent: {type:GraphQLString},
    })
});
  
module.exports = { removeLiquidityOneEventType };
  