const chai = require('chai');
const assert = chai.assert;

require("dotenv").config();
var { request } = require("graphql-request");


async function AddLiquidity(
    tokenAmounts,
    fees,
    invariant,
    tokenSupply,
    block,
    timestamp,
    poolId,
    providerId,
    transactionHash,
    logIndex,
    registryAddress,
    blockNumber
  ) {
    console.log("Calling handleAddLiquidity mutation...");
    let response = await request(
      process.env.GRAPHQL,
      `mutation handleAddLiquidity( 
                  $tokenAmounts: String!,
                  $fees: String!,
                  $invariant: String!,
                  $tokenSupply: String!,
                  $block: String!,
                  $timestamp: String!,
                  $poolId: String!,
                  $providerId: String!,
                  $transactionHash: String!,
                  $logIndex: String!,
                  $registryAddress: String!,
                  $blockNumber: String!,
                  ){
                handleAddLiquidity( 
                    tokenAmounts: $tokenAmounts,
                    fees: $fees,
                    invariant: $invariant,
                    tokenSupply: $tokenSupply,
                    block: $block,
                    timestamp: $timestamp,
                    poolId: $poolId,
                    providerId: $providerId,
                    transactionHash: $transactionHash,
                    logIndex: $logIndex,
                    registryAddress: $registryAddress,
                    blockNumber: $blockNumber,
                    ) {
                  result
              }
                        
              }`,
      {
        tokenAmounts: tokenAmounts,
        fees: fees,
        invariant: invariant,
        tokenSupply: tokenSupply,
        block: block,
        timestamp: timestamp,
        poolId: poolId,
        providerId: providerId,
        transactionHash: transactionHash,
        logIndex: logIndex,
        registryAddress: registryAddress,
        blockNumber: blockNumber,
      }
    );
    console.log(response);
    return response;
  }
  
  async function RemoveLiquidity(
    tokenAmounts,
    fees,
    tokenSupply,
    block,
    timestamp,
    poolId,
    providerId,
    transactionHash,
    logIndex,
    registryAddress,
    blockNumber
  ) {
    console.log("Calling handleRemoveLiquidity mutation...");
    let response = await request(
      process.env.GRAPHQL,
      `mutation handleRemoveLiquidity( 
                  $tokenAmounts: String!,
                  $fees: String!,
                  $tokenSupply: String!,
                  $block: String!,
                  $timestamp: String!,
                  $poolId: String!,
                  $providerId: String!,
                  $transactionHash: String!,
                  $logIndex: String!,
                  $registryAddress: String!,
                  $blockNumber: String!,
                  ){
                handleRemoveLiquidity( 
                    tokenAmounts: $tokenAmounts,
                    fees: $fees,
                    tokenSupply: $tokenSupply,
                    block: $block,
                    timestamp: $timestamp,
                    poolId: $poolId,
                    providerId: $providerId,
                    transactionHash: $transactionHash,
                    logIndex: $logIndex,
                    registryAddress: $registryAddress,
                    blockNumber: $blockNumber,
                    ) {
                  result
              }
                        
              }`,
      {
        tokenAmounts: tokenAmounts,
        fees: fees,
        tokenSupply: tokenSupply,
        block: block,
        timestamp: timestamp,
        poolId: poolId,
        providerId: providerId,
        transactionHash: transactionHash,
        logIndex: logIndex,
        registryAddress: registryAddress,
        blockNumber: blockNumber,
      }
    );
    console.log(response);
    return response;
  }
  
  async function RemoveLiquidityImbalance(
    tokenAmounts,
    fees,
    invariant,
    tokenSupply,
    block,
    timestamp,
    poolId,
    providerId,
    transactionHash,
    logIndex,
    registryAddress,
    blockNumber
  ) {
    console.log("Calling handleRemoveLiquidityImbalance mutation...");
    let response = await request(
      process.env.GRAPHQL,
      `mutation handleRemoveLiquidityImbalance( 
                  $tokenAmounts: String!,
                  $fees: String!,
                  $invariant: String!,
                  $tokenSupply: String!,
                  $block: String!,
                  $timestamp: String!,
                  $poolId: String!,
                  $providerId: String!,
                  $transactionHash: String!,
                  $logIndex: String!,
                  $registryAddress: String!,
                  $blockNumber: String!,
                  ){
                handleRemoveLiquidityImbalance( 
                    tokenAmounts: $tokenAmounts,
                    fees: $fees,
                    invariant: $invariant,
                    tokenSupply: $tokenSupply,
                    block: $block,
                    timestamp: $timestamp,
                    poolId: $poolId,
                    providerId: $providerId,
                    transactionHash: $transactionHash,
                    logIndex: $logIndex,
                    registryAddress: $registryAddress,
                    blockNumber: $blockNumber,
                    ) {
                  result
              }
                        
              }`,
      {
        tokenAmounts: tokenAmounts,
        fees: fees,
        invariant: invariant,
        tokenSupply: tokenSupply,
        block: block,
        timestamp: timestamp,
        poolId: poolId,
        providerId: providerId,
        transactionHash: transactionHash,
        logIndex: logIndex,
        registryAddress: registryAddress,
        blockNumber: blockNumber,
      }
    );
    console.log(response);
    return response;
  }
  
  async function RemoveLiquidityOne(
    tokenAmount,
    coinAmount,
    block,
    timestamp,
    poolId,
    providerId,
    transactionHash,
    logIndex,
    registryAddress,
    blockNumber
  ) {
    console.log("Calling handleRemoveLiquidityOne mutation...");
    let response = await request(
      process.env.GRAPHQL,
      `mutation handleRemoveLiquidityOne( 
                  $tokenAmount: String!,
                  $coinAmount: String!,
                  $block: String!,
                  $timestamp: String!,
                  $poolId: String!,
                  $providerId: String!,
                  $transactionHash: String!,
                  $logIndex: String!,
                  $registryAddress: String!,
                  $blockNumber: String!,
                  ){
                handleRemoveLiquidityOne( 
                    tokenAmount: $tokenAmount,
                    coinAmount: $coinAmount,
                    block: $block,
                    timestamp: $timestamp,
                    poolId: $poolId,
                    providerId: $providerId,
                    transactionHash: $transactionHash,
                    logIndex: $logIndex,
                    registryAddress: $registryAddress,
                    blockNumber: $blockNumber,
                    ) {
                  result
              }
                        
              }`,
      {
        tokenAmount: tokenAmount,
        coinAmount: coinAmount,
        block: block,
        timestamp: timestamp,
        poolId: poolId,
        providerId: providerId,
        transactionHash: transactionHash,
        logIndex: logIndex,
        registryAddress: registryAddress,
        blockNumber: blockNumber,
      }
    );
    console.log(response);
    return response;
  }
  
  
  async function TokenExchange(
    poolId, transactionHash, block, timestamp, logIndex, buyer, sold_id, tokens_sold, bought_id, tokens_bought
    ) {
    console.log("Calling handleTokenExchange mutation...");
    let response = await request(
      process.env.GRAPHQL,
      `mutation handleTokenExchange( 
                $poolId: String!,
                $transactionHash: String!,
                $block: String!,
                $timestamp: String!,
                $logIndex: String!,
                $buyer: String!,
                $sold_id: String!,
                $tokens_sold: String!,
                $bought_id: String!,
                $tokens_bought: String!
                ){
                    handleTokenExchange( 
                  poolId: $poolId,
                  transactionHash: $transactionHash,
                  block: $block,
                  timestamp: $timestamp,
                  logIndex: $logIndex,
                  buyer: $buyer,
                  sold_id: $sold_id,
                  tokens_sold: $tokens_sold,
                  bought_id: $bought_id,
                  tokens_bought: $tokens_bought
                  ) {
                result
            }
                      
            }`,
      {
        poolId: poolId,
        transactionHash: transactionHash,
        block: block,
        timestamp: timestamp,
        logIndex: logIndex,
        buyer: buyer,
        sold_id: sold_id,
        tokens_sold: tokens_sold,
        bought_id: bought_id,
        tokens_bought: tokens_bought
      }
    );
    console.log(response);
    return response;
  }
  
  async function TokenExchangeUnderlying(
    poolId, transactionHash, block, timestamp, logIndex, buyer, sold_id, tokens_sold, bought_id, tokens_bought
    ) {
    console.log("Calling handleTokenExchangeUnderlying mutation...");
    let response = await request(
      process.env.GRAPHQL,
      `mutation handleTokenExchangeUnderlying( 
                $poolId: String!,
                $transactionHash: String!,
                $block: String!,
                $timestamp: String!,
                $logIndex: String!,
                $buyer: String!,
                $sold_id: String!,
                $tokens_sold: String!,
                $bought_id: String!,
                $tokens_bought: String!,
                ){
                    handleTokenExchangeUnderlying( 
                  poolId: $poolId,
                  transactionHash: $transactionHash,
                  block: $block,
                  timestamp: $timestamp,
                  logIndex: $logIndex,
                  buyer: $buyer,
                  sold_id: $sold_id,
                  tokens_sold: $tokens_sold,
                  bought_id: $bought_id,
                  tokens_bought: $tokens_bought
                  ) {
                result
            }
                      
            }`,
      {
        poolId: poolId,
        transactionHash: transactionHash,
        block: block,
        timestamp: timestamp,
        logIndex: logIndex,
        buyer: buyer,
        sold_id: sold_id,
        tokens_sold: tokens_sold,
        bought_id: bought_id,
        tokens_bought: tokens_bought
      }
    );
    console.log(response);
    return response;
  }
  
  async function NewAdmin(
    poolId, transactionHash, block, timestamp, logIndex, admin
    ) {
    console.log("Calling handleNewAdmin mutation...");
    let response = await request(
      process.env.GRAPHQL,
      `mutation handleNewAdmin( 
                $poolId: String!,
                $transactionHash: String!,
                $block: String!,
                $timestamp: String!,
                $logIndex: String!,
                $admin: String!,
                ){
                    handleNewAdmin( 
                  poolId: $poolId,
                  transactionHash: $transactionHash,
                  block: $block,
                  timestamp: $timestamp,
                  logIndex: $logIndex,
                  admin: $admin,
                  ) {
                result
            }
                      
            }`,
      {
        poolId: poolId,
        transactionHash: transactionHash,
        block: block,
        timestamp: timestamp,
        logIndex: logIndex,
        admin: admin,
      }
    );
    console.log(response);
    return response;
  }
  
  async function NewFee(
    poolId, transactionHash, block, timestamp, logIndex,fee, admin_fee
    ) {
    console.log("Calling handleNewFee mutation...");
    let response = await request(
      process.env.GRAPHQL,
      `mutation handleNewFee( 
                $poolId: String!,
                $transactionHash: String!,
                $block: String!,
                $timestamp: String!,
                $logIndex: String!,
                $fee: String!,
                $admin_fee: String!,
                ){
                    handleNewFee( 
                  poolId: $poolId,
                  transactionHash: $transactionHash,
                  block: $block,
                  timestamp: $timestamp,
                  logIndex: $logIndex,
                  fee: $fee,
                  admin_fee: $admin_fee,
                  ) {
                result
            }
                      
            }`,
      {
        poolId: poolId,
        transactionHash: transactionHash,
        block: block,
        timestamp: timestamp,
        logIndex: logIndex,
        fee: fee,
        admin_fee: admin_fee
      }
    );
    console.log(response);
    return response;
  }
  
  async function NewParameters(
    poolId,A, transactionHash, block, timestamp, logIndex,fee, admin_fee
    ) {
    console.log("Calling handleNewParameters mutation...");
    let response = await request(
      process.env.GRAPHQL,
      `mutation handleNewParameters( 
                $poolId: String!,
                $A: String!,
                $transactionHash: String!,
                $block: String!,
                $timestamp: String!,
                $logIndex: String!,
                $fee: String!,
                $admin_fee: String!,
                ){
                    handleNewParameters( 
                  poolId: $poolId,
                  A: $A ,
                  transactionHash: $transactionHash,
                  block: $block,
                  timestamp: $timestamp,
                  logIndex: $logIndex,
                  fee: $fee,
                  admin_fee: $admin_fee,
                  ) {
                result
            }
                      
            }`,
      {
        poolId: poolId,
        A: A,
        transactionHash: transactionHash,
        block: block,
        timestamp: timestamp,
        logIndex: logIndex,
        fee: fee,
        admin_fee: admin_fee
      }
    );
    console.log(response);
    return response;
  }
  
  async function RampA(
    poolId,new_A, transactionHash, block, timestamp, logIndex,
    ) {
    console.log("Calling handleRampA mutation...");
    let response = await request(
      process.env.GRAPHQL,
      `mutation handleRampA( 
                $poolId: String!,
                $new_A: String!,
                $transactionHash: String!,
                $block: String!,
                $timestamp: String!,
                $logIndex: String!,
                ){
                    handleRampA( 
                  poolId: $poolId,
                  new_A: $new_A ,
                  transactionHash: $transactionHash,
                  block: $block,
                  timestamp: $timestamp,
                  logIndex: $logIndex,
                  ) {
                result
            }
                      
            }`,
      {
        poolId: poolId,
        new_A: new_A,
        transactionHash: transactionHash,
        block: block,
        timestamp: timestamp,
        logIndex: logIndex,
      }
    );
    console.log(response);
    return response;
  }
  
  async function StopRampA(
    poolId,A, transactionHash, block, timestamp, logIndex,
    ) {
    console.log("Calling handleStopRampA mutation...");
    let response = await request(
      process.env.GRAPHQL,
      `mutation handleStopRampA( 
                $poolId: String!,
                $A: String!,
                $transactionHash: String!,
                $block: String!,
                $timestamp: String!,
                $logIndex: String!,
                ){
                    handleStopRampA( 
                  poolId: $poolId,
                  A: $A ,
                  transactionHash: $transactionHash,
                  block: $block,
                  timestamp: $timestamp,
                  logIndex: $logIndex,
                  ) {
                result
            }
                      
            }`,
      {
        poolId: poolId,
        A: A,
        transactionHash: transactionHash,
        block: block,
        timestamp: timestamp,
        logIndex: logIndex,
      }
    );
    console.log(response);
    return response;
  }


