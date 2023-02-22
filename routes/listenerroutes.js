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

function extractDataFromEvent(eventData){
  let data = {};
  if(eventData[0][0].data == undefined){
      for(let i = 0; i < eventData.length; i++){
        eval(`var ${eventData[i][0]} = "${eventData[i][1]}"`);
        data[eventData[i][0]] = eval(eventData[i][0]);
        if(data[eventData[i][0]].includes("(") && data[eventData[i][0]].includes(")"))
        data[eventData[i][0]] = splitdata(eval(eventData[i][0]));
      }
  }else{
      for(let i = 0; i < eventData.length; i++){
          eval(`var ${eventData[i][0].data} = "${eventData[i][1].data}"`);
          data[eventData[i][0].data] = eval(eventData[i][0].data);
          if(data[eventData[i][0].data].includes("(") && data[eventData[i][0].data].includes(")"))
          data[eventData[i][0].data] = splitdata(eval(eventData[i][0].data));
      }
  }
  return data;
};


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
      
      let {tokenAmounts,fees,invariant,tokenSupply,poolId,providerId,registryAddress} = extractDataFromEvent(newData);
      console.log("tokenAmounts: ", tokenAmounts);
      console.log("fees: ", fees);
      console.log("invariant: ", invariant);
      console.log("tokenSupply: ", tokenSupply);
      console.log("poolId: ", poolId);
      console.log("providerId: ", providerId);
      console.log("transactionHash: ", deployHash);
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
          transactionHash: deployHash,
          logIndex: "0",
          registryAddress: registryAddress,
          blockNumber: blockNumber,
          eventObjectId: eventResult._id,
        }
      );
      console.log("handleAddLiquidity Mutation called.");
      return true;
    } else if (eventName == "removeLiquidity") {
      console.log(eventName + " Event result: ");

      let {tokenAmounts,fees,tokenSupply,poolId,providerId,registryAddress} = extractDataFromEvent(newData);

      console.log("tokenAmounts: ", tokenAmounts);
      console.log("fees: ", fees);
      console.log("tokenSupply: ", tokenSupply);
      console.log("poolId: ", poolId);
      console.log("providerId: ", providerId);
      console.log("transactionHash: ", deployHash);
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
          transactionHash: deployHash,
          logIndex: "0",
          registryAddress: registryAddress,
          blockNumber: blockNumber,
          eventObjectId: eventResult._id,
        }
      );
      console.log("handleRemoveLiquidity Mutation called.");
      return true;
    } else if (eventName == "removeLiquidityImbalance") {
      console.log(eventName + " Event result: ");

      let {tokenAmounts,fees,invariant,tokenSupply,poolId,
        providerId,registryAddress} = extractDataFromEvent(newData);

      console.log("tokenAmounts: ", tokenAmounts);
      console.log("fees: ", fees);
      console.log("invariant: ", invariant);
      console.log("tokenSupply: ", tokenSupply);
      console.log("poolId: ", poolId);
      console.log("providerId: ", providerId);
      console.log("transactionHash: ", deployHash);
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
          transactionHash: deployHash,
          logIndex: "0",
          registryAddress: registryAddress,
          blockNumber: blockNumber,
          eventObjectId: eventResult._id,
        }
      );
      console.log("handleRemoveLiquidityImbalance Mutation called.");
      return true;
    } else if (eventName == "removeLiquidityOne") {
      console.log(eventName + " Event result: ");

      let {tokenAmounts,coinAmount,poolId,providerId,registryAddress} = extractDataFromEvent(newData);

      console.log("tokenAmounts: ", tokenAmounts);
      console.log("coinAmmount: ", coinAmount);
      console.log("poolId: ", poolId);
      console.log("providerId: ", providerId);
      console.log("transactionHash: ", deployHash);
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
          transactionHash: deployHash,
          logIndex: "0",
          registryAddress: registryAddress,
          blockNumber: blockNumber,
          eventObjectId: eventResult._id,
        }
      );
      console.log("handleRemoveLiquidityOne Mutation called.");
      return true;
    } else if (eventName == "tokenExchange") {
      console.log(eventName + " Event result: ");

      let {poolId,buyer,
        sold_id,tokens_sold,bought_id,tokens_bought} = extractDataFromEvent(newData);

      console.log("poolId: ", poolId);
      console.log("transactionHash: ", deployHash);
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
          transactionHash: deployHash,
          block: block_hash,
          timestamp: timestamp,
          logIndex: "0",
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

      let {poolId,buyer,sold_id,
        tokens_sold,bought_id,tokens_bought} = extractDataFromEvent(newData);

      console.log("poolId: ", poolId);
      console.log("transactionHash: ", deployHash);
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
          transactionHash: deployHash,
          block: block_hash,
          timestamp: timestamp,
          logIndex: "0",
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

      let {poolId,admin} = extractDataFromEvent(newData);

      console.log("poolId: ", poolId);
      console.log("transactionHash: ", deployHash);
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
          transactionHash: deployHash,
          block: block_hash,
          timestamp: timestamp,
          logIndex: "0",
          admin: admin,
          eventObjectId: eventResult._id,
        }
      );
      console.log("handleNewAdmin Mutation called.");
      return true;
    } else if (eventName == "newFee") {
      console.log(eventName + " Event result: ");
     
      let {poolId,fee,admin_fee} = extractDataFromEvent(newData);
      console.log("poolId: ", poolId);
      console.log("transactionHash: ", deployHash);
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
          transactionHash: deployHash,
          block: block_hash,
          timestamp: timestamp,
          logIndex: "0",
          fee: fee,
          admin_fee: admin_fee,
          eventObjectId: eventResult._id,
        }
      );
      console.log("handleNewFee Mutation called.");
      return true;
    } else if (eventName == "newParameters") {
      console.log(eventName + " Event result: ");

      let {poolId,A,fee,admin_fee} = extractDataFromEvent(newData);

      console.log("poolId: ", poolId);
      console.log("A: ", A);
      console.log("transactionHash: ", deployHash);
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
          transactionHash: deployHash,
          block: block_hash,
          timestamp: timestamp,
          logIndex: "0",
          fee: fee,
          admin_fee: admin_fee,
          eventObjectId: eventResult._id,
        }
      );
      console.log("handleNewParameters Mutation called.");
      return true;
    } else if (eventName == "RampA") {
      console.log(eventName + " Event result: ");

      let {poolId,new_A} = extractDataFromEvent(newData);
    
      console.log("poolId: ", poolId);
      console.log("newA: ", new_A);
      console.log("transactionHash: ", deployHash);

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
          transactionHash: deployHash,
          block: block_hash,
          timestamp: timestamp,
          logIndex: "0",
          eventObjectId: eventResult._id,
        }
      );
      console.log("handleRampA Mutation called.");
      return true;
    } else if (eventName == "stopRampA") {
      console.log(eventName + " Event result: ");

      let { poolId,A } = extractDataFromEvent(newData);

      console.log("poolId: ", poolId);
      console.log("A: ", A);
      console.log("transactionHash: ", deployHash);

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
          transactionHash: deployHash,
          block: block_hash,
          timestamp: timestamp,
          logIndex: "0",
          eventObjectId: eventResult._id,
        }
      );
      console.log("handleStopRampA Mutation called.");
      return true;
    } else if (eventName == "addressModified") {
      console.log(eventName + " Event result: ");

      let {addressProviderContractHash,contract_package_hash} = extractDataFromEvent(newData);
      
      console.log("addressProviderContractHash: ", addressProviderContractHash);
      console.log("id: ", contract_package_hash);
      console.log("transactionHash: ", deployHash);

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
          id: contract_package_hash,
          block: block_hash,
          timestamp: timestamp,
          transactionHash: deployHash,
          eventObjectId: eventResult._id,
        }
      );
      console.log("handleAddressModified Mutation called.");
      return true;
    } else if (eventName == "newAddressIdentifier") {
      console.log(eventName + " Event result: ");

      let {addressProviderContractHash,contract_package_hash}= extractDataFromEvent(newData);

      console.log("addressProviderContractHash: ", addressProviderContractHash);
      console.log("id: ", contract_package_hash);
      console.log("transactionHash: ", deployHash);

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
          id: contract_package_hash,
          block: block_hash,
          timestamp: timestamp,
          transactionHash: deployHash,
          eventObjectId: eventResult._id,
        }
      );
      console.log("handleNewAddressIdentifier Mutation called.");
      return true;
    } else if (eventName == "poolAdded") {
      console.log(eventName + " Event result: ");
     
      let {poolId} = extractDataFromEvent(newData);
      console.log("poolId: ", poolId);
      console.log("transactionHash: ", deployHash);

      await request(
        process.env.GRAPHQL,
        `mutation handlePoolAdded( $poolId: String!,$transactionHash: String!,$block: String!,$timestamp: String!, $eventObjectId : String!){
           handlePoolAdded( poolId: $poolId,transactionHash: $transactionHash,block: $block,timestamp: $timestamp, eventObjectId : $eventObjectId) {
          result
      }
                
      }`,
        {
          poolId: poolId,
          transactionHash: deployHash,
          block: block_hash,
          timestamp: timestamp,
          eventObjectId: eventResult._id,
        }
      );
      console.log("handlePoolAdded Mutation called.");
      return true;
    } else if (eventName == "poolRemoved") {
      console.log(eventName + " Event result: ");

      let{poolId} = extractDataFromEvent(newData);

      console.log("poolId: ", poolId);
      console.log("transactionHash: ", deployHash);

      await request(
        process.env.GRAPHQL,
        `mutation handlePoolRemoved( $poolId: String!,$transactionHash: String!,$block: String!,$timestamp: String!, $eventObjectId : String!){
          handlePoolRemoved( poolId: $poolId,transactionHash: $transactionHash,block: $block,timestamp: $timestamp, eventObjectId : $eventObjectId) {
          result
      }
                
      }`,
        {
          poolId: poolId,
          transactionHash: deployHash,
          block: block_hash,
          timestamp: timestamp,
          eventObjectId: eventResult._id,
        }
      );
      console.log("handlePoolRemoved Mutation called.");
      return true;
    } else if (eventName == "newProxyApp") {
      console.log(eventName + " Event result: ");

      let {appId,proxy,context} = extractDataFromEvent(newData);

      console.log("appId: ", appId);
      console.log("proxy: ", proxy);
      console.log("context: ", context);
      console.log("transactionHash: ", deployHash);

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
          transactionHash: deployHash,
          block: block_hash,
          timestamp: timestamp,
          eventObjectId: eventResult._id,
        }
      );
      console.log("handleNewProxyApp Mutation called.");
      return true;
    } else if (eventName == "UpdateLiquidityLimit") {
      console.log(eventName + " Event result: ");

      let {user,contract_package_hash,original_balance,original_supply,
        working_balance,working_supply} = extractDataFromEvent(newData);

      console.log("user: ", user);
      console.log("id: ", contract_package_hash);
      console.log("original_balance: ", original_balance);
      console.log("original_supply: ", original_supply);
      console.log("working_balance: ", working_balance);
      console.log("working_supply: ", working_supply);
      console.log("transactionHash: ", deployHash);

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
          id: contract_package_hash,
          original_balance: original_balance,
          original_supply: original_supply,
          working_balance: working_balance,
          working_supply: working_supply,
          transactionHash: deployHash,
          block: block_hash,
          timestamp: timestamp,
          eventObjectId: eventResult._id,
        }
      );
      console.log("handleUpdateLiquidityLimit Mutation called.");
      return true;
    } else if (eventName == "Deposit") {
      console.log(eventName + " Event result: ");

      let {contract_package_hash,provider,value} = extractDataFromEvent(newData)

      console.log("provider: ", provider);
      console.log("id: ", contract_package_hash);
      console.log("value: ", value);
      console.log("transactionHash: ", deployHash);

      await request(
        process.env.GRAPHQL,
        `mutation handleDeposit( $provider: String!,$id: String!,$value: String!,$transactionHash: String!,$logIndex: String!, $eventObjectId : String!){
           handleDeposit( provider: $provider,id: $id,value: $value,transactionHash: $transactionHash,logIndex: $logIndex, eventObjectId : $eventObjectId) {
          result
      }
                
      }`,
        {
          provider: provider,
          id: contract_package_hash,
          value: value,
          transactionHash: deployHash,
          logIndex: "0",
          eventObjectId: eventResult._id,
        }
      );
      console.log("handleDeposit Mutation called.");
      return true;
    } else if (eventName == "Withdraw") {
      console.log(eventName + " Event result: ");

      let {provider,contract_package_hash,value} = extractDataFromEvent(newData);

      console.log("provider: ", provider);
      console.log("id: ", contract_package_hash);
      console.log("value: ", value);
      console.log("transactionHash: ", deployHash);

      await request(
        process.env.GRAPHQL,
        `mutation handleWithdraw( $provider: String!,$id: String!,$value: String!,$transactionHash: String!,$logIndex: String!, $eventObjectId : String!){
          handleWithdraw( provider: $provider,id: $id,value: $value,transactionHash: $transactionHash,logIndex: $logIndex, eventObjectId : $eventObjectId) {
          result
      }
                
      }`,
        {
          provider: provider,
          id: contract_package_hash,
          value: value,
          transactionHash: deployHash,
          logIndex: "0",
          eventObjectId: eventResult._id,
        }
      );
      console.log("handleWithdraw Mutation called.");
      return true;
    } else if (eventName == "AddType") {
      console.log(eventName + " Event result: ");

      let {contract_package_hash, type_id, name } = extractDataFromEvent(newData);

      console.log("id: ", contract_package_hash);
      console.log("type_id: ", type_id);
      console.log("name: ", name);

      await request(
        process.env.GRAPHQL,
        `mutation handleAddType( $id: String!,$type_id: String!,$timestamp: String!,$name: String!,$blockNumber: String!, $eventObjectId : String!){
              handleAddType( id: $id,type_id: $type_id,timestamp: $timestamp,name:$name,blockNumber:$blockNumber, eventObjectId : $eventObjectId) {
          result
      }
                
      }`,
        {
          id: contract_package_hash,
          type_id: type_id,
          timestamp: timestamp.toString(),
          name: name,
          blockNumber:blockNumber,
          eventObjectId: eventResult._id,
        }
      );
      console.log("handleAddType Mutation called.");
      return true;
    } else if (eventName == "NewGauge") {
      console.log(eventName + " Event result: ");
      
      let {gauge_type,addr,weight} = extractDataFromEvent(newData)

      console.log("gauge_type: ", gauge_type);
      console.log("addr: ", addr);
      console.log("transactionHash: ", deployHash);
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
          transactionHash: deployHash,
          weight: weight,
          timestamp: timestamp.toString(),
          eventObjectId: eventResult._id,
        }
      );
      console.log("handleNewGauge Mutation called.");
      return true;
    } else if (eventName == "NewGaugeWeight") {
      console.log(eventName + " Event result: ");

      // var id,time,weight,gauge_address;
      // if(newData[0][0].data == undefined)
      // {
      //   console.log(newData[0][0] + " = " + newData[0][1]);
      //   console.log(newData[1][0] + " = " + newData[1][1]);
      //   console.log(newData[2][0] + " = " + newData[2][1]);
      //   console.log(newData[3][0] + " = " + newData[3][1]);
      //   console.log(newData[4][0] + " = " + newData[4][1]);
      //   console.log(newData[5][0] + " = " + newData[5][1]);

      //   id = splitdata(newData[0][1]);
      //   time = newData[1][1];
      //   weight = newData[2][1];
      //   gauge_address = splitdata(newData[3][1]);
      // }
      // else{
      //   console.log(newData[0][0].data + " = " + newData[0][1].data);
      //   console.log(newData[1][0].data + " = " + newData[1][1].data);
      //   console.log(newData[2][0].data + " = " + newData[2][1].data);
      //   console.log(newData[3][0].data + " = " + newData[3][1].data);
      //   console.log(newData[4][0].data + " = " + newData[4][1].data);
      //   console.log(newData[5][0].data + " = " + newData[5][1].data);
  
      //   id = splitdata(newData[0][1].data);
      //   time = newData[1][1].data;
      //   weight = newData[2][1].data;
      //   gauge_address = splitdata(newData[3][1].data);
      // }
      
      let {contract_package_hash,time,weight,gauge_address} =  extractDataFromEvent(newData);
      console.log("id: ", contract_package_hash);
      console.log("time: ", time);
      console.log("weight: ", weight);
      console.log("gauge_address: ", gauge_address);

      await request(
        process.env.GRAPHQL,
        `mutation handleNewGaugeWeight( $id: String!,$time: String!,$weight: String!,$gauge_address: String!,$blockNumber: String!,$eventObjectId : String!){
           handleNewGaugeWeight( id: $id,time: $time,weight: $weight,gauge_address: $gauge_address,blockNumber: $blockNumber,eventObjectId : $eventObjectId) {
          result
      }
                
      }`,
        {
          id: contract_package_hash,
          time: time,
          weight: weight,
          gauge_address: gauge_address,
          blockNumber:blockNumber,
          eventObjectId: eventResult._id,
        }
      );
      console.log("handleNewGaugeWeight Mutation called.");
      return true;
    } else if (eventName == "NewTypeWeight") {
      console.log(eventName + " Event result: ");

      let {contract_package_hash,time,weight,type_id,total_weight} = extractDataFromEvent(newData);
      
      console.log("id: ", contract_package_hash);
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
          id: contract_package_hash,
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

      // var id,time,weight,gauge_addr,user;
      // if(newData[0][0].data == undefined)
      // {
      //   console.log(newData[0][0] + " = " + newData[0][1]);
      //   console.log(newData[1][0] + " = " + newData[1][1]);
      //   console.log(newData[2][0] + " = " + newData[2][1]);
      //   console.log(newData[3][0] + " = " + newData[3][1]);
      //   console.log(newData[4][0] + " = " + newData[4][1]);
      //   console.log(newData[5][0] + " = " + newData[5][1]);
      //   console.log(newData[6][0] + " = " + newData[6][1]);

      //   id = splitdata(newData[0][1]);
      //   time = newData[1][1];
      //   weight = newData[2][1];
      //   gauge_addr = splitdata(newData[3][1]);
      //   user = newData[4][1];
      // }
      // else{
      //   console.log(newData[0][0].data + " = " + newData[0][1].data);
      //   console.log(newData[1][0].data + " = " + newData[1][1].data);
      //   console.log(newData[2][0].data + " = " + newData[2][1].data);
      //   console.log(newData[3][0].data + " = " + newData[3][1].data);
      //   console.log(newData[4][0].data + " = " + newData[4][1].data);
      //   console.log(newData[5][0].data + " = " + newData[5][1].data);
      //   console.log(newData[6][0].data + " = " + newData[6][1].data);
  
      //   id = splitdata(newData[0][1].data);
      //   time = newData[1][1].data;
      //   weight = newData[2][1].data;
      //   gauge_addr = splitdata(newData[3][1].data);
      //   user = newData[4][1].data;
      // }

      let {contract_package_hash,time,weight,gauge_addr,user} = extractDataFromEvent(newData);

      console.log("id: ", contract_package_hash);
      console.log("time: ", time);
      console.log("weight: ", weight);
      console.log("gauge_addr: ", gauge_addr);
      console.log("user: ", user);

      await request(
        process.env.GRAPHQL,
        `mutation handleVoteForGauge( $id: String!,$time: String!,$weight: String!,$gauge_addr: String!,$user: String!,$blockNumber: String!, $eventObjectId : String!){
           handleVoteForGauge( id: $id,time: $time,weight: $weight,gauge_addr: $gauge_addr,user: $user, blockNumber:$blockNumber,eventObjectId : $eventObjectId) {
          result
      }
                
      }`,
        {
          id: contract_package_hash,
          time: time,
          weight: weight,
          gauge_addr: gauge_addr,
          user: user,
          blockNumber:blockNumber,
          eventObjectId: eventResult._id,
        }
      );
      console.log("handleVoteForGauge Mutation called.");
      return true;
    } else if (eventName == "deposit") {
      console.log(eventName + " Event result: ");
      let {provider,value,locktime,_type,ts} = extractDataFromEvent(newData);
      
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
    } else if (eventName == "withdraw") {
      console.log(eventName + " Event result: ");

      let {provider, value, ts} = extractDataFromEvent(newData)

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
