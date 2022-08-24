const chai = require('chai');
const assert = chai.assert;

require("dotenv").config();
var { request } = require("graphql-request");
const mongoose  = require('mongoose');
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

  before(async function(){
    await mongoose.connect(process.env.DATABASE_URL_TEST);
    // connecting to the database
    console.log("Connected to the MongoDB server\n\n");
  });

  describe('GraphQL Mutations for Kernel', () => {     
    it('handleNewProxyApp should return true', async () => {
        const {handleNewProxyApp : {result}} = await NewProxyApp('03', '5ccbe90f271527aa9c387708c7ed573e79093c55485c05786fc73b93d85598d1', 'context', '5ccbe90f271527aa9c387708c7ed573e79093c55485c05786fc73b93d85598d5','5ccbe90f271527aa9c387708c7ed573e79093c55485c05786fc73b93d85598d5','604800');
        assert.equal(result, true);
        let contract = await Contract.findOne({ id: '03' });
        assert.equal(contract.id, '03');
        assert.equal(contract.added, '604800');
        assert.equal(contract.addedAtBlock, '5ccbe90f271527aa9c387708c7ed573e79093c55485c05786fc73b93d85598d5');
        assert.equal(contract.addedAtTransaction, '5ccbe90f271527aa9c387708c7ed573e79093c55485c05786fc73b93d85598d5');
        assert.equal(contract.modified, '604800');
        assert.equal(contract.modifiedAtBlock, '5ccbe90f271527aa9c387708c7ed573e79093c55485c05786fc73b93d85598d5');
        assert.equal(contract.modifiedAtTransaction, '5ccbe90f271527aa9c387708c7ed573e79093c55485c05786fc73b93d85598d5');
        
        let contractVersion = await ContractVersion.findOne({id: '01-2'});
        assert.equal(contractVersion.id, '01-2');
        assert.equal(contractVersion.address, '5ccbe90f271527aa9c387708c7ed573e79093c55485c05786fc73b93d85598d1');
        assert.equal(contractVersion.added, '604800');
        assert.equal(contractVersion.addedAtBlock, '5ccbe90f271527aa9c387708c7ed573e79093c55485c05786fc73b93d85598d5');
        assert.equal(contractVersion.addedAtTransaction, '5ccbe90f271527aa9c387708c7ed573e79093c55485c05786fc73b93d85598d5');
    })
});  