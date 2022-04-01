const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
  } = require("graphql");
  
const gaugeWithdrawType = new GraphQLObjectType({
    name: "GaugeWithdraw",
    description: "GaugeWithdraw type",
    fields: () => ({
      _id: {type: GraphQLID },
      id: {type: GraphQLString },
      gauge:{type:GraphQLString},
      provider: {type: GraphQLString },
      value:{type:GraphQLString},
  
    })
});
  
module.exports = { gaugeWithdrawType };
  
  