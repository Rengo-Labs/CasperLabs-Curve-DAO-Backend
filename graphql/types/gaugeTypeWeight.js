const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
  } = require("graphql");
  
const gaugeTypeWeightType = new GraphQLObjectType({
    name: "GaugeTypeWeight",
    description: "GaugeTypeWeight type",
    fields: () => ({
      _id: {type: GraphQLID },
      id: {type: GraphQLString },
      type:{type:GraphQLString},
      time: {type: GraphQLString },
      weight:{type:GraphQLString},
  
    })
});
  
module.exports = { gaugeTypeWeightType };
  
  