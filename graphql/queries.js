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

const castsByDefaultAccount =  {
  type: GraphQLList(castType),
  description: "Retrieves casts by voter",
  args: {
  },
  async resolve(parent, args, context) {
    try {
      //contract.default_account will be replaced with default account value of contract
      let voterRecord = await voter
      .findOne({address : 'contract.default_account'});
      
      let casts = await cast
      .find({voter : voterRecord._id})
      .populate('voter')
      .populate('vote');
      return casts;
    } catch (error) {
      throw new Error(error);
    }
  },
};

const castsByVoterAccount =  {
  type: GraphQLList(castType),
  description: "Retrieves casts by voter",
  args: {
    voterAccount : {type : GraphQLString}
  },
  async resolve(parent, args, context) {
    try {
      let voterRecord = await voter
      .findOne({address : args.voterAccount});

      let casts = await cast
      .find({voter : voterRecord._id})
      .populate('voter')
      .populate('vote');
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
      let voteRecord = await vote
      .findOne({id : args.voteId});

      let casts = await cast
      .find({vote : voteRecord._id})
      .sort({voterStake : -1})
      .populate('voter')
      .populate('vote');
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
  },
  async resolve(parent, args, context) {
    try {
      let votes = await vote
      .find({appAddress : {$in : args.appAddresses}})
      .sort({startDate : -1});
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
  },
  async resolve(parent, args, context) {
    try {
      //contract.default_account will be replaced with default account value of contract
      let votes = await vote
      .find({
        appAddress : {$in : args.appAddresses}, 
        creator : "contract.default_account"
      });
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
    voteId: {type : GraphQLString},
    creator : {type : GraphQLString},
  },
  async resolve(parent, args, context) {
    try {
      let votes = await vote
      .find({
        id : args.voteId,
        creator : args.creator
        })
      .sort({startDate : 'desc'})
      .limit(1);
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
    voteId: {type : GraphQLString},
  },
  async resolve(parent, args, context) {
    try {
      let votes = await vote
      .find({id : args.voteId})
      .sort({startDate : -1});
      return votes;
    } catch (error) {
      throw new Error(error);
    }
  },
};



module.exports = {
  responses,
  response,
  castsByDefaultAccount,
  castsByVoterAccount,
  castsByVoteId,
  votesByAppAddress,
  votesByAppAddressAndCreator,
  votesByVoteIdAndCreator,
  votesByVoteId
};
