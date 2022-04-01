const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
  } = require("graphql");
  
const gaugeWeightType = new GraphQLObjectType({
    name: "GaugeWeight",
    description: "GaugeWeight type",
    fields: () => ({
      _id: {type: GraphQLID },
      id: {type: GraphQLString },
      gauge:{type:GraphQLString},
      time: {type: GraphQLString },
      weight:{type:GraphQLString},
  
    })
});
  
module.exports = { gaugeWeightType };
  
  