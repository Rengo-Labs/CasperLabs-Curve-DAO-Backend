const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLBoolean,
  } = require("graphql");
  
const proposalVoteType = new GraphQLObjectType({
    name: "ProposalVote",
    description: "ProposalVote type",
    fields: () => ({
        _id: {type: GraphQLID },
        id: {type:GraphQLGraphQLString},
        proposal: {type:GraphQLString},
        supports: {type:GraphQLBoolean},
        stake: {type:GraphQLString},
        voter: {type:GraphQLString},
        created:{type:GraphQLString},
        createdAtBlock: {type:GraphQLString},
        createdAtTransaction: {type:GraphQLString},

    })
});
  
module.exports = { proposalVoteType };
  
