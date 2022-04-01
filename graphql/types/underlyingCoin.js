const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
  } = require("graphql");
  
const underlyingCoinType = new GraphQLObjectType({
    name: "UnderlyingCoin",
    description: "UnderlyingCoin type",
    fields: () => ({
      _id: {type: GraphQLID },
      id: {type: GraphQLString },
      index:{type:GraphQLString},
      pool: {type:GraphQLString},
      token: {type: GraphQLString},
      coin: {type: GraphQLString},
      balance: {type: GraphQLString},
      updated: {type: GraphQLString},
      updatedAtBlock: {type: GraphQLString},
      updatedAtTransaction: {type: GraphQLString},
  
    })
});
  
module.exports = { underlyingCoinType };
  
  