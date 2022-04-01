const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
  } = require("graphql");
  
const lpTokenType = new GraphQLObjectType({
    name: "LpToken",
    description: "LpToken type",
    fields: () => ({
      _id: {type: GraphQLID },
      id: {type: GraphQLString },
      address:{type:GraphQLString},
      decimals: {type: GraphQLString },
      name:{type:GraphQLString},
      symbol:{type:GraphQLString},
      gauge: {type: GraphQLString },
      pool:{type:GraphQLString},
  
    })
});
  
module.exports = { lpTokenType };
  
  