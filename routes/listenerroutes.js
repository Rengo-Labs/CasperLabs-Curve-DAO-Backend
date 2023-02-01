require("dotenv").config();
var express = require("express");
var router = express.Router();
var { request } = require("graphql-request");
var allcontractsDataModel = require("../models/allcontractsData");
const { fetchBlockHeightHelper } = require("../utils/casper");

function splitdata(data) {
  var temp = data.split("(");
  var result = temp[1].split(")");
  return result[0];
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
      let contractHash = await allcontractsDataModel.findOne({
        packageHash: packageHash,
      });

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

async function geteventsdata(
  eventResult,
  _deployHash,
  _timestamp,
  _block_hash,
  _eventname,
  _eventdata
) {
  try {
    if (!_deployHash) {
      console.log("There is no deployHash specified in the req body.");
    }
    if (!_timestamp) {
      console.log("There is no timestamp specified in the req body.");
    }
    if (!_block_hash) {
      console.log("There is no blockHash specified in the req body.");
    }
    if (!_eventname) {
      console.log("There is no eventname specified in the req body.")
    }
    if (!_eventdata) {
      console.log("There is no eventdata specified in the req body.")
    }

    let blockNumber = await fetchBlockHeightHelper(_block_hash);
    blockNumber = blockNumber.toString();
    let newData = _eventdata;
    let deployHash = _deployHash;
    let timestamp = _timestamp;
    let block_hash = _block_hash;
    let eventName = _eventname;
    console.log("... Deployhash: ", deployHash);
    console.log("... Timestamp: ", timestamp);
    console.log("... Block hash: ", block_hash);
    console.log("Event Data: ", newData);

    if (eventName == "addLiquidity") {
      console.log(eventName + " Event result: ");

      var tokenAmounts,fees,invariant,tokenSupply,poolId,
      providerId,transactionHash,logIndex,registryAddress;
      if(newData[0][0].data == undefined)
      {
        console.log(newData[0][0] + " = " + newData[0][1]);
        console.log(newData[1][0] + " = " + newData[1][1]);
        console.log(newData[2][0] + " = " + newData[2][1]);
        console.log(newData[3][0] + " = " + newData[3][1]);
        console.log(newData[4][0] + " = " + newData[4][1]);
        console.log(newData[5][0] + " = " + newData[5][1]);
        console.log(newData[6][0] + " = " + newData[6][1]);
        console.log(newData[7][0] + " = " + newData[7][1]);
        console.log(newData[8][0] + " = " + newData[8][1]);
        console.log(newData[9][0] + " = " + newData[9][1]);
        console.log(newData[10][0] + " = " + newData[10][1]);
        console.log(newData[11][0] + " = " + newData[11][1]);
  
        tokenAmounts = newData[2][1];
        fees = newData[3][1];
        invariant = newData[4][1];
        tokenSupply = newData[5][1];
        poolId = splitdata(newData[6][1]);
        providerId = splitdata(newData[7][1]);
        transactionHash = splitdata(newData[8][1]);
        logIndex = newData[9][1];
        registryAddress = newData[10][1];
      }
      else
      {
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
  
        tokenAmounts = newData[2][1].data;
        fees = newData[3][1].data;
        invariant = newData[4][1].data;
        tokenSupply = newData[5][1].data;
        poolId = splitdata(newData[6][1].data);
        providerId = splitdata(newData[7][1].data);
        transactionHash = splitdata(newData[8][1].data);
        logIndex = newData[9][1].data;
        registryAddress = newData[10][1].data;
      }
      
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
          $eventObjectId: String!
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
            eventObjectId: $eventObjectId
            ) {
          result
      }
                
      }`,
        {
          tokenAmounts: tokenAmounts,
          fees: fees,
          invariant: invariant,
          tokenSupply: tokenSupply,
          block: block_hash,
          timestamp: timestamp,
          poolId: poolId,
          providerId: providerId,
          transactionHash: transactionHash,
          logIndex: logIndex,
          registryAddress: registryAddress,
          blockNumber: blockNumber,
          eventObjectId: eventResult._id,
        }
      );
      console.log("handleAddLiquidity Mutation called.");
      return true;
    } else if (eventName == "removeLiquidity") {
      console.log(eventName + " Event result: ");

      var tokenAmounts,fees,tokenSupply,poolId,providerId,
      transactionHash,logIndex,registryAddress;
      if(newData[0][0].data == undefined)
      {
        console.log(newData[0][0] + " = " + newData[0][1]);
        console.log(newData[1][0] + " = " + newData[1][1]);
        console.log(newData[2][0] + " = " + newData[2][1]);
        console.log(newData[3][0] + " = " + newData[3][1]);
        console.log(newData[4][0] + " = " + newData[4][1]);
        console.log(newData[5][0] + " = " + newData[5][1]);
        console.log(newData[6][0] + " = " + newData[6][1]);
        console.log(newData[7][0] + " = " + newData[7][1]);
        console.log(newData[8][0] + " = " + newData[8][1]);
        console.log(newData[9][0] + " = " + newData[9][1]);
        console.log(newData[10][0] + " = " + newData[10][1]);

        tokenAmounts = newData[2][1];
        fees = newData[3][1];
        tokenSupply = newData[4][1];
        poolId = splitdata(newData[5][1]);
        providerId = splitdata(newData[6][1]);
        transactionHash = splitdata(newData[7][1]);
        logIndex = newData[8][1];
        registryAddress = newData[9][1];
      }
      else{
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
  
        tokenAmounts = newData[2][1].data;
        fees = newData[3][1].data;
        tokenSupply = newData[4][1].data;
        poolId = splitdata(newData[5][1].data);
        providerId = splitdata(newData[6][1].data);
        transactionHash = splitdata(newData[7][1].data);
        logIndex = newData[8][1].data;
        registryAddress = newData[9][1].data;
      }  
      
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
          $eventObjectId : String!
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
            eventObjectId: $eventObjectId
            ) {
          result
      }
                
      }`,
        {
          tokenAmounts: tokenAmounts,
          fees: fees,
          tokenSupply: tokenSupply,
          block: block_hash,
          timestamp: timestamp,
          poolId: poolId,
          providerId: providerId,
          transactionHash: transactionHash,
          logIndex: logIndex,
          registryAddress: registryAddress,
          blockNumber: blockNumber,
          eventObjectId: eventResult._id,
        }
      );
      console.log("handleRemoveLiquidity Mutation called.");
      return true;
    } else if (eventName == "removeLiquidityImbalance") {
      console.log(eventName + " Event result: ");

      var tokenAmounts,fees,invariant,tokenSupply,poolId,
      providerId,transactionHash,logIndex,registryAddress;
      if(newData[0][0].data == undefined)
      {
        console.log(newData[0][0] + " = " + newData[0][1]);
        console.log(newData[1][0] + " = " + newData[1][1]);
        console.log(newData[2][0] + " = " + newData[2][1]);
        console.log(newData[3][0] + " = " + newData[3][1]);
        console.log(newData[4][0] + " = " + newData[4][1]);
        console.log(newData[5][0] + " = " + newData[5][1]);
        console.log(newData[6][0] + " = " + newData[6][1]);
        console.log(newData[7][0] + " = " + newData[7][1]);
        console.log(newData[8][0] + " = " + newData[8][1]);
        console.log(newData[9][0] + " = " + newData[9][1]);
        console.log(newData[10][0] + " = " + newData[10][1]);
        console.log(newData[11][0] + " = " + newData[11][1]);
  
        tokenAmounts = newData[2][1];
        fees = newData[3][1];
        invariant = newData[4][1];
        tokenSupply = newData[5][1];
        poolId = splitdata(newData[6][1]);
        providerId = splitdata(newData[7][1]);
        transactionHash = splitdata(newData[8][1]);
        logIndex = newData[9][1];
        registryAddress = newData[10][1];
      }
      else
      {
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
  
        tokenAmounts = newData[2][1].data;
        fees = newData[3][1].data;
        invariant = newData[4][1].data;
        tokenSupply = newData[5][1].data;
        poolId = splitdata(newData[6][1].data);
        providerId = splitdata(newData[7][1].data);
        transactionHash = splitdata(newData[8][1].data);
        logIndex = newData[9][1].data;
        registryAddress = newData[10][1].data;
      }

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
          $eventObjectId :  String!
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
            eventObjectId: $eventObjectId
            ) {
          result
      }
                
      }`,
        {
          tokenAmounts: tokenAmounts,
          fees: fees,
          invariant: invariant,
          tokenSupply: tokenSupply,
          block: block_hash,
          timestamp: timestamp,
          poolId: poolId,
          providerId: providerId,
          transactionHash: transactionHash,
          logIndex: logIndex,
          registryAddress: registryAddress,
          blockNumber: blockNumber,
          eventObjectId: eventResult._id,
        }
      );
      console.log("handleRemoveLiquidityImbalance Mutation called.");
      return true;
    } else if (eventName == "removeLiquidityOne") {
      console.log(eventName + " Event result: ");

      var tokenAmounts,coinAmount,poolId,providerId,
      transactionHash,logIndex,registryAddress;
      if(newData[0][0].data == undefined)
      {
        console.log(newData[0][0] + " = " + newData[0][1]);
        console.log(newData[1][0] + " = " + newData[1][1]);
        console.log(newData[2][0] + " = " + newData[2][1]);
        console.log(newData[3][0] + " = " + newData[3][1]);
        console.log(newData[4][0] + " = " + newData[4][1]);
        console.log(newData[5][0] + " = " + newData[5][1]);
        console.log(newData[6][0] + " = " + newData[6][1]);
        console.log(newData[7][0] + " = " + newData[7][1]);
        console.log(newData[8][0] + " = " + newData[8][1]);
        console.log(newData[9][0] + " = " + newData[9][1]);
  
        tokenAmounts = newData[2][1];
        coinAmount = newData[3][1];
        poolId = splitdata(newData[4][1]);
        providerId = splitdata(newData[5][1]);
        transactionHash = splitdata(newData[6][1]);
        logIndex = newData[7][1];
        registryAddress = newData[8][1];
      }
      else
      {
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
  
        tokenAmounts = newData[2][1].data;
        coinAmount = newData[3][1].data;
        poolId = splitdata(newData[4][1].data);
        providerId = splitdata(newData[5][1].data);
        transactionHash = splitdata(newData[6][1].data);
        logIndex = newData[7][1].data;
        registryAddress = newData[8][1].data;
      }

      console.log("tokenAmounts: ", tokenAmounts);
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
          eventObjectId : String!
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
            eventObjectId : $eventObjectId
            ) {
          result
      }
                
      }`,
        {
          tokenAmount: tokenAmounts,
          coinAmount: coinAmount,
          block: block_hash,
          timestamp: timestamp,
          poolId: poolId,
          providerId: providerId,
          transactionHash: transactionHash,
          logIndex: logIndex,
          registryAddress: registryAddress,
          blockNumber: blockNumber,
          eventObjectId: eventResult._id,
        }
      );
      console.log("handleRemoveLiquidityOne Mutation called.");
      return true;
    } else if (eventName == "tokenExchange") {
      console.log(eventName + " Event result: ");

      var poolId,transactionHash,logIndex,buyer,
      sold_id,tokens_sold,bought_id,tokens_bought;
      if(newData[0][0].data == undefined)
      {
        console.log(newData[0][0] + " = " + newData[0][1]);
        console.log(newData[1][0] + " = " + newData[1][1]);
        console.log(newData[2][0] + " = " + newData[2][1]);
        console.log(newData[3][0] + " = " + newData[3][1]);
        console.log(newData[4][0] + " = " + newData[4][1]);
        console.log(newData[5][0] + " = " + newData[5][1]);
        console.log(newData[6][0] + " = " + newData[6][1]);
        console.log(newData[7][0] + " = " + newData[7][1]);
        console.log(newData[8][0] + " = " + newData[8][1]);
        console.log(newData[9][0] + " = " + newData[9][1]);

        poolId = splitdata(newData[2][1]);
        transactionHash = splitdata(newData[3][1]);
        logIndex = newData[4][1];
        buyer = splitdata(newData[5][1]);
        sold_id = splitdata(newData[6][1]);
        tokens_sold = newData[7][1];
        bought_id = splitdata(newData[8][1]);
        tokens_bought = newData[9][1];
      }
      else{
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

        poolId = splitdata(newData[2][1].data);
        transactionHash = splitdata(newData[3][1].data);
        logIndex = newData[4][1].data;
        buyer = splitdata(newData[5][1].data);
        sold_id = splitdata(newData[6][1].data);
        tokens_sold = newData[7][1].data;
        bought_id = splitdata(newData[8][1].data);
        tokens_bought = newData[9][1].data;
      }

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
          $tokens_bought: String!,
          eventObjectId : String!
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
            tokens_bought: $tokens_bought,
            eventObjectId : $eventObjectId
            ) {
          result
      }
                
      }`,
        {
          poolId: poolId,
          transactionHash: transactionHash,
          block: block_hash,
          timestamp: timestamp,
          logIndex: logIndex,
          buyer: buyer,
          sold_id: sold_id,
          tokens_sold: tokens_sold,
          bought_id: bought_id,
          tokens_bought: tokens_bought,
          eventObjectId: eventResult._id,
        }
      );
      console.log("handleTokenExchange Mutation called.");
      return true;
    } else if (eventName == "exchangeUnderlying") {
      console.log(eventName + " Event result: ");

      var poolId,transactionHash,logIndex,buyer,sold_id,
      tokens_sold,bought_id,tokens_bought;
      if(newData[0][0].data == undefined)
      {
        console.log(newData[0][0] + " = " + newData[0][1]);
        console.log(newData[1][0] + " = " + newData[1][1]);
        console.log(newData[2][0] + " = " + newData[2][1]);
        console.log(newData[3][0] + " = " + newData[3][1]);
        console.log(newData[4][0] + " = " + newData[4][1]);
        console.log(newData[5][0] + " = " + newData[5][1]);
        console.log(newData[6][0] + " = " + newData[6][1]);
        console.log(newData[7][0] + " = " + newData[7][1]);
        console.log(newData[8][0] + " = " + newData[8][1]);
        console.log(newData[9][0] + " = " + newData[9][1]);

        poolId = splitdata(newData[2][1]);
        transactionHash = splitdata(newData[4][1]);
        logIndex = newData[5][1];
        buyer = splitdata(newData[3][1]);
        sold_id = splitdata(newData[0][1]);
        tokens_sold = newData[1][1];
        bought_id = splitdata(newData[6][1]);
        tokens_bought = newData[7][1];
      }
      else{
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

        poolId = splitdata(newData[2][1].data);
        transactionHash = splitdata(newData[4][1].data);
        logIndex = newData[5][1].data;
        buyer = splitdata(newData[3][1].data);
        sold_id = splitdata(newData[0][1].data);
        tokens_sold = newData[1][1].data;
        bought_id = splitdata(newData[6][1].data);
        tokens_bought = newData[7][1].data;
      }

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
          $tokens_bought: String!,
          $eventObjectId : String!
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
            tokens_bought: $tokens_bought,
            eventObjectId : $eventObjectId
            ) {
          result
      }
                
      }`,
        {
          poolId: poolId,
          transactionHash: transactionHash,
          block: block_hash,
          timestamp: timestamp,
          logIndex: logIndex,
          buyer: buyer,
          sold_id: sold_id,
          tokens_sold: tokens_sold,
          bought_id: bought_id,
          tokens_bought: tokens_bought,
          eventObjectId: eventResult._id,
        }
      );
      console.log("handleExchangeUnderlying Mutation called.");
      return true;
    } else if (eventName == "newAdmin") {
      console.log(eventName + " Event result: ");

      var poolId,transactionHash,logIndex,admin;
      if(newData[0][0].data == undefined)
      {
        console.log(newData[0][0] + " = " + newData[0][1]);
        console.log(newData[1][0] + " = " + newData[1][1]);
        console.log(newData[2][0] + " = " + newData[2][1]);
        console.log(newData[3][0] + " = " + newData[3][1]);
        console.log(newData[4][0] + " = " + newData[4][1]);
        console.log(newData[5][0] + " = " + newData[5][1]);
  
        poolId = splitdata(newData[0][1]);
        transactionHash = splitdata(newData[1][1]);
        logIndex = newData[2][1];
        admin = splitdata(newData[3][1]);
      }
      else{
        console.log(newData[0][0].data + " = " + newData[0][1].data);
        console.log(newData[1][0].data + " = " + newData[1][1].data);
        console.log(newData[2][0].data + " = " + newData[2][1].data);
        console.log(newData[3][0].data + " = " + newData[3][1].data);
        console.log(newData[4][0].data + " = " + newData[4][1].data);
        console.log(newData[5][0].data + " = " + newData[5][1].data);
  
        poolId = splitdata(newData[0][1].data);
        transactionHash = splitdata(newData[1][1].data);
        logIndex = newData[2][1].data;
        admin = splitdata(newData[3][1].data);
      }

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
          $eventObjectId : String!
          ){
              handleNewAdmin( 
            poolId: $poolId,
            transactionHash: $transactionHash,
            block: $block,
            timestamp: $timestamp,
            logIndex: $logIndex,
            admin: $admin,
            eventObjectId : $eventObjectId
            ) {
          result
      }
                
      }`,
        {
          poolId: poolId,
          transactionHash: transactionHash,
          block: block_hash,
          timestamp: timestamp,
          logIndex: logIndex,
          admin: admin,
          eventObjectId: eventResult._id,
        }
      );
      console.log("handleNewAdmin Mutation called.");
      return true;
    } else if (eventName == "newFee") {
      console.log(eventName + " Event result: ");

      var poolId,transactionHash,logIndex,fee,admin_fee;
      if(newData[0][0].data == undefined)
      {
        console.log(newData[0][0] + " = " + newData[0][1]);
        console.log(newData[1][0] + " = " + newData[1][1]);
        console.log(newData[2][0] + " = " + newData[2][1]);
        console.log(newData[3][0] + " = " + newData[3][1]);
        console.log(newData[4][0] + " = " + newData[4][1]);
        console.log(newData[5][0] + " = " + newData[5][1]);
        console.log(newData[6][0] + " = " + newData[6][1]);
  
        poolId = splitdata(newData[0][1]);
        transactionHash = splitdata(newData[1][1]);
        logIndex = newData[2][1];
        fee = newData[3][1];
        admin_fee = newData[4][1];
      }
      else{
        console.log(newData[0][0].data + " = " + newData[0][1].data);
        console.log(newData[1][0].data + " = " + newData[1][1].data);
        console.log(newData[2][0].data + " = " + newData[2][1].data);
        console.log(newData[3][0].data + " = " + newData[3][1].data);
        console.log(newData[4][0].data + " = " + newData[4][1].data);
        console.log(newData[5][0].data + " = " + newData[5][1].data);
        console.log(newData[6][0].data + " = " + newData[6][1].data);
  
        poolId = splitdata(newData[0][1].data);
        transactionHash = splitdata(newData[1][1].data);
        logIndex = newData[2][1].data;
        fee = newData[3][1].data;
        admin_fee = newData[4][1].data;
      }
     
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
          $eventObjectId :String!
          ){
              handleNewFee( 
            poolId: $poolId,
            transactionHash: $transactionHash,
            block: $block,
            timestamp: $timestamp,
            logIndex: $logIndex,
            fee: $fee,
            admin_fee: $admin_fee,
            eventObjectId : $eventObjectId
            ) {
          result
      }
                
      }`,
        {
          poolId: poolId,
          transactionHash: transactionHash,
          block: block_hash,
          timestamp: timestamp,
          logIndex: logIndex,
          fee: fee,
          admin_fee: admin_fee,
          eventObjectId: eventResult._id,
        }
      );
      console.log("handleNewFee Mutation called.");
      return true;
    } else if (eventName == "newParameters") {
      console.log(eventName + " Event result: ");

      var poolId,A,transactionHash,logIndex,fee,admin_fee;
      if(newData[0][0].data == undefined)
      {
        console.log(newData[0][0] + " = " + newData[0][1]);
        console.log(newData[1][0] + " = " + newData[1][1]);
        console.log(newData[2][0] + " = " + newData[2][1]);
        console.log(newData[3][0] + " = " + newData[3][1]);
        console.log(newData[4][0] + " = " + newData[4][1]);
        console.log(newData[5][0] + " = " + newData[5][1]);
        console.log(newData[6][0] + " = " + newData[6][1]);
        console.log(newData[7][0] + " = " + newData[7][1]);

        poolId = splitdata(newData[0][1]);
        A = newData[4][1];
        transactionHash = splitdata(newData[1][1]);
        logIndex = newData[2][1];
        fee = newData[3][1];
        admin_fee = newData[4][1];
      }
      else{
        console.log(newData[0][0].data + " = " + newData[0][1].data);
        console.log(newData[1][0].data + " = " + newData[1][1].data);
        console.log(newData[2][0].data + " = " + newData[2][1].data);
        console.log(newData[3][0].data + " = " + newData[3][1].data);
        console.log(newData[4][0].data + " = " + newData[4][1].data);
        console.log(newData[5][0].data + " = " + newData[5][1].data);
        console.log(newData[6][0].data + " = " + newData[6][1].data);
        console.log(newData[7][0].data + " = " + newData[7][1].data);
  
        poolId = splitdata(newData[0][1].data);
        A = newData[4][1].data;
        transactionHash = splitdata(newData[1][1].data);
        logIndex = newData[2][1].data;
        fee = newData[3][1].data;
        admin_fee = newData[4][1].data;
      }

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
          $eventObjectId : String!
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
            eventObjectId : $eventObjectId
            ) {
          result
      }
                
      }`,
        {
          poolId: poolId,
          A: A,
          transactionHash: transactionHash,
          block: block_hash,
          timestamp: timestamp,
          logIndex: logIndex,
          fee: fee,
          admin_fee: admin_fee,
          eventObjectId: eventResult._id,
        }
      );
      console.log("handleNewParameters Mutation called.");
      return true;
    } else if (eventName == "RampA") {
      console.log(eventName + " Event result: ");

      var poolId,new_A,transactionHash,logIndex;
      if(newData[0][0].data == undefined)
      {
        console.log(newData[0][0] + " = " + newData[0][1]);
        console.log(newData[1][0] + " = " + newData[1][1]);
        console.log(newData[2][0] + " = " + newData[2][1]);
        console.log(newData[3][0] + " = " + newData[3][1]);
        console.log(newData[4][0] + " = " + newData[4][1]);
        console.log(newData[5][0] + " = " + newData[5][1]);

        poolId = splitdata(newData[0][1]);
        new_A = newData[1][1];
        transactionHash = splitdata(newData[2][1]);
        logIndex = newData[3][1];
      }
      else{
        console.log(newData[0][0].data + " = " + newData[0][1].data);
        console.log(newData[1][0].data + " = " + newData[1][1].data);
        console.log(newData[2][0].data + " = " + newData[2][1].data);
        console.log(newData[3][0].data + " = " + newData[3][1].data);
        console.log(newData[4][0].data + " = " + newData[4][1].data);
        console.log(newData[5][0].data + " = " + newData[5][1].data);
  
        poolId = splitdata(newData[0][1].data);
        new_A = newData[1][1].data;
        transactionHash = splitdata(newData[2][1].data);
        logIndex = newData[3][1].data;
      }
    
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
          $eventObjectId : String!
          ){
              handleRampA( 
            poolId: $poolId,
            new_A: $new_A ,
            transactionHash: $transactionHash,
            block: $block,
            timestamp: $timestamp,
            logIndex: $logIndex,
            eventObjectId : $eventObjectId
            ) {
          result
      }
                
      }`,
        {
          poolId: poolId,
          new_A: new_A,
          transactionHash: transactionHash,
          block: block_hash,
          timestamp: timestamp,
          logIndex: logIndex,
          eventObjectId: eventResult._id,
        }
      );
      console.log("handleRampA Mutation called.");
      return true;
    } else if (eventName == "stopRampA") {
      console.log(eventName + " Event result: ");

      var poolId,A,transactionHash,logIndex;
      if(newData[0][0].data == undefined)
      {
        console.log(newData[0][0] + " = " + newData[0][1]);
        console.log(newData[1][0] + " = " + newData[1][1]);
        console.log(newData[2][0] + " = " + newData[2][1]);
        console.log(newData[3][0] + " = " + newData[3][1]);
        console.log(newData[4][0] + " = " + newData[4][1]);
        console.log(newData[5][0] + " = " + newData[5][1]);

        poolId = splitdata(newData[0][1]);
        A = newData[1][1];
        transactionHash = splitdata(newData[2][1]);
        logIndex = newData[3][1];
      }
      else{
        console.log(newData[0][0].data + " = " + newData[0][1].data);
        console.log(newData[1][0].data + " = " + newData[1][1].data);
        console.log(newData[2][0].data + " = " + newData[2][1].data);
        console.log(newData[3][0].data + " = " + newData[3][1].data);
        console.log(newData[4][0].data + " = " + newData[4][1].data);
        console.log(newData[5][0].data + " = " + newData[5][1].data);
  
        poolId = splitdata(newData[0][1].data);
        A = newData[1][1].data;
        transactionHash = splitdata(newData[2][1].data);
        logIndex = newData[3][1].data;
      }

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
          $eventObjectId : String!
          ){
              handleStopRampA( 
            poolId: $poolId,
            A: $A ,
            transactionHash: $transactionHash,
            block: $block,
            timestamp: $timestamp,
            logIndex: $logIndex,
            eventObjectId : $eventObjectId
            ) {
          result
      }
                
      }`,
        {
          poolId: poolId,
          A: A,
          transactionHash: transactionHash,
          block: block_hash,
          timestamp: timestamp,
          logIndex: logIndex,
          eventObjectId: eventResult._id,
        }
      );
      console.log("handleStopRampA Mutation called.");
      return true;
    } else if (eventName == "addressModified") {
      console.log(eventName + " Event result: ");

      var addressProviderContractHash,id,transactionHash;
      if(newData[0][0].data == undefined)
      {
        console.log(newData[0][0] + " = " + newData[0][1]);
        console.log(newData[1][0] + " = " + newData[1][1]);
        console.log(newData[2][0] + " = " + newData[2][1]);
        console.log(newData[3][0] + " = " + newData[3][1]);
        console.log(newData[4][0] + " = " + newData[4][1]);

        addressProviderContractHash = splitdata(newData[0][1]);
        id = splitdata(newData[1][1]);
        transactionHash = splitdata(newData[2][1]);
      }
      else{
        console.log(newData[0][0].data + " = " + newData[0][1].data);
        console.log(newData[1][0].data + " = " + newData[1][1].data);
        console.log(newData[2][0].data + " = " + newData[2][1].data);
        console.log(newData[3][0].data + " = " + newData[3][1].data);
        console.log(newData[4][0].data + " = " + newData[4][1].data);

        addressProviderContractHash = splitdata(newData[0][1].data);
        id = splitdata(newData[1][1].data);
        transactionHash = splitdata(newData[2][1].data);
      }
      
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
          $eventObjectId : String!
          ){
              handleAddressModified( 
            addressProviderContractHash: $addressProviderContractHash,
            id: $id,
            block: $block,
            timestamp: $timestamp,
            transactionHash: $transactionHash,
            eventObjectId : $eventObjectId
            ) {
          result
      }
                
      }`,
        {
          addressProviderContractHash: addressProviderContractHash,
          id: id,
          block: block_hash,
          timestamp: timestamp,
          transactionHash: transactionHash,
          eventObjectId: eventResult._id,
        }
      );
      console.log("handleAddressModified Mutation called.");
      return true;
    } else if (eventName == "newAddressIdentifier") {
      console.log(eventName + " Event result: ");

      var addressProviderContractHash,id,transactionHash;
      if(newData[0][0].data == undefined)
      {
        console.log(newData[0][0] + " = " + newData[0][1]);
        console.log(newData[1][0] + " = " + newData[1][1]);
        console.log(newData[2][0] + " = " + newData[2][1]);
        console.log(newData[3][0] + " = " + newData[3][1]);
        console.log(newData[4][0] + " = " + newData[4][1]);

        addressProviderContractHash = splitdata(newData[0][1]);
        id = splitdata(newData[1][1]);
        transactionHash = splitdata(newData[2][1]);
      }
      else{
        console.log(newData[0][0].data + " = " + newData[0][1].data);
        console.log(newData[1][0].data + " = " + newData[1][1].data);
        console.log(newData[2][0].data + " = " + newData[2][1].data);
        console.log(newData[3][0].data + " = " + newData[3][1].data);
        console.log(newData[4][0].data + " = " + newData[4][1].data);

        addressProviderContractHash = splitdata(newData[0][1].data);
        id = splitdata(newData[1][1].data);
        transactionHash = splitdata(newData[2][1].data);
      }

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
          $eventObjectId : String!
          ){
            handleNewAddressIdentifier( 
            addressProviderContractHash: $addressProviderContractHash,
            id: $id,
            block: $block,
            timestamp: $timestamp,
            transactionHash: $transactionHash,
            eventObjectId: $eventObjectId
            ) {
          result
      }
                
      }`,
        {
          addressProviderContractHash: addressProviderContractHash,
          id: id,
          block: block_hash,
          timestamp: timestamp,
          transactionHash: transactionHash,
          eventObjectId: eventResult._id,
        }
      );
      console.log("handleNewAddressIdentifier Mutation called.");
      return true;
    } else if (eventName == "poolAdded") {
      console.log(eventName + " Event result: ");

      var poolId,transactionHash;
      if(newData[0][0].data == undefined)
      {
        console.log(newData[0][0] + " = " + newData[0][1]);
        console.log(newData[1][0] + " = " + newData[1][1]);
        console.log(newData[2][0] + " = " + newData[2][1]);
        console.log(newData[3][0] + " = " + newData[3][1]);
  
        poolId = splitdata(newData[1][1]);
        transactionHash = splitdata(newData[2][1]);
      }
      else{
        console.log(newData[0][0].data + " = " + newData[0][1].data);
        console.log(newData[1][0].data + " = " + newData[1][1].data);
        console.log(newData[2][0].data + " = " + newData[2][1].data);
        console.log(newData[3][0].data + " = " + newData[3][1].data);
  
        poolId = splitdata(newData[1][1].data);
        transactionHash = splitdata(newData[2][1].data);
      }
     
      console.log("poolId: ", poolId);
      console.log("transactionHash: ", transactionHash);

      await request(
        process.env.GRAPHQL,
        `mutation handlePoolAdded( $poolId: String!,$transactionHash: String!,$block: String!,$timestamp: String!, $eventObjectId : String!){
           handlePoolAdded( poolId: $poolId,transactionHash: $transactionHash,block: $block,timestamp: $timestamp, eventObjectId : $eventObjectId) {
          result
      }
                
      }`,
        {
          poolId: poolId,
          transactionHash: transactionHash,
          block: block_hash,
          timestamp: timestamp,
          eventObjectId: eventResult._id,
        }
      );
      console.log("handlePoolAdded Mutation called.");
      return true;
    } else if (eventName == "poolRemoved") {
      console.log(eventName + " Event result: ");

      var poolId,transactionHash;
      if(newData[0][0].data == undefined)
      {
        console.log(newData[0][0] + " = " + newData[0][1]);
        console.log(newData[1][0] + " = " + newData[1][1]);
        console.log(newData[2][0] + " = " + newData[2][1]);
        console.log(newData[3][0] + " = " + newData[3][1]);
  
        poolId = splitdata(newData[1][1]);
        transactionHash = splitdata(newData[2][1]);
      }
      else
      {
        console.log(newData[0][0].data + " = " + newData[0][1].data);
        console.log(newData[1][0].data + " = " + newData[1][1].data);
        console.log(newData[2][0].data + " = " + newData[2][1].data);
        console.log(newData[3][0].data + " = " + newData[3][1].data);
  
        poolId = splitdata(newData[1][1].data);
        transactionHash = splitdata(newData[2][1].data);
      }

      console.log("poolId: ", poolId);
      console.log("transactionHash: ", transactionHash);

      await request(
        process.env.GRAPHQL,
        `mutation handlePoolRemoved( $poolId: String!,$transactionHash: String!,$block: String!,$timestamp: String!, $eventObjectId : String!){
          handlePoolRemoved( poolId: $poolId,transactionHash: $transactionHash,block: $block,timestamp: $timestamp, eventObjectId : $eventObjectId) {
          result
      }
                
      }`,
        {
          poolId: poolId,
          transactionHash: transactionHash,
          block: block_hash,
          timestamp: timestamp,
          eventObjectId: eventResult._id,
        }
      );
      console.log("handlePoolRemoved Mutation called.");
      return true;
    } else if (eventName == "newProxyApp") {
      console.log(eventName + " Event result: ");

      var appId,proxy,context,transactionHash;
      if(newData[0][0].data == undefined)
      {
        console.log(newData[0][0] + " = " + newData[0][1]);
        console.log(newData[1][0] + " = " + newData[1][1]);
        console.log(newData[2][0] + " = " + newData[2][1]);
        console.log(newData[3][0] + " = " + newData[3][1]);
        console.log(newData[4][0] + " = " + newData[4][1]);
        console.log(newData[5][0] + " = " + newData[5][1]);
  
        appId = splitdata(newData[0][1]);
        proxy = splitdata(newData[1][1]);
        context = newData[2][1];
        transactionHash = splitdata(newData[3][1]);
      }
      else{
        console.log(newData[0][0].data + " = " + newData[0][1].data);
        console.log(newData[1][0].data + " = " + newData[1][1].data);
        console.log(newData[2][0].data + " = " + newData[2][1].data);
        console.log(newData[3][0].data + " = " + newData[3][1].data);
        console.log(newData[4][0].data + " = " + newData[4][1].data);
        console.log(newData[5][0].data + " = " + newData[5][1].data);
  
        appId = splitdata(newData[0][1].data);
        proxy = splitdata(newData[1][1].data);
        context = newData[2][1].data;
        transactionHash = splitdata(newData[3][1].data);
      }

      console.log("appId: ", appId);
      console.log("proxy: ", proxy);
      console.log("context: ", context);
      console.log("transactionHash: ", transactionHash);

      await request(
        process.env.GRAPHQL,
        `mutation handleNewProxyApp( $appId: String!,$proxy: String!,$context: String!,$transactionHash: String!,$block: String!,$timestamp: String!, $eventObjectId : String!){
           handleNewProxyApp( appId: $appId,proxy: $proxy,context: $context,transactionHash: $transactionHash,block: $block,timestamp: $timestamp, eventObjectId : $eventObjectId) {
          result
      }
                
      }`,
        {
          appId: appId,
          proxy: proxy,
          context: context,
          transactionHash: transactionHash,
          block: block_hash,
          timestamp: timestamp,
          eventObjectId: eventResult._id,
        }
      );
      console.log("handleNewProxyApp Mutation called.");
      return true;
    } else if (eventName == "updateLiquidityLimit") {
      console.log(eventName + " Event result: ");

      var user,id,original_balance,original_supply,
      working_balance,working_supply,transactionHash;
      if(newData[0][0].data == undefined)
      {
        console.log(newData[0][0] + " = " + newData[0][1]);
        console.log(newData[1][0] + " = " + newData[1][1]);
        console.log(newData[2][0] + " = " + newData[2][1]);
        console.log(newData[3][0] + " = " + newData[3][1]);
        console.log(newData[4][0] + " = " + newData[4][1]);
        console.log(newData[5][0] + " = " + newData[5][1]);
        console.log(newData[6][0] + " = " + newData[6][1]);
        console.log(newData[7][0] + " = " + newData[7][1]);
        console.log(newData[8][0] + " = " + newData[8][1]);
  
        user = splitdata(newData[0][1]);
        id = splitdata(newData[1][1]);
        original_balance = newData[2][1];
        original_supply = newData[3][1];
        working_balance = newData[4][1];
        working_supply = newData[5][1];
        transactionHash = splitdata(newData[6][1]);
      }
      else{
        console.log(newData[0][0].data + " = " + newData[0][1].data);
        console.log(newData[1][0].data + " = " + newData[1][1].data);
        console.log(newData[2][0].data + " = " + newData[2][1].data);
        console.log(newData[3][0].data + " = " + newData[3][1].data);
        console.log(newData[4][0].data + " = " + newData[4][1].data);
        console.log(newData[5][0].data + " = " + newData[5][1].data);
        console.log(newData[6][0].data + " = " + newData[6][1].data);
        console.log(newData[7][0].data + " = " + newData[7][1].data);
        console.log(newData[8][0].data + " = " + newData[8][1].data);
  
        user = splitdata(newData[0][1].data);
        id = splitdata(newData[1][1].data);
        original_balance = newData[2][1].data;
        original_supply = newData[3][1].data;
        working_balance = newData[4][1].data;
        working_supply = newData[5][1].data;
        transactionHash = splitdata(newData[6][1].data);
      }

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
          $eventObjectId : String!
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
            eventObjectId : $eventObjectId
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
          block: block_hash,
          timestamp: timestamp,
          eventObjectId: eventResult._id,
        }
      );
      console.log("handleUpdateLiquidityLimit Mutation called.");
      return true;
    } else if (eventName == "deposit") {
      console.log(eventName + " Event result: ");

      var provider,id,value,transactionHash,logIndex;
      if(newData[0][0].data == undefined)
      {
        console.log(newData[0][0] + " = " + newData[0][1]);
        console.log(newData[1][0] + " = " + newData[1][1]);
        console.log(newData[2][0] + " = " + newData[2][1]);
        console.log(newData[3][0] + " = " + newData[3][1]);
        console.log(newData[4][0] + " = " + newData[4][1]);
        console.log(newData[5][0] + " = " + newData[5][1]);
        console.log(newData[6][0] + " = " + newData[6][1]);
  
        provider = splitdata(newData[0][1]);
        id = splitdata(newData[1][1]);
        value = newData[2][1].data;
        transactionHash = splitdata(newData[3][1]);
        logIndex = newData[4][1];
      }
      else{
        console.log(newData[0][0].data + " = " + newData[0][1].data);
        console.log(newData[1][0].data + " = " + newData[1][1].data);
        console.log(newData[2][0].data + " = " + newData[2][1].data);
        console.log(newData[3][0].data + " = " + newData[3][1].data);
        console.log(newData[4][0].data + " = " + newData[4][1].data);
        console.log(newData[5][0].data + " = " + newData[5][1].data);
        console.log(newData[6][0].data + " = " + newData[6][1].data);
  
        provider = splitdata(newData[0][1].data);
        id = splitdata(newData[1][1].data);
        value = newData[2][1].data;
        transactionHash = splitdata(newData[3][1].data);
        logIndex = newData[4][1].data;
      }

      console.log("provider: ", provider);
      console.log("id: ", id);
      console.log("value: ", value);
      console.log("transactionHash: ", transactionHash);
      console.log("logIndex: ", logIndex);

      await request(
        process.env.GRAPHQL,
        `mutation handleDeposit( $provider: String!,$id: String!,$value: String!,$transactionHash: String!,$logIndex: String!, $eventObjectId : String!){
           handleDeposit( provider: $provider,id: $id,value: $value,transactionHash: $transactionHash,logIndex: $logIndex, eventObjectId : $eventObjectId) {
          result
      }
                
      }`,
        {
          provider: provider,
          id: id,
          value: value,
          transactionHash: transactionHash,
          logIndex: logIndex,
          eventObjectId: eventResult._id,
        }
      );
      console.log("handleDeposit Mutation called.");
      return true;
    } else if (eventName == "withdraw") {
      console.log(eventName + " Event result: ");

      var provider,id,value,transactionHash,logIndex;
      if(newData[0][0].data == undefined)
      {
        console.log(newData[0][0] + " = " + newData[0][1]);
        console.log(newData[1][0] + " = " + newData[1][1]);
        console.log(newData[2][0] + " = " + newData[2][1]);
        console.log(newData[3][0] + " = " + newData[3][1]);
        console.log(newData[4][0] + " = " + newData[4][1]);
        console.log(newData[5][0] + " = " + newData[5][1]);
        console.log(newData[6][0] + " = " + newData[6][1]);
  
        provider = splitdata(newData[0][1]);
        id = splitdata(newData[1][1]);
        value = newData[2][1].data;
        transactionHash = splitdata(newData[3][1]);
        logIndex = newData[4][1];
      }
      else{
        console.log(newData[0][0].data + " = " + newData[0][1].data);
        console.log(newData[1][0].data + " = " + newData[1][1].data);
        console.log(newData[2][0].data + " = " + newData[2][1].data);
        console.log(newData[3][0].data + " = " + newData[3][1].data);
        console.log(newData[4][0].data + " = " + newData[4][1].data);
        console.log(newData[5][0].data + " = " + newData[5][1].data);
        console.log(newData[6][0].data + " = " + newData[6][1].data);
  
        provider = splitdata(newData[0][1].data);
        id = splitdata(newData[1][1].data);
        value = newData[2][1].data;
        transactionHash = splitdata(newData[3][1].data);
        logIndex = newData[4][1].data;
      }

      console.log("provider: ", provider);
      console.log("id: ", id);
      console.log("value: ", value);
      console.log("transactionHash: ", transactionHash);
      console.log("logIndex: ", logIndex);

      await request(
        process.env.GRAPHQL,
        `mutation handleWithdraw( $provider: String!,$id: String!,$value: String!,$transactionHash: String!,$logIndex: String!, $eventObjectId : String!){
          handleWithdraw( provider: $provider,id: $id,value: $value,transactionHash: $transactionHash,logIndex: $logIndex, eventObjectId : $eventObjectId) {
          result
      }
                
      }`,
        {
          provider: provider,
          id: id,
          value: value,
          transactionHash: transactionHash,
          logIndex: logIndex,
          eventObjectId: eventResult._id,
        }
      );
      console.log("handleWithdraw Mutation called.");
      return true;
    } else if (eventName == "minimumBalanceSet") {
      console.log(eventName + " Event result: ");

      var address,minBalance;
      if(newData[0][0].data == undefined)
      {
        console.log(newData[0][0] + " = " + newData[0][1]);
        console.log(newData[1][0] + " = " + newData[1][1]);
        console.log(newData[2][0] + " = " + newData[2][1]);
        console.log(newData[3][0] + " = " + newData[3][1]);
  
        address = splitdata(newData[0][1]);
        minBalance = newData[1][1];
      }
      else{
        console.log(newData[0][0].data + " = " + newData[0][1].data);
        console.log(newData[1][0].data + " = " + newData[1][1].data);
        console.log(newData[2][0].data + " = " + newData[2][1].data);
        console.log(newData[3][0].data + " = " + newData[3][1].data);
  
        address = splitdata(newData[0][1].data);
        minBalance = newData[1][1].data;
      }

      console.log("address: ", address);
      console.log("minBalance: ", minBalance);

      await request(
        process.env.GRAPHQL,
        `mutation handleMinimumBalanceSet( $address: String!,$minBalance: String!, $eventObjectId: String!){
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
      console.log("handleMinimumBalanceSet Mutation called.");
      return true;
    } else if (eventName == "minimumTimeSet") {
      console.log(eventName + " Event result: ");

      var address,minTime;
      if(newData[0][0].data == undefined)
      {
        console.log(newData[0][0] + " = " + newData[0][1]);
        console.log(newData[1][0] + " = " + newData[1][1]);
        console.log(newData[2][0] + " = " + newData[2][1]);
        console.log(newData[3][0] + " = " + newData[3][1]);
  
        address = splitdata(newData[0][1]);
        minTime = newData[1][1];
      }
      else{
        console.log(newData[0][0].data + " = " + newData[0][1].data);
        console.log(newData[1][0].data + " = " + newData[1][1].data);
        console.log(newData[2][0].data + " = " + newData[2][1].data);
        console.log(newData[3][0].data + " = " + newData[3][1].data);
  
        address = splitdata(newData[0][1].data);
        minTime = newData[1][1].data;
      }
      
      console.log("address: ", address);
      console.log("minTime: ", minTime);

      await request(
        process.env.GRAPHQL,
        `mutation handleMinimumTimeSet( $address: String!,$minTime: String!, $eventObjectId: String!){
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
      console.log("handleMinimumTimeSet Mutation called.");
      return true;
    } else if (eventName == "changeMinQuorum") {
      console.log(eventName + " Event result: ");

      var address,minAcceptQuorumPct;
      if(newData[0][0].data == undefined)
      {
        console.log(newData[0][0] + " = " + newData[0][1]);
        console.log(newData[1][0] + " = " + newData[1][1]);
        console.log(newData[2][0] + " = " + newData[2][1]);
        console.log(newData[3][0] + " = " + newData[3][1]);
  
        address = splitdata(newData[0][1]);
        minAcceptQuorumPct = newData[1][1];
      }
      else{
        console.log(newData[0][0].data + " = " + newData[0][1].data);
        console.log(newData[1][0].data + " = " + newData[1][1].data);
        console.log(newData[2][0].data + " = " + newData[2][1].data);
        console.log(newData[3][0].data + " = " + newData[3][1].data);
  
        address = splitdata(newData[0][1].data);
        minAcceptQuorumPct = newData[1][1].data;
      }
      
      console.log("address: ", address);
      console.log("minAcceptQuorumPct: ", minAcceptQuorumPct);

      await request(
        process.env.GRAPHQL,
        `mutation handleChangeMinQuorum( $address: String!,$minAcceptQuorumPct: String!, $eventObjectId: String!){
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
      console.log("handleChangeMinQuorum Mutation called.");
      return true;
    } else if (eventName == "changeSupportRequired") {
      console.log(eventName + " Event result: ");

      var address,supportRequiredPct;
      if(newData[0][0].data == undefined)
      {
        console.log(newData[0][0] + " = " + newData[0][1]);
        console.log(newData[1][0] + " = " + newData[1][1]);
        console.log(newData[2][0] + " = " + newData[2][1]);
        console.log(newData[3][0] + " = " + newData[3][1]);
  
        address = splitdata(newData[0][1]);
        supportRequiredPct = newData[1][1];
      }
      else{
        console.log(newData[0][0].data + " = " + newData[0][1].data);
        console.log(newData[1][0].data + " = " + newData[1][1].data);
        console.log(newData[2][0].data + " = " + newData[2][1].data);
        console.log(newData[3][0].data + " = " + newData[3][1].data);
  
        address = splitdata(newData[0][1].data);
        supportRequiredPct = newData[1][1].data;
      }
      
      console.log("address: ", address);
      console.log("supportRequiredPct: ", supportRequiredPct);

      await request(
        process.env.GRAPHQL,
        `mutation handleChangeSupportRequired( $address: String!,$supportRequiredPct: String!,$eventObjectId: String!){
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
      console.log("handleChangeSupportRequired Mutation called.");
      return true;
    } else if (eventName == "startVote") {
      console.log(eventName + " Event result: ");

      var creator,voteId,metadata,transactionFrom;
      if(newData[0][0].data == undefined)
      {
        console.log(newData[0][0] + " = " + newData[0][1]);
        console.log(newData[1][0] + " = " + newData[1][1]);
        console.log(newData[2][0] + " = " + newData[2][1]);
        console.log(newData[3][0] + " = " + newData[3][1]);
        console.log(newData[4][0] + " = " + newData[4][1]);
        console.log(newData[5][0] + " = " + newData[5][1]);
  
        creator = splitdata(newData[0][1]);
        voteId = newData[1][1];
        metadata = newData[2][1];
        transactionFrom = splitdata(newData[3][1]);
      }
      else{
        console.log(newData[0][0].data + " = " + newData[0][1].data);
        console.log(newData[1][0].data + " = " + newData[1][1].data);
        console.log(newData[2][0].data + " = " + newData[2][1].data);
        console.log(newData[3][0].data + " = " + newData[3][1].data);
        console.log(newData[4][0].data + " = " + newData[4][1].data);
        console.log(newData[5][0].data + " = " + newData[5][1].data);
  
        creator = splitdata(newData[0][1].data);
        voteId = newData[1][1].data;
        metadata = newData[2][1].data;
        transactionFrom = splitdata(newData[3][1].data);
      }
      
      console.log("creator: ", creator);
      console.log("voteId: ", voteId);
      console.log("metadata: ", metadata);
      console.log("transactionFrom: ", transactionFrom);

      await request(
        process.env.GRAPHQL,
        `mutation handleStartVote( 
          $creator: String!,
          $voteId: String!,
          $metadata: String!,
          $transactionFrom: String!,
          $eventObjectId: String!,
          ){
              handleStartVote( 
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
          creator: creator,
          voteId: voteId,
          metadata: metadata,
          transactionFrom: transactionFrom,
          eventObjectId: eventResult._id,
        }
      );
      console.log("handleStartVote Mutation called.");
      return true;
    } else if (eventName == "castVote") {
      console.log(eventName + " Event result: ");

      var voteId ,voter,stake,supports;
      if(newData[0][0].data == undefined)
      {
        console.log(newData[0][0] + " = " + newData[0][1]);
        console.log(newData[1][0] + " = " + newData[1][1]);
        console.log(newData[2][0] + " = " + newData[2][1]);
        console.log(newData[3][0] + " = " + newData[3][1]);
        console.log(newData[4][0] + " = " + newData[4][1]);
        console.log(newData[5][0] + " = " + newData[5][1]);
  
        voteId = newData[0][1];
        voter = splitdata(newData[1][1]);
        stake = splitdata(newData[2][1]);
        supports = newData[3][1];
      }
      else{
        console.log(newData[0][0].data + " = " + newData[0][1].data);
        console.log(newData[1][0].data + " = " + newData[1][1].data);
        console.log(newData[2][0].data + " = " + newData[2][1].data);
        console.log(newData[3][0].data + " = " + newData[3][1].data);
        console.log(newData[4][0].data + " = " + newData[4][1].data);
        console.log(newData[5][0].data + " = " + newData[5][1].data);
  
        voteId = newData[0][1].data;
        voter = splitdata(newData[1][1].data);
        stake = splitdata(newData[2][1].data);
        supports = newData[3][1].data;
      }
      
      console.log("voteId: ", voteId);
      console.log("voter: ", voter);
      console.log("stake: ", stake);
      console.log("supports: ", supports);

      await request(
        process.env.GRAPHQL,
        `mutation handleCastVote(
          $voteId: String!,
          $voter: String!,
          $stake: String!,
          $supports: Boolean!,
          $timestamp: String!,
          $eventObjectId: String!,
          ){
              handleCastVote(
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
          voteId: voteId,
          voter: voter,
          stake: stake,
          supports: supports,
          timestamp: timestamp,
          eventObjectId: eventResult._id,
        }
      );
      console.log("handleCastVote Mutation called.");
      return true;
    } else if (eventName == "executeVote") {
      console.log(eventName + " Event result: ");

      var voteId;
      if(newData[0][0].data == undefined)
      {
        console.log(newData[0][0] + " = " + newData[0][1]);
        console.log(newData[1][0] + " = " + newData[1][1]);
        console.log(newData[2][0] + " = " + newData[2][1]);
        
        voteId = newData[0][1];
      }
      else{
        console.log(newData[0][0].data + " = " + newData[0][1].data);
        console.log(newData[1][0].data + " = " + newData[1][1].data);
        console.log(newData[2][0].data + " = " + newData[2][1].data);
  
        voteId = newData[0][1].data;
      }
      
      console.log("voteId: ", voteId);

      await request(
        process.env.GRAPHQL,
        `mutation handleExecuteVote(
           $voteId: String!,
           $timestamp: String!,
           $eventObjectId : String!){
              handleExecuteVote( 
                voteId: $voteId,
                timestamp: $timestamp,
                eventObjectId : $eventObjectId) 
                {
          result
      }
                
      }`,
        {
          voteId: voteId,
          timestamp: timestamp,
          eventObjectId: eventResult._id,
        }
      );
      console.log("handleExecuteVote Mutation called.");
      return true;
    } else if (eventName == "AddType") {
      console.log(eventName + " Event result: ");

      var id,type_id,name;
      if(newData[0][0].data == undefined)
      {
        console.log(newData[0][0] + " = " + newData[0][1]);
        console.log(newData[1][0] + " = " + newData[1][1]);
        console.log(newData[2][0] + " = " + newData[2][1]);
        console.log(newData[3][0] + " = " + newData[3][1]);
        
        id = newData[0][1];
        type_id = newData[3][1];
        name = newData[2][1];
      }
      else{
        console.log(newData[0][0].data + " = " + newData[0][1].data);
        console.log(newData[1][0].data + " = " + newData[1][1].data);
        console.log(newData[2][0].data + " = " + newData[2][1].data);
        console.log(newData[3][0].data + " = " + newData[3][1].data);
       
        id = newData[0][1].data;
        type_id = newData[3][1].data;
        name = newData[2][1].data;
      }
      

      console.log("id: ", id);
      console.log("type_id: ", type_id);
      console.log("name: ", name);

      await request(
        process.env.GRAPHQL,
        `mutation handleAddType( $id: String!,$type_id: String!,$timestamp: String!,$name: String!, $eventObjectId : String!){
              handleAddType( id: $id,type_id: $type_id,timestamp: $timestamp,name:$name, eventObjectId : $eventObjectId) {
          result
      }
                
      }`,
        {
          id: id,
          type_id: type_id,
          timestamp: timestamp.toString(),
          name: name,
          eventObjectId: eventResult._id,
        }
      );
      console.log("handleAddType Mutation called.");
      return true;
    } else if (eventName == "NewGauge") {
      console.log(eventName + " Event result: ");

      var gauge_type,addr,transactionHash,weight;
      if(newData[0][0].data == undefined)
      {
        console.log(newData[0][0] + " = " + newData[0][1]);
        console.log(newData[1][0] + " = " + newData[1][1]);
        console.log(newData[2][0] + " = " + newData[2][1]);
        console.log(newData[3][0] + " = " + newData[3][1]);
        console.log(newData[4][0] + " = " + newData[4][1]);
        
         transactionHash = deployHash;
        addr = splitdata(newData[0][1]);
        gauge_type = newData[3][1];
        weight = newData[4][1];
      }
      else{
        console.log(newData[0][0].data + " = " + newData[0][1].data);
        console.log(newData[1][0].data + " = " + newData[1][1].data);
        console.log(newData[2][0].data + " = " + newData[2][1].data);
        console.log(newData[3][0].data + " = " + newData[3][1].data);
        console.log(newData[4][0].data + " = " + newData[4][1].data);
        
        transactionHash = deployHash;
        addr = splitdata(newData[0][1].data);
        gauge_type = newData[3][1].data;
        weight = newData[4][1].data;
      }

      console.log("gauge_type: ", gauge_type);
      console.log("addr: ", addr);
      console.log("transactionHash: ", transactionHash);
      console.log("weight: ", weight);

      await request(
        process.env.GRAPHQL,
        `mutation handleNewGauge($gaugeType: String!,$addr: String!,$blockNumber: String!,$transactionHash: String!,$weight: String!,$timestamp: String!,$eventObjectId : String!){
              handleNewGauge(gaugeType: $gaugeType,addr: $addr,blockNumber: $blockNumber,transactionHash: $transactionHash,weight: $weight,timestamp: $timestamp,eventObjectId : $eventObjectId) {
          result
      }
      }`,
        {
          gaugeType: gauge_type,
          addr: addr,
          blockNumber: blockNumber,
          transactionHash: transactionHash,
          weight: weight,
          timestamp: timestamp.toString(),
          eventObjectId: eventResult._id,
        }
      );
      console.log("handleNewGauge Mutation called.");
      return true;
    } else if (eventName == "NewGaugeWeight") {
      console.log(eventName + " Event result: ");

      var id,time,weight,gauge_address;
      if(newData[0][0].data == undefined)
      {
        console.log(newData[0][0] + " = " + newData[0][1]);
        console.log(newData[1][0] + " = " + newData[1][1]);
        console.log(newData[2][0] + " = " + newData[2][1]);
        console.log(newData[3][0] + " = " + newData[3][1]);
        console.log(newData[4][0] + " = " + newData[4][1]);
        console.log(newData[5][0] + " = " + newData[5][1]);

        id = splitdata(newData[0][1]);
        time = newData[1][1];
        weight = newData[2][1];
        gauge_address = splitdata(newData[3][1]);
      }
      else{
        console.log(newData[0][0].data + " = " + newData[0][1].data);
        console.log(newData[1][0].data + " = " + newData[1][1].data);
        console.log(newData[2][0].data + " = " + newData[2][1].data);
        console.log(newData[3][0].data + " = " + newData[3][1].data);
        console.log(newData[4][0].data + " = " + newData[4][1].data);
        console.log(newData[5][0].data + " = " + newData[5][1].data);
  
        id = splitdata(newData[0][1].data);
        time = newData[1][1].data;
        weight = newData[2][1].data;
        gauge_address = splitdata(newData[3][1].data);
      }
      
      console.log("id: ", id);
      console.log("time: ", time);
      console.log("weight: ", weight);
      console.log("gauge_address: ", gauge_address);

      await request(
        process.env.GRAPHQL,
        `mutation handleNewGaugeWeight( $id: String!,$time: String!,$weight: String!,$gauge_address: String!,$eventObjectId : String!){
           handleNewGaugeWeight( id: $id,time: $time,weight: $weight,gauge_address: $gauge_address,eventObjectId : $eventObjectId) {
          result
      }
                
      }`,
        {
          id: id,
          time: time,
          weight: weight,
          gauge_address: gauge_address,
          eventObjectId: eventResult._id,
        }
      );
      console.log("handleNewGaugeWeight Mutation called.");
      return true;
    } else if (eventName == "NewTypeWeight") {
      console.log(eventName + " Event result: ");

      var id,time,weight,type_id,total_weight;
      if(newData[0][0].data == undefined)
      {
        console.log(newData[0][0] + " = " + newData[0][1]);
        console.log(newData[1][0] + " = " + newData[1][1]);
        console.log(newData[2][0] + " = " + newData[2][1]);
        console.log(newData[3][0] + " = " + newData[3][1]);
        console.log(newData[4][0] + " = " + newData[4][1]);
        console.log(newData[5][0] + " = " + newData[5][1]);
        
        id = newData[0][1];
        time = newData[2][1];
        total_weight = newData[3][1];
        type_id = newData[4][1];
        weight = newData[5][1];
      }
      else{
        console.log(newData[0][0].data + " = " + newData[0][1].data);
        console.log(newData[1][0].data + " = " + newData[1][1].data);
        console.log(newData[2][0].data + " = " + newData[2][1].data);
        console.log(newData[3][0].data + " = " + newData[3][1].data);
        console.log(newData[4][0].data + " = " + newData[4][1].data);
        console.log(newData[5][0].data + " = " + newData[5][1].data);
        
        id = newData[0][1].data;
        time = newData[2][1].data;
        total_weight = newData[3][1].data;
        type_id = newData[4][1].data;
        weight = newData[5][1].data;
      }
      
      console.log("id: ", id);
      console.log("time: ", time);
      console.log("weight: ", weight);
      console.log("type_id: ", type_id);
      console.log("total_weight: ", total_weight);

      await request(
        process.env.GRAPHQL,
        `mutation handleNewTypeWeight( $id: String!,$time: String!,$weight: String!,$type_id: String!,$total_weight: String!, $eventObjectId : String!){
           handleNewTypeWeight( id: $id,time: $time,weight: $weight,type_id: $type_id,total_weight: $total_weight, eventObjectId : $eventObjectId) {
          result
      }
                
      }`,
        {
          id: id,
          time: time,
          weight: weight,
          type_id: type_id,
          total_weight: total_weight,
          eventObjectId: eventResult._id,
        }
      );
      console.log("handleNewTypeWeight Mutation called.");
      return true;
    } else if (eventName == "VoteForGauge") {
      console.log(eventName + " Event result: ");

      var id,time,weight,gauge_addr,user;
      if(newData[0][0].data == undefined)
      {
        console.log(newData[0][0] + " = " + newData[0][1]);
        console.log(newData[1][0] + " = " + newData[1][1]);
        console.log(newData[2][0] + " = " + newData[2][1]);
        console.log(newData[3][0] + " = " + newData[3][1]);
        console.log(newData[4][0] + " = " + newData[4][1]);
        console.log(newData[5][0] + " = " + newData[5][1]);
        console.log(newData[6][0] + " = " + newData[6][1]);

        id = splitdata(newData[0][1]);
        time = newData[1][1];
        weight = newData[2][1];
        gauge_addr = splitdata(newData[3][1]);
        user = newData[4][1];
      }
      else{
        console.log(newData[0][0].data + " = " + newData[0][1].data);
        console.log(newData[1][0].data + " = " + newData[1][1].data);
        console.log(newData[2][0].data + " = " + newData[2][1].data);
        console.log(newData[3][0].data + " = " + newData[3][1].data);
        console.log(newData[4][0].data + " = " + newData[4][1].data);
        console.log(newData[5][0].data + " = " + newData[5][1].data);
        console.log(newData[6][0].data + " = " + newData[6][1].data);
  
        id = splitdata(newData[0][1].data);
        time = newData[1][1].data;
        weight = newData[2][1].data;
        gauge_addr = splitdata(newData[3][1].data);
        user = newData[4][1].data;
      }

      console.log("id: ", id);
      console.log("time: ", time);
      console.log("weight: ", weight);
      console.log("gauge_addr: ", gauge_addr);
      console.log("user: ", user);

      await request(
        process.env.GRAPHQL,
        `mutation handleVoteForGauge( $id: String!,$time: String!,$weight: String!,$gauge_addr: String!,$user: String!, $eventObjectId : String!){
           handleVoteForGauge( id: $id,time: $time,weight: $weight,gauge_addr: $gauge_addr,user: $user, eventObjectId : $eventObjectId) {
          result
      }
                
      }`,
        {
          id: id,
          time: time,
          weight: weight,
          gauge_addr: gauge_addr,
          user: user,
          eventObjectId: eventResult._id,
        }
      );
      console.log("handleVoteForGauge Mutation called.");
      return true;
    } else if (eventName == "Deposit") {
      console.log(eventName + " Event result: ");

      var provider,value,locktime,_type,ts;
      if(newData[0][0].data == undefined)
      {
        console.log(newData[0][0] + " = " + newData[0][1]);
        console.log(newData[1][0] + " = " + newData[1][1]);
        console.log(newData[2][0] + " = " + newData[2][1]);
        console.log(newData[3][0] + " = " + newData[3][1]);
        console.log(newData[4][0] + " = " + newData[4][1]);
        console.log(newData[5][0] + " = " + newData[5][1]);
        console.log(newData[6][0] + " = " + newData[6][1]);

        provider = splitdata(newData[0][1]);
        value = newData[1][1];
        locktime = newData[2][1];
        _type = newData[3][1];
        ts = newData[4][1];
      }
      else{
        console.log(newData[0][0].data + " = " + newData[0][1].data);
        console.log(newData[1][0].data + " = " + newData[1][1].data);
        console.log(newData[2][0].data + " = " + newData[2][1].data);
        console.log(newData[3][0].data + " = " + newData[3][1].data);
        console.log(newData[4][0].data + " = " + newData[4][1].data);
        console.log(newData[5][0].data + " = " + newData[5][1].data);
        console.log(newData[6][0].data + " = " + newData[6][1].data);
  
        provider = splitdata(newData[0][1].data);
        value = newData[1][1].data;
        locktime = newData[2][1].data;
        _type = newData[3][1].data;
        ts = newData[4][1].data;
      }
      
      console.log("provider: ", provider);
      console.log("value: ", value);
      console.log("locktime: ", locktime);
      console.log("_type: ", _type);
      console.log("ts: ", ts);

      await request(
        process.env.GRAPHQL,
        `mutation handleVotingDeposit( $provider: String!,$value: String!,$locktime: String!,$type: String!,$timestamp: String!, $block: String!, $eventObjectId: String!){
           handleVotingDeposit( provider: $provider,value: $value,locktime: $locktime,type: $type,timestamp: $timestamp, block: $block, eventObjectId: $eventObjectId) {
          result
      }
                
      }`,
        {
          provider: provider,
          value: value,
          locktime: locktime,
          type: _type,
          timestamp: ts,
          block: block_hash,
          eventObjectId: eventResult._id,
        }
      );
      console.log("handleVotingDeposit Mutation called.");
      return true;
    } else if (eventName == "Withdraw") {
      console.log(eventName + " Event result: ");
      
      var provider,value,ts;
      if(newData[0][0].data == undefined)
      {
        console.log(newData[0][0] + " = " + newData[0][1]);
        console.log(newData[1][0] + " = " + newData[1][1]);
        console.log(newData[2][0] + " = " + newData[2][1]);
        console.log(newData[3][0] + " = " + newData[3][1]);
        console.log(newData[4][0] + " = " + newData[4][1]);

        provider = splitdata(newData[0][1]);
        value = newData[1][1];
        ts = newData[2][1];
      }
      else{
        console.log(newData[0][0].data + " = " + newData[0][1].data);
        console.log(newData[1][0].data + " = " + newData[1][1].data);
        console.log(newData[2][0].data + " = " + newData[2][1].data);
        console.log(newData[3][0].data + " = " + newData[3][1].data);
        console.log(newData[4][0].data + " = " + newData[4][1].data);
  
        provider = splitdata(newData[0][1].data);
        value = newData[1][1].data;
        ts = newData[2][1].data;
      }

      console.log("provider: ", provider);
      console.log("value: ", value);
      console.log("ts: ", ts);

      await request(
        process.env.GRAPHQL,
        `mutation handleVotingWithdraw( $provider: String!,$value: String!,$timestamp: String!, $block: String!, $eventObjectId: String!){
           handleVotingWithdraw( provider: $provider,value: $value,timestamp: $timestamp, block: $block, eventObjectId: $eventObjectId) {
          result
      }
                
      }`,
        {
          provider: provider,
          value: value,
          timestamp: ts,
          block: block_hash,
          eventObjectId: eventResult._id,
        }
      );
      console.log("handleVotingWithdraw Mutation called.");
      return true;
    } else {
      console.log("There is no mutation for the event: ", eventName);
      eventResult.status = "completed";
      await eventResult.save();
      return true;
    }
  } catch (error) {
    console.log("error (try-catch) : " + error);
  }
}

module.exports = { router, geteventsdata };
