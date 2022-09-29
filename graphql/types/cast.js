const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList
  } = require("graphql");
const { voteType } = require("./vote");
const { voterType } = require("./voter");
  
const castType = new GraphQLObjectType({
    name: "Cast",
    description: "Cast type",
    fields: () => ({
      _id: {type: GraphQLID },
      id: {type: GraphQLString },
      vote:{type: voteType},
      voter:{type: voterType},
      supports:{type:GraphQLBoolean},
      stake:{type:GraphQLString},
      createdAt:{type:GraphQLString},
    })
});
  
module.exports = { castType };
  
  