const chai = require('chai');
const assert = chai.assert;
const Proposal = require("../models/proposal");
const ProposalVote = require("../models/proposalVote");
const VotingApp = require("../models/votingApp");

require("dotenv").config();
var { request } = require("graphql-request");

async function MinimumBalanceSet(address, minBalance) {
    console.log("Calling handleMinimumBalanceSet mutation...");
    let response = await request(
      process.env.GRAPHQL,
      `mutation handleMinimumBalanceSet( 
                 $address: String!,
                 $minBalance: String!,
  
                 ){
                  handleMinimumBalanceSet( 
                   address: $address,
                   minBalance: $minBalance,
                   ) {
                 result
             }
                       
             }`,
      {
        address: address,
        minBalance: minBalance,
      }
    );
    console.log(response);
    return response;
  }
  
async function MinimumTimeSet(address, minTime) {
    console.log("Calling handleMinimumTimeSet mutation...");
    let response = await request(
      process.env.GRAPHQL,
      `mutation handleMinimumTimeSet( 
                 $address: String!,
                 $minTime: String!,
  
                 ){
                  handleMinimumTimeSet( 
                   address: $address,
                   minTime: $minTime,
                   ) {
                 result
             }
                       
             }`,
      {
        address: address,
        minTime: minTime,
      }
    );
    console.log(response);
    return response;
  }
  
async function ChangeMinQuorum(address, minAcceptQuorumPct) {
    console.log("Calling handleChangeMinQuorum mutation...");
    let response = await request(
      process.env.GRAPHQL,
      `mutation handleChangeMinQuorum( 
                 $address: String!,
                 $minAcceptQuorumPct: String!,
  
                 ){
                  handleChangeMinQuorum( 
                   address: $address,
                   minAcceptQuorumPct: $minAcceptQuorumPct,
                   ) {
                 result
             }
                       
             }`,
      {
        address: address,
        minAcceptQuorumPct: minAcceptQuorumPct,
      }
    );
    console.log(response);
    return response;
  }
  
async function ChangeSupportRequired(address, supportRequiredPct) {
    console.log("Calling handleChangeSupportRequired mutation...");
    let response = await request(
      process.env.GRAPHQL,
      `mutation handleChangeSupportRequired( 
                 $address: String!,
                 $supportRequiredPct: String!,
  
                 ){
                  handleChangeSupportRequired( 
                   address: $address,
                   supportRequiredPct: $supportRequiredPct,
                   ) {
                 result
             }
                       
             }`,
      {
        address: address,
        supportRequiredPct: supportRequiredPct,
      }
    );
    console.log(response);
    return response;
  }
  
async function StartVote(
    address,
    creator,
    voteId,
    metadata,
    creatorVotingPower,
    timestamp,
    block,
    transactionHash
  ) {
    console.log("Calling handleStartVote mutation...");
    let response = await request(
      process.env.GRAPHQL,
      `mutation handleStartVote( 
                  $address: String!,
                  $creator: String!,
                  $voteId: String!,
                  $metadata: String!,
                  $creatorVotingPower: String!,
                  $timestamp: String!,
                  $block: String!,
                  $transactionHash: String!,
                  ){
                      handleStartVote( 
                    address: $address,
                    creator: $creator,
                    voteId: $voteId,
                    metadata: $metadata,
                    creatorVotingPower: $creatorVotingPower,
                    timestamp: $timestamp,
                    block: $block,
                    transactionHash: $transactionHash,
                    ) {
                  result
              }
                        
              }`,
      {
        address: address,
        creator: creator,
        voteId: voteId,
        metadata: metadata,
        creatorVotingPower: creatorVotingPower,
        timestamp: timestamp,
        block: block,
        transactionHash: transactionHash,
      }
    );
    console.log(response);
    return response;
  }
  
async function CastVote(
    address,
    voteId,
    voter,
    stake,
    supports,
    timestamp,
    block,
    transactionHash,
    logIndex
  ) {
    console.log("Calling handleCastVote mutation...");
    let response = await request(
      process.env.GRAPHQL,
      `mutation handleCastVote( 
                  $address: String!,
                  $voteId: String!,
                  $voter: String!,
                  $stake: String!,
                  $supports: String!,
                  $timestamp: String!,
                  $block: String!,
                  $transactionHash: String!,
                  $logIndex: String!
                  ){
                      handleCastVote( 
                    address: $address,
                    voteId: $voteId,
                    voter: $voter,
                    stake: $stake,
                    supports: $supports,
                    timestamp: $timestamp,
                    block: $block,
                    transactionHash: $transactionHash,
                    logIndex: $logIndex
                    ) {
                  result
              }
                        
              }`,
      {
        address: address,
        voteId: voteId,
        voter: voter,
        stake: stake,
        supports: supports,
        timestamp: timestamp,
        block: block,
        transactionHash: transactionHash,
        logIndex: logIndex,
      }
    );
    console.log(response);
    return response;
  }
  
