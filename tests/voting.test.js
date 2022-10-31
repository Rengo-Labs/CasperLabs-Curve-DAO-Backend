const chai = require('chai');
const assert = chai.assert;
const VotingApp = require("../models/votingApp");

require("dotenv").config();
var { request } = require("graphql-request");
const Vote = require('../models/vote');
const Voter = require('../models/voter');
const Cast = require('../models/cast');

async function MinimumBalanceSet(address, minBalance, eventObjectId) {
    console.log("Calling handleMinimumBalanceSet mutation...");
    let response = await request(
      process.env.GRAPHQL,
      `mutation handleMinimumBalanceSet( 
                 $address: String!,
                 $minBalance: String!,
                 $eventObjectId : String!
                 ){
                  handleMinimumBalanceSet( 
                   address: $address,
                   minBalance: $minBalance,
                   eventObjectId: $eventObjectId
                   ) {
                 result
             }
                       
             }`,
      {
        address: address,
        minBalance: minBalance,
        eventObjectId:eventObjectId
      }
    );
    console.log(response);
    return response;
  }
  
async function MinimumTimeSet(address, minTime, eventObjectId) {
    console.log("Calling handleMinimumTimeSet mutation...");
    let response = await request(
      process.env.GRAPHQL,
      `mutation handleMinimumTimeSet( 
                 $address: String!,
                 $minTime: String!,
                 $eventObjectId : String!
  
                 ){
                  handleMinimumTimeSet( 
                   address: $address,
                   minTime: $minTime,
                   eventObjectId : $eventObjectId
                   ) {
                 result
             }
                       
             }`,
      {
        address: address,
        minTime: minTime,
        eventObjectId:eventObjectId
      }
    );
    console.log(response);
    return response;
  }
  
async function ChangeMinQuorum(address, minAcceptQuorumPct, eventObjectId) {
    console.log("Calling handleChangeMinQuorum mutation...");
    let response = await request(
      process.env.GRAPHQL,
      `mutation handleChangeMinQuorum( 
                 $address: String!,
                 $minAcceptQuorumPct: String!,
                 $eventObjectId : String!
  
                 ){
                  handleChangeMinQuorum( 
                   address: $address,
                   minAcceptQuorumPct: $minAcceptQuorumPct,
                   eventObjectId: $eventObjectId
                   ) {
                 result
             }
                       
             }`,
      {
        address: address,
        minAcceptQuorumPct: minAcceptQuorumPct,
        eventObjectId:eventObjectId
      }
    );
    console.log(response);
    return response;
  }
  
async function ChangeSupportRequired(address, supportRequiredPct,eventObjectId) {
    console.log("Calling handleChangeSupportRequired mutation...");
    let response = await request(
      process.env.GRAPHQL,
      `mutation handleChangeSupportRequired( 
                 $address: String!,
                 $supportRequiredPct: String!,
                 $eventObjectId: String!
  
                 ){
                  handleChangeSupportRequired( 
                   address: $address,
                   supportRequiredPct: $supportRequiredPct,
                   eventObjectId: $eventObjectId
                   ) {
                 result
             }
                       
             }`,
      {
        address: address,
        supportRequiredPct: supportRequiredPct,
        eventObjectId: eventObjectId
      }
    );
    console.log(response);
    return response;
  }
  
async function StartVote(
    creator,
    voteId,
    metadata,
    transactionFrom,
    eventObjectId
  ) {
    console.log("Calling handleStartVote mutation...");
    let response = await request(
      process.env.GRAPHQL,
      `mutation handleStartVote(
        $creator: String!,
        $voteId: String!,
        $metadata: String!,
        $transactionFrom: String!,
        $eventObjectId: String!,
        ){
            handleStartVote(
          creator: $creator,
          voteId: $voteId,
          metadata: $metadata,
          transactionFrom: $transactionFrom,
          eventObjectId : $eventObjectId
          ) {
        result
    }
              
    }`,
{
creator: creator,
voteId: voteId,
metadata: metadata,
transactionFrom : transactionFrom,
eventObjectId: eventObjectId,
});
    console.log(response);
    return response;
  }
  
