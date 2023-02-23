// Import required stuff from graphql
const { GraphQLSchema, GraphQLObjectType } = require("graphql");

// Import queries
const {  
  gaugeVotesByTime,
  gaugeVotesByUser, 
  votingEscrows, 
  daoPowersByBlock,
  daoPowersByTimestamp, 
  votingPower, 
  gauges, 
  getGaugesByAddress,
  userBalancesByUnlockTime,
  userBalancesByWeight,
} = require("./queries");

// Import Pool mutations
const {
  handleAddLiquidity, 
  handleRemoveLiquidity, 
  handleRemoveLiquidityImbalance, 
  handleRemoveLiquidityOne,
  handleTokenExchange,
  handleTokenExchangeUnderlying,
  handleNewAdmin,
  handleNewFee,
  handleNewParameters,
  handleRampA,
  handleStopRampA,
} = require("../graphql/mappings/pool");

// Import Address-Provider mutations
const {
  handleAddressModified,
  handleNewAddressIdentifier,
} = require("../graphql/mappings/address-provider");

// Import registry mutations
const {
  handlePoolAdded,
  handlePoolRemoved
} = require("../graphql/mappings/registry");

// Import Dao mutations
const { handleNewProxyApp } = require("../graphql/mappings/dao/kernel");

// Import Gauge mutations
const {
  handleUpdateLiquidityLimit,
  handleDeposit,
  handleWithdraw,
} = require("../graphql/mappings/dao/gauge");

//Import Gauge-Controller mutations
const {
  handleAddType,
  handleNewGauge,
  handleNewGaugeWeight,
  handleNewTypeWeight,
  handleVoteForGauge
} = require('../graphql/mappings/dao/gauge-controller');

const {
  handleVotingDeposit,
  handleVotingWithdraw
  } = require("../graphql/mappings/dao/votingescrow");

// Define QueryType
const QueryType = new GraphQLObjectType({
  name: "QueryType",
  description: "Queries",
  fields: {
    gaugeVotesByTime,
    gaugeVotesByUser, 
    votingEscrows, 
    daoPowersByBlock,
    daoPowersByTimestamp, 
    votingPower, 
    gauges, 
    getGaugesByAddress,
    userBalancesByUnlockTime,
    userBalancesByWeight,
  },
});

// Define MutationType
const MutationType = new GraphQLObjectType({
  name: "MutationType",
  description: "Mutations",
  fields: {
    handleAddLiquidity,
    handleRemoveLiquidity,
    handleRemoveLiquidityImbalance, 
    handleRemoveLiquidityOne,
    handleTokenExchange,
    handleTokenExchangeUnderlying,
    handleNewAdmin,
    handleNewFee,
    handleNewParameters,
    handleRampA,
    handleStopRampA,
    handleAddressModified,
    handleNewAddressIdentifier,
    handleNewProxyApp,
    handleUpdateLiquidityLimit,
    handleDeposit,
    handleWithdraw,
    handlePoolAdded,
    handlePoolRemoved,
    handleAddType,
    handleNewGauge,
    handleNewGaugeWeight,
    handleNewTypeWeight,
    handleVoteForGauge,
    handleVotingDeposit,
    handleVotingWithdraw,
  },
});

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
