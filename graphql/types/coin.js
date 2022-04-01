const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
  } = require("graphql");
  
const coinType = new GraphQLObjectType({
    name: "Coin",
    description: "Coin type",
    fields: () => ({
      _id: {type: GraphQLID },
      id: {type: GraphQLString },
      index:{type:GraphQLString},
      pool: {type:GraphQLString},
      token: {type: GraphQLString},
      underlying: {type: GraphQLString},
      balance: {type: GraphQLString},
      rate: {type: GraphQLString},
      updated: {type: GraphQLString},
      updatedAtBlock: {type: GraphQLString},
      updatedAtTransaction: {type: GraphQLString},
  
    })
});
  
module.exports = { coinType };
  
  