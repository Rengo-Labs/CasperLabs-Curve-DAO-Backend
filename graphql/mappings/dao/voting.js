require("dotenv").config();
const { GraphQLString } = require("graphql");
const mongoose = require("mongoose");
const Response = require("../../../models/response");
const { responseType } = require("../../types/response");

const Proposal = require("../../../models/proposal");
const ProposalVote = require("../../../models/proposalVote");
const VotingApp = require("../../../models/votingApp");
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
      let app = await getOrRegisterVotingApp(args.address,session);
      let creator = await getOrRegisterAccount(args.creator, session);

      //   let proposalData = await votingContract.getVote(args.address,args.voteId);
      let proposalData = {
        value2: "2",
        value3: "3",
        value4: "4",
        value5: "5",
        value6: "6",
        value7: "7",
        value8: "8",
        value9: "9",
      };
      let proposal = new Proposal({
        id: args.address + "-" + args.voteId,
        number: args.voteId,
        app: app.id,
        creator: creator.id,
        expireDate: (
          (new bigdecimal.BigDecimal(proposalData.value2)).add(new bigdecimal.BigDecimal(app.voteTime))
        ).toString(),
        // Proposal parameters
        executionScript: proposalData.value9,
        minimumQuorum: proposalData.value5,
        requiredSupport: proposalData.value4,
        snapshotBlock: proposalData.value3,
        votingPower: proposalData.value8,
        // Parse proposal metadata
        metadata: args.metadata,
        voteCount: "0",
        positiveVoteCount: proposalData.value6,
        negativeVoteCount: proposalData.value7,

        totalStaked: args.creatorVotingPower,
        stakedSupport: args.creatorVotingPower,
        currentQuorum: (
          (new bigdecimal.BigDecimal(args.creatorVotingPower)).divide(new bigdecimal.BigDecimal(proposalData.value8),18,halfUp)
        ).toString(),
        currentSupport: (
          (new bigdecimal.BigDecimal(args.creatorVotingPower)).divide(new bigdecimal.BigDecimal(proposalData.value8),18,halfUp)
        ).toString(),
        created: args.timestamp,
        createdAtBlock: args.block,
        createdAtTransaction: args.transactionHash,
      });

      await Proposal.create([proposal],{session});
      // TODO: enable again when IPFS supported on Subgraph Studio
      // if (event.params.metadata.startsWith('ipfs:')) {
      //   let hash = event.params.metadata.slice(5) // because string.replace() is not supported on current AS version
      //   let content = ipfs.cat(hash)
      //
      //   if (content != null) {
      //     let jsonFile = json.try_fromBytes(content as Bytes)
      //
      //     if (jsonFile.isOk) {
      //       let value = jsonFile.value
      //
      //       if (value != null) {
      //         let metadata = value.toObject()
      //
      //         if (metadata.isSet('text')) {
      //           let text = metadata.get('text')
      //
      //           if (text != null) {
      //             proposal.text = text.toString()
      //           }
      //         }
      //       }
      //     } else {
      //       log.warning('Failed to parse JSON metadata, hash: {}, raw_data: {}', [hash, content.toHexString()])
      //     }
      //   } else {
      //     log.warning('Metadata failed to load from IPFS, hash: {}', [hash])
      //   }
      // }

      // Voting app
      app.proposalCount = ((new bigdecimal.BigDecimal(app.proposalCount)).add(new bigdecimal.BigDecimal("1"))).toString();
      await app.save({session});
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
      let proposal = await Proposal.findOne({
        id: args.address + "-" + args.voteId.toString(),
      });

      if (proposal != null) {
        let voter = await getOrRegisterAccount(args.voter, session);

        let vote = new ProposalVote({
          id: args.transactionHash + "-" + args.logIndex,
          proposal: proposal.id,
          stake: args.stake,
          supports: args.supports,
          voter: voter.id,
          created: args.timestamp,
          createdAtBlock: args.block,
          createdAtTransaction: args.transactionHash,
        });
        await ProposalVote.create([vote],{session});
        console.log(vote);

        // Update proposal counters
        proposal.voteCount = (
          (new bigdecimal.BigDecimal(proposal.voteCount)).add(new bigdecimal.BigDecimal("1"))
        ).toString();
        proposal.totalStaked = (
          (new bigdecimal.BigDecimal(proposal.totalStaked)).add(new bigdecimal.BigDecimal(vote.stake))
        ).toString();
        proposal.currentQuorum = (
          (new bigdecimal.BigDecimal(proposal.totalStaked)).divide(new bigdecimal.BigDecimal(proposal.votingPower))
        ).toString();

        if (vote.supports) {
          proposal.positiveVoteCount = (
            (new bigdecimal.BigDecimal(proposal.positiveVoteCount)).add(new bigdecimal.BigDecimal("1"))
          ).toString();
          proposal.stakedSupport = (
            (new bigdecimal.BigDecimal(proposal.stakedSupport)).add(new bigdecimal.BigDecimal(vote.stake))
          ).toString();
          proposal.currentSupport = (
            (new bigdecimal.BigDecimal(proposal.stakedSupport)).divide(new bigdecimal.BigDecimal(proposal.votingPower),18,halfUp)
          ).toString();
        } else {
          proposal.negativeVoteCount = (
            (new bigdecimal.BigDecimal(proposal.negativeVoteCount)).add(new bigdecimal.BigDecimal("1"))
          ).toString();
        }

        proposal.updated = args.timestamp;
        proposal.updatedAtBlock = args.block;
        proposal.updatedAtTransaction = args.transactionHash;

        await proposal.save({session});

        // Update voting app counters
        let app = await getOrRegisterVotingApp(args.address,session);
        app.voteCount = ((new bigdecimal.BigDecimal(app.voteCount)).add(new bigdecimal.BigDecimal("1"))).toString();
        await app.save({session});
      }
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
      let proposal = await Proposal.findOne({
        id: args.address + "-" + args.voteId.toString(),
      });

      if (proposal != null) {
        proposal.executed = args.timestamp;
        proposal.executedAtBlock = args.block;
        proposal.executedAtTransaction = args.transactionHash;
        await proposal.save({session});
      }
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
  handleMinimumBalanceSet,
  handleMinimumTimeSet,
  handleChangeMinQuorum,
  handleChangeSupportRequired,
  handleStartVote,
  handleCastVote,
  handleExecuteVote,
};
