const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList
  } = require("graphql");
  
const daoPowerType = new GraphQLObjectType({
    name: "DaoPower",
    description: "DaoPower type",
    fields: () => ({
      _id: {type: GraphQLID },
      id: {type: GraphQLString },
      block:{type:GraphQLString},
      timestamp:{type:GraphQLString},
      totalPower: {type: GraphQLString},
    })
});
  
module.exports = { daoPowerType };
  
  