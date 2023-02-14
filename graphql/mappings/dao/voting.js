require("dotenv").config();
const { GraphQLString, GraphQLBoolean } = require("graphql");
const mongoose = require("mongoose");
const Response = require("../../../models/response");
const { responseType } = require("../../types/response");
const VotingApp = require("../../../models/votingApp");
const Vote = require("../../../models/vote");
const Voter = require("../../../models/voter");
const Cast = require("../../../models/cast");
const eventsData = require("../../../models/eventsData");
var bigdecimal = require("bigdecimal");
const voting = require("../../../JsClients/VOTING/votingFunctionsForBackend/functions");
const allcontractsData = require("../../../models/allcontractsData");


const transactionOptions = {
  readPreference: "primary",
  readConcern: { level: "local" },
  writeConcern: { w: "majority" },
};

const handleMinimumBalanceSet = {
  type: responseType,
  description: "Handle MinimumBalanceSet",
  args: {
    address: { type: GraphQLString },
    minBalance: { type: GraphQLString },
    eventObjectId: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    try {
      // updating mutation status
       let eventDataResult= await eventsData.findOne({_id:args.eventObjectId});
       eventDataResult.status="completed"

      let response = await Response.findOne({ id: "1" });
      if (response === null) {
        // create new response
        response = new Response({
          id: "1",
        });
      }
      response.result = true;

      let app = await getOrRegisterVotingApp(args.address,session);
      app.minimumBalance = args.minBalance;

      const session = await mongoose.startSession();
      try{
        await session.withTransaction(async () => {
          await app.save({session});
          await eventDataResult.save({ session });
          await response.save({session});
        }, transactionOptions);
  
        return response;
      }catch (error) {
        throw new Error(error);
      } finally {
        // Ending the session
        await session.endSession();
      }
    } catch (error) {
      throw new Error(error);
    }
  },
};

const handleMinimumTimeSet = {
  type: responseType,
  description: "Handle MinimumTimeSet",
  args: {
    address: { type: GraphQLString },
    minTime: { type: GraphQLString },
    eventObjectId: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    try {
      // updating mutation status
       let eventDataResult= await eventsData.findOne({_id:args.eventObjectId});
       eventDataResult.status="completed"

      let response = await Response.findOne({ id: "1" });
      if (response === null) {
        // create new response
        response = new Response({
          id: "1",
        });
      }
      response.result = true;

      let app = await getOrRegisterVotingApp(args.address);
      app.minTime = args.minTime;

      const session = await mongoose.startSession();
      try{
        await session.withTransaction(async () => {
          await app.save({session});
          await eventDataResult.save({ session });
          await response.save({session});
        }, transactionOptions);
  
        return response;
      } catch (error) {
        throw new Error(error);
      } finally {
        // Ending the session
        await session.endSession();
      }
    } catch (error) {
      throw new Error(error);
    }
  },
};

const handleChangeMinQuorum = {
  type: responseType,
  description: "Handle ChangeMinQuorum",
  args: {
    address: { type: GraphQLString },
    minAcceptQuorumPct: { type: GraphQLString },
    eventObjectId: { type: GraphQLString },
  },
  async resolve(parent, args, context) {

    try {
      // updating mutation status
       let eventDataResult= await eventsData.findOne({_id:args.eventObjectId});
       eventDataResult.status="completed"

      let response = await Response.findOne({ id: "1" });
      if (response === null) {
        // create new response
        response = new Response({
          id: "1",
        });
      }
      response.result = true;

      const app = await getOrRegisterVotingApp(args.address);
      app.minAcceptQuorumPct = args.minAcceptQuorumPct;

      const session = await mongoose.startSession();
      try{
        await session.withTransaction(async () => {
          await app.save({session});
          await eventDataResult.save({ session });
          await response.save({session});
          }, transactionOptions);
    
          return response;
      }catch (error) {
      throw new Error(error);
    } finally {
      // Ending the session
      await session.endSession();
    }
    } catch (error) {
      throw new Error(error);
    }
  },
};

