const chai = require('chai');
const assert = chai.assert;

require("dotenv").config();
var { request } = require("graphql-request");
const Contract = require("../models/contract");
const ContractVersion = require("../models/contractVersion");

async function NewProxyApp(
    appId,
    proxy,
    context,
    transactionHash,
    block,
    timestamp
  ) {
    console.log("Calling handleNewProxyApp mutation...");
    let response = await request(
      process.env.GRAPHQL,
      `mutation handleNewProxyApp( 
                 $appId: String!,
                 $proxy: String!,
                 $context: String!,
                 $transactionHash: String!,
                 $block: String!,
                 $timestamp: String!
  
                 ){
                  handleNewProxyApp( 
                   appId: $appId,
                   proxy: $proxy,
                   context: $context,
                   transactionHash: $transactionHash,
                   block: $block,
                   timestamp: $timestamp
                   ) {
                 result
             }
                       
             }`,
      {
        appId: appId,
        proxy: proxy,
        context: context,
        transactionHash: transactionHash,
        block: block,
        timestamp: timestamp,
      }
    );
    console.log(response);
    return response;
  }

module.exports = describe('GraphQL Mutations for Kernel', () => {     
    it('handleNewProxyApp should return true', async () => {
        const {handleNewProxyApp : {result}} = await NewProxyApp('0x2436adbbb3230545df6846695013211d36736f647c91b302b9591e5e2d013485', '5ccbe90f271527aa9c387708c7ed573e79093c55485c05786fc73b93d85598d1', 'context', '5ccbe90f271527aa9c387708c7ed573e79093c55485c05786fc73b93d85598d5','5ccbe90f271527aa9c387708c7ed573e79093c55485c05786fc73b93d85598d5','604800');
        assert.equal(result, true);
        let contract1 = await Contract.findOne({ id: 'Ownership' });
        
          assert.equal(contract1.id, 'Ownership');
          assert.equal(contract1.added, '604800');
          assert.equal(contract1.addedAtBlock, '5ccbe90f271527aa9c387708c7ed573e79093c55485c05786fc73b93d85598d5');
          assert.equal(contract1.addedAtTransaction, '5ccbe90f271527aa9c387708c7ed573e79093c55485c05786fc73b93d85598d5');
          assert.equal(contract1.modified, '604800');
          assert.equal(contract1.modifiedAtBlock, '5ccbe90f271527aa9c387708c7ed573e79093c55485c05786fc73b93d85598d5');
          assert.equal(contract1.modifiedAtTransaction, '5ccbe90f271527aa9c387708c7ed573e79093c55485c05786fc73b93d85598d5');
          
          let contractVersion = await ContractVersion.findOne({id: 'Ownership-1'});
        assert.equal(contractVersion.id, 'Ownership-1');
        assert.equal(contractVersion.address, '5ccbe90f271527aa9c387708c7ed573e79093c55485c05786fc73b93d85598d1');
        assert.equal(contractVersion.added, '604800');
        assert.equal(contractVersion.addedAtBlock, '5ccbe90f271527aa9c387708c7ed573e79093c55485c05786fc73b93d85598d5');
        assert.equal(contractVersion.addedAtTransaction, '5ccbe90f271527aa9c387708c7ed573e79093c55485c05786fc73b93d85598d5');
    })
});  