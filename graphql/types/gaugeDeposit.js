const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
  } = require("graphql");
  
const gaugeDepositType = new GraphQLObjectType({
    name: "GaugeDeposit",
    description: "GaugeDeposit type",
    fields: () => ({
      _id: {type: GraphQLID },
      id: {type: GraphQLString },
      gauge:{type:GraphQLString},
      provider: {type: GraphQLString },
      value:{type:GraphQLString},
  
    })
});
  
module.exports = { gaugeDepositType };
  
  