const handleChangeSupportRequired = {
  type: responseType,
  description: "Handle ChangeSupportRequired",
  args: {
    address: { type: GraphQLString },
    supportRequiredPct: { type: GraphQLString },
    eventObjectId: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    try {
      // updating mutation status
       let eventDataResult= await eventsData.findOne({_id:args.eventObjectId});
       eventDataResult.status="completed"

      let response = await Response.findOne({ id: "1" });
      if (response === null) {
        // create new response
        response = new Response({
          id: "1",
        });
      }
      response.result = true;

      const app = await getOrRegisterVotingApp(args.address);
      app.supportRequiredPct = args.supportRequiredPct;

      const session = await mongoose.startSession();
      try{
        await session.withTransaction(async () => {
          await app.save({session});
          await eventDataResult.save({ session });
          await response.save({session});
        }, transactionOptions);
  
        return response;
      }catch (error) {
        throw new Error(error);
      } finally {
        // Ending the session
        await session.endSession();
      }
    } catch (error) {
      throw new Error(error);
    }
  },
};

const handleStartVote = {
  type: responseType,
  description: "Handle StartVote",
  args: {
    creator: { type: GraphQLString },
    voteId: { type: GraphQLString },
    metadata: { type: GraphQLString },
    transactionFrom: { type: GraphQLString },
    eventObjectId: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    try {
      // updating mutation status
       let eventDataResult= await eventsData.findOne({_id:args.eventObjectId});
       eventDataResult.status="completed"

      let response = await Response.findOne({ id: "1" });
      if (response === null) {
        // create new response
        response = new Response({
          id: "1",
        });
      }
      response.result = true;

      
      const vote = new Vote({
        id : args.voteId
      });

      // const contractData = await allcontractsData.findOne({packageHash : process.env.VOTING_PACKAGE_HASH});
      // const voteData = await voting.getVote(contractData.contractHash, args.voteId);
    
      //supposed values
      let voteData = {
        value2: "2",
        value3: "3",
        value4: "4",
        value5: "5",
        value6: "6",
        value7: "7",
        value8: "8",
        value9: "9",
      };
    
      vote.creator = args.creator;
      vote.originalCreator = args.transactionFrom;
      vote.metadata = args.metadata;
      vote.voteNum = args.voteId;
      vote.startDate = voteData.value2;
      vote.snapshotBlock = voteData.value3;
      vote.supportRequiredPct = voteData.value4;
      vote.minAcceptQuorum = voteData.value5;
      vote.yea = voteData.value6;
      vote.nay = voteData.value7;
      vote.votingPower = voteData.value8;
      vote.script = voteData.value9.toString()
      vote.executedAt = new bigdecimal.BigDecimal("0");
      vote.executed = false

      const session = await mongoose.startSession();
      try{
        await session.withTransaction(async () => {
          await vote.save({session})
          await eventDataResult.save({ session });
          await response.save({session});
      }, transactionOptions);

      return response;
    }catch (error) {
      throw new Error(error);
    } finally {
      // Ending the session
      await session.endSession();
    }
  
    } catch (error) {
      throw new Error(error);
    }
  },
};

