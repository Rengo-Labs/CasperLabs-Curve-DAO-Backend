const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList,
  } = require("graphql");
const gaugeWeight = require("../../models/gaugeWeight");
const { gaugeWeightType } = require("./gaugeWeight");
  
const gaugeVoteType = new GraphQLObjectType({
    name: "GaugeVote",
    description: "GaugeVote type",
    fields: () => ({
      _id: {type: GraphQLID },
      id: {type: GraphQLString },
      gauge:{type:GraphQLString},                             
      user : {type:GraphQLString},
      time: {type: GraphQLString },
      weight:{type:GraphQLString},
      total_weight : {type:GraphQLString},
      veCRV : {type:GraphQLString},
      totalveCRV : {type:GraphQLString},
      gaugeWeights : { type : GraphQLList(gaugeWeightType)}
    })
});
  
module.exports = { gaugeVoteType };  
  