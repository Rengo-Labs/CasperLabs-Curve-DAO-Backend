const chai = require('chai');
const assert = chai.assert;

require("dotenv").config();
var { request } = require("graphql-request");
const DaoPower = require("../models/daopower");
const VotingPower = require("../models/votingPower");
const UserBalance = require("../models/userBalance");
const VotingEscrow = require("../models/votingEscrow");
  
async function VotingDeposit(provider, value, locktime, type, timestamp, block_hash, eventObjectId) {
    console.log("Calling handleDeposit mutation...");
    let response = await request(
        process.env.GRAPHQL,
        `mutation handleVotingDeposit( $provider: String!,$value: String!,$locktime: String!,$type: String!,$timestamp: String!, $block: String!, $eventObjectId: String!){
           handleVotingDeposit( provider: $provider,value: $value,locktime: $locktime,type: $type,timestamp: $timestamp, block: $block, eventObjectId: $eventObjectId) {
          result
      }
                
      }`,
{
 provider: provider,
 value: value,
 locktime: locktime,
 type: type,
 timestamp: timestamp,
 block: block_hash,
 eventObjectId: eventObjectId,
}
);
    console.log(response);
    return response;
  }
  
async function VotingWithdraw(provider, value, timestamp, block_hash, eventObjectId) {
    console.log("Calling handleWithdraw mutation...");
    let response =  await request(
        process.env.GRAPHQL,
        `mutation handleVotingWithdraw( $provider: String!,$value: String!,$timestamp: String!, $block: String!, $eventObjectId: String!){
           handleVotingWithdraw( provider: $provider,value: $value,timestamp: $timestamp, block: $block, eventObjectId: $eventObjectId) {
          result
      }
                
      }`,
{
 provider: provider,
 value: value,
 timestamp: timestamp,
 block: block_hash,
 eventObjectId: eventObjectId,
}
);
    console.log(response);
    return response;
  }

  async function votingEscrows() {
    console.log("Calling votingEscrows query...");
    let response = await request(
      process.env.GRAPHQL,
      `query votingEscrows{
        votingEscrows{
          id
        }   
        }`
    );
    console.log(response);
    return response;
  }

  async function daoPowersByBlock() {
    console.log("Calling daoPowersByBlock query...");
    let response = await request(
      process.env.GRAPHQL,
      `query daoPowersByBlock{
        daoPowersByBlock{
          id
        }   
        }`
    );
    console.log(response);
    return response;
  }

  async function daoPowersByTimestamp() {
    console.log("Calling daoPowersByTimestamp query...");
    let response = await request(
      process.env.GRAPHQL,
      `query daoPowersByTimestamp{
        daoPowersByTimestamp{
          id
        }   
        }`
    );
    console.log(response);
    return response;
  }
  

  async function votingPower(id) {
    console.log("Calling votingPower query...");
    let response = await request(
      process.env.GRAPHQL,
      `query votingPower($id : String){
        votingPower(id : $id){
          id
        }   
        }`,
      {
       id : id 
      }
    );
    console.log(response);
    return response;
  }
  
  async function userBalancesByUnlockTime() {
    console.log("Calling userBalancesByUnlockTime query...");
    let response = await request(
      process.env.GRAPHQL,
      `query userBalancesByUnlockTime{
        userBalancesByUnlockTime{
          id
        }   
        }`
    );
    console.log(response);
    return response;
  }

  async function userBalancesByWeight(first, skip) {
    console.log("Calling userBalancesByWeight query...");
    let response = await request(
      process.env.GRAPHQL,
      `query userBalancesByWeight($first : String!, $skip : String!){
        userBalancesByWeight(first : $first, skip : $skip){
          id
        }   
        }`,
      {
        first : first,
        skip : skip
      }
    );
    console.log(response);
    return response;
  }

