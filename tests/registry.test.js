const chai = require('chai');
const assert = chai.assert;

require("dotenv").config();
var { request } = require("graphql-request");

async function PoolAdded(poolId, transactionHash, block, timestamp) {
    console.log("Calling handlePoolAdded mutation...");
    let response = await request(
      process.env.GRAPHQL,
      `mutation handlePoolAdded( 
                 $poolId: String!,
                 $transactionHash: String!,
                 $block: String!,
                 $timestamp: String!
  
                 ){
                  handlePoolAdded( 
                   poolId: $poolId,
                   transactionHash: $transactionHash,
                   block: $block,
                   timestamp: $timestamp
                   ) {
                 result
             }
                       
             }`,
      {
        poolId: poolId,
        transactionHash: transactionHash,
        block: block,
        timestamp: timestamp,
      }
    );
    console.log(response);
    return response;
  }
  
async function PoolRemoved(poolId, transactionHash, block, timestamp) {
    console.log("Calling handlePoolRemoved mutation...");
    let response = await request(
      process.env.GRAPHQL,
      `mutation handlePoolRemoved( 
                 $poolId: String!,
                 $transactionHash: String!,
                 $block: String!,
                 $timestamp: String!
  
                 ){
                  handlePoolRemoved( 
                   poolId: $poolId,
                   transactionHash: $transactionHash,
                   block: $block,
                   timestamp: $timestamp
                   ) {
                 result
             }
                       
             }`,
      {
        poolId: poolId,
        transactionHash: transactionHash,
        block: block,
        timestamp: timestamp,
      }
    );
    console.log(response);
    return response;
  }

describe('GraphQL Mutations for registry', () => {     
    it('handlePoolAdded should return true', async () => {
        const {handlePoolAdded : {result}} = await PoolAdded('poolId', 'txhash', 'block', '64800');
        assert.equal(result, true);
    })

    it('handlePoolRemoved should return true', async () => {
        const {handlePoolRemoved : {result}} = await PoolRemoved('poolId', 'txhash', 'block', '64800');
        assert.equal(result, true);
    })
});