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
  },
  async resolve(parent, args, context) {
    const session = await mongoose.startSession();
    //starting the transaction
    session.startTransaction();

    try {
      let account = await getOrRegisterAccount(args.user,session);

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
      await GaugeLiquidity.create([gauge],{session});

      // updating mutation status
      // let eventDataResult= await eventsData.findOne({_id:args.eventObjectId});
      // eventDataResult.status="completed"
      // await eventDataResult.save({ session });

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

const handleDeposit = {
  type: responseType,
  description: "Handle Deposit",
  args: {
    provider: { type: GraphQLString },
    id: { type: GraphQLString },
    value: { type: GraphQLString },
    transactionHash: { type: GraphQLString },
    logIndex: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    const session = await mongoose.startSession();
    //starting the transaction
    session.startTransaction();

    try {
      let provider = await getOrRegisterAccount(args.provider,session);

      let deposit = new GaugeDeposit({
        id: args.transactionHash + "-" + args.logIndex,
        gauge: args.id,
        provider: provider.id,
        value: args.value,
      });
      await GaugeDeposit.create([deposit],{session});

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

const handleWithdraw = {
  type: responseType,
  description: "Handle Withdraw",
  args: {
    provider: { type: GraphQLString },
    id: { type: GraphQLString },
    value: { type: GraphQLString },
    transactionHash: { type: GraphQLString },
    logIndex: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    const session = await mongoose.startSession();
    //starting the transaction
    session.startTransaction();

    try {
      let provider = await getOrRegisterAccount(args.provider,session);

      let withdraw = new GaugeWithdraw({
        id: args.transactionHash + "-" + args.logIndex,
        gauge: args.id,
        provider: provider.id,
        value: args.value,
      });
      await GaugeWithdraw.create([withdraw],{session});

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
  handleUpdateLiquidityLimit,
  handleDeposit,
  handleWithdraw,
};
