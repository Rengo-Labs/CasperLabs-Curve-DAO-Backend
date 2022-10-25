const { GraphQLList, GraphQLInt, GraphQLString, GraphQLObjectType, GraphQLInputObjectType } = require("graphql");

// import types
const { responseType } = require("./types/response");
const { gaugeVoteType } = require("./types/gaugeVote");
const { votingEscrowType } = require("./types/votingEscrow");
const { daoPowerType } = require("./types/daopower");
const { votingPowerType } = require("./types/votingPower");
const { userBalanceType } = require("./types/userBalance");

// import Models
const Response = require("../models/response");
const gaugeVote = require("../models/gaugeVote");
const votingEscrow = require("../models/votingEscrow");
const daoPower = require("../models/daopower");
const votingPowerModel = require("../models/votingPower");
const gauge = require("../models/gauge");
const userBalance = require("../models/userBalance");
const { gaugeType } = require("./types/gauge");
const gaugeLiquidity = require("../models/gaugeLiquidity");
const { gaugeLiquidityType } = require("./types/gaugeLiquidity");

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

const gaugeVotesByTime =  {
  type: GraphQLList(gaugeVoteType),
  description: "Retrieves gauge votes against time",
  args: {
    time : {type : GraphQLString}
  },
  async resolve(parent, args, context) {
    try {
      debugger;
      let gaugeVotes = await gaugeVote.find();

      let gaugeVotesResult=[];

      for (var i=0;i<gaugeVotes.length;i++)
      {
        if(parseFloat(gaugeVotes[i].time) > parseFloat(args.time))
        {
          await gaugeVotes[i].populate("gaugeWeights");
          gaugeVotesResult.push(gaugeVotes[i]); 
        }
      }

      gaugeVotesResult.sort((a, b) => b.time - a.time);
      return gaugeVotesResult;
    } catch (error) {
      throw new Error(error);
    }
  },
};

const gaugeVotesByUser =  {
  type: GraphQLList(gaugeVoteType),
  description: "Retrieves gauge votes against user",
  args: {
    user : {type : GraphQLString}
  },
  async resolve(parent, args, context) {
    try {
      let gaugeVotes = await gaugeVote
      .find({user : args.user})
      .sort({time : -1})
      .populate("gaugeWeights");;
      return gaugeVotes;
    } catch (error) {
      throw new Error(error);
    }
  },
};

const votingEscrows =  {
  type: GraphQLList(votingEscrowType),
  description: "Retrieves voting escrows",
  args: {
  },
  async resolve(parent, args, context) {
    try {
      let votingEscrows = await votingEscrow.find().sort({timestamp : 1});
      return votingEscrows;
    } catch (error) {
      throw new Error(error);
    }
  },
};

const daoPowersByBlock =  {
  type: GraphQLList(daoPowerType),
  description: "Retrieves daopowers",
  args: {
  },
  async resolve(parent, args, context) {
    try {
      let daoPowers = await daoPower.find().sort({timestamp : 1});
      return daoPowers;
    } catch (error) {
      throw new Error(error);
    }
  },
};


const daoPowersByTimestamp =  {
  type: GraphQLList(daoPowerType),
  description: "Retrieves daopowers",
  args: {
  },
  async resolve(parent, args, context) {
    try {
      let daoPowers = await daoPower.find().sort({timestamp : -1}).limit(1);
      return daoPowers;
    } catch (error) {
      throw new Error(error);
    }
  },
};


const votingPower =  {
  type: GraphQLList(votingPowerType),
  description: "Retrieves votingPower against id",
  args: {
    id: {type : GraphQLString},
  },
  async resolve(parent, args, context) {
    try {
      let votingPower = await votingPowerModel.find({id : args.id});
      return votingPower;
    } catch (error) {
      throw new Error(error);
    }
  },
};

const userBalancesByUnlockTime = {
  type: GraphQLList(userBalanceType),
  description: "Retrieves userBalances",
  args: {
  },
  async resolve(parent, args, context) {
    try {
      let userBalances = await userBalance.find().sort({unlock_time : -1}).limit(1);
      return userBalances;
    } catch (error) {
      throw new Error(error);
    }
  },
};

const gauges =  {
  type: GraphQLList(gaugeLiquidityType),
  description: "Retrieves gauges",
  args: {
    user: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    try {
      let gauges = await gaugeLiquidity.find({user : args.user});
      return gauges;
    } catch (error) {
      throw new Error(error);
    }
  },
};


const userBalancesByWeight =  {
  type: GraphQLList(userBalanceType),
  description: "Retrieves userBalances",
  args: {
    first: {type : GraphQLString},
    skip: {type : GraphQLString},
  },
  async resolve(parent, args, context) {
    try {
      let userBalances = await userBalance.find().sort({weight : -1}).skip(args.skip).limit(args.first);
      return userBalances;
    } catch (error) {
      throw new Error(error);
    }
  },
};


module.exports = {
  gaugeVotesByTime,
  gaugeVotesByUser, 
  votingEscrows, 
  daoPowersByBlock,
  daoPowersByTimestamp, 
  votingPower, 
  gauges, 
  userBalancesByUnlockTime,
  userBalancesByWeight,
  responses,
  response
};
