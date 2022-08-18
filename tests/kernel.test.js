const chai = require('chai');
const assert = chai.assert;

require("dotenv").config();
var { request } = require("graphql-request");

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

  describe('GraphQL Mutations for Kernel', () => {     
    it('handleNewProxyApp should return true', async () => {
        const {handleNewProxyApp : {result}} = await NewProxyApp('appid', 'proxy', 'context', 'txhash','block','604800','txhash', 'block', '604800');
        assert.equal(result, true);
    })
});  