const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList
  } = require("graphql");
  
const accountType = new GraphQLObjectType({
    name: "Account",
    description: "Account type",
    fields: () => ({
      _id: {type: GraphQLID },
      id: {type: GraphQLString },
      address:{type:GraphQLString},
      gauges: {type:GraphQLList(GraphQLString)},
      gaugeWeightVotes: {type: GraphQLList(GraphQLString)},
      proposals: {type: GraphQLList(GraphQLString)},
      proposalVotes: {type: GraphQLList(GraphQLString)},
  
    })
});
  
module.exports = { accountType };
  
  