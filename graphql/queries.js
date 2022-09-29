const { GraphQLList, GraphQLInt, GraphQLString } = require("graphql");

// import types
const { responseType } = require("./types/response");

// import Models
const Response = require("../models/response");
const { castType } = require("./types/cast");
const cast = require("../models/cast");
const vote = require("../models/vote");
const voter = require("../models/voter");
const { voteType } = require("./types/vote");

const responses = {
  type: GraphQLList(responseType),
  description: "Retrieves list of responses",
  args: {
    start: { type: GraphQLInt },
    end: { type: GraphQLInt },
  },
  async resolve(parent, args, context) {
    try {
      let responses = await Response.find();
      console.log("responses: ",responses);
      return responses.splice(args.start, args.end);
    } catch (error) {
      throw new Error(error);
    }
  },
};

const response = {
  type: responseType,
  description: "Retrieves response against Id",
  args: {
    id: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    try {
      let response = await Response.findOne({ id: args.id });

      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
};

const castsByVoter =  {
  type: GraphQLList(castType),
  description: "Retrieves casts by voter",
  args: {
    voter: {type : GraphQLString},
  },
  async resolve(parent, args, context) {
    try {
      let casts = await cast.find({voter : args.voter}).populate('voter').populate('vote');
      return casts;
    } catch (error) {
      throw new Error(error);
    }
  },
};

const castsByVoteId =  {
  type: GraphQLList(castType),
  description: "Retrieves casts by voter",
  args: {
    voteId: {type : GraphQLString},
  },
  async resolve(parent, args, context) {
    try {
      let casts = await cast.find({vote : args.voteId}).populate('voter').populate('vote');
      return casts;
    } catch (error) {
      throw new Error(error);
    }
  },
};


const votesByAppAddress =  {
  type: GraphQLList(voteType),
  description: "Retrieves votes by app address",
  args: {
    appAddresses: {type : GraphQLList(GraphQLString)},
    orderBy : {type : GraphQLString},
    orderDirection : {type : GraphQLString}
  },
  async resolve(parent, args, context) {
    try {
      let votes = await vote.find({appAddress : {$in : args.appAddresses}}).sort({[args.orderBy] : args.orderDirection == 'asc' ? 1 : -1}).populate('castVotes');
      return votes;
    } catch (error) {
      throw new Error(error);
    }
  },
};

const votesByAppAddressAndCreator =  {
  type: GraphQLList(voteType),
  description: "Retrieves votes by app address and creator",
  args: {
    appAddresses: {type : GraphQLList(GraphQLString)},
    creator : {type : GraphQLString},
  },
  async resolve(parent, args, context) {
    try {
      debugger;
      let v = await vote.find();
      let votes = await vote.find({appAddress : {$in : args.appAddresses}, creator : args.creator}).populate('castVotes');
      return votes;
    } catch (error) {
      throw new Error(error);
    }
  },
};

const votesByVoteIdAndCreator =  {
  type: GraphQLList(voteType),
  description: "Retrieves votes by vote id and creator",
  args: {
    id: {type : GraphQLString},
    creator : {type : GraphQLString},
    orderBy : {type : GraphQLString},
    orderDirection : {type : GraphQLString},
    first : {type : GraphQLString}
  },
  async resolve(parent, args, context) {
    try {
      let votes = await vote.find({_id : args.id, creator : args.creator}).limit(args.first).sort({[args.orderBy] : args.orderDirection == 'asc' ? 1 : -1}).populate('castVotes');
      return votes;
    } catch (error) {
      throw new Error(error);
    }
  },
};

const votesByVoteId =  {
  type: GraphQLList(voteType),
  description: "Retrieves votes by vote id",
  args: {
    id: {type : GraphQLString},
    orderBy : {type : GraphQLString},
    orderDirection : {type : GraphQLString},
  },
  async resolve(parent, args, context) {
    try {
      let votes = await vote.find({_id : args.id}).sort({[args.orderBy] : args.orderDirection == 'asc' ? 1 : -1}).populate('castVotes');
      return votes;
    } catch (error) {
      throw new Error(error);
    }
  },
};



module.exports = {
  responses,
  response,
  castsByVoter,
  castsByVoteId,
  votesByAppAddress,
  votesByAppAddressAndCreator,
  votesByVoteIdAndCreator,
  votesByVoteId
};
