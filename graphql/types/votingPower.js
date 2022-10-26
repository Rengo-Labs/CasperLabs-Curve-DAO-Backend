const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
  } = require("graphql");
  
const votingPowerType = new GraphQLObjectType({
    name: "VotingPower",
    description: "VotingPower type",
    fields: () => ({
      _id: {type: GraphQLID },
      id: {type: GraphQLString },
      power:{type:GraphQLString},
    })
});
  
module.exports = { votingPowerType };
  
  