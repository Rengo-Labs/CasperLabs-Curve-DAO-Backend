require("dotenv").config();
const { GraphQLString } = require("graphql");
const Response = require("../../models/response");
const { responseType } = require("../types/response");

const Contract = require("../../models/contract");
const ContractVersion = require("../../models/contractVersion");
const { getSystemState } = require("../services/system-state");

//const AddressProvider = require('../../JsClients/ADDRESSPROVIDER/test/installed.ts');

async function registerContract(id, args) {
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
    await Contract.create(newData);
    contract = newData;
    state.contractCount = (
      BigInt(state.contractCount) + BigInt("1")
    ).toString();
  }

  contract.modified = args.timestamp;
  contract.modifiedAtBlock = args.block;
  contract.modifiedAtTransaction = args.transactionHash;
  await contract.save();

  let newData2 = new ContractVersion({
    id: id + "-" + info.value2,
    contract: contract.id,
    address: info.value0,
    version: info.value2,
    added: args.timestamp,
    addedAtBlock: args.block,
    addedAtTransaction: args.transactionHash,
  });
  await ContractVersion.create(newData2);

  if (contract.description == "Main Registry") {
    state.registryContract = info.value0;
  }

  await state.save();

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
    try {
      await registerContract(args.id, args);
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
    try {
      await registerContract(args.id, args);
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
  handleAddressModified,
  handleNewAddressIdentifier,
};
