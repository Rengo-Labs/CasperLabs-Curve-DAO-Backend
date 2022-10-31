const chai = require('chai');
const assert = chai.assert;

require("dotenv").config();
var { request } = require("graphql-request");
const GaugeDeposit = require("../models/gaugeDeposit");
const GaugeLiquidity = require("../models/gaugeLiquidity");
const GaugeWithdraw = require("../models/gaugeWithdraw");

async function UpdateLiquidityLimit(
    user,
    id,
    original_balance,
    original_supply,
    working_balance,
    working_supply,
    transactionHash,
    block,
    timestamp,
    eventObjectId
  ) {
    console.log("Calling handleUpdateLiquidityLimit mutation...");
    let response = await request(
      process.env.GRAPHQL,
      `mutation handleUpdateLiquidityLimit( 
              $user: String!,
              $id: String!,
              $original_balance: String!,
              $original_supply: String!,
              $working_balance: String!,
              $working_supply: String!,
              $transactionHash: String!,
              $block: String!
              $timestamp: String!,
              $eventObjectId : String!
              ){
                  handleUpdateLiquidityLimit( 
                user: $user,
                id: $id,
                original_balance: $original_balance,
                original_supply: $original_supply,
                working_balance: $working_balance,
                working_supply: $working_supply,
                transactionHash: $transactionHash,
                block: $block,
                timestamp: $timestamp,
                eventObjectId : $eventObjectId
                ) {
              result
          }
                    
          }`,
      {
        user: user,
        id: id,
        original_balance: original_balance,
        original_supply: original_supply,
        working_balance: working_balance,
        working_supply: working_supply,
        transactionHash: transactionHash,
        block: block,
        timestamp: timestamp,
        eventObjectId: eventObjectId
      }
    );
    console.log(response);
    return response;
  }
  
async function Deposit(provider, id, value, transactionHash, logIndex, eventObjectId) {
    console.log("Calling handleDeposit mutation...");
    let response = await request(
      process.env.GRAPHQL,
      `mutation handleDeposit( 
                 $provider: String!,
                 $id: String!,
                 $value: String!,
                 $transactionHash: String!,
                 $logIndex: String!,
                 $eventObjectId: String!
  
                 ){
                  handleDeposit( 
                   provider: $provider,
                   id: $id,
                   value: $value,
                   transactionHash: $transactionHash,
                   logIndex: $logIndex,
                   eventObjectId: $eventObjectId
                   ) {
                 result
             }
                       
             }`,
      {
        provider: provider,
        id: id,
        value: value,
        transactionHash: transactionHash,
        logIndex: logIndex,
        eventObjectId: eventObjectId
      }
    );
    console.log(response);
    return response;
  }
  
async function Withdraw(provider, id, value, transactionHash, logIndex, eventObjectId) {
    console.log("Calling handleWithdraw mutation...");
    let response = await request(
      process.env.GRAPHQL,
      `mutation handleWithdraw( 
                 $provider: String!,
                 $id: String!,
                 $value: String!,
                 $transactionHash: String!,
                 $logIndex: String!,
                 $eventObjectId : String!
  
                 ){
                  handleWithdraw( 
                   provider: $provider,
                   id: $id,
                   value: $value,
                   transactionHash: $transactionHash,
                   logIndex: $logIndex,
                   eventObjectId: $eventObjectId
                   ) {
                 result
             }
                       
             }`,
      {
        provider: provider,
        id: id,
        value: value,
        transactionHash: transactionHash,
        logIndex: logIndex,
        eventObjectId: eventObjectId
      }
    );
    console.log(response);
    return response;
  }


  async function gauges(user) {
    console.log("Calling gauges query...");
    let response = await request(
      process.env.GRAPHQL,
      `query gauges($user : String){
        gauges(user : $user){
          user
        }   
        }`,
      {
        user : user
      }
    );
    console.log(response);
    return response;
  }

module.exports = describe('GraphQL Mutations for Gauge', () => {     
    it('handleUpdateLiquidityLimit should return true', async () => {
        const {handleUpdateLiquidityLimit : {result}} = await UpdateLiquidityLimit('user', '01', '1000', '1000','2000','2000','388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c', '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c', '604800',"635fb3b4a89eacba3cd149a5");
        assert.equal(result, true);
        
        let gauge = await GaugeLiquidity.findOne({ id: 'user-01' });
        assert.equal(gauge.id, 'user-01');
        assert.equal(gauge.originalBalance, '1000');
        assert.equal(gauge.originalSupply, '1000');
        assert.equal(gauge.workingBalance, '2000');
        assert.equal(gauge.workingSupply, '2000');
        assert.equal(gauge.timestamp, '604800');
        assert.equal(gauge.block, '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');
        assert.equal(gauge.transaction, '388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');
    })

    it('gauges Should fetch gauges filtered by user', async() => {
      const result = await gauges("user");
      
      result.gauges.forEach(gauge => {
        assert.equal(gauge.user, "user");
      });
    })

    it('handleDeposit should return true', async () => {
        const {handleDeposit : {result}} = await Deposit('provider', '01', '1000', '388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c', '22', "635fb3b4a89eacba3cd149a5");
        assert.equal(result, true);
        let deposit = await GaugeDeposit.findOne({ id: '388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c-22' });
        assert.equal(deposit.id, '388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c-22');
        assert.equal(deposit.gauge, '01');
        assert.equal(deposit.provider, 'provider');
        assert.equal(deposit.value, '1000');
    })

    it('handleWithdraw should return true', async () => {
        const {handleWithdraw : {result}} = await Withdraw('provider', '01', '1000', '388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c', '21', "635fb3b4a89eacba3cd149a5");
        assert.equal(result, true);
        let withdraw = await GaugeWithdraw.findOne({ id: '388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c-21' });
        assert.equal(withdraw.id, '388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c-21');
        assert.equal(withdraw.gauge, '01');
        assert.equal(withdraw.provider, 'provider');
        assert.equal(withdraw.value, '1000');
    })
});