async function ExecuteVote(address, voteId, timestamp, block, transactionHash) {
    console.log("Calling handleExecuteVote mutation...");
    let response = await request(
      process.env.GRAPHQL,
      `mutation handleExecuteVote( 
                  $address: String!,
                  $voteId: String!,
                  $timestamp: String!,
                  $block: String!,
                  $transactionHash: String!,
                  ){
                      handleExecuteVote( 
                    address: $address,
                    voteId: $voteId,
                    timestamp: $timestamp,
                    block: $block,
                    transactionHash: $transactionHash,
                    ) {
                  result
              }
                        
              }`,
      {
        address: address,
        voteId: voteId,
        timestamp: timestamp,
        block: block,
        transactionHash: transactionHash,
      }
    );
    console.log(response);
    return response;
  }

  module.exports = describe('GraphQL Mutations for voting', () => {     

      it('handleMinimumBalanceSet should return true', async () => {
        const {handleMinimumBalanceSet : {result}} = await MinimumBalanceSet('388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c', '500');
        assert.equal(result, true);
        let voting = await VotingApp.findOne({ id: '388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c' });
        assert.equal(voting.id, '388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');
        assert.equal(voting.address, '388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');

      })
  
      it('handleMinimumTimeSet should return true', async () => {
          const {handleMinimumTimeSet : {result}} = await MinimumTimeSet('388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468v', '604800');
          assert.equal(result, true);
          let voting = await VotingApp.findOne({ id: '388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468v' });
          assert.equal(voting.id, '388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468v');
          assert.equal(voting.address, '388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468v');
      })
  
      it('handleChangeMinQuorum should return true', async () => {
          const {handleChangeMinQuorum : {result}} = await ChangeMinQuorum('388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468d', '20');
          assert.equal(result, true);
          let voting = await VotingApp.findOne({ id: '388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468d' });
          assert.equal(voting.id, '388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468d');
          assert.equal(voting.address, '388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468d');
      })
      
      it('handleChangeSupportRequired should return true', async () => {
          const {handleChangeSupportRequired : {result}} = await ChangeSupportRequired('388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468f','20');
          assert.equal(result, true);
          let voting = await VotingApp.findOne({ id: '388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468f' });
          assert.equal(voting.id, '388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468f');
          assert.equal(voting.address, '388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468f');
      })
  
      it('handleStartVote should return true', async () => {
          const {handleStartVote : {result}} = await StartVote('388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c', 'creator','22','meta', '33', '604800', '388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c', '388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');
          assert.equal(result, true);
          let proposal = await Proposal.findOne({ id: '388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c-22' });
          assert.equal(proposal.id, '388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c-22');
          assert.equal(proposal.number, '22');
          assert.equal(proposal.app, '388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');
          assert.equal(proposal.creator, 'creator');
          assert.equal(proposal.metadata, 'meta');
          assert.equal(proposal.totalStaked, '33');
          assert.equal(proposal.stakedSupport, '33');
          assert.equal(proposal.currentQuorum, '4.125000000000000000');
          assert.equal(proposal.currentSupport, '4.125000000000000000');
          assert.equal(proposal.created, '604800');
          assert.equal(proposal.createdAtBlock, '388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');
          assert.equal(proposal.createdAtTransaction, '388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');
      })

      it('handleCastVote should return true', async () => {
        // const {handleCastVote : {result}} = await CastVote('address', 'voteid','voter','stake', 'supports','604800', 'block', 'txhash', 'logindex');
        const {handleCastVote : {result}} = await CastVote('388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c', '22','voter','100', 'true','604800', '388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c', '388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c', '10');
        assert.equal(result, true);
        let proposal = await ProposalVote.findOne({ id: '388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c-10' });
        assert.equal(proposal.id, '388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c-10');
        assert.equal(proposal.proposal, '388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c-22');
        assert.equal(proposal.stake, '100');
        assert.equal(proposal.supports, true);
        assert.equal(proposal.voter, 'voter');
        assert.equal(proposal.created, '604800');
        assert.equal(proposal.createdAtBlock, '388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');
        assert.equal(proposal.createdAtTransaction, '388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');

        let propose = await Proposal.findOne({ id: '388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c-22' });
        assert.equal(propose.updated, '604800');
        assert.equal(propose.updatedAtBlock, '388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');
        assert.equal(propose.updatedAtTransaction, '388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');

        let voting = await VotingApp.findOne({ id: '388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c' });
          assert.equal(voting.id, '388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');
          assert.equal(voting.address, '388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');
          assert.equal(voting.voteCount, '1');
     })

    it('handleExecuteVote should return true', async () => {
        const {handleExecuteVote : {result}} = await ExecuteVote('address', 'voteid','604800','block', 'txhash');
        assert.equal(result, true);
    })
  
  });
  