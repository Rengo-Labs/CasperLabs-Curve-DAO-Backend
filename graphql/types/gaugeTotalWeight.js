const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
  } = require("graphql");
  
const gaugeTotalWeightType = new GraphQLObjectType({
    name: "GaugeTotalWeight",
    description: "GaugeTotalWeight type",
    fields: () => ({
      _id: {type: GraphQLID },
      id: {type: GraphQLString },
      time:{type:GraphQLString},
      weight: {type: GraphQLString },
  
    })
});
  
module.exports = { gaugeTotalWeightType };
  
  