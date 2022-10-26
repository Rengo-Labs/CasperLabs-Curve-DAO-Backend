const chai = require('chai');
const assert = chai.assert;
const Pool = require("../models/pool");
const AddLiquidityEvent = require("../models/addLiquidityEvent");
const RemoveLiquidityEvent = require("../models/removeLiquidityEvent");
const RemoveLiquidityOneEvent = require("../models/removeLiquidityOneEvent");
const Exchange = require("../models/exchange");
const Coin = require("../models/coin");
const Token = require("../models/token");
const AmplificationCoeffChangelog = require("../models/amplificationCoeffChangelog");
const AdminFeeChangeLog = require("../models/adminFeeChangeLog");
const FeeChangeLog = require("../models/feeChangeLog");
const TransferOwnershipEvent = require("../models/transferOwnershipEvent");
const UnderlyingCoin = require("../models/underlyingCoin");

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


module.exports = describe('GraphQL Mutations for pool', () => {     

  it('handleAddLiquidity should return true', async () => {
    const {handleAddLiquidity : {result}} = await AddLiquidity("1000","100","1000","1000","399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c","604800","22","12","399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c","11","399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c","50");
    assert.equal(result, true);
    let ale = await AddLiquidityEvent.findOne({ id: 'al-399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c-11' });
    assert.equal(ale.id, 'al-399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c-11');
    assert.equal(ale.pool, '1000');
    assert.equal(ale.provider, '12');
    assert.equal(ale.tokenAmounts, '1000');
    assert.equal(ale.fees, '100');
    assert.equal(ale.invariant, '1000');
    assert.equal(ale.tokenSupply, '1000');
    assert.equal(ale.timestamp, '604800');
    assert.equal(ale.block, '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');
    assert.equal(ale.transaction, '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');
})

    it('handleRemoveLiquidity should return true', async () => {
        const {handleRemoveLiquidity : {result}} = await RemoveLiquidity("100","100","1000","399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c","604800","22","12","399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c","11","399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c","50");
        assert.equal(result, true);
        let rle = await RemoveLiquidityEvent.findOne({ id: 'rl-399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c-11' });
        assert.equal(rle.id, 'rl-399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c-11');
        assert.equal(rle.pool, '1000');
        assert.equal(rle.provider, '12');
        assert.equal(rle.tokenAmounts, '100');
        assert.equal(rle.fees, '100');
        assert.equal(rle.tokenSupply, '1000');
        assert.equal(rle.timestamp, '604800');
        assert.equal(rle.block, '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');
        assert.equal(rle.transaction, '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');
    })

    it('handleRemoveLiquidityImbalance should return true', async () => {
        const {handleRemoveLiquidityImbalance : {result}} = await RemoveLiquidityImbalance("100","100","100","1000","399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c","604800","22","12","399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c","11","399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c","50");
        assert.equal(result, true);
        let rle = await RemoveLiquidityEvent.findOne({ id: 'rli-399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c-11' });
        assert.equal(rle.id, 'rli-399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c-11');
        assert.equal(rle.pool, '1000');
        assert.equal(rle.provider, '12');
        assert.equal(rle.tokenAmounts, '100');
        assert.equal(rle.fees, '100');
        assert.equal(rle.invariant, '100');
        assert.equal(rle.tokenSupply, '1000');
        assert.equal(rle.timestamp, '604800');
        assert.equal(rle.block, '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');
        assert.equal(rle.transaction, '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');
    })
    
    it('handleRemoveLiquidityOne should return true', async () => {
        const {handleRemoveLiquidityOne : {result}} = await RemoveLiquidityOne("100","100","399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c","604800","22","12","399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c","11","399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c","50");
        assert.equal(result, true);
        let rloe = await RemoveLiquidityOneEvent.findOne({ id: 'rlo-399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c-11' });
        assert.equal(rloe.id, 'rlo-399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c-11');
        assert.equal(rloe.pool, '1000');
        assert.equal(rloe.provider, '12');
        assert.equal(rloe.tokenAmount, '100');
        assert.equal(rloe.coinAmount, '100');
        assert.equal(rloe.timestamp, '604800');
        assert.equal(rloe.block, '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');
        assert.equal(rloe.transaction, '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');
    })

    it('handleTokenExchange should return true', async () => {
        const {handleTokenExchange : {result}} = await TokenExchange("01", "399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c", "399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c", "604800", "11", "buyer", "1", "100", "1","100")
        assert.equal(result, true);
        let exchange = await Exchange.findOne({ id: 'e-399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c-11' });
        assert.equal(exchange.id, 'e-399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c-11');
        assert.equal(exchange.pool, '1000');
        assert.equal(exchange.buyer, 'buyer');
        assert.equal(exchange.receiver, 'buyer');
        assert.equal(exchange.tokenSold, '4');
        assert.equal(exchange.tokenBought, '4');
        assert.equal(exchange.amountSold, '100');
        assert.equal(exchange.amountBought, '100');
        assert.equal(exchange.timestamp, '604800');
        assert.equal(exchange.block, '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');
        assert.equal(exchange.transaction, '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');
    })

    it('handleTokenExchangeUnderlying should return true', async () => {
        const {handleTokenExchangeUnderlying : {result}} = await TokenExchangeUnderlying("01", "399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c", "399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c", "604800", "11", "buyer", "1", "100", "1","100");
        assert.equal(result, true);
        let exchange = await Exchange.findOne({ id: 'e-399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c-11' });
        assert.equal(exchange.id, 'e-399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c-11');
        assert.equal(exchange.pool, '1000');
        assert.equal(exchange.buyer, 'buyer');
        assert.equal(exchange.receiver, 'buyer');
        assert.equal(exchange.tokenSold, '4');
        assert.equal(exchange.tokenBought, '4');
        assert.equal(exchange.amountSold, '100');
        assert.equal(exchange.amountBought, '100');
        assert.equal(exchange.timestamp, '604800');
        assert.equal(exchange.block, '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');
        assert.equal(exchange.transaction, '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');
    })

    it('handleNewAdmin should return true', async () => {
        const {handleNewAdmin : {result}} = await NewAdmin("01", "399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c", "399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c", "604800", "11","admin");
        assert.equal(result, true);
        let transfer = await TransferOwnershipEvent.findOne({ id: 'to-399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c-11' });
        assert.equal(transfer.id, 'to-399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c-11');
        assert.equal(transfer.pool, '01');
        assert.equal(transfer.newAdmin, 'admin');
        assert.equal(transfer.timestamp, '604800');
        assert.equal(transfer.block, '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');
        assert.equal(transfer.transaction, '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');
    })
    
    it('handleNewFee should return true', async () => {
        const {handleNewFee : {result}} = await NewFee("01", "399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c", "399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c", "604800", "11","100","50")
        assert.equal(result, true);
        let admin = await AdminFeeChangeLog.findOne({ id: 'af-399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c-11' });
        assert.equal(admin.id, 'af-399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c-11');
        assert.equal(admin.pool, '01');
        assert.equal(admin.value, '50');
        assert.equal(admin.timestamp, '604800');
        assert.equal(admin.block, '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');
        assert.equal(admin.transaction, '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');

        let fee = await FeeChangeLog.findOne({ id: 'f-399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c-11' });
        assert.equal(fee.id, 'f-399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c-11');
        assert.equal(fee.pool, '01');
        assert.equal(fee.value, '100');
        assert.equal(fee.timestamp, '604800');
        assert.equal(fee.block, '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');
        assert.equal(fee.transaction, '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');
    })

    it('handleNewParameters should return true', async () => {
        const {handleNewParameters : {result}} = await NewParameters("01", "100", "399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c", "399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c", "604800","11","100","50");
        assert.equal(result, true);
        let admin = await AdminFeeChangeLog.findOne({ id: 'af-399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c-11' });
        assert.equal(admin.id, 'af-399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c-11');
        assert.equal(admin.pool, '01');
        assert.equal(admin.value, '50');
        assert.equal(admin.timestamp, '604800');
        assert.equal(admin.block, '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');
        assert.equal(admin.transaction, '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');

        let amp = await AmplificationCoeffChangelog.findOne({ id: 'a-399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c-11' });
        assert.equal(amp.id, 'a-399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c-11');
        assert.equal(amp.pool, '01');
        assert.equal(amp.value, '100');
        assert.equal(amp.timestamp, '604800');
        assert.equal(amp.block, '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');
        assert.equal(amp.transaction, '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');

        let fee = await FeeChangeLog.findOne({ id: 'f-399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c-11' });
        assert.equal(fee.id, 'f-399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c-11');
        assert.equal(fee.pool, '01');
        assert.equal(fee.value, '100');
        assert.equal(fee.timestamp, '604800');
        assert.equal(fee.block, '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');
        assert.equal(fee.transaction, '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');
    })
    it('handleRampA should return true', async () => {
        const {handleRampA : {result}} = await RampA("01", "100", "399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c", "399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c", "604800","11");
        assert.equal(result, true);
        let amp = await AmplificationCoeffChangelog.findOne({ id: 'a-399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c-11' });
        assert.equal(amp.id, 'a-399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c-11');
        assert.equal(amp.pool, '01');
        assert.equal(amp.value, '100');
        assert.equal(amp.timestamp, '604800');
        assert.equal(amp.block, '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');
        assert.equal(amp.transaction, '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');
    })

    it('handleStopRampA should return true', async () => {
        const {handleStopRampA : {result}} = await  StopRampA("01", "100", "399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c", "399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c", "604800","11");
        assert.equal(result, true);
        let amp = await AmplificationCoeffChangelog.findOne({ id: 'a-399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c-11' });
        assert.equal(amp.id, 'a-399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c-11');
        assert.equal(amp.pool, '01');
        assert.equal(amp.value, '100');
        assert.equal(amp.timestamp, '604800');
        assert.equal(amp.block, '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');
        assert.equal(amp.transaction, '399c4a68e5d814177880ac8533b813740dc86861ae6991769e4e5b237406468c');
    })

});

