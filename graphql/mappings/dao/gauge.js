require("dotenv").config();
const { GraphQLString } = require("graphql");
const mongoose = require("mongoose")

const Response = require("../../../models/response");
const { responseType } = require("../../types/response");

const GaugeDeposit = require("../../../models/gaugeDeposit");
const GaugeLiquidity = require("../../../models/gaugeLiquidity");
const GaugeWithdraw = require("../../../models/gaugeWithdraw");
const eventsData = require("../../../models/eventsData");

const { getOrRegisterAccount } = require("../../services/accounts");

const transactionOptions = {
  readPreference: "primary",
  readConcern: { level: "local" },
  writeConcern: { w: "majority" },
};

const handleUpdateLiquidityLimit = {
  type: responseType,
  description: "Handle UpdateLiquidityLimit",
  args: {
    user: { type: GraphQLString },
    id: { type: GraphQLString },
    original_balance: { type: GraphQLString },
    original_supply: { type: GraphQLString },
    working_balance: { type: GraphQLString },
    working_supply: { type: GraphQLString },
    transactionHash: { type: GraphQLString },
    block: { type: GraphQLString },
    timestamp: { type: GraphQLString },
    eventObjectId : { type: GraphQLString },
  },
  async resolve(parent, args, context) {

    // updating mutation status
    let eventDataResult = await eventsData.findOne({
      _id: args.eventObjectId,
    });
    eventDataResult.status = "completed";

    let response = await Response.findOne({ id: "1" });
    if (response === null) {
      // create new response
      response = new Response({
        id: "1",
      });
      response.result = true;
    }
    
    const session = await mongoose.startSession();

    try {
      let account = await getOrRegisterAccount(args.user);

      let gauge = new GaugeLiquidity({
        id: account.id + "-" + args.id,
        user: account.id,
        gauge: args.id,
        originalBalance: args.original_balance,
        originalSupply: args.original_supply,
        workingBalance: args.working_balance,
        workingSupply: args.working_supply,
        timestamp: args.timestamp,
        block: args.block,
        transaction: args.transactionHash,
      });

      await session.withTransaction(async () => {
        await gauge.save({session});
        await eventDataResult.save({ session });
        await response.save({ session });
        await account.save({ session });
      }, transactionOptions);

      return response;
    }catch (error) {
      throw new Error(error);
    } finally {
      // Ending the session
      await session.endSession();
    }
  },
};

const handleDeposit = {
  type: responseType,
  description: "Handle Deposit",
  args: {
    provider: { type: GraphQLString },
    id: { type: GraphQLString },
    value: { type: GraphQLString },
    transactionHash: { type: GraphQLString },
    logIndex: { type: GraphQLString },
    eventObjectId : { type: GraphQLString },
  },
  async resolve(parent, args, context) {
     // updating mutation status
     let eventDataResult = await eventsData.findOne({
      _id: args.eventObjectId,
    });
    eventDataResult.status = "completed";

    let response = await Response.findOne({ id: "1" });
    if (response === null) {
      // create new response
      response = new Response({
        id: "1",
      });
      response.result = true;
    }
    
    const session = await mongoose.startSession();
    
    try {
      let provider = await getOrRegisterAccount(args.provider);

      let deposit = new GaugeDeposit({
        id: args.transactionHash + "-" + args.logIndex,
        gauge: args.id,
        provider: provider.id,
        value: args.value,
      });


      await session.withTransaction(async () => {
        await deposit.save({session});
        await eventDataResult.save({ session });
        await response.save({ session });
        await provider.save({ session });
      }, transactionOptions);

      return response;
    }catch (error) {
      throw new Error(error);
    } finally {
      // Ending the session
      await session.endSession();
    }
  },
};

const handleWithdraw = {
  type: responseType,
  description: "Handle Withdraw",
  args: {
    provider: { type: GraphQLString },
    id: { type: GraphQLString },
    value: { type: GraphQLString },
    transactionHash: { type: GraphQLString },
    logIndex: { type: GraphQLString },
    eventObjectId : { type: GraphQLString },
  },
  async resolve(parent, args, context) {

     // updating mutation status
     let eventDataResult = await eventsData.findOne({
      _id: args.eventObjectId,
    });
    eventDataResult.status = "completed";

    let response = await Response.findOne({ id: "1" });
    if (response === null) {
      // create new response
      response = new Response({
        id: "1",
      });
      response.result = true;
    }

    const session = await mongoose.startSession();

    try {
      let provider = await getOrRegisterAccount(args.provider);

      let withdraw = new GaugeWithdraw({
        id: args.transactionHash + "-" + args.logIndex,
        gauge: args.id,
        provider: provider.id,
        value: args.value,
      });

      await session.withTransaction(async () => {
        await withdraw.save({session});
        await eventDataResult.save({ session });
        await response.save({ session });
        await provider.save({ session });
      }, transactionOptions);

      return response;
    }catch (error) {
      throw new Error(error);
    } finally {
      // Ending the session
      await session.endSession();
    }
  },
};

module.exports = {
  handleUpdateLiquidityLimit,
  handleDeposit,
  handleWithdraw,
};
