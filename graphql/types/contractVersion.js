const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
  } = require("graphql");
  
const contractVersionType = new GraphQLObjectType({
    name: "ContractVersion",
    description: "ContractVersion type",
    fields: () => ({
      _id: {type: GraphQLID },
      id: {type: GraphQLString },
      contract:{type:GraphQLString},
      address: {type:GraphQLString},
      version: {type: GraphQLString},
      added: {type: GraphQLString},
      addedAtBlock: {type: GraphQLString},
      addedAtTransaction: {type: GraphQLString},
  
    })
});
  
module.exports = { contractVersionType };
  
  