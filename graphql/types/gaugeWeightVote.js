const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
  } = require("graphql");
  
const gaugeWeightVoteType = new GraphQLObjectType({
    name: "GaugeWeightVote",
    description: "GaugeWeightVote type",
    fields: () => ({
      _id: {type: GraphQLID },
      id: {type: GraphQLString },
      gauge:{type:GraphQLString},
      user: {type: GraphQLString },
      time:{type:GraphQLString},
      weight:{type:GraphQLString},
  
    })
});
  
module.exports = { gaugeWeightVoteType };
  
  