const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLBoolean,
  } = require("graphql");
  
const exchangeType = new GraphQLObjectType({
    name: "Exchange",
    description: "Exchange type",
    fields: () => ({
        _id: {type: GraphQLID },
        id: {type:GraphQLString},
        pool:{type:GraphQLString},
        buyer:  {type:GraphQLString},
        receiver:  {type:GraphQLString},
        tokenSold: {type:GraphQLString},
        tokenBought: {type:GraphQLString},
        amountSold: {type:GraphQLString},
        amountBought:  {type:GraphQLString},
        block: {type:GraphQLString},
        timestamp: {type:GraphQLString},
        transaction: {type:GraphQLString},
        PoolEvent: {type:GraphQLString},

    })
});
  
module.exports = { exchangeType };
  