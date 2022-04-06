require("dotenv").config();
const { GraphQLString } = require("graphql");

const { responseType } = require("../../types/response");

//const { Voting } = require('../../../generated/templates');

const Contract = require("../../../models/contract");
const ContractVersion = require("../../../models/contractVersion");

const VOTING_APP_ID =
  "0x2436adbbb3230545df6846695013211d36736f647c91b302b9591e5e2d013485";
const VOTING_TYPE = ["Ownership", "Parameter"];

const handleNewProxyApp = {
  type: responseType,
  description: "Handle NewProxyApp",
  args: {
    appId: { type: GraphQLString },
    proxy: { type: GraphQLString },
    context: { type: GraphQLString },
    transactionHash: { type: GraphQLString },
    block: { type: GraphQLString },
    timestamp: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    try {
      if (args.appId == VOTING_APP_ID) {
        let i = 0;
        let id = VOTING_TYPE[i];

        while ((await Contract.findOne({ id: id })) != null) {
          i = i + 1;
          id = VOTING_TYPE[i] || "crv-voting-" + i.toString();
        }

        // Register contract
        let contract = new Contract({
          id: id,
          description: id.indexOf("crv-voting") == 0 ? id : id + " Voting",
          added: args.timestamp,
          addedAtBlock: args.block,
          addedAtTransaction: args.transactionHash,
        });
        await Contract.create(contract);

        let contractVersion = new ContractVersion({
          id: contract.id + "-1",
          contract: contract.id,
          address: args.proxy,
          version: "1",
          added: args.timestamp,
          addedAtBlock: args.block,
          addedAtTransaction: args.transactionHash,
        });
        await Contract.create(contractVersion);

        // // Create dynamic data source
        // let context = new DataSourceContext()
        // context.set('type', Value.fromString(id))

        //await Voting.createWithContext(args.proxy, args.context);
      }
      let response = await Response.findOne({ id: "1" });
      if (response === null) {
        // create new response
        response = new Response({
          id: "1",
          result: true,
        });
        await response.save();
      }
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
};

module.exports = {
  handleNewProxyApp,
};
