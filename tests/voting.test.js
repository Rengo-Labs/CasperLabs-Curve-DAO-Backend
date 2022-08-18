const chai = require('chai');
const assert = chai.assert;

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


  describe('GraphQL Mutations for voting', () => {     

    it('handleMinimumBalanceSet should return true', async () => {
      const {handleMinimumBalanceSet : {result}} = await MinimumBalanceSet('address', '500');
      assert.equal(result, true);
        })
  
    //   it('handleMinimumTimeSet should return true', async () => {
    //       const {handleMinimumTimeSet : {result}} = await MinimumTimeSet('address', '604800');
    //       assert.equal(result, true);
    //   })
  
    //   it('handleChangeMinQuorum should return true', async () => {
    //       const {handleChangeMinQuorum : {result}} = await ChangeMinQuorum('address', '20');
    //       assert.equal(result, true);
    //   })
      
    //   it('handleChangeSupportRequired should return true', async () => {
    //       const {handleChangeSupportRequired : {result}} = await ChangeSupportRequired('address','20');
    //       assert.equal(result, true);
    //   })
  
    //   it('handleStartVote should return true', async () => {
    //       const {handleStartVote : {result}} = await StartVote('address', 'creator','voteid','meta data', 'creatorvotingpower', '604800', 'block', 'txhash');
    //       assert.equal(result, true);
    //   })

    //   it('handleCastVote should return true', async () => {
    //     const {handleCastVote : {result}} = await CastVote('address', 'voteid','voter','stake', 'supports','604800', 'block', 'txhash', 'logindex');
    //     assert.equal(result, true);
    // })

    // it('handleExecuteVote should return true', async () => {
    //     const {handleExecuteVote : {result}} = await ExecuteVote('address', 'voteid','604800','block', 'txhash');
    //     assert.equal(result, true);
    // })
  
  });
  