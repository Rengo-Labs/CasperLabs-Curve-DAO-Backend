const chai = require('chai');
const assert = chai.assert;

require("dotenv").config();
var { request } = require("graphql-request");

async function UpdateLiquidityLimit(
    user,
    id,
    original_balance,
    original_supply,
    working_balance,
    working_supply,
    transactionHash,
    block,
    timestamp
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
      }
    );
    console.log(response);
    return response;
  }
  
async function Deposit(provider, id, value, transactionHash, logIndex) {
    console.log("Calling handleDeposit mutation...");
    let response = await request(
      process.env.GRAPHQL,
      `mutation handleDeposit( 
                 $provider: String!,
                 $id: String!,
                 $value: String!,
                 $transactionHash: String!,
                 $logIndex: String!
  
                 ){
                  handleDeposit( 
                   provider: $provider,
                   id: $id,
                   value: $value,
                   transactionHash: $transactionHash,
                   logIndex: $logIndex
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
      }
    );
    console.log(response);
    return response;
  }
  
async function Withdraw(provider, id, value, transactionHash, logIndex) {
    console.log("Calling handleWithdraw mutation...");
    let response = await request(
      process.env.GRAPHQL,
      `mutation handleWithdraw( 
                 $provider: String!,
                 $id: String!,
                 $value: String!,
                 $transactionHash: String!,
                 $logIndex: String!
  
                 ){
                  handleWithdraw( 
                   provider: $provider,
                   id: $id,
                   value: $value,
                   transactionHash: $transactionHash,
                   logIndex: $logIndex
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
      }
    );
    console.log(response);
    return response;
  }

describe('GraphQL Mutations for registry', () => {     
    it('handleUpdateLiquidityLimit should return true', async () => {
        const {handleUpdateLiquidityLimit : {result}} = await UpdateLiquidityLimit('user', 'id', '1000', '10000','2000','20000','txhash', 'block', '604800');
        assert.equal(result, true);
    })

    it('handleDeposit should return true', async () => {
        const {handleDeposit : {result}} = await Deposit('provider', 'id', 'value', 'txHash', 'logIndex');
        assert.equal(result, true);
    })

    it('handleWithdraw should return true', async () => {
        const {handleWithdraw : {result}} = await Withdraw('provider', 'id', 'value', 'txHash', 'logIndex');
        assert.equal(result, true);
    })
});