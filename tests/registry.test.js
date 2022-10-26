const chai = require('chai');
const assert = chai.assert;
require("dotenv").config();
var { request } = require("graphql-request");
const Pool = require('../models/pool');

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

module.exports = describe('GraphQL Mutations for registry', () => {     
    it('handlePoolAdded should return true', async () => {
      
        const {handlePoolAdded : {result}} = await PoolAdded('poolid', 'txhash', 'block', '604800');
        assert.equal(result, true);
        
       let pool = await Pool.findOne({ id: 'poolid' });
       
       assert.equal(pool.id, 'poolid');
       assert.equal(pool.addedAt, '604800');
       assert.equal(pool.addedAtBlock, 'block');
       assert.equal(pool.addedAtTransaction, 'txhash');
    })

    it('handlePoolRemoved should return true', async () => {
        const {handlePoolRemoved : {result}} = await PoolRemoved('poolid', 'txhash', 'block', '604800');
        assert.equal(result, true);
        let pool = await Pool.findOne({ id: 'poolid' });
        assert.equal(pool.id, 'poolid');
        assert.equal(pool.removedAt, '604800');
        assert.equal(pool.removedAtBlock, 'block');
        assert.equal(pool.removedAtTransaction, 'txhash');
    })
});