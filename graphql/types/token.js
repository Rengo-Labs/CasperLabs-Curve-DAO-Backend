const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList
  } = require("graphql");
  
const tokenType = new GraphQLObjectType({
    name: "Token",
    description: "Token type",
    fields: () => ({
      _id: {type: GraphQLID },
      id: {type: GraphQLString },
      address:{type:GraphQLString},
      decimals:{type:GraphQLString},
      name:{type:GraphQLString},
      symbol:{type:GraphQLString},
      pools: {type: GraphQLList(GraphQLString)},
      coins: {type: GraphQLList(GraphQLString)},
      underlyingCoins: {type: GraphQLList(GraphQLString)},
  
    })
});
  
module.exports = { tokenType };
  
  