async function CastVote(
    voteId,
    voter,
    stake,
    supports,
    timestamp,
    eventObjectId
  ) {
    console.log("Calling handleCastVote mutation...");
    let response =  await request(
      process.env.GRAPHQL,
      `mutation handleCastVote(
        $voteId: String!,
        $voter: String!,
        $stake: String!,
        $supports: Boolean!,
        $timestamp: String!,
        $eventObjectId: String!,
        ){
            handleCastVote(
          voteId: $voteId,
          voter: $voter,
          stake: $stake,
          supports: $supports,
          timestamp: $timestamp,
          eventObjectId : $eventObjectId
          ) {
        result
    }
              
    }`,
{
voteId: voteId,
voter: voter,
stake: stake,
supports: supports,
timestamp: timestamp,
eventObjectId: eventObjectId,
});
    console.log(response);
    return response;
  }
  
async function ExecuteVote(voteId, timestamp, eventObjectId) {
    console.log("Calling handleExecuteVote mutation...");
    let response = await request(
      process.env.GRAPHQL,
      `mutation handleExecuteVote(
                  $voteId: String!,
                  $timestamp: String!,
                  $eventObjectId : String!,
                  ){
                      handleExecuteVote(
                    voteId: $voteId,
                    timestamp: $timestamp,
                    eventObjectId : $eventObjectId,
                    ) {
                  result
              }
                        
              }`,
      {
        voteId: voteId,
        timestamp: timestamp,
        eventObjectId: eventObjectId,
      }
    );
    console.log(response);
    return response;
  }

async function castsByVoter(voterAccount){
  console.log("Calling castsByVoter query...");
  let response = await request(
    process.env.GRAPHQL,
    `query castsByVoter(
                $voterAccount: String!,
                ){
                  castsByVoter(
                    voterAccount: $voterAccount
                  ) {
                voter { id }
            }       
            }`,
    {
      voterAccount: voterAccount,
    }
  );
  console.log(response);
  return response;
}

async function castsByVoteId(voteId){
  console.log("Calling castsByVoteId query...");
  let response = await request(
    process.env.GRAPHQL,
    `query castsByVoteId(
                $voteId: String!,
                ){
                  castsByVoteId(
                    voteId: $voteId
                  ) {
                vote { id }
            }       
            }`,
    {
      voteId: voteId,
    }
  );
  console.log(response);
  return response;
}

async function votes(){
  console.log("Calling votes query...");
  let response = await request(
    process.env.GRAPHQL,
    `query votes{
      votes{
        id
      }   
      }`
  );
  console.log(response);
  return response;
}

async function votesByCreator(creator){
  console.log("Calling votesByCreator query...");
  let response = await request(
    process.env.GRAPHQL,
    `query votesByCreator(
                $creator: String!,
                ){
                  votesByCreator(
                    creator: $creator
                  ) {
                creator 
            }       
            }`,
    {
      creator: creator,
    }
  );
  console.log(response);
  return response;
}

async function votesByVoteIdAndCreator(voteId, creator){
  console.log("Calling votesByVoteIdAndCreator query...");
  let response = await request(
    process.env.GRAPHQL,
    `query votesByVoteIdAndCreator(
                $creator: String!,
                $voteId : String!
                ){
                  votesByVoteIdAndCreator(
                    creator: $creator,
                    voteId : $voteId 
                  ) {
                id,
                creator 
            }       
            }`,
    {
      voteId : voteId,
      creator: creator,
    }
  );
  console.log(response);
  return response;
}

