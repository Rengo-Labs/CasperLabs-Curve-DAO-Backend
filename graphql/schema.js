// Import required stuff from graphql
const { GraphQLSchema, GraphQLObjectType } = require("graphql");

// Import queries
const { 
  responses, 
  response,   
  castsByVoter,
  castsByVoteId,
  votesByAppAddress,
  votesByAppAddressAndCreator,
  votesByVoteIdAndCreator,
  votesByVoteId } = require("./queries");

// Import mutations
const { handleNewResponse } = require("./mutations");

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

// Import voting mutations
const {
  handleMinimumBalanceSet,
  handleMinimumTimeSet,
  handleChangeMinQuorum,
  handleChangeSupportRequired,
  handleStartVote,
  handleCastVote,
  handleExecuteVote,
} = require("../graphql/mappings/dao/voting");

//Import Gauge-Controller mutations
const {
  handleAddType,
  handleNewGauge,
  handleNewGaugeWeight,
  handleNewTypeWeight,
  handleVoteForGauge
} = require('../graphql/mappings/dao/gauge-controller');

// Define QueryType
const QueryType = new GraphQLObjectType({
  name: "QueryType",
  description: "Queries",
  fields: {
    responses,
    response,
    castsByVoter,
    castsByVoteId,
    votesByAppAddress,
    votesByAppAddressAndCreator,
    votesByVoteIdAndCreator,
    votesByVoteId
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
    handleNewResponse,
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
    handleMinimumBalanceSet,
    handleMinimumTimeSet,
    handleChangeMinQuorum,
    handleChangeSupportRequired,
    handleStartVote,
    handleCastVote,
    handleExecuteVote,
    handleAddType,
    handleNewGauge,
    handleNewGaugeWeight,
    handleNewTypeWeight,
    handleVoteForGauge
  },
});

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
