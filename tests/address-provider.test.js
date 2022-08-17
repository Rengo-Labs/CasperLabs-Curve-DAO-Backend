const chai = require('chai');
const assert = chai.assert;

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

describe('GraphQL Mutations for Address-Provider', () => {     
    it('handleAddressModified should return true', async () => {
        const {handleAddressModified : {result}} = await AddressModified("5ccbe90f271527aa9c387708c7ed573e79093c55485c05786fc73b93d85598d5", "123", "block", "64800", "5ccbe90f271527aa9c387708c7ed573e79093c55485c05786fc73b93d85598d5");
        assert.equal(result, true);
    })

    it('handleNewAddressIdentifier should return true', async () => {
        const {handleNewAddressIdentifier : {result}} = await NewAddressIdentifier("5ccbe90f271527aa9c387708c7ed573e79093c55485c05786fc73b93d85598d5", "123", "block", "64800", "5ccbe90f271527aa9c387708c7ed573e79093c55485c05786fc73b93d85598d5");
        assert.equal(result, true);
    })
});