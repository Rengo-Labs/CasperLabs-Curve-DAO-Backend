require("dotenv").config();
const { GraphQLString } = require("graphql");

const mongoose = require("mongoose");

const DaoPower = require("../../../models/daopower");
const VotingPower = require("../../../models/votingPower");
const UserBalance = require("../../../models/userBalance");
const VotingEscrow = require("../../../models/votingEscrow");
let eventsData = require("../../../models/eventsData");

const Response = require("../../../models/response");
const { responseType } = require("../../types/response");
let votingEscrow = require("../../../JsClients/VOTINGESCROW/votingEscrowFunctionsForBackend/functions.ts");
const daoPower = require("../../../models/daopower");

const transactionOptions = {
  readPreference: "primary",
  readConcern: { level: "local" },
  writeConcern: { w: "majority" },
};

const handleVotingDeposit = {
  type: responseType,
  description: "Handle VotingDeposit",
  args: {
    provider: { type: GraphQLString },
    value: { type: GraphQLString },
    locktime: { type: GraphQLString },
    type: { type: GraphQLString },
    timestamp: { type: GraphQLString },
    block : { type: GraphQLString },
    eventObjectId: { type: GraphQLString },
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
      let power = await votingEscrow.balanceOf(args.provider, "epoch_time");
      let totalPower = await votingEscrow.totalSupply();

      let daopower = new DaoPower({
          id : `${args.block}-${args.timestamp}`,
          block : args.block,
          timestamp : args.timestamp,
          totalPower : totalPower
      })

      let votingpower = new VotingPower({
        id : args.provider,
        power : power
      })

      let userbalance = await new UserBalance({
        id : args.provider,
        user : args.provider,
        unlock_time : args.locktime,
        CRVLocked : args.value
      });

      let votingescrow = new VotingEscrow({
        id : args.provider,
        provider : args.provider,
        value : args.value,
        locktime : args.locktime,
        type : args.type,
        timestamp : args.timestamp,
        totalPower : totalPower
      });

      await session.withTransaction(async () => {
        await daopower.save({session});
        await votingpower.save({session});
        await userbalance.save({session});
        await votingescrow.save({session});
        await eventDataResult.save({ session });
        await response.save({ session });
      }, transactionOptions);

      return response;
    } catch (error) {
      throw new Error(error);
    } finally {
      // Ending the session
      await session.endSession();
    }
  },
};

const handleVotingWithdraw = {
  type: responseType,
  description: "Handle VotingWithdraw",
  args: {
    provider: { type: GraphQLString },
    value: { type: GraphQLString },
    timestamp: { type: GraphQLString },
    block : { type: GraphQLString },
    eventObjectId: { type: GraphQLString },
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
      let power = await votingEscrow.balanceOf(args.provider, "epoch_time");
      let totalPower = await votingEscrow.totalSupply();

      let daopower = new DaoPower({
          id : `${args.block}-${args.timestamp}`,
          block : args.block,
          timestamp : args.timestamp,
          totalPower : totalPower
      })

      let votingpower = new VotingPower({
        id : args.provider,
        power : power
      })

      let userbalance = await new UserBalance({
        id : args.provider,
        user : args.provider,
        CRVLocked : args.value
      });

      let votingescrow = new VotingEscrow({
        id : args.provider,
        provider : args.provider,
        value : args.value,
        timestamp : args.timestamp,
        totalPower : totalPower
      });

      await session.withTransaction(async () => {
        await daopower.save({session});
        await votingpower.save({session});
        await userbalance.save({session});
        await votingescrow.save({session});
        await eventDataResult.save({ session });
        await response.save({ session });
      }, transactionOptions);

      return response;
    } catch (error) {
      throw new Error(error);
    } finally {
      // Ending the session
      await session.endSession();
    }
  },
};

module.exports = {
  handleVotingDeposit,
  handleVotingWithdraw,
};
