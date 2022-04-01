const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
  } = require("graphql");
  
const systemStateType = new GraphQLObjectType({
    name: "SystemState",
    description: "SystemState type",
    fields: () => ({
      _id: {type: GraphQLID },
      id: {type: GraphQLString },
      registryContract:{type:GraphQLString},
      contractCount: {type:GraphQLString},
      gaugeCount: {type: GraphQLString},
      gaugeTypeCount: {type: GraphQLString},
      poolCount: {type: GraphQLString},
      tokenCount: {type: GraphQLString},
      totalPoolCount: {type: GraphQLString},
      updated: {type: GraphQLString},
      updatedAtBlock: {type: GraphQLString},
      updatedAtTransaction: {type: GraphQLString}
  
    })
});
  
module.exports = { systemStateType };
  
  