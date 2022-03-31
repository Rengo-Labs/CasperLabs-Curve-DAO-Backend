const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
  } = require("graphql");
  
const poolEventType = new GraphQLObjectType({
    name: "PoolEvent",
    description: "PoolEvent type",
    fields: () => ({
        _id: {type: GraphQLID },
        id: {type:GraphQLString},
        pool:{type:GraphQLString},
        block: {type:GraphQLString},
        timestamp: {type:GraphQLString},
        transaction: {type:GraphQLString},
        Exchange: {type:GraphQLString},
        AdminFeeChangelog: {type:GraphQLString},
        AmplificationCoeffChangelog: {type:GraphQLString},
        FeeChangelog: {type:GraphQLString},
        TransferOwnershipEvent: {type:GraphQLString},
        AddLiquidityEvent: {type:GraphQLString},
        RemoveLiquidityEvent: {type:GraphQLString},
        RemoveLiquidityOneEvent: {type:GraphQLString},
  
    })
});
  
module.exports = { poolEventType };
  