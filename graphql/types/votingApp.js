const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLBoolean,
  } = require("graphql");
  
const votingAppType = new GraphQLObjectType({
    name: "VotingApp",
    description: "VotingApp type",
    fields: () => ({
        _id: {type: GraphQLID },
        // Equals to app address 
        id: {type:GraphQLString},

        //Voting app instance 
        address: {type:GraphQLString},

        // App codename 
        codename:{type:GraphQLString},

        // Minimum balance needed to create a proposal
        minimumBalance: {type:GraphQLString},

        // Percentage of positive votes in total possible votes for a proposal to be accepted
        minimumQuorum: {type:GraphQLString},

        // Minimum time needed to pass between user's previous proposal and a user creating a new proposal
        minimumTime: {type:GraphQLString},

        // Percentage of positive votes needed for a proposal to be accepted
        requiredSupport: {type:GraphQLString},

        // Seconds that a proposal will be open for vote (unless enough votes have been cast to make an early decision)
        voteTime: {type:GraphQLString},

        // Number of proposals created with this app
        proposalCount: {type:GraphQLString},

        // Number of votes received by all the proposals created with this app
        voteCount: {type:GraphQLString},

        // Address of the token used for voting
        token:{type:GraphQLString},

        // Proposals created through this app instance
        proposals: [{type:GraphQLString}]

    })
});
  
module.exports = { votingAppType };
  