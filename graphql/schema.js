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
  },
});

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
