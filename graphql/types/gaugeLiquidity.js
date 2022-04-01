const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
  } = require("graphql");
  
const gaugeLiquidityType = new GraphQLObjectType({
    name: "GaugeLiquidity",
    description: "GaugeLiquidity type",
    fields: () => ({
      _id: {type: GraphQLID },
      id: {type: GraphQLString },
      user:{type:GraphQLString},
      gauge: {type:GraphQLString},
      originalBalance: {type: GraphQLString},
      originalSupply: {type: GraphQLString},
      workingBalance: {type: GraphQLString},
      workingSupply: {type: GraphQLString},
      timestamp: {type: GraphQLString},
      block: {type: GraphQLString},
      transaction: {type: GraphQLString},
  
    })
});
  
module.exports = { gaugeLiquidityType };
  
  