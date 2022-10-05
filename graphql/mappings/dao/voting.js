require("dotenv").config();
const { GraphQLString } = require("graphql");
const mongoose = require("mongoose");
const Response = require("../../../models/response");
const { responseType } = require("../../types/response");
const VotingApp = require("../../../models/votingApp");
const Vote = require("../../../models/vote");
const Voter = require("../../../models/voter");
const Cast = require("../../../models/cast");
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
    // eventObjectId: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    const session = await mongoose.startSession();
    try {
      // updating mutation status
      //  let eventDataResult= await eventsData.findOne({_id:args.eventObjectId});
      //  eventDataResult.status="completed"

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
        //  await eventDataResult.save({ session });
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
    // eventObjectId: { type: GraphQLString },
  },
  async resolve(parent, args, context) {

    const session = await mongoose.startSession();
    try {
      // updating mutation status
      //  let eventDataResult= await eventsData.findOne({_id:args.eventObjectId});
      //  eventDataResult.status="completed"

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
        //  await eventDataResult.save({ session });
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
    // eventObjectId: { type: GraphQLString },
  },
  async resolve(parent, args, context) {

    const session = await mongoose.startSession();

    try {
      // updating mutation status
      //  let eventDataResult= await eventsData.findOne({_id:args.eventObjectId});
      //  eventDataResult.status="completed"

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
      //  await eventDataResult.save({ session });
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
    // eventObjectId: { type: GraphQLString },
  },
  async resolve(parent, args, context) {

    const session = await mongoose.startSession();

    try {
      // updating mutation status
      //  let eventDataResult= await eventsData.findOne({_id:args.eventObjectId});
      //  eventDataResult.status="completed"

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
        //  await eventDataResult.save({ session });
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
    // eventObjectId: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    const session = await mongoose.startSession();
   
    try {
      // updating mutation status
      //  let eventDataResult= await eventsData.findOne({_id:args.eventObjectId});
      //  eventDataResult.status="completed"

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
        //  await eventDataResult.save({ session });
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
    supports: { type: GraphQLString },
    timestamp: { type: GraphQLString },
    // eventObjectId: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    const session = await mongoose.startSession();

    try {
      // updating mutation status
      //  let eventDataResult= await eventsData.findOne({_id:args.eventObjectId});
      //  eventDataResult.status="completed"

      let response = await Response.findOne({ id: "1" });
      if (response === null) {
        // create new response
        response = new Response({
          id: "1",
        });
      }
      response.result = true;

      const vote = await updateVoteState(args.address, args.voteId);
      const voter = await loadOrCreateVoter(args.address, args.voter);
      const castVote = await loadOrCreateCastVote(
        args.address,
        args.voteId,
        args.voter
      );

      castVote.voter = voter.id
      castVote.stake = args.stake
      castVote.supports = args.supports
      castVote.createdAt = args.timestamp

      await session.withTransaction(async () => {
      await vote.save({session});
      await voter.save({session})
      await castVote.save({session})
      //  await eventDataResult.save({ session });
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
    // eventObjectId: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    const session = await mongoose.startSession();
    try {
      // updating mutation status
      //  let eventDataResult= await eventsData.findOne({_id:args.eventObjectId});
      //  eventDataResult.status="completed"

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
        //  await eventDataResult.save({ session });
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

async function updateVoteState(votingAddress, voteId){
  // Integrate the voting contract to get the voteData
  // const votingApp = VotingContract.bind(votingAddress)
  // const voteData = votingApp.getVote(voteId)

  //Below is supposed data
  let voteData = {
    value6: "6",
    value7: "7",
  };

  const voteEntityId = buildVoteEntityId(votingAddress, voteId);
  const vote = await vote.findOne({id : voteEntityId});
  vote.yea = voteData.value6
  vote.nay = voteData.value7
  return vote;
  
}

async function loadOrCreateVoter(
  votingAddress,
  voterAddress
){
  const voterId = buildVoterId(votingAddress, voterAddress)
  let voter = await Voter.findOne({id : voterId});

  if (voter === null) {
    voter = new Voter({id : voterId});
    voter.address = voterAddress
  }
  return voter;
}

function buildVoterId(voting, voter){
  return voting.toString() + '-voter-' + voter.toString()
}

async function loadOrCreateCastVote(
  votingAddress,
  voteId,
  voterAddress
){
  const castVoteId = buildCastEntityId(voteId, voterAddress)
  let castVote = await Cast.findOne({id : castVoteId});
  if (castVote === null) {
    castVote = new Cast({id : castVoteId});
    castVote.vote = buildVoteEntityId(votingAddress, voteId)
  }
  return castVote;
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
