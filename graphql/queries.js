const { GraphQLList, GraphQLInt, GraphQLString } = require("graphql");

// import types
const { gaugeVoteType } = require("./types/gaugeVote");
const { votingEscrowType } = require("./types/votingEscrow");
const { daoPowerType } = require("./types/daopower");
const { votingPowerType } = require("./types/votingPower");
const { userBalanceType } = require("./types/userBalance");

// import Models
const gaugeVote = require("../models/gaugeVote");
const votingEscrow = require("../models/votingEscrow");
const daoPower = require("../models/daopower");
const votingPowerModel = require("../models/votingPower");
const Gauge = require("../models/gauge");
const userBalance = require("../models/userBalance");
const { gaugeType } = require("./types/gauge");
const gaugeLiquidity = require("../models/gaugeLiquidity");
const { gaugeLiquidityType } = require("./types/gaugeLiquidity");
const allcontractsData = require("../models/allcontractsData");
const { name } = require("../JsClients/LIQUIDITYGAUGEV3/liquidityGauageV3FunctionsForBackend/functions");

const getGaugesByAddress =  {
  type: GraphQLList(gaugeType),
  description: "Retrieves gauges by gauge address",
  args: {
    gaugeAddress : {type : GraphQLString}
  },
  async resolve(parent, args, context) {
    try {
      const filters = {}

      if(args.gaugeAddress)
      filters.id = args.gaugeAddress

      let gauges = await Gauge
      .find(filters);

      let promises = [];
      gauges.forEach(gauge => {
        const getGaugeContractHash = new Promise(async (resolve, reject) => {
          let contractData = await allcontractsData.findOne({packageHash : gauge.id}, {contractHash : 1});
          let gaugeData = {...gauge.toObject()}
          gaugeData.name = await name(contractData.contractHash);
          gaugeData.contractHash = contractData.contractHash;
          gaugeData.packageHash = gaugeData.id;
          resolve(gaugeData);
        });
        promises.push(getGaugeContractHash);
      })

      return await Promise.all(promises);
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
  args: {},
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
 args: {},
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
  type: votingPowerType,
  description: "Retrieves votingPower against id",
  args: {
    id: {type : GraphQLString},
  },
  async resolve(parent, args, context) {
    try {
      let votingPower = await votingPowerModel.findOne({id : args.id});
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
  description: "Retrieves gauges against user",
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
  getGaugesByAddress,
  userBalancesByUnlockTime,
  userBalancesByWeight
};
