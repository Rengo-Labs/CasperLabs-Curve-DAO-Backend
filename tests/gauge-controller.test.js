const chai = require('chai');
const assert = chai.assert;

require("dotenv").config();
var { request } = require("graphql-request");

async function AddType(id, type_id, timestamp, name) {
    console.log("Calling handleAddType mutation...");
    let response = await request(
      process.env.GRAPHQL,
      `mutation handleAddType( 
                  $id: String!,
                  $type_id: String!,
                  $timestamp: String!,
                  $name: String!
                  ){
                      handleAddType( 
                    id: $id,
                    type_id: $type_id,
                    timestamp: $timestamp,
                    name:$name
                    ) {
                  result
              }
                        
              }`,
      {
        id: id,
        type_id: type_id,
        timestamp: timestamp,
        name:name
      }
    );
    console.log(response);
    return response;
  }
  
async function NewGauge(
    gaugeType,
    addr,
    blockNumber,
    transactionHash,
    weight,
    timestamp
  ) {
    console.log("Calling handleNewGauge mutation...");
    let response = await request(
      process.env.GRAPHQL,
      `mutation handleNewGauge(
                  $gaugeType: String!,
                  $addr: String!,
                  $blockNumber: String!,
                  $transactionHash: String!,
                  $weight: String!,
                  $timestamp: String!,
                  ){
                      handleNewGauge(
                        gaugeType: $gaugeType,
                        addr: $addr,
                        blockNumber: $blockNumber,
                        transactionHash: $transactionHash,
                        weight: $weight,
                        timestamp: $timestamp,
                    ) {
                  result
              }
              }`,
      {
        gaugeType: gaugeType,
        addr: addr,
        blockNumber: blockNumber,
        transactionHash: transactionHash,
        weight: weight,
        timestamp: timestamp,
      }
    );
    console.log(response);
    return response;
  }
  
async function NewGaugeWeight(id, time, weight, gauge_address) {
    console.log("Calling handleNewGaugeWeight mutation...");
    let response = await request(
      process.env.GRAPHQL,
      `mutation handleNewGaugeWeight( 
                 $id: String!,
                 $time: String!,
                 $weight: String!,
                 $gauge_address: String!,
  
                 ){
                  handleNewGaugeWeight( 
                   id: $id,
                   time: $time,
                   weight: $weight,
                   gauge_address: $gauge_address,
                   ) {
                 result
             }
                       
             }`,
      {
        id: id,
        time: time,
        weight: weight,
        gauge_address: gauge_address,
      }
    );
    console.log(response);
    return response;
  }
  
async function NewTypeWeight(id, time, weight, type_id, total_weight) {
    console.log("Calling handleNewTypeWeight mutation...");
    let response = await request(
      process.env.GRAPHQL,
      `mutation handleNewTypeWeight( 
                 $id: String!,
                 $time: String!,
                 $weight: String!,
                 $type_id: String!,
                 $total_weight: String!
  
                 ){
                  handleNewTypeWeight( 
                   id: $id,
                   time: $time,
                   weight: $weight,
                   type_id: $type_id,
                   total_weight: $total_weight
                   ) {
                 result
             }
                       
             }`,
      {
        id: id,
        time: time,
        weight: weight,
        type_id: type_id,
        total_weight: total_weight,
      }
    );
    console.log(response);
    return response;
  }
  
async function VoteForGauge(id, time, weight, gauge_addr, user) {
    console.log("Calling handleVoteForGauge mutation...");
    let response = await request(
      process.env.GRAPHQL,
      `mutation handleVoteForGauge( 
                 $id: String!,
                 $time: String!,
                 $weight: String!,
                 $gauge_addr: String!,
                 $user: String!
  
                 ){
                  handleVoteForGauge( 
                   id: $id,
                   time: $time,
                   weight: $weight,
                   gauge_addr: $gauge_addr,
                   user: $user
                   ) {
                 result
             }
                       
             }`,
      {
        id: id,
        time: time,
        weight: weight,
        gauge_addr: gauge_addr,
        user: user,
      }
    );
    console.log(response);
    return response;
  }


describe('GraphQL Mutations for guage-controller', () => {     

  it('handleAddType should return true', async () => {
    const {handleAddType : {result}} = await AddType('id', 'typeId', '604800', 'type name');
    assert.equal(result, true);
})

    it('handleNewGauge should return true', async () => {
        const {handleNewGauge : {result}} = await NewGauge('gaugeType', 'address', 'blockNumber','txHash', '1000','604800');
        assert.equal(result, true);
    })

    it('handleNewGaugeWeight should return true', async () => {
        const {handleNewGaugeWeight : {result}} = await NewGaugeWeight('id', '604800', '1000', 'gauge address');
        assert.equal(result, true);
    })
    
    it('handleNewTypeWeight should return true', async () => {
        const {handleNewTypeWeight : {result}} = await NewTypeWeight('id', '604800','1000','typeId', '2000');
        assert.equal(result, true);
    })

    it('handleVoteForGauge should return true', async () => {
        const {handleVoteForGauge : {result}} = await VoteForGauge('id', '604800','1000','guage address', 'user');
        assert.equal(result, true);
    })

});

