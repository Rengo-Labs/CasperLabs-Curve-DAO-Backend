const chai = require('chai');
const assert = chai.assert;
const mongoose  = require('mongoose');
const Contract = require("../models/contract");
const ContractVersion = require("../models/contractVersion");

require("dotenv").config();
var { request } = require("graphql-request");

async function AddressModified(
    addressProviderContractHash,
    id,
    block,
    timestamp,
    transactionHash
  ) {
    console.log("Calling handleAddressModified mutation...");
    let response = await request(
      process.env.GRAPHQL,
      `mutation handleAddressModified( 
                  $addressProviderContractHash: String!,
                  $id: String!,
                  $block: String!,
                  $timestamp: String!,
                  $transactionHash: String!,
                  ){
                      handleAddressModified( 
                    addressProviderContractHash: $addressProviderContractHash,
                    id: $id,
                    block: $block,
                    timestamp: $timestamp,
                    transactionHash: $transactionHash,
                    ) {
                  result
              }
                        
              }`,
      {
        addressProviderContractHash: addressProviderContractHash,
        id: id,
        block: block,
        timestamp: timestamp,
        transactionHash: transactionHash,
      }
    );
    console.log(response);
    return response;
  }
  
  async function NewAddressIdentifier(
    addressProviderContractHash,
    id,
    block,
    timestamp,
    transactionHash
  ) {
    console.log("Calling handleNewAddressIdentifier mutation...");
    let response = await request(
      process.env.GRAPHQL,
      `mutation handleNewAddressIdentifier( 
                  $addressProviderContractHash: String!,
                  $id: String!,
                  $block: String!,
                  $timestamp: String!,
                  $transactionHash: String!,
                  ){
                      handleNewAddressIdentifier( 
                    addressProviderContractHash: $addressProviderContractHash,
                    id: $id,
                    block: $block,
                    timestamp: $timestamp,
                    transactionHash: $transactionHash,
                    ) {
                  result
              }
                        
              }`,
      {
        addressProviderContractHash: addressProviderContractHash,
        id: id,
        block: block,
        timestamp: timestamp,
        transactionHash: transactionHash,
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

describe('GraphQL Mutations for Address-Provider', () => {     
    it('handleAddressModified should return true', async () => {
        const {handleAddressModified : {result}} = await AddressModified("5ccbe90f271527aa9c387708c7ed573e79093c55485c05786fc73b93d85598d5", "01", "5ccbe90f271527aa9c387708c7ed573e79093c55485c05786fc73b93d85598d5", "604800", "5ccbe90f271527aa9c387708c7ed573e79093c55485c05786fc73b93d85598d5");
        assert.equal(result, true);
        let contract = await Contract.findOne({ id: '01' });
        assert.equal(contract.id, '01');
        assert.equal(contract.modified, '604800');
        assert.equal(contract.modifiedAtBlock, '5ccbe90f271527aa9c387708c7ed573e79093c55485c05786fc73b93d85598d5');
        assert.equal(contract.modifiedAtTransaction, '5ccbe90f271527aa9c387708c7ed573e79093c55485c05786fc73b93d85598d5');
        
        let contractVersion = await ContractVersion.findOne({id: '01-2'});
        assert.equal(contractVersion.id, '01-2');
        assert.equal(contractVersion.added, '604800');
        assert.equal(contractVersion.addedAtBlock, '5ccbe90f271527aa9c387708c7ed573e79093c55485c05786fc73b93d85598d5');
        assert.equal(contractVersion.addedAtTransaction, '5ccbe90f271527aa9c387708c7ed573e79093c55485c05786fc73b93d85598d5');
    })

    it('handleNewAddressIdentifier should return true', async () => {
        const {handleNewAddressIdentifier : {result}} = await NewAddressIdentifier("5ccbe90f271527aa9c387708c7ed573e79093c55485c05786fc73b93d85598d5", "01", "5ccbe90f271527aa9c387708c7ed573e79093c55485c05786fc73b93d85598d5", "604800", "5ccbe90f271527aa9c387708c7ed573e79093c55485c05786fc73b93d85598d5");
        assert.equal(result, true);
        let contract = await Contract.findOne({ id: '01' });
        assert.equal(contract.id, '01');
        assert.equal(contract.modified, '604800');
        assert.equal(contract.modifiedAtBlock, '5ccbe90f271527aa9c387708c7ed573e79093c55485c05786fc73b93d85598d5');
        assert.equal(contract.modifiedAtTransaction, '5ccbe90f271527aa9c387708c7ed573e79093c55485c05786fc73b93d85598d5');
        
        let contractVersion = await ContractVersion.findOne({id: '01-2'});
        assert.equal(contractVersion.id, '01-2');
        assert.equal(contractVersion.added, '604800');
        assert.equal(contractVersion.addedAtBlock, '5ccbe90f271527aa9c387708c7ed573e79093c55485c05786fc73b93d85598d5');
        assert.equal(contractVersion.addedAtTransaction, '5ccbe90f271527aa9c387708c7ed573e79093c55485c05786fc73b93d85598d5');
    })
});