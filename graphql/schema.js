// Import required stuff from graphql
const { GraphQLSchema, GraphQLObjectType } = require("graphql");

// Import queries
const { responses, response } = require("./queries");

// Import mutations
const { handleNewResponse } = require("./mutations");

// Import Pool mutations
const {
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

// Import Dao mutations
const { handleNewProxyApp } = require("../graphql/mappings/dao/kernel");

// Import Gauge mutations
const {
  handleUpdateLiquidityLimit,
  handleDeposit,
  handleWithdraw,
} = require("../graphql/mappings/dao/gauge");

// Define QueryType
const QueryType = new GraphQLObjectType({
  name: "QueryType",
  description: "Queries",
  fields: {
    responses,
    response,
  },
});

// Define MutationType
const MutationType = new GraphQLObjectType({
  name: "MutationType",
  description: "Mutations",
  fields: {
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
  },
});

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
