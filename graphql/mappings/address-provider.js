require("dotenv").config();
const { GraphQLString } = require("graphql");
const Response = require("../../models/response");
const { responseType } = require("../types/response");
const mongoose = require("mongoose");

const Contract = require("../../models/contract");
const ContractVersion = require("../../models/contractVersion");
const eventsData = require("../../models/eventsData");
const { getSystemState } = require("../services/system-state");
var bigdecimal = require("bigdecimal");

//const AddressProvider = require('../../JsClients/ADDRESSPROVIDER/test/installed.ts');

async function registerContract(id, args, session) {
  console.log("registerContract");
  //let info = await AddressProvider.get_id_info(args.addressProviderContractHash,id);

  let info = {
    value0: "0",
    value2: "2",
    value4: "4",
  };
  let contract = await Contract.findOne({ id: id });
  let state = await getSystemState(args);

  if (contract == null) {
    let newData = new Contract({
      id: id,
      description: info.value4,
      added: args.timestamp,
      addedAtBlock: args.block,
      addedAtTransaction: args.transactionHash,
    });
    await Contract.create([newData],{session});
    contract = newData;
    state.contractCount = (
      (new bigdecimal.BigDecimal(state.contractCount)).add(new bigdecimal.BigDecimal("1"))
    ).toString();
  }

  contract.modified = args.timestamp;
  contract.modifiedAtBlock = args.block;
  contract.modifiedAtTransaction = args.transactionHash;
  await contract.save({session});

  let newData2 = new ContractVersion({
    id: id + "-" + info.value2,
    contract: contract.id,
    address: info.value0,
    version: info.value2,
    added: args.timestamp,
    addedAtBlock: args.block,
    addedAtTransaction: args.transactionHash,
  });
  await ContractVersion.create([newData2],{session});

  if (contract.description == "Main Registry") {
    state.registryContract = info.value0;
  }

  await state.save({session});

  return contract;
}
const handleAddressModified = {
  type: responseType,
  description: "Handle AddressModified",
  args: {
    addressProviderContractHash: { type: GraphQLString },
    id: { type: GraphQLString },
    transactionHash: { type: GraphQLString },
    block: { type: GraphQLString },
    timestamp: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    const session = await mongoose.startSession();
    //starting the transaction
    session.startTransaction();
    try {
      console.log("handleAddressModified");
      await registerContract(args.id, args, session);

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
       session.endSession();

      return response;
    } catch (error) {
      // Rollback any changes made in the database
      await session.abortTransaction();

      throw new Error(error);
    }
  },
};

const handleNewAddressIdentifier = {
  type: responseType,
  description: "Handle NewAddressIdentifier",
  args: {
    addressProviderContractHash: { type: GraphQLString },
    id: { type: GraphQLString },
    transactionHash: { type: GraphQLString },
    block: { type: GraphQLString },
    timestamp: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    const session = await mongoose.startSession();
    //starting the transaction
    session.startTransaction();
    try {
      console.log("hello.");
      await registerContract(args.id, args,session);

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
        session.endSession();

      return response;
    } catch (error) {
      // Rollback any changes made in the database
      await session.abortTransaction();

      throw new Error(error);
    }
  },
};
module.exports = {
  handleAddressModified,
  handleNewAddressIdentifier,
};
