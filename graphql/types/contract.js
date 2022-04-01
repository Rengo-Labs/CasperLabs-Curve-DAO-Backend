const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList
  } = require("graphql");
  
const contractType = new GraphQLObjectType({
    name: "Contract",
    description: "Contract type",
    fields: () => ({
      _id: {type: GraphQLID },
      id: {type: GraphQLString },
      description:{type:GraphQLString},
      added: {type:GraphQLString},
      addedAtBlock: {type: GraphQLString},
      addedAtTransaction: {type: GraphQLString},
      modified: {type: GraphQLString},
      modifiedAtBlock: {type: GraphQLString},
      modifiedAtTransaction: {type: GraphQLString},
      versions: {type: GraphQLList(GraphQLString)},
  
    })
});
  
module.exports = { contractType };
  
  