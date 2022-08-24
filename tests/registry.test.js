const chai = require('chai');
const assert = chai.assert;

require("dotenv").config();
var { request } = require("graphql-request");
const mongoose  = require('mongoose');
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

  before(async function(){
    await mongoose.connect(process.env.DATABASE_URL_TEST);
    // connecting to the database
    console.log("Connected to the MongoDB server\n\n");
  });

describe('GraphQL Mutations for registry', () => {     
    it('handlePoolAdded should return true', async () => {
        const {handlePoolAdded : {result}} = await PoolAdded('01', '3b4c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c', '3b4c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c', '604800');
        assert.equal(result, true);
       let pool = await Pool.findOne({ id: '01' });
       assert.equal(pool.id, '01');
       assert.equal(pool.addedAt, '604800');
       assert.equal(pool.addedAtBlock, '3b4c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');
       assert.equal(pool.addedAtTransaction, '3b4c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');
    })

    it('handlePoolRemoved should return true', async () => {
        const {handlePoolRemoved : {result}} = await PoolRemoved('01', '388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c', '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c', '604800');
        assert.equal(result, true);
        let pool = await Pool.findOne({ id: '01' });
        assert.equal(pool.id, '01');
        assert.equal(pool.removedAt, '604800');
        assert.equal(pool.removedAtBlock, '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');
        assert.equal(pool.removedAtTransaction, '388c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');
    })
});