async function votesByVoteId(voteId){
  console.log("Calling votesByVoteId query...");
  let response = await request(
    process.env.GRAPHQL,
    `query votesByVoteId(
                $voteId : String!
                ){
                  votesByVoteId(
                    voteId : $voteId 
                  ) {
                id 
            }       
            }`,
    {
      voteId : voteId,
    }
  );
  console.log(response);
  return response;
}

  module.exports = describe('GraphQL Mutations for voting', () => {     

      it('handleMinimumBalanceSet should return true', async () => {
        const {handleMinimumBalanceSet : {result}} = await MinimumBalanceSet('388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c', '500', "635fb3b4a89eacba3cd149a5");
        assert.equal(result, true);
        let voting = await VotingApp.findOne({ id: '388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c' });
        assert.equal(voting.id, '388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');
        assert.equal(voting.address, '388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');

      })
  
      it('handleMinimumTimeSet should return true', async () => {
          const {handleMinimumTimeSet : {result}} = await MinimumTimeSet('388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468v', '604800', "635fb3b4a89eacba3cd149a5");
          assert.equal(result, true);
          let voting = await VotingApp.findOne({ id: '388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468v' });
          assert.equal(voting.id, '388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468v');
          assert.equal(voting.address, '388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468v');
      })
  
      it('handleChangeMinQuorum should return true', async () => {
          const {handleChangeMinQuorum : {result}} = await ChangeMinQuorum('388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468d', '20', "635fb3b4a89eacba3cd149a5");
          assert.equal(result, true);
          let voting = await VotingApp.findOne({ id: '388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468d' });
          assert.equal(voting.id, '388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468d');
          assert.equal(voting.address, '388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468d');
      })
      
      it('handleChangeSupportRequired should return true', async () => {
          const {handleChangeSupportRequired : {result}} = await ChangeSupportRequired('388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468f','20', "635fb3b4a89eacba3cd149a5");
          assert.equal(result, true);
          let voting = await VotingApp.findOne({ id: '388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468f' });
          assert.equal(voting.id, '388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468f');
          assert.equal(voting.address, '388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468f');
      })
  
      it('handleStartVote should return true', async () => {

          const {handleStartVote : {result}} = 
          await StartVote(
            'creator',
            'voteId',
            'meta', 
            'fromAddress',
            "635fb3b4a89eacba3cd149a5"
            );
          assert.equal(result, true);
          let vote = await Vote.findOne({id : "voteId"});
          assert.equal(vote.originalCreator, 'fromAddress');
          assert.equal(vote.creator, 'creator');
          assert.equal(vote.metadata, 'meta');
          assert.equal(vote.voteNum, 'voteId');
      })

      it('handleCastVote should return true', async () => {
        
        const {handleCastVote : {result}} = 
        await CastVote(
          'voteId',
          'voter',
          '100', 
          true,
          '604800', 
          '635fb3b4a89eacba3cd149a5');
        assert.equal(result, true);
        let vote = await Vote.findOne({id : "voteId"})
        assert.exists(vote.yea, 'yea is neither null nor undefined');
        assert.exists(vote.nay, 'nay  is neither null nor undefined');

        let voter = await Voter.findOne({id : "voter"})
        assert.equal(voter.address , 'voter');
        
        let castVote = await Cast.findOne({id : "voteId-voter:voter"});
        assert.equal(castVote.voterStake, '100');
        assert.equal(castVote.supports, true);
        assert.equal(castVote.createdAt, '604800');

      })

      it('handleExecuteVote should return true', async () => {
        
          const {handleExecuteVote : {result}} = await ExecuteVote(
            'voteId',
            '604800',
            "635fb3b4a89eacba3cd149a5");
          assert.equal(result, true);
          let vote = await Vote.findOne({id : "voteId"})
          assert.exists(vote.yea, 'yea is neither null nor undefined');
          assert.exists(vote.nay, 'nay is neither null nor undefined');
          assert.equal(vote.executed, true);
          assert.equal(vote.executedAt, '604800');
      })

      it('castsByVoter should return casts', async () => {
        
        const result = await castsByVoter("voter");
        result.castsByVoter.forEach(cast => {
          assert.equal(cast.voter.id, "voter");
        });
      })

      it('castsByVoteId should return casts', async () => {
          
        const result = await castsByVoteId("voteId");
        result.castsByVoteId.forEach(cast => {
          assert.equal(cast.vote.id, "voteId");
        });
      })  

      it('votes should return votes', async () => {
        const result = await votes();
        result.votes.forEach(vote => {
          assert.exists(vote.id, "vote id is neither null nor undefined.");
        });
      })
      
      it('votesByCreator should return votes', async () => {
          
        const result = await votesByCreator("creator");
        result.votesByCreator.forEach(vote => {
          assert.equal(vote.creator, "creator");
        });
      }) 
      
      it('votesByVoteIdAndCreator should return votes', async () => {
          
        const result = await votesByVoteIdAndCreator("voteId", "creator");
        result.votesByVoteIdAndCreator.forEach(vote => {
          assert.equal(vote.creator, "creator");
          assert.equal(vote.id, "voteId");
        });
      }) 

      it('votesByVoteId should return votes', async () => {
          
        const result = await votesByVoteId("voteId");
        result.votesByVoteId.forEach(vote => {
          assert.equal(vote.id, "voteId");
        });
      }) 
  
  });
  