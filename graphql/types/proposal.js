const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLBoolean,
  } = require("graphql");
  
const proposalType = new GraphQLObjectType({
    name: "Proposal",
    description: "Proposal type",
    fields: () => ({
        _id: {type: GraphQLID },
        // Equals to app address 
        id: {type:GraphQLString},
        
        //Sequential number in related to the realted voting app
        number: {type:GraphQLString},

        // Voting app instance
        app: {type:GraphQLString},

        // Proposal creator's account
        creator: {type:GraphQLString},

        executionScript:{type:GraphQLString},

        expireDate: {type:GraphQLString},

        // Percentage of positive votes in total possible votes for this proposal to be accepted
        minimumQuorum: {type:GraphQLString},

        // Percentage of positive votes needed for this proposal to be accepted
        requiredSupport: {type:GraphQLString},

        snapshotBlock: {type:GraphQLString},

        votingPower: {type:GraphQLString},

        // Link to metadata file
        metadata: {type:GraphQLString},

        // Proposal description text
        text: {type:GraphQLString},

        // Number of votes received by the proposal
        voteCount: {type:GraphQLString},

        // Number of positive votes (yes) received by the proposal
        positiveVoteCount: {type:GraphQLString},

        //Number of negative votes (no) received by the proposal
        negativeVoteCount: {type:GraphQLString},

        currentQuorum: {type:GraphQLString},

        currentSupport: {type:GraphQLString},

        stakedSupport: {type:GraphQLString},

        totalStaked: {type:GraphQLString},

        created: {type:GraphQLString},

        createdAtBlock: {type:GraphQLString},

        createdAtTransaction: {type:GraphQLString},

        updated: {type:GraphQLString},

        updatedAtBlock: {type:GraphQLString},

        updatedAtTransaction: {type:GraphQLString},

        executed: {type:GraphQLString},

        executedAtBlock: {type:GraphQLString},

        executedAtTransaction: {type:GraphQLString},

        votes: {type: GraphQLList(GraphQLString)},

    })
});
  
module.exports = { proposalType };
  
