const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList
  } = require("graphql");
  
const voterType = new GraphQLObjectType({
    name: "Voter",
    description: "Voter type",
    fields: () => ({
      _id: {type: GraphQLID },
      id: {type: GraphQLString },
      address:{type:GraphQLString},
      // castVotes:{type : GraphQLList(GraphQLString)}
    })
});
  
module.exports = { voterType };
  
  