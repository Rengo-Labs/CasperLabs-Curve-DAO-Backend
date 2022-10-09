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
    const session = await mongoose.startSession();
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

    const session = await mongoose.startSession();
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

    const session = await mongoose.startSession();

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

    const session = await mongoose.startSession();

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
  },
};

const handleStartVote = {
  type: responseType,
  description: "Handle StartVote",
  args: {
    address: { type: GraphQLString },
    creator: { type: GraphQLString },
    voteId: { type: GraphQLString },
    metadata: { type: GraphQLString },
    transactionFrom: { type: GraphQLString },
    eventObjectId: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    
    const session = await mongoose.startSession();
   
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

      const voteEntityId = buildVoteEntityId(args.address, args.voteId);
      
      const vote = new Vote({
        id : voteEntityId
      });
    
      //Integrate the votingContract here to fetch voteData.
      // const voting = VotingContract.bind(event.address)
      // const voteData = voting.getVote(event.params.voteId)
    
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
    
      vote.appAddress = args.address;
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
      // vote.orgAddress = voting.kernel()
      vote.orgAddress = 'kernel address'
      vote.executedAt = new bigdecimal.BigDecimal("0");
      vote.executed = false

      await session.withTransaction(async () => {
        await vote.save({session})
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
  },
};

const handleCastVote = {
  type: responseType,
  description: "Handle CastVote",
  args: {
    address: { type: GraphQLString },
    voteId: { type: GraphQLString },
    voter: { type: GraphQLString },
    stake: { type: GraphQLString },
    supports: { type: GraphQLBoolean },
    timestamp: { type: GraphQLString },
    eventObjectId: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    
    const session = await mongoose.startSession();

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

      // Integrate the voting contract to get the voteData
      // const votingApp = VotingContract.bind(votingAddress)
      // const voteData = votingApp.getVote(voteId)

      //Below is supposed data
      let voteData = {
        value6: "6",
        value7: "7",
      };

      const voteEntityId = buildVoteEntityId(args.address, args.voteId);
      const vote = await Vote.findOne({id : voteEntityId});
      if(!vote){
        console.log("vote not found.");
      }
      vote.yea = voteData.value6
      vote.nay = voteData.value7

      const voterId = buildVoterId(args.address, args.voter)
      let voter = await Voter.findOne({id : voterId});

      if (voter === null) {
        voter = new Voter({id : voterId});
        voter.address = args.voter
      }

      const castVoteId = buildCastEntityId(args.voteId, args.voter);
      let castVote = await Cast.findOne({id : castVoteId});
      if (castVote === null) {
        castVote = new Cast({id : castVoteId});
      }
      castVote.stake = args.stake;
      castVote.supports = args.supports;
      castVote.createdAt = args.timestamp;

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
    } catch (error) {
      throw new Error(error);
    } finally {
      // Ending the session
      await session.endSession();
    }
  },
};

const handleExecuteVote = {
  type: responseType,
  description: "Handle ExecuteVote",
  args: {
    address: { type: GraphQLString },
    voteId: { type: GraphQLString },
    timestamp: { type: GraphQLString },
    eventObjectId: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    
    const session = await mongoose.startSession();
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

      const voteEntityId = buildVoteEntityId(args.address, args.voteId)
      const vote = await Vote.findOne({id : voteEntityId});
      if(!vote){
        console.log("vote not found.");
      }

      // Integrate the voting contract to get the voteData
      // const votingApp = VotingContract.bind(votingAddress)
      // const voteData = votingApp.getVote(voteId)

      //Below is supposed data
      let voteData = {
        value6: "6",
        value7: "7",
      };

      vote.yea = voteData.value6
      vote.nay = voteData.value7
      vote.executed = true;
      vote.executedAt = args.timestamp;

      await session.withTransaction(async () => {
        await vote.save({session})
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
  },
};

async function getOrRegisterVotingApp(address) {
  let app = await VotingApp.findOne({ id: address });

  if (app == null) {
    let codename = "codename";
    
      //  let minBalance =  await votingEscrow.minBalance(address);
      // let minAcceptQuorumPct =  await votingEscrow.minAcceptQuorumPct(address);
      //  let minTime =  await votingEscrow.minTime(address);
      //  let supportRequiredPct =  await votingEscrow.supportRequiredPct(address);
      //  let voteTime =  await votingEscrow.voteTime(address);
      //  let token =  await votingEscrow.token(address);

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

function buildVoteEntityId(appAddress, voteNum){
  return (
    'appAddress:' + appAddress.toString() + '-vote:' + voteNum.toString()
  )
}

function buildVoterId(voting, voter){
  return voting.toString() + '-voter-' + voter.toString()
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