describe('GraphQL Mutations for pool', () => {     

  it('handleAddLiquidity should return true', async () => {
    const {handleAddLiquidity : {result}} = await AddLiquidity("123","123","123","123","123","123","123","123","123","123","123","123");
    assert.equal(result, true);
})

    it('handleRemoveLiquidity should return true', async () => {
        const {handleRemoveLiquidity : {result}} = await RemoveLiquidity("123","123","123","123","123","123","123","123","123","123","123");
        assert.equal(result, true);
    })

    it('handleRemoveLiquidityImbalance should return true', async () => {
        const {handleRemoveLiquidityImbalance : {result}} = await RemoveLiquidityImbalance("123","123","123","123","123","123","123","123","123","123","123","123");
        assert.equal(result, true);
    })
    
    it('handleRemoveLiquidityOne should return true', async () => {
        const {handleRemoveLiquidityOne : {result}} = await RemoveLiquidityOne("123","123","123","123","123","123","123","123","123","123");
        assert.equal(result, true);
    })

    it('handleTokenExchange should return true', async () => {
        const {handleTokenExchange : {result}} = await TokenExchange("123", "123", "123", "123", "123", "123", "0", "123", "1","123")
        assert.equal(result, true);
    })
    it('handleTokenExchangeUnderlying should return true', async () => {
        const {handleTokenExchangeUnderlying : {result}} = await TokenExchangeUnderlying("123", "123", "123", "123", "123", "123", "0", "123", "1","123");
        assert.equal(result, true);
    })

    it('handleNewAdmin should return true', async () => {
        const {handleNewAdmin : {result}} = await NewAdmin("123", "123", "123", "123", "123","123");
        assert.equal(result, true);
    })
    
    it('handleNewFee should return true', async () => {
        const {handleNewFee : {result}} = await NewFee("123", "123", "123", "123", "123","123","123")
        assert.equal(result, true);
    })

    it('handleNewParameters should return true', async () => {
        const {handleNewParameters : {result}} = await NewParameters("123", "123", "123", "123", "123","123","123","123");
        assert.equal(result, true);
    })
    it('handleRampA should return true', async () => {
        const {handleRampA : {result}} = await RampA("123", "123", "123", "123", "123","123");
        assert.equal(result, true);
    })

    it('handleStopRampA should return true', async () => {
        const {handleStopRampA : {result}} = await  StopRampA("123", "123", "123", "123", "123","123");
        assert.equal(result, true);
    })

});

