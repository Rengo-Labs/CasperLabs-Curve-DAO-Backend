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
        `mutation handleVotingDeposit( $provider: String!,$value: String!,$locktime: String!,$type: String!,$timestamp: String!, block: String!, eventObjectId: String!){
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
        `mutation handleVotingWithdraw( $provider: String!,$value: String!,$timestamp: String!, block: String!, eventObjectId: String!){
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

module.exports = describe('GraphQL Mutations for Gauge', () => {     

    it('handleVotingDeposit should return true', async () => {
        const {handleVotingDeposit : {result}} = await VotingDeposit('provider', 'value', '1000', 'type', '604800', "block", "eventObjectId");
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
        const {handleVotingWithdraw : {result}} = await VotingWithdraw('provider', 'value', '604800', "block", "eventObjectId");
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
});