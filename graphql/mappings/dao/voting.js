require("dotenv").config();
const { GraphQLString } = require("graphql");
const mongoose = require("mongoose");
const Response = require("../../../models/response");
const { responseType } = require("../../types/response");

const Proposal = require("../../../models/proposal");
const ProposalVote = require("../../../models/proposalVote");
const VotingApp = require("../../../models/votingApp");
const Vote = require("../../../models/vote");
const Voter = require("../../../models/voter");
const Cast = require("../../../models/cast");
const { getOrRegisterAccount } = require("../../services/accounts");
let votingEscrow = require("../../../JsClients/VOTINGESCROW/votingEscrowFunctionsForBackend/functions.ts");
const eventsData = require("../../../models/eventsData");

var bigdecimal = require("bigdecimal");
var halfUp = bigdecimal.RoundingMode.HALF_UP();

async function getOrRegisterVotingApp(address,session) {
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
    await VotingApp.create([app],{session});
  }

  return app;
}

const handleMinimumBalanceSet = {
  type: responseType,
  description: "Handle MinimumBalanceSet",
  args: {
    address: { type: GraphQLString },
    minBalance: { type: GraphQLString },
  },
  async resolve(parent, args, context) {

    const session = await mongoose.startSession();
    //starting the transaction
    session.startTransaction();

    try {
      let app = await getOrRegisterVotingApp(args.address,session);
      app.minimumBalance = args.minBalance;
      await app.save({session});

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
const handleMinimumTimeSet = {
  type: responseType,
  description: "Handle MinimumTimeSet",
  args: {
    address: { type: GraphQLString },
    minTime: { type: GraphQLString },
  },
  async resolve(parent, args, context) {

    const session = await mongoose.startSession();
    //starting the transaction
    session.startTransaction();

    try {
      let app = await getOrRegisterVotingApp(args.address,session);
      app.minTime = args.minTime;
      await app.save({session});

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

const handleChangeMinQuorum = {
  type: responseType,
  description: "Handle ChangeMinQuorum",
  args: {
    address: { type: GraphQLString },
    minAcceptQuorumPct: { type: GraphQLString },
  },
  async resolve(parent, args, context) {

    const session = await mongoose.startSession();
    //starting the transaction
    session.startTransaction();

    try {
      let app = await getOrRegisterVotingApp(args.address,session);
      app.minAcceptQuorumPct = args.minAcceptQuorumPct;
      await app.save({session});

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

const handleChangeSupportRequired = {
  type: responseType,
  description: "Handle ChangeSupportRequired",
  args: {
    address: { type: GraphQLString },
    supportRequiredPct: { type: GraphQLString },
  },
  async resolve(parent, args, context) {

    const session = await mongoose.startSession();
    //starting the transaction
    session.startTransaction();

    try {
      let app = await getOrRegisterVotingApp(args.address,session);
      app.supportRequiredPct = args.supportRequiredPct;
      await app.save({session});

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

const handleStartVote = {
  type: responseType,
  description: "Handle StartVote",
  args: {
    address: { type: GraphQLString },
    creator: { type: GraphQLString },
    voteId: { type: GraphQLString },
    metadata: { type: GraphQLString },
    creatorVotingPower: { type: GraphQLString },
    timestamp: { type: GraphQLString },
    block: { type: GraphQLString },
    transactionHash: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    const session = await mongoose.startSession();
    //starting the transaction
    session.startTransaction();

    try {
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
    
      vote.save({session})
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
    block: { type: GraphQLString },
    transactionHash: { type: GraphQLString },
    logIndex: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    const session = await mongoose.startSession();
    //starting the transaction
    session.startTransaction();

    try {
      await updateVoteState(args.address, args.voteId)

      const voter = await loadOrCreateVoter(args.address, args.voter)
      voter.save({session})
    
      const castVote = await loadOrCreateCastVote(
        args.address,
        args.voteId,
        args.voter
      )
    
      castVote.voter = voter.id
      castVote.stake = args.stake
      castVote.supports = args.supports
      castVote.createdAt = args.timestamp
    
      castVote.save({session})
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

const handleExecuteVote = {
  type: responseType,
  description: "Handle ExecuteVote",
  args: {
    address: { type: GraphQLString },
    voteId: { type: GraphQLString },
    timestamp: { type: GraphQLString },
    block: { type: GraphQLString },
    transactionHash: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    const session = await mongoose.startSession();
    //starting the transaction
    session.startTransaction();

    try {
      await updateVoteState(args.address, args.voteId)

      const voteEntityId = buildVoteEntityId(args.address, args.voteId)
      const vote = await Vote.findOne({id : voteEntityId});
      vote.executed = true
      vote.executedAt = args.timestamp
      vote.save({session})
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

function buildVoteEntityId(appAddress, voteNum){
  return (
    'appAddress:' + appAddress.toString() + '-vote:' + voteNum.toString()
  )
}

async function updateVoteState(votingAddress, voteId){
  // Integrate the voting contract to get the voteData
  // const votingApp = VotingContract.bind(votingAddress)
  // const voteData = votingApp.getVote(voteId)

  let voteData = {
    value6: "6",
    value7: "7",
  };

  const voteEntityId = buildVoteEntityId(votingAddress, voteId);
  const vote = await vote.findOne({id : voteEntityId});
  vote.yea = voteData.value6
  vote.nay = voteData.value7

  vote.save({session})
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
