const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList
  } = require("graphql");
  
const voteType = new GraphQLObjectType({
    name: "Vote",
    description: "Vote type",
    fields: () => ({
      _id: {type: GraphQLID },
      id: {type: GraphQLString },
      creator:{type:GraphQLString},
      originalCreator:{type:GraphQLString},
      metadata:{type:GraphQLString},
      executed:{type:GraphQLBoolean},
      executedAt:{type:GraphQLString},
      startDate:{type:GraphQLString},
      snapshotBlock:{type:GraphQLString},
      supportRequiredPct:{type:GraphQLString},
      minAcceptQuorum:{type:GraphQLString},
      yea:{type:GraphQLString},
      nay:{type:GraphQLString},
      votingPower:{type:GraphQLString},
      script:{type:GraphQLString},
      voteNum:{type:GraphQLString},
      creatorVotingPower:{type:GraphQLString},
      transactionHash:{type:GraphQLString},
      castCount:{type:GraphQLString},
      voteCountSeq:{type:GraphQLString},
      // castVotes:{type : GraphQLList(GraphQLString)}
    })
});
  
module.exports = { voteType };
  
  