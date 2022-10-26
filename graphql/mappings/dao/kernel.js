require("dotenv").config();
const { GraphQLString } = require("graphql");

const Response = require("../../../models/response");
const { responseType } = require("../../types/response");

//const { Voting } = require('../../../generated/templates');

const Contract = require("../../../models/contract");
const ContractVersion = require("../../../models/contractVersion");
const eventsData = require("../../../models/eventsData");
const mongoose = require("mongoose");

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
    const session = await mongoose.startSession();
    //starting the transaction
    session.startTransaction();

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
          modified: args.timestamp,
          modifiedAtBlock: args.block,
          modifiedAtTransaction: args.transactionHash,
        });
        await Contract.create([contract],{session});

        let contractVersion = new ContractVersion({
          id: contract.id + "-1",
          contract: contract.id,
          address: args.proxy,
          version: "1",
          added: args.timestamp,
          addedAtBlock: args.block,
          addedAtTransaction: args.transactionHash,
        });
        await ContractVersion.create([contractVersion],{session});

        // // Create dynamic data source
        // let context = new DataSourceContext()
        // context.set('type', Value.fromString(id))

        //await Voting.createWithContext(args.proxy, args.context);
      }
       // updating mutation status
      //  let eventDataResult= await eventsData.findOne({_id:args.eventObjectId});
      //  eventDataResult.status="completed"
      //  await eventDataResult.save({ session });

      let response = await Response.findOne({ id: "1" });
      if (response === null) {
        // create new response
        response = new Response({
          id: "1",
          result: true,
        });
        await response.save({session});
      }
       //committing the transaction 
       await session.commitTransaction();

       // Ending the session

      return response;
    } catch (error) {
      // Rollback any changes made in the database
      await session.abortTransaction();

      throw new Error(error);
    }
  },
};

module.exports = {
  handleNewProxyApp,
};