const handleCastVote = {
  type: responseType,
  description: "Handle CastVote",
  args: {
    voteId: { type: GraphQLString },
    voter: { type: GraphQLString },
    stake: { type: GraphQLString },
    supports: { type: GraphQLBoolean },
    timestamp: { type: GraphQLString },
    eventObjectId: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    try {
      // updating mutation status
       let eventDataResult= await eventsData.findOne({_id:args.eventObjectId});
       eventDataResult.status="completed"

      let response = await Response.findOne({ id: "1" });
      if (response === null) {
        // create new response
        response = new Response({
          id: "1",
        });
      }
      response.result = true;

      // const contractData = await allcontractsData.findOne({packageHash : process.env.VOTING_PACKAGE_HASH});
      // const voteData = await voting.getVote(contractData.contractHash, args.voteId);

      //supposed values
      let voteData = {
        value6: "6",
        value7: "7",
      };

      const vote = await Vote.findOne({id : args.voteId});
      if(!vote){
        console.log("vote not found.");
      }
      vote.yea = voteData.value6
      vote.nay = voteData.value7

      let voter = await Voter.findOne({id : args.voter});

      if (voter === null) {
        voter = new Voter({id : args.voter});
        voter.address = args.voter
      }

      const castVoteId = buildCastEntityId(args.voteId, args.voter);
      let castVote = await Cast.findOne({id : castVoteId});
      if (castVote === null) {
        castVote = new Cast({id : castVoteId});
      }
      castVote.voterStake = args.stake;
      castVote.supports = args.supports;
      castVote.createdAt = args.timestamp;

      const session = await mongoose.startSession();
      try{
          await session.withTransaction(async () => {
            let voteCreated = await vote.save({session});
            let voterCreated = await voter.save({session});
            castVote.vote = voteCreated._id;
            castVote.voter = voterCreated._id;
            await castVote.save({session})
            await eventDataResult.save({ session });
            await response.save({session});
        }, transactionOptions);
        return response;
      }catch (error) {
        throw new Error(error);
      } finally {
        // Ending the session
        await session.endSession();
      }
    } catch (error) {
      throw new Error(error);
    }
  },
};

const handleExecuteVote = {
  type: responseType,
  description: "Handle ExecuteVote",
  args: {
    voteId: { type: GraphQLString },
    timestamp: { type: GraphQLString },
    eventObjectId: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    try {
      // updating mutation status
       let eventDataResult= await eventsData.findOne({_id:args.eventObjectId});
       eventDataResult.status="completed";

      let response = await Response.findOne({ id: "1" });
      if (response === null) {
        // create new response
        response = new Response({
          id: "1",
        });
      }
      response.result = true;

      const vote = await Vote.findOne({id : args.voteId});
      if(!vote){
        console.log("vote not found.");
      }

      // const contractData = await allcontractsData.findOne({packageHash : process.env.VOTING_PACKAGE_HASH});
      // const voteData = await voting.getVote(contractData.contractHash, args.voteId);

      //Supposed values
      let voteData = {
        value6: "6",
        value7: "7",
      };

      vote.yea = voteData.value6
      vote.nay = voteData.value7
      vote.executed = true;
      vote.executedAt = args.timestamp;

      const session = await mongoose.startSession();
      try{
        await session.withTransaction(async () => {
          await vote.save({session})
          await eventDataResult.save({ session });
          await response.save({session});
        }, transactionOptions);
        return response;
      }catch (error) {
        throw new Error(error);
      } finally {
        // Ending the session
        await session.endSession();
      }
    } catch (error) {
      throw new Error(error);
    }
  },
};

async function getOrRegisterVotingApp(address) {
  let app = await VotingApp.findOne({ id: address });

  if (app == null) {
    let codename = "codename";
    
    // let minBalance =  await voting.min_balance();
    // let minAcceptQuorumPct =  await voting.minAcceptQuorumPct();
    // let minTime =  await voting.minTime();
    // let supportRequiredPct =  await voting.supportRequiredPct();
    // let voteTime =  await voting.voteTime();
    // let token =  await voting.token();

    //supposed values
    let minBalance = "1000000000";
    let minAcceptQuorumPct = "1000000000";
    let minTime = "1000000000";
    let supportRequiredPct = "1000000000";
    let voteTime = "1000000000";
    let token = "123";

    app = new VotingApp({
    id: address,
    address: address,
    codename: codename,
    minimumBalance: minBalance,
    minimumQuorum: minAcceptQuorumPct,
    minimumTime: minTime,
    requiredSupport: supportRequiredPct,
    voteTime: voteTime,
    token: token,
    proposalCount: "0",
    voteCount: "0",
  });
  }

  return app;
}

function buildCastEntityId(voteId, voter){
  return voteId.toString() + '-voter:' + voter.toString()
}

module.exports = {
  handleMinimumBalanceSet,
  handleMinimumTimeSet,
  handleChangeMinQuorum,
  handleChangeSupportRequired,
  handleStartVote,
  handleCastVote,
  handleExecuteVote,
};
