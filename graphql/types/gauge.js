const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList
  } = require("graphql");
  
const gaugeType = new GraphQLObjectType({
    name: "Gauge",
    description: "Gauge type",
    fields: () => ({
      _id: {type: GraphQLID },
      id: {type: GraphQLString },
      address:{type:GraphQLString},
      type: {type:GraphQLString},
      pool: {type: GraphQLString},
      created: {type: GraphQLString},
      createdAtBlock: {type: GraphQLString},
      createdAtTransaction: {type: GraphQLString},
      weights: {type: GraphQLList(GraphQLString)},
      weightVotes: {type: GraphQLList(GraphQLString)},
    })
});
  
module.exports = { gaugeType };
  
  