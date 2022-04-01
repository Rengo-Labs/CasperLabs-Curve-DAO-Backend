const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList
  } = require("graphql");
  
const gaugeTypeType = new GraphQLObjectType({
    name: "GaugeType",
    description: "GaugeType type",
    fields: () => ({
      _id: {type: GraphQLID },
      id: {type: GraphQLString },
      name:{type:GraphQLString},
      gaugeCount:{type:GraphQLString},
      guages: {type: GraphQLList(GraphQLString)},
      weights: {type: GraphQLList(GraphQLString)},
  
    })
});
  
module.exports = { gaugeTypeType };
  
  