module.exports = describe('GraphQL Mutations for Gauge', () => {     

    it('handleVotingDeposit should return true', async () => {
        
        const {handleVotingDeposit : {result}} = await VotingDeposit('provider', 'value', '1000', 'type', '604800', "block", "635fb3b4a89eacba3cd149a5");
        
        assert.equal(result, true);
        let daopower = await DaoPower.findOne({id : `block-604800`})
        assert.exists(daopower.totalPower, 'total power is null or undefined');
        assert.equal(daopower.block, 'block');
        assert.equal(daopower.timestamp, '604800');
        
        let votingpower = await VotingPower.findOne({id : "provider"});
        assert.exists(votingpower.power, 'power is null or undefined');

        let userbalance = await UserBalance.findOne({id : "provider"});
        assert.equal(userbalance.user, 'provider');
        assert.equal(userbalance.unlock_time, '1000');
        assert.equal(userbalance.CRVLocked, 'value');
        
        let votingescrow = await VotingEscrow.findOne({id : "provider"});
        assert.exists(votingescrow.totalPower, 'totalPower is null or undefined');
        assert.equal(votingescrow.provider, 'provider');
        assert.equal(votingescrow.locktime, '1000');
        assert.equal(votingescrow.value, 'value');
        assert.equal(votingescrow.type, 'type');
        assert.equal(votingescrow.timestamp, '604800');
    })

    it('handleVotingWithdraw should return true', async () => {
        
        const {handleVotingWithdraw : {result}} = await VotingWithdraw('provider', 'value', '604800', "block", "635fb3b4a89eacba3cd149a5");
        
        assert.equal(result, true);
        let daopower = await DaoPower.findOne({id : `block-604800`})
        assert.exists(daopower.totalPower, 'total power is null or undefined');
        assert.equal(daopower.block, 'block');
        assert.equal(daopower.timestamp, '604800');
        
        let votingpower = await VotingPower.findOne({id : "provider"});
        assert.exists(votingpower.power, 'power is null or undefined');
        
        let userbalance = await UserBalance.findOne({id : "provider"});
        assert.equal(userbalance.user, 'provider');
        assert.equal(userbalance.CRVLocked, 'value');
        
        let votingescrow = await VotingEscrow.findOne({id : "provider"});
        assert.exists(votingescrow.totalPower, 'totalPower is null or undefined');
        assert.equal(votingescrow.provider, 'provider');
        assert.equal(votingescrow.value, 'value');
        assert.equal(votingescrow.timestamp, '604800');
    })

    it('votingEscrows Should fetch votingEscrows', async() => {
        const result = await votingEscrows();
        result.votingEscrows.forEach(votingEscrow => {
          assert.exists(votingEscrow.id, "votingEscrow id is neither null nor undefined");
        });
    })

    it('daoPowersByBlock Should fetch daoPowers sorted Block', async() => {
      const result = await daoPowersByBlock();
      result.daoPowersByBlock.forEach(daoPower => {
        assert.exists(daoPower.id, "daoPower id is neither null nor undefined");
      });
    })

    it('daoPowersByTimestamp Should fetch daoPowers sorted by Timestamp', async() => {
      const result = await daoPowersByTimestamp();
      result.daoPowersByTimestamp.forEach(daoPower => {
        assert.exists(daoPower.id, "daoPower id is neither null nor undefined");
      });
    })

    it('votingPower Should fetch votingPowers filtered by id', async() => {
      const result = await votingPower("provider");
      result.votingPower.forEach(votingPower => {
        assert.equal(votingPower.id, "provider");
      });
    })

    it('userBalancesByUnlockTime Should fetch userBalances sorted by Unlock time', async() => {
      const result = await userBalancesByUnlockTime();
      result.userBalancesByUnlockTime.forEach(userBalance => {
        assert.exists(userBalance.id, "userBalance id is neither null nor undefined");
      });
    })
    
    it('userBalancesByWeight Should fetch userBalances sorted by weight', async() => {
      const result = await userBalancesByWeight("5","0");
      
      result.userBalancesByWeight.forEach(userBalance => {
        assert.exists(userBalance.id, "userBalance id is neither null nor undefined");
      });
    })
});