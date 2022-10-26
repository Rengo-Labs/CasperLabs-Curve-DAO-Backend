const chai = require('chai');
const assert = chai.assert;
const Gauge = require("../models/gauge");
const GaugeTotalWeight = require("../models/gaugeTotalWeight");
const GaugeType = require("../models/guageType");
const GaugeTypeWeight = require("../models/gaugeTypeWeight");
const GaugeWeight = require("../models/gaugeWeight");
const GaugeWeightVote = require("../models/gaugeWeightVote");
const GaugeVote = require("../models/gaugeVote");

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

module.exports = describe('GraphQL Mutations for guage-controller', () => {     

  it('handleAddType should return true', async () => {
    const {handleAddType : {result}} = await AddType('01', '22', '6048000', 'type-name');
    assert.equal(result, true);
    let gaugeType = await GaugeTypeWeight.findOne({ id: '6652800' });
    assert.equal(gaugeType.id, '6652800');
    assert.equal(gaugeType.type, '22');
    assert.equal(gaugeType.time, '6652800');

    let gaugeTotal = await GaugeTotalWeight.findOne({ id: '6652800' });
    assert.equal(gaugeTotal.id, '6652800');
    assert.equal(gaugeTotal.time, '6652800');
})

    it('handleNewGauge should return true', async () => {
        const {handleNewGauge : {result}} = await NewGauge('gaugeType', '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c', '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c','399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c', '1000','604800');
        assert.equal(result, true);
        let gauge = await Gauge.findOne({ id: '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c' });
        assert.equal(gauge.id, '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');
        assert.equal(gauge.address, '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');
        assert.equal(gauge.type, 'gaugeType');
        assert.equal(gauge.created, '604800');
        assert.equal(gauge.createdAtBlock, '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');
        assert.equal(gauge.createdAtTransaction, '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');

        let gaugeWeight = await GaugeWeight.findOne({ id: '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c-1209600' });
        assert.equal(gaugeWeight.id, '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c-1209600');
        assert.equal(gaugeWeight.gauge, '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');
        assert.equal(gaugeWeight.time, '1209600');
        assert.equal(gaugeWeight.weight, '1000');

        let gaugeTotal = await GaugeTotalWeight.findOne({ id: '1209600' });
        assert.equal(gaugeTotal.id, '1209600');
        assert.equal(gaugeTotal.time, '1209600');
    })

    it('handleNewGaugeWeight should return true', async () => {
        const {handleNewGaugeWeight : {result}} = await NewGaugeWeight('01', '604800', '1000', '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');
        assert.equal(result, true);
        let gaugeWeight = await GaugeWeight.findOne({ id: '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c-1209600' });
        assert.equal(gaugeWeight.id, '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c-1209600');
        assert.equal(gaugeWeight.gauge, '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');
        assert.equal(gaugeWeight.time, '1209600');
        assert.equal(gaugeWeight.weight, '1000');

        let gaugeTotal = await GaugeTotalWeight.findOne({ id: '1209600' });
        assert.equal(gaugeTotal.id, '1209600');
        assert.equal(gaugeTotal.time, '1209600');
    })
    
    it('handleNewTypeWeight should return true', async () => {
        const {handleNewTypeWeight : {result}} = await NewTypeWeight('id', '604800','1000','22', '2000');
        assert.equal(result, true);
        let gaugeType = await GaugeTypeWeight.findOne({ id: '22-604800' });
        assert.equal(gaugeType.id, '22-604800');
        assert.equal(gaugeType.type, '22');
        assert.equal(gaugeType.time, '604800');
        assert.equal(gaugeType.weight, '1000');

        let gaugeTotal = await GaugeTotalWeight.findOne({ id: '22-604800' });
        assert.equal(gaugeTotal.id, '22-604800');
        assert.equal(gaugeTotal.time, '604800');
        assert.equal(gaugeTotal.weight, '2000.000000000000000000000000000000000000');
    })

    it('handleVoteForGauge should return true', async () => {
        const {handleVoteForGauge : {result}} = await VoteForGauge('01', '604800','1000','399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c', 'user');
        assert.equal(result, true);
        let gauge = await Gauge.findOne({ id: '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c'});
        assert.exists(gauge, "Gauge is null or undefined");

        let gaugeWeight = await GaugeWeight.findOne({ id: '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c-1209600' });
        assert.equal(gaugeWeight.id, '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c-1209600');
        assert.equal(gaugeWeight.gauge, '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');
        assert.equal(gaugeWeight.time, '1209600');

        let gaugeTotal = await GaugeTotalWeight.findOne({ id: '1209600' });
        assert.equal(gaugeTotal.id, '1209600');
        assert.equal(gaugeTotal.time, '1209600');

        let voteData = await GaugeWeightVote.findOne({ id: '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c-user-604800' });
        assert.equal(voteData.id, '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c-user-604800');
        assert.equal(voteData.gauge, '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');
        assert.equal(voteData.user, 'user');
        assert.equal(voteData.time, '604800');
        assert.equal(voteData.weight, '1000');

        let gaugeVoteData = await GaugeVote.findOne({ id: '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c-user-604800' });
        assert.equal(gaugeVoteData.id, '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c-user-604800');
        assert.equal(gaugeVoteData.gauge, '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');
        assert.equal(gaugeVoteData.user, 'user');
        assert.equal(gaugeVoteData.time, '604800');
        assert.equal(gaugeVoteData.weight, '1000');
        assert.equal(gaugeVoteData.total_weight, gaugeTotal.weight);
        assert.exists(gaugeVoteData.veCRV, "veCRV is null or undefined");
        assert.exists(gaugeVoteData.totalveCRV, "totalveCRV is null or undefined");
    })

});

