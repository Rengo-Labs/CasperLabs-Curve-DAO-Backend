require("dotenv").config();
var express = require("express");
var router = express.Router();
var { request } = require("graphql-request");
// var pairModel = require("../models/pair");
// var hashesofpairsModel = require("../models/hashesofpairs");
// var eventsModel = require("../models/events");
// var pairagainstuser = require("../models/pairagainstuser");
// var paircontract = require("../JsClients/PAIR/pairFunctionsForBackend/functions");
// var allcontractsDataModel = require("../models/allcontractsData");
// var RemoveReservesDataModel = require("../models/removeReservesData");

function splitdata(data) {
  var temp = data.split("(");
  var result = temp[1].split(")");
  return result[0];
}

async function geteventsdata(eventResult, _deployHash, _timestamp, _block_hash, _eventname, _eventdata){
  try {
    if (!_deployHash) {
      return res.status(400).json({
        success: false,
        message: "There is no deployHash specified in the req body.",
      });
    }
    if (!_timestamp) {
      return res.status(400).json({
        success: false,
        message: "There is no timestamp specified in the req body.",
      });
    }
    if (!_block_hash) {
      return res.status(400).json({
        success: false,
        message: "There is no blockHash specified in the req body.",
      });
    }
    if (!_eventname) {deserializedHeadValue
      return res.status(400).json({
        success: false,
        message: "There is no eventname specified in the req body.",
      });
    }
    if (!_eventdata) {
      return res.status(400).json({
        success: false,
        message: "There is no eventdata specified in the req body.",
      });
    }

    let newData = _eventdata;
    let deployHash = _deployHash;
    let timestamp = _timestamp;
    let block_hash = _block_hash;
    let eventName = _eventname;
    console.log("... Deployhash: ", deployHash);
    console.log("... Timestamp: ", timestamp);
    console.log("... Block hash: ", block_hash);
    console.log("Event Data: ", newData);

    if (eventName == "pair_created") {
      console.log(eventName + " Event result: ");
      console.log(newData[0][0].data + " = " + newData[0][1].data);
      console.log(newData[1][0].data + " = " + newData[1][1].data);
      console.log(newData[2][0].data + " = " + newData[2][1].data);
      console.log(newData[3][0].data + " = " + newData[3][1].data);
      console.log(newData[4][0].data + " = " + newData[4][1].data);
      console.log(newData[5][0].data + " = " + newData[5][1].data);

      var allpairslength = parseInt(newData[0][1].data);
      var pair = splitdata(newData[3][1].data);
      var token0 = splitdata(newData[4][1].data);
      var token1 = splitdata(newData[5][1].data);

      console.log("allpairslength: ", allpairslength);
      console.log("pair splited: ", pair);
      console.log("token0 splited: ", token0);
      console.log("token1 splited: ", token1);

      await request(
        process.env.GRAPHQL,
        `mutation handleNewPair( $token0: String!, $token1: String!, $pair: String!, $all_pairs_length: Int!,$deployHash: String!,$timeStamp: String!, $blockHash: String!){
      		handleNewPair( token0: $token0, token1: $token1, pair: $pair, all_pairs_length: $all_pairs_length, deployHash:$deployHash,timeStamp: $timeStamp, blockHash: $blockHash) {
      		result
      		}
                      
      		}`,
        {
          token0: token0,
          token1: token1,
          pair: pair,
          all_pairs_length: allpairslength,
          deployHash: deployHash,
          timeStamp: timestamp.toString(),
          blockHash: block_hash,
        }
      );
      console.log("HandleNewPair Mutation called.")
        return true;
    }else if(eventName == "addLiquidity") {
      console.log(eventName + " Event result: ");
      console.log(newData[0][0].data + " = " + newData[0][1].data);
      console.log(newData[1][0].data + " = " + newData[1][1].data);
      console.log(newData[2][0].data + " = " + newData[2][1].data);
      console.log(newData[3][0].data + " = " + newData[3][1].data);
      console.log(newData[4][0].data + " = " + newData[4][1].data);
      console.log(newData[5][0].data + " = " + newData[5][1].data);
      console.log(newData[6][0].data + " = " + newData[6][1].data);
      console.log(newData[7][0].data + " = " + newData[7][1].data);
      console.log(newData[8][0].data + " = " + newData[8][1].data);
      console.log(newData[9][0].data + " = " + newData[9][1].data);
      console.log(newData[10][0].data + " = " + newData[10][1].data);
      console.log(newData[11][0].data + " = " + newData[11][1].data);

      var tokenAmounts = parseInt(newData[0][1].data);
      var fees = parseInt(newData[1][1].data);
      var invariant = parseInt(newData[2][1].data);
      var tokenSupply = parseInt(newData[3][1].data);
      var poolId = parseInt(newData[4][1].data);
      var providerId = splitdata(newData[5][1].data);
      var transactionHash = splitdata(newData[6][1].data);
      var logIndex = parseInt(newData[7][1].data);
      var registryAddress = parseInt(newData[8][1].data);
      var blockNumber = parseInt(newData[9][1].data);

      console.log("tokenAmounts: ", tokenAmounts);
      console.log("fees: ", fees);
      console.log("invariant: ", invariant);
      console.log("tokenSupply: ", tokenSupply);
      console.log("poolId: ", poolId);
      console.log("providerId: ", providerId);
      console.log("transactionHash: ", transactionHash);
      console.log("logIndex: ", logIndex);
      console.log("registryAddress: ", registryAddress);
      console.log("blockNumber: ", blockNumber);


     await request(
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
console.log("handleAddLiquidity Mutation called.")
        return true;
    }else if(eventName == "removeLiquidity") {
      console.log(eventName + " Event result: ");
      console.log(newData[0][0].data + " = " + newData[0][1].data);
      console.log(newData[1][0].data + " = " + newData[1][1].data);
      console.log(newData[2][0].data + " = " + newData[2][1].data);
      console.log(newData[3][0].data + " = " + newData[3][1].data);
      console.log(newData[4][0].data + " = " + newData[4][1].data);
      console.log(newData[5][0].data + " = " + newData[5][1].data);
      console.log(newData[6][0].data + " = " + newData[6][1].data);
      console.log(newData[7][0].data + " = " + newData[7][1].data);
      console.log(newData[8][0].data + " = " + newData[8][1].data);
      console.log(newData[9][0].data + " = " + newData[9][1].data);
      console.log(newData[10][0].data + " = " + newData[10][1].data);

      var tokenAmounts = parseInt(newData[0][1].data);
      var fees = parseInt(newData[1][1].data);
      var tokenSupply = parseInt(newData[2][1].data);
      var poolId = parseInt(newData[3][1].data);
      var providerId = splitdata(newData[4][1].data);
      var transactionHash = splitdata(newData[5][1].data);
      var logIndex = parseInt(newData[6][1].data);
      var registryAddress = parseInt(newData[7][1].data);
      var blockNumber = parseInt(newData[8][1].data);

      console.log("tokenAmounts: ", tokenAmounts);
      console.log("fees: ", fees);
      console.log("tokenSupply: ", tokenSupply);
      console.log("poolId: ", poolId);
      console.log("providerId: ", providerId);
      console.log("transactionHash: ", transactionHash);
      console.log("logIndex: ", logIndex);
      console.log("registryAddress: ", registryAddress);
      console.log("blockNumber: ", blockNumber);


      await request(
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
console.log("handleRemoveLiquidity Mutation called.")
        return true;
    }else if(eventName == "removeLiquidityImbalance") {
      console.log(eventName + " Event result: ");
      console.log(newData[0][0].data + " = " + newData[0][1].data);
      console.log(newData[1][0].data + " = " + newData[1][1].data);
      console.log(newData[2][0].data + " = " + newData[2][1].data);
      console.log(newData[3][0].data + " = " + newData[3][1].data);
      console.log(newData[4][0].data + " = " + newData[4][1].data);
      console.log(newData[5][0].data + " = " + newData[5][1].data);
      console.log(newData[6][0].data + " = " + newData[6][1].data);
      console.log(newData[7][0].data + " = " + newData[7][1].data);
      console.log(newData[8][0].data + " = " + newData[8][1].data);
      console.log(newData[9][0].data + " = " + newData[9][1].data);
      console.log(newData[10][0].data + " = " + newData[10][1].data);
      console.log(newData[11][0].data + " = " + newData[11][1].data);

      var tokenAmounts = parseInt(newData[0][1].data);
      var fees = parseInt(newData[1][1].data);
      var invariant = parseInt(newData[2][1].data);
      var tokenSupply = parseInt(newData[3][1].data);
      var poolId = parseInt(newData[4][1].data);
      var providerId = splitdata(newData[5][1].data);
      var transactionHash = splitdata(newData[6][1].data);
      var logIndex = parseInt(newData[7][1].data);
      var registryAddress = parseInt(newData[8][1].data);
      var blockNumber = parseInt(newData[9][1].data);

      console.log("tokenAmounts: ", tokenAmounts);
      console.log("fees: ", fees);
      console.log("invariant: ", invariant);
      console.log("tokenSupply: ", tokenSupply);
      console.log("poolId: ", poolId);
      console.log("providerId: ", providerId);
      console.log("transactionHash: ", transactionHash);
      console.log("logIndex: ", logIndex);
      console.log("registryAddress: ", registryAddress);
      console.log("blockNumber: ", blockNumber);


      await request(
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
console.log("handleRemoveLiquidityImbalance Mutation called.")
        return true;
    }else if(eventName == "removeLiquidityOne") {
      console.log(eventName + " Event result: ");
      console.log(newData[0][0].data + " = " + newData[0][1].data);
      console.log(newData[1][0].data + " = " + newData[1][1].data);
      console.log(newData[2][0].data + " = " + newData[2][1].data);
      console.log(newData[3][0].data + " = " + newData[3][1].data);
      console.log(newData[4][0].data + " = " + newData[4][1].data);
      console.log(newData[5][0].data + " = " + newData[5][1].data);
      console.log(newData[6][0].data + " = " + newData[6][1].data);
      console.log(newData[7][0].data + " = " + newData[7][1].data);
      console.log(newData[8][0].data + " = " + newData[8][1].data);
      console.log(newData[9][0].data + " = " + newData[9][1].data);

      var tokenAmount = parseInt(newData[0][1].data);
      var coinAmount = parseInt(newData[1][1].data);
      var poolId = parseInt(newData[2][1].data);
      var providerId = splitdata(newData[3][1].data);
      var transactionHash = splitdata(newData[4][1].data);
      var logIndex = parseInt(newData[5][1].data);
      var registryAddress = parseInt(newData[6][1].data);
      var blockNumber = parseInt(newData[7][1].data);

      console.log("tokenAmounts: ", tokenAmount);
      console.log("coinAmmount: ", coinAmount);
      console.log("poolId: ", poolId);
      console.log("providerId: ", providerId);
      console.log("transactionHash: ", transactionHash);
      console.log("logIndex: ", logIndex);
      console.log("registryAddress: ", registryAddress);
      console.log("blockNumber: ", blockNumber);


      await request(
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
console.log("handleRemoveLiquidityOne Mutation called.")
        return true;
    }else if(eventName == "tokenExchange") {
      console.log(eventName + " Event result: ");
      console.log(newData[0][0].data + " = " + newData[0][1].data);
      console.log(newData[1][0].data + " = " + newData[1][1].data);
      console.log(newData[2][0].data + " = " + newData[2][1].data);
      console.log(newData[3][0].data + " = " + newData[3][1].data);
      console.log(newData[4][0].data + " = " + newData[4][1].data);
      console.log(newData[5][0].data + " = " + newData[5][1].data);
      console.log(newData[6][0].data + " = " + newData[6][1].data);
      console.log(newData[7][0].data + " = " + newData[7][1].data);
      console.log(newData[8][0].data + " = " + newData[8][1].data);
      console.log(newData[9][0].data + " = " + newData[9][1].data);

     
      var poolId = splitdata(newData[2][1].data);      
      var transactionHash = splitdata(newData[4][1].data);
      var logIndex = parseInt(newData[5][1].data);
      var buyer = splitdata(newData[3][1].data);
      var sold_id = splitdata(newData[0][1].data);
      var tokens_sold = parseInt(newData[1][1].data);
      var bought_id = splitdata(newData[6][1].data);
      var tokens_bought = parseInt(newData[7][1].data);


      console.log("poolId: ", poolId);
      console.log("transactionHash: ", transactionHash);
      console.log("logIndex: ", logIndex);
      console.log("buyer: ", buyer);
      console.log("sold_id: ", sold_id);
      console.log("token_sold: ", tokens_sold);
      console.log("bought_id: ", bought_id);
      console.log("tokens_bought: ", tokens_bought);


      await request(
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
console.log("handleTokenExchange Mutation called.")
        return true;
    }else if(eventName == "exchangeUnderlying") {
      console.log(eventName + " Event result: ");
      console.log(newData[0][0].data + " = " + newData[0][1].data);
      console.log(newData[1][0].data + " = " + newData[1][1].data);
      console.log(newData[2][0].data + " = " + newData[2][1].data);
      console.log(newData[3][0].data + " = " + newData[3][1].data);
      console.log(newData[4][0].data + " = " + newData[4][1].data);
      console.log(newData[5][0].data + " = " + newData[5][1].data);
      console.log(newData[6][0].data + " = " + newData[6][1].data);
      console.log(newData[7][0].data + " = " + newData[7][1].data);
      console.log(newData[8][0].data + " = " + newData[8][1].data);
      console.log(newData[9][0].data + " = " + newData[9][1].data);

     
      var poolId = splitdata(newData[2][1].data);      
      var transactionHash = splitdata(newData[4][1].data);
      var logIndex = parseInt(newData[5][1].data);
      var buyer = splitdata(newData[3][1].data);
      var sold_id = splitdata(newData[0][1].data);
      var tokens_sold = parseInt(newData[1][1].data);
      var bought_id = splitdata(newData[6][1].data);
      var tokens_bought = parseInt(newData[7][1].data);;


      console.log("poolId: ", poolId);
      console.log("transactionHash: ", transactionHash);
      console.log("logIndex: ", logIndex);
      console.log("buyer: ", buyer);
      console.log("sold_id: ", sold_id);
      console.log("tokens_sold: ", tokens_sold);
      console.log("bought_id: ", bought_id);
      console.log("tokens_bought: ", tokens_bought);


      await request(
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
          $tokens_bought: String!
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
console.log("handleExchangeUnderlying Mutation called.")
return true;
    }else if(eventName == "newAdmin") {
      console.log(eventName + " Event result: ");
      console.log(newData[0][0].data + " = " + newData[0][1].data);
      console.log(newData[1][0].data + " = " + newData[1][1].data);
      console.log(newData[2][0].data + " = " + newData[2][1].data);
      console.log(newData[3][0].data + " = " + newData[3][1].data);
      console.log(newData[4][0].data + " = " + newData[4][1].data);
      console.log(newData[5][0].data + " = " + newData[5][1].data);

     
      var poolId = splitdata(newData[0][1].data);      
      var transactionHash = splitdata(newData[1][1].data);
      var logIndex = parseInt(newData[2][1].data);
      var admin = splitdata(newData[3][1].data);


      console.log("poolId: ", poolId);
      console.log("transactionHash: ", transactionHash);
      console.log("logIndex: ", logIndex);
      console.log("admin: ", admin);

      await request(
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
console.log("handleNewAdmin Mutation called.")
return true;
    }else if(eventName == "newFee") {
      console.log(eventName + " Event result: ");
      console.log(newData[0][0].data + " = " + newData[0][1].data);
      console.log(newData[1][0].data + " = " + newData[1][1].data);
      console.log(newData[2][0].data + " = " + newData[2][1].data);
      console.log(newData[3][0].data + " = " + newData[3][1].data);
      console.log(newData[4][0].data + " = " + newData[4][1].data);
      console.log(newData[5][0].data + " = " + newData[5][1].data);
      console.log(newData[6][0].data + " = " + newData[6][1].data);

     
      var poolId = splitdata(newData[0][1].data);      
      var transactionHash = splitdata(newData[1][1].data);
      var logIndex = parseInt(newData[2][1].data);
      var fee = parseInt(newData[3][1].data);
      var admin_fee = splitdata(newData[4][1].data);


      console.log("poolId: ", poolId);
      console.log("transactionHash: ", transactionHash);
      console.log("logIndex: ", logIndex);
      console.log("fee: ", fee);
      console.log("admin_fee: ", admin_fee);

      await request(
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
console.log("handleNewFee Mutation called.")
return true;
    }else if(eventName == "newParameters") {
      console.log(eventName + " Event result: ");
      console.log(newData[0][0].data + " = " + newData[0][1].data);
      console.log(newData[1][0].data + " = " + newData[1][1].data);
      console.log(newData[2][0].data + " = " + newData[2][1].data);
      console.log(newData[3][0].data + " = " + newData[3][1].data);
      console.log(newData[4][0].data + " = " + newData[4][1].data);
      console.log(newData[5][0].data + " = " + newData[5][1].data);
      console.log(newData[6][0].data + " = " + newData[6][1].data);
      console.log(newData[7][0].data + " = " + newData[7][1].data);

     
      var poolId = splitdata(newData[0][1].data);
      var A = splitdata(newData[4][1].data)      
      var transactionHash = splitdata(newData[1][1].data);
      var logIndex = parseInt(newData[2][1].data);
      var fee = parseInt(newData[3][1].data);
      var admin_fee = splitdata(newData[4][1].data);


      console.log("poolId: ", poolId);
      console.log("A: ", A);
      console.log("transactionHash: ", transactionHash);
      console.log("logIndex: ", logIndex);
      console.log("fee: ", fee);
      console.log("admin_fee: ", admin_fee);

      await request(
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
console.log("handleNewParameters Mutation called.")
return true;
    }else if(eventName == "RampA") {
      console.log(eventName + " Event result: ");
      console.log(newData[0][0].data + " = " + newData[0][1].data);
      console.log(newData[1][0].data + " = " + newData[1][1].data);
      console.log(newData[2][0].data + " = " + newData[2][1].data);
      console.log(newData[3][0].data + " = " + newData[3][1].data);
      console.log(newData[4][0].data + " = " + newData[4][1].data);
      console.log(newData[5][0].data + " = " + newData[5][1].data);

     
      var poolId = splitdata(newData[0][1].data);
      var new_A = splitdata(newData[1][1].data)      
      var transactionHash = splitdata(newData[2][1].data);
      var logIndex = parseInt(newData[3][1].data);


      console.log("poolId: ", poolId);
      console.log("newA: ", new_A);
      console.log("transactionHash: ", transactionHash);
      console.log("logIndex: ", logIndex);
      await request(
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
console.log("handleRampA Mutation called.")
return true;
    }else if(eventName == "stopRampA") {
      console.log(eventName + " Event result: ");
      console.log(newData[0][0].data + " = " + newData[0][1].data);
      console.log(newData[1][0].data + " = " + newData[1][1].data);
      console.log(newData[2][0].data + " = " + newData[2][1].data);
      console.log(newData[3][0].data + " = " + newData[3][1].data);
      console.log(newData[4][0].data + " = " + newData[4][1].data);
      console.log(newData[5][0].data + " = " + newData[5][1].data);

     
      var poolId = splitdata(newData[0][1].data);
      var A = splitdata(newData[1][1].data)      
      var transactionHash = splitdata(newData[2][1].data);
      var logIndex = parseInt(newData[3][1].data);


      console.log("poolId: ", poolId);
      console.log("A: ", A);
      console.log("transactionHash: ", transactionHash);
      console.log("logIndex: ", logIndex);
      await request(
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
console.log("handleStopRampA Mutation called.")
return true;
    }else if(eventName == "addressModified") {
      console.log(eventName + " Event result: ");
      console.log(newData[0][0].data + " = " + newData[0][1].data);
      console.log(newData[1][0].data + " = " + newData[1][1].data);
      console.log(newData[2][0].data + " = " + newData[2][1].data);
      console.log(newData[3][0].data + " = " + newData[3][1].data);
      console.log(newData[4][0].data + " = " + newData[4][1].data);

     
      var addressProviderContractHash = splitdata(newData[0][1].data);
      var id = splitdata(newData[1][1].data)      
      var transactionHash = splitdata(newData[2][1].data);


      console.log("addressProviderContractHash: ", addressProviderContractHash);
      console.log("id: ", id);
      console.log("transactionHash: ", transactionHash);

      await request(
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
console.log("handleAddressModified Mutation called.")
return true;
    }else if(eventName == "newAddressIdentifier") {
      console.log(eventName + " Event result: ");
      console.log(newData[0][0].data + " = " + newData[0][1].data);
      console.log(newData[1][0].data + " = " + newData[1][1].data);
      console.log(newData[2][0].data + " = " + newData[2][1].data);
      console.log(newData[3][0].data + " = " + newData[3][1].data);
      console.log(newData[4][0].data + " = " + newData[4][1].data);

     
      var addressProviderContractHash = splitdata(newData[0][1].data);
      var id = splitdata(newData[1][1].data)      
      var transactionHash = splitdata(newData[2][1].data);


      console.log("addressProviderContractHash: ", addressProviderContractHash);
      console.log("id: ", id);
      console.log("transactionHash: ", transactionHash);

      await request(
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
console.log("handleNewAddressIdentifier Mutation called.")
return true;
    }else if(eventName == "poolAdded") {
      console.log(eventName + " Event result: ");
      console.log(newData[0][0].data + " = " + newData[0][1].data);
      console.log(newData[1][0].data + " = " + newData[1][1].data);
      console.log(newData[2][0].data + " = " + newData[2][1].data);
      console.log(newData[3][0].data + " = " + newData[3][1].data);

     
      var poolId = splitdata(newData[1][1].data)      
      var transactionHash = splitdata(newData[2][1].data);


      console.log("poolId: ", poolId);
      console.log("transactionHash: ", transactionHash);

      await request(
        process.env.GRAPHQL,
        `mutation handlePoolAdded( $poolId: String!,$transactionHash: String!,$block: String!,$timestamp: String!){
           handlePoolAdded( poolId: $poolId,transactionHash: $transactionHash,block: $block,timestamp: $timestamp) {
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
console.log("handlePoolAdded Mutation called.")
return true;
    }else if(eventName == "poolRemoved") {
      console.log(eventName + " Event result: ");
      console.log(newData[0][0].data + " = " + newData[0][1].data);
      console.log(newData[1][0].data + " = " + newData[1][1].data);
      console.log(newData[2][0].data + " = " + newData[2][1].data);
      console.log(newData[3][0].data + " = " + newData[3][1].data);

     
      var poolId = splitdata(newData[1][1].data)      
      var transactionHash = splitdata(newData[2][1].data);


      console.log("poolId: ", poolId);
      console.log("transactionHash: ", transactionHash);

      await request(
        process.env.GRAPHQL,
        `mutation handlePoolRemoved( $poolId: String!,$transactionHash: String!,$block: String!,$timestamp: String!){
          handlePoolRemoved( poolId: $poolId,transactionHash: $transactionHash,block: $block,timestamp: $timestamp) {
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
console.log("handlePoolRemoved Mutation called.")
return true;
    }else if(eventName == "newProxyApp") {
      console.log(eventName + " Event result: ");
      console.log(newData[0][0].data + " = " + newData[0][1].data);
      console.log(newData[1][0].data + " = " + newData[1][1].data);
      console.log(newData[2][0].data + " = " + newData[2][1].data);
      console.log(newData[3][0].data + " = " + newData[3][1].data);
      console.log(newData[4][0].data + " = " + newData[4][1].data);
      console.log(newData[5][0].data + " = " + newData[5][1].data);

      var appId = splitdata(newData[0][1].data)      
      var proxy = splitdata(newData[1][1].data);
      var context = parseInt(newData[2][1].data)      
      var transactionHash = splitdata(newData[3][1].data)

      console.log("appId: ", appId);
      console.log("proxy: ", proxy);
      console.log("context: ", context);
      console.log("transactionHash: ", transactionHash);

      await request(
        process.env.GRAPHQL,
        `mutation handleNewProxyApp( $appId: String!,$proxy: String!,$context: String!,$transactionHash: String!,$block: String!,$timestamp: String!){
           handleNewProxyApp( appId: $appId,proxy: $proxy,context: $context,transactionHash: $transactionHash,block: $block,timestamp: $timestamp) {
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
console.log("handleNewProxyApp Mutation called.")
return true;
    }else if(eventName == "updateLiquidityLimit") {
      console.log(eventName + " Event result: ");
      console.log(newData[0][0].data + " = " + newData[0][1].data);
      console.log(newData[1][0].data + " = " + newData[1][1].data);
      console.log(newData[2][0].data + " = " + newData[2][1].data);
      console.log(newData[3][0].data + " = " + newData[3][1].data);
      console.log(newData[4][0].data + " = " + newData[4][1].data);
      console.log(newData[5][0].data + " = " + newData[5][1].data);
      console.log(newData[6][0].data + " = " + newData[6][1].data);
      console.log(newData[7][0].data + " = " + newData[7][1].data);
      console.log(newData[8][0].data + " = " + newData[8][1].data);

      var user = splitdata(newData[0][1].data);      
      var id = splitdata(newData[1][1].data);
      var original_balance = parseInt(newData[2][1].data);      
      var original_supply = parseInt(newData[3][1].data);
      var working_balance = parseInt(newData[4][1].data);
      var working_supply = parseInt(newData[5][1].data)      
      var transactionHash = splitdata(newData[6][1].data)

      console.log("user: ", user);
      console.log("id: ", id);
      console.log("original_balance: ", original_balance);
      console.log("original_supply: ", original_supply);
      console.log("working_balance: ", working_balance);
      console.log("working_supply: ", working_supply);
      console.log("transactionHash: ", transactionHash);

      await request(
        process.env.GRAPHQL,
        `mutation handleUpdateLiquidityLimit( 
          $user: String!,
          $id: String!,
          $original_balance: String!,
          $original_supply: String!,
          $working_balance: String!,
          $working_supply: String!,
          $transactionHash: String!,
          $block: String!
          $timestamp: String!,
          ){
              handleUpdateLiquidityLimit( 
            user: $user,
            id: $id,
            original_balance: $original_balance,
            original_supply: $original_supply,
            working_balance: $working_balance,
            working_supply: $working_supply,
            transactionHash: $transactionHash,
            block: $block,
            timestamp: $timestamp,
            ) {
          result
      }
                
      }`,
  {
    user: user,
    id: id,
    original_balance: original_balance,
    original_supply: original_supply,
    working_balance: working_balance,
    working_supply: working_supply,
    transactionHash: transactionHash,
    block: block,
    timestamp: timestamp,
  }
);
console.log("handleUpdateLiquidityLimit Mutation called.")
return true;
    }else if(eventName == "deposit") {
      console.log(eventName + " Event result: ");
      console.log(newData[0][0].data + " = " + newData[0][1].data);
      console.log(newData[1][0].data + " = " + newData[1][1].data);
      console.log(newData[2][0].data + " = " + newData[2][1].data);
      console.log(newData[3][0].data + " = " + newData[3][1].data);
      console.log(newData[4][0].data + " = " + newData[4][1].data);
      console.log(newData[5][0].data + " = " + newData[5][1].data);
      console.log(newData[6][0].data + " = " + newData[6][1].data);

      var provider = splitdata(newData[0][1].data);      
      var id = splitdata(newData[1][1].data);
      var value = parseInt(newData[2][1].data);      
      var transactionHash = splitdata(newData[3][1].data);
      var logIndex = splitdata(newData[4][1].data);

      console.log("provider: ", provider);
      console.log("id: ", id);
      console.log("value: ", value);
      console.log("transactionHash: ", transactionHash);
      console.log("logIndex: ", logIndex);

      await request(
        process.env.GRAPHQL,
        `mutation handleDeposit( $provider: String!,$id: String!,$value: String!,$transactionHash: String!,$logIndex: String!){
           handleDeposit( provider: $provider,id: $id,value: $value,transactionHash: $transactionHash,logIndex: $logIndex) {
          result
      }
                
      }`,
{
 provider: provider,
 id: id,
 value: value,
 transactionHash: transactionHash,
 logIndex: logIndex,
}
);
console.log("handleDeposit Mutation called.")
return true;
    }else if(eventName == "withdraw") {
      console.log(eventName + " Event result: ");
      console.log(newData[0][0].data + " = " + newData[0][1].data);
      console.log(newData[1][0].data + " = " + newData[1][1].data);
      console.log(newData[2][0].data + " = " + newData[2][1].data);
      console.log(newData[3][0].data + " = " + newData[3][1].data);
      console.log(newData[4][0].data + " = " + newData[4][1].data);
      console.log(newData[5][0].data + " = " + newData[5][1].data);
      console.log(newData[6][0].data + " = " + newData[6][1].data);

      var provider = splitdata(newData[0][1].data);      
      var id = splitdata(newData[1][1].data);
      var value = parseInt(newData[2][1].data);      
      var transactionHash = splitdata(newData[3][1].data);
      var logIndex = splitdata(newData[4][1].data);

      console.log("provider: ", provider);
      console.log("id: ", id);
      console.log("value: ", value);
      console.log("transactionHash: ", transactionHash);
      console.log("logIndex: ", logIndex);

      await request(
        process.env.GRAPHQL,
        `mutation handleWithdraw( $provider: String!,$id: String!,$value: String!,$transactionHash: String!,$logIndex: String!){
          handleWithdraw( provider: $provider,id: $id,value: $value,transactionHash: $transactionHash,logIndex: $logIndex) {
          result
      }
                
      }`,
{
 provider: provider,
 id: id,
 value: value,
 transactionHash: transactionHash,
 logIndex: logIndex,
}
);
console.log("handleWithdraw Mutation called.")
return true;
    }else if(eventName == "minimumBalanceSet") {
      console.log(eventName + " Event result: ");
      console.log(newData[0][0].data + " = " + newData[0][1].data);
      console.log(newData[1][0].data + " = " + newData[1][1].data);
      console.log(newData[2][0].data + " = " + newData[2][1].data);
      console.log(newData[3][0].data + " = " + newData[3][1].data);

      var address = splitdata(newData[0][1].data);      
      var minBalance = parseInt(newData[1][1].data);

      console.log("address: ", address);
      console.log("minBalance: ", minBalance);

      await request(
        process.env.GRAPHQL,
        `mutation handleMinimumBalanceSet( $address: String!,$minBalance: String!, $eventObjectId: String!,){
           handleMinimumBalanceSet( address: $address,minBalance: $minBalance, eventObjectId : $eventObjectId) {
          result
      }
                
      }`,
{
 address: address,
 minBalance: minBalance,
 eventObjectId: eventResult._id,
}
);
console.log("handleMinimumBalanceSet Mutation called.")
return true;
    }else if(eventName == "minimumTimeSet") {
      console.log(eventName + " Event result: ");
      console.log(newData[0][0].data + " = " + newData[0][1].data);
      console.log(newData[1][0].data + " = " + newData[1][1].data);
      console.log(newData[2][0].data + " = " + newData[2][1].data);
      console.log(newData[3][0].data + " = " + newData[3][1].data);

      var address = splitdata(newData[0][1].data);      
      var minTime = parseInt(newData[1][1].data);

      console.log("address: ", address);
      console.log("minTime: ", minTime);

      await request(
        process.env.GRAPHQL,
        `mutation handleMinimumTimeSet( $address: String!,$minTime: String!, $eventObjectId: String!,){
          handleMinimumTimeSet( address: $address,minTime: $minTime, eventObjectId : $eventObjectId) {
          result
      }
                
      }`,
{
 address: address,
 minTime: minTime,
 eventObjectId: eventResult._id,
}
);
console.log("handleMinimumTimeSet Mutation called.")
return true;
    }else if(eventName == "changeMinQuorum") {
      console.log(eventName + " Event result: ");
      console.log(newData[0][0].data + " = " + newData[0][1].data);
      console.log(newData[1][0].data + " = " + newData[1][1].data);
      console.log(newData[2][0].data + " = " + newData[2][1].data);
      console.log(newData[3][0].data + " = " + newData[3][1].data);

      var address = splitdata(newData[0][1].data);      
      var minAcceptQuorumPct = parseInt(newData[1][1].data);

      console.log("address: ", address);
      console.log("minAcceptQuorumPct: ", minAcceptQuorumPct);

      await request(
        process.env.GRAPHQL,
        `mutation handleChangeMinQuorum( $address: String!,$minAcceptQuorumPct: String!, $eventObjectId: String!,){
          handleChangeMinQuorum( address: $address,minAcceptQuorumPct: $minAcceptQuorumPct, eventObjectId : $eventObjectId) {
          result
      }
                
      }`,
{
 address: address,
 minAcceptQuorumPct: minAcceptQuorumPct,
 eventObjectId: eventResult._id,
}
);
console.log("handleChangeMinQuorum Mutation called.")
return true;
    }else if(eventName == "changeSupportRequired") {
      console.log(eventName + " Event result: ");
      console.log(newData[0][0].data + " = " + newData[0][1].data);
      console.log(newData[1][0].data + " = " + newData[1][1].data);
      console.log(newData[2][0].data + " = " + newData[2][1].data);
      console.log(newData[3][0].data + " = " + newData[3][1].data);

      var address = splitdata(newData[0][1].data);      
      var supportRequiredPct = parseInt(newData[1][1].data);

      console.log("address: ", address);
      console.log("supportRequiredPct: ", supportRequiredPct);

      await request(
        process.env.GRAPHQL,
        `mutation handleChangeSupportRequired( $address: String!,$supportRequiredPct: String!,$eventObjectId: String!,){
          handleChangeSupportRequired( address: $address,supportRequiredPct: $supportRequiredPct, eventObjectId : $eventObjectId) {
          result
      }
                
      }`,
{
 address: address,
 supportRequiredPct: supportRequiredPct,
 eventObjectId: eventResult._id,
}
);
console.log("handleChangeSupportRequired Mutation called.")
return true;
    }else if(eventName == "startVote") {
      console.log(eventName + " Event result: ");
      console.log(newData[0][0].data + " = " + newData[0][1].data);
      console.log(newData[1][0].data + " = " + newData[1][1].data);
      console.log(newData[2][0].data + " = " + newData[2][1].data);
      console.log(newData[3][0].data + " = " + newData[3][1].data);
      console.log(newData[4][0].data + " = " + newData[4][1].data);
      console.log(newData[5][0].data + " = " + newData[5][1].data);
      console.log(newData[6][0].data + " = " + newData[6][1].data);

      var address = splitdata(newData[0][1].data);      
      var creator = splitdata(newData[1][1].data);
      var voteId = parseInt(newData[2][1].data);
      var metadata = splitdata(newData[3][1].data);   
      var transactionFrom = splitdata(newData[4][1].data);

      console.log("address: ", address);
      console.log("creator: ", creator);
      console.log("voteId: ", voteId);
      console.log("metadata: ", metadata);
      console.log("transactionFrom: ", transactionFrom);

      await request(
        process.env.GRAPHQL,
        `mutation handleStartVote( 
          $address: String!,
          $creator: String!,
          $voteId: String!,
          $metadata: String!,
          $transactionFrom: String!,
          $eventObjectId: String!,
          ){
              handleStartVote( 
            address: $address,
            creator: $creator,
            voteId: $voteId,
            metadata: $metadata,
            transactionFrom: $transactionFrom,
            eventObjectId : $eventObjectId
            ) {
          result
      }
                
      }`,
{
address: address,
creator: creator,
voteId: voteId,
metadata: metadata,
transactionFrom : transactionFrom,
eventObjectId: eventResult._id,
});
console.log("handleStartVote Mutation called.");
return true;
    }else if(eventName == "castVote") {
      console.log(eventName + " Event result: ");
      console.log(newData[0][0].data + " = " + newData[0][1].data);
      console.log(newData[1][0].data + " = " + newData[1][1].data);
      console.log(newData[2][0].data + " = " + newData[2][1].data);
      console.log(newData[3][0].data + " = " + newData[3][1].data);
      console.log(newData[4][0].data + " = " + newData[4][1].data);
      console.log(newData[5][0].data + " = " + newData[5][1].data);
      console.log(newData[6][0].data + " = " + newData[6][1].data);

      var address = splitdata(newData[0][1].data);      
      var voteId = splitdata(newData[1][1].data);
      var voter = parseInt(newData[2][1].data);
      var stake = splitdata(newData[3][1].data);
      var supports = parseInt(newData[4][1].data);  

      console.log("address: ", address);
      console.log("voteId: ", voteId);
      console.log("voter: ", voter);
      console.log("stake: ", stake);
      console.log("supports: ", supports);

      await request(
        process.env.GRAPHQL,
        `mutation handleCastVote( 
          $address: String!,
          $voteId: String!,
          $voter: String!,
          $stake: String!,
          $supports: String!,
          $timestamp: String!,
          $eventObjectId: String!,
          ){
              handleCastVote( 
            address: $address,
            voteId: $voteId,
            voter: $voter,
            stake: $stake,
            supports: $supports,
            timestamp: $timestamp,
            eventObjectId : $eventObjectId
            ) {
          result
      }
                
      }`,
{
address: address,
voteId: voteId,
voter: voter,
stake: stake,
supports: supports,
timestamp: timestamp,
eventObjectId: eventResult._id,
});
console.log("handleCastVote Mutation called.");
return true;
    }else if(eventName == "executeVote") {
      console.log(eventName + " Event result: ");
      console.log(newData[0][0].data + " = " + newData[0][1].data);
      console.log(newData[1][0].data + " = " + newData[1][1].data);
      console.log(newData[2][0].data + " = " + newData[2][1].data);
      console.log(newData[3][0].data + " = " + newData[3][1].data);

      var address = splitdata(newData[0][1].data);      
      var voteId = splitdata(newData[1][1].data);

      console.log("address: ", address);
      console.log("voteId: ", voteId);

      await request(
        process.env.GRAPHQL,
        `mutation handleExecuteVote(
           $address: String!,
           $voteId: String!,
           $timestamp: String!,
           $eventObjectId : String!){
              handleExecuteVote( 
                address: $address,
                voteId: $voteId,
                timestamp: $timestamp,
                eventObjectId : $eventObjectId) 
                {
          result
      }
                
      }`,
{
address: address,
voteId: voteId,
timestamp: timestamp,
eventObjectId: eventResult._id,
});
console.log("handleExecuteVote Mutation called.");
return true;
    }else if(eventName == "addType") {
      console.log(eventName + " Event result: ");
      console.log(newData[0][0].data + " = " + newData[0][1].data);
      console.log(newData[1][0].data + " = " + newData[1][1].data);
      console.log(newData[2][0].data + " = " + newData[2][1].data);
      console.log(newData[3][0].data + " = " + newData[3][1].data);
      console.log(newData[4][0].data + " = " + newData[4][1].data);

      var id = splitdata(newData[0][1].data);      
      var type_id = splitdata(newData[1][1].data);
      var name = splitdata(newData[3][1].data);

      console.log("id: ", id);
      console.log("type_id: ", type_id);
      console.log("name: ", name);

      await request(
        process.env.GRAPHQL,
        `mutation handleAddType( $id: String!,$type_id: String!,$timestamp: String!,$name: String!){
              handleAddType( id: $id,type_id: $type_id,timestamp: $timestamp,name:$name) {
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
console.log("handleAddType Mutation called.")
return true;
    }else if(eventName == "newGauge") {
      console.log(eventName + " Event result: ");
      console.log(newData[0][0].data + " = " + newData[0][1].data);
      console.log(newData[1][0].data + " = " + newData[1][1].data);
      console.log(newData[2][0].data + " = " + newData[2][1].data);
      console.log(newData[3][0].data + " = " + newData[3][1].data);
      console.log(newData[4][0].data + " = " + newData[4][1].data);
      console.log(newData[5][0].data + " = " + newData[5][1].data);

      var gauge_type = splitdata(newData[0][1].data);      
      var addr = splitdata(newData[1][1].data);
      var transactionHash = splitdata(newData[2][1].data);
      var weight = splitdata(newData[3][1].data);

      console.log("gauge_type: ", gauge_type);
      console.log("addr: ", addr);
      console.log("transactionHash: ", transactionHash);
      console.log("weight: ", weight);

      await request(
        process.env.GRAPHQL,
        `mutation handleNewGauge($gaugeType: String!,$addr: String!,$blockNumber: String!,$transactionHash: String!,$weight: String!,$timestamp: String!,){
              handleNewGauge(gaugeType: $gaugeType,addr: $addr,blockNumber: $blockNumber,transactionHash: $transactionHash,weight: $weight,timestamp: $timestamp,) {
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
console.log("handleNewGauge Mutation called.")
return true;
    }else if(eventName == "newGaugeWeight") {
      console.log(eventName + " Event result: ");
      console.log(newData[0][0].data + " = " + newData[0][1].data);
      console.log(newData[1][0].data + " = " + newData[1][1].data);
      console.log(newData[2][0].data + " = " + newData[2][1].data);
      console.log(newData[3][0].data + " = " + newData[3][1].data);
      console.log(newData[4][0].data + " = " + newData[4][1].data);
      console.log(newData[5][0].data + " = " + newData[5][1].data);

      var id = splitdata(newData[0][1].data);      
      var time = parseInt(newData[1][1].data);
      var weight = parseInt(newData[2][1].data);
      var gauge_address = splitdata(newData[3][1].data);

      console.log("id: ", id);
      console.log("time: ", time);
      console.log("weight: ", weight);
      console.log("gauge_address: ", gauge_address);

      await request(
        process.env.GRAPHQL,
        `mutation handleNewGaugeWeight( $id: String!,$time: String!,$weight: String!,$gauge_address: String!,){
           handleNewGaugeWeight( id: $id,time: $time,weight: $weight,gauge_address: $gauge_address,) {
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
console.log("handleNewGaugeWeight Mutation called.")
return true;
    }else if(eventName == "newTypeWeight") {
      console.log(eventName + " Event result: ");
      console.log(newData[0][0].data + " = " + newData[0][1].data);
      console.log(newData[1][0].data + " = " + newData[1][1].data);
      console.log(newData[2][0].data + " = " + newData[2][1].data);
      console.log(newData[3][0].data + " = " + newData[3][1].data);
      console.log(newData[4][0].data + " = " + newData[4][1].data);
      console.log(newData[5][0].data + " = " + newData[5][1].data);
      console.log(newData[6][0].data + " = " + newData[6][1].data);

      var id = splitdata(newData[0][1].data);      
      var time = parseInt(newData[1][1].data);
      var weight = parseInt(newData[2][1].data);
      var type_id = splitdata(newData[3][1].data);
      var total_weight = splitdata(newData[4][1].data);

      console.log("id: ", id);
      console.log("time: ", time);
      console.log("weight: ", weight);
      console.log("type_id: ", type_id);
      console.log("total_weight: ", total_weight);

      await request(
        process.env.GRAPHQL,
        `mutation handleNewTypeWeight( $id: String!,$time: String!,$weight: String!,$type_id: String!,$total_weight: String!){
           handleNewTypeWeight( id: $id,time: $time,weight: $weight,type_id: $type_id,total_weight: $total_weight) {
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
console.log("handleNewTypeWeight Mutation called.")
return true;
    }else if(eventName == "voteForGauge") {
      console.log(eventName + " Event result: ");
      console.log(newData[0][0].data + " = " + newData[0][1].data);
      console.log(newData[1][0].data + " = " + newData[1][1].data);
      console.log(newData[2][0].data + " = " + newData[2][1].data);
      console.log(newData[3][0].data + " = " + newData[3][1].data);
      console.log(newData[4][0].data + " = " + newData[4][1].data);
      console.log(newData[5][0].data + " = " + newData[5][1].data);
      console.log(newData[6][0].data + " = " + newData[6][1].data);

      var id = splitdata(newData[0][1].data);      
      var time = parseInt(newData[1][1].data);
      var weight = parseInt(newData[2][1].data);
      var gauge_addr = splitdata(newData[3][1].data);
      var user = parseInt(newData[4][1].data);

      console.log("id: ", id);
      console.log("time: ", time);
      console.log("weight: ", weight);
      console.log("gauge_addr: ", gauge_addr);
      console.log("user: ", user);

      await request(
        process.env.GRAPHQL,
        `mutation handleVoteForGauge( $id: String!,$time: String!,$weight: String!,$gauge_addr: String!,$user: String!){
           handleVoteForGauge( id: $id,time: $time,weight: $weight,gauge_addr: $gauge_addr,user: $user) {
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
console.log("handleVoteForGauge Mutation called.")
return true;
    }                        
  } catch (error) {
    console.log("error (try-catch) : " + error);
    return res.status(500).json({
      success: false,
      err: error,
    });
  }
}

router
  .route("/getContractHashAgainstPackageHash")
  .post(async function (req, res, next) {
    try {
      if (!req.body.packageHash) {
        return res.status(400).json({
          success: false,
          message: "There is no packageHash specified in the req body.",
        });
      }

      let packageHash = req.body.packageHash.toLowerCase();
      // let contractHash = await allcontractsDataModel.findOne({
      //   packageHash: packageHash,
      // });

      return res.status(200).json({
        success: true,
        message: "Contract Hash has been Succefully found.",
        Data: contractHash,
      });
    } catch (error) {
      console.log("error (try-catch) : " + error);
      return res.status(500).json({
        success: false,
        err: error,
      });
    }
});


router.route("/geteventsdata").post(async function (req, res, next) {
  const {eventResult, deployHash, timestamp, blockhash, eventname, eventdata} = req.body;
 await geteventsdata(eventResult, deployHash, timestamp, blockhash, eventname, eventdata);
});

module.exports = {router, geteventsdata};
