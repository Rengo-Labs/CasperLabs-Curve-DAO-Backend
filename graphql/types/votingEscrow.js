const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
  } = require("graphql");
  
const votingEscrowType = new GraphQLObjectType({
    name: "VotingEscrow",
    description: "VotingEscrow type",
    fields: () => ({
      _id: {type: GraphQLID },
      id: {type: GraphQLString },
      provider:{type:GraphQLString},
      value: {type: GraphQLString },
      locktime: {type: GraphQLString },
      type:{type:GraphQLString},
      timestamp: {type: GraphQLString },
      totalPower:{type:GraphQLString},
    })
});
  
module.exports = { votingEscrowType };
  
  