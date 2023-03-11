//This file is coded because it was in the subgraph code, currently not being used,
//but not deleting it because can be used in the future.

require("dotenv").config();
const { GraphQLString } = require("graphql");

const Response = require("../../models/response");
const { responseType } = require("../types/response");

const Pool = require("../../models/pool");
const AddLiquidityEvent = require("../../models/addLiquidityEvent");
const RemoveLiquidityEvent = require("../../models/removeLiquidityEvent");
const RemoveLiquidityOneEvent = require("../../models/removeLiquidityOneEvent");
const Exchange = require("../../models/exchange");
const Coin = require("../../models/coin");
const Token = require("../../models/token");
const AmplificationCoeffChangelog = require("../../models/amplificationCoeffChangelog");
const AdminFeeChangeLog = require("../../models/adminFeeChangeLog");
const FeeChangeLog = require("../../models/feeChangeLog");
const TransferOwnershipEvent = require("../../models/transferOwnershipEvent");
const UnderlyingCoin = require("../../models/underlyingCoin");
const eventsData = require("../../models/eventsData");
// let poolContract= require('../JsClients/Pool/test/installed.ts');
// let registryContract= require('../JsClients/Registry/test/installed.ts');
const { saveCoins } = require("../services/pools/coins");
const {FEE_PRECISION} = require("../constants");
const bigDecimal = require("js-big-decimal");
const {
  getHourlyTradeVolume,
  getDailyTradeVolume,
  getWeeklyTradeVolume,
} = require("../services/pools/volume");
const { getOrRegisterAccount } = require("../services/accounts");
const mongoose = require("mongoose");
var bigdecimal = require("bigdecimal");
var halfUp = bigdecimal.RoundingMode.HALF_UP();

function getEventId(transactionHash, logIndex) {
  return transactionHash + "-" + logIndex;
}

async function getPoolSnapshot(pool, args, session) {
  console.log("block",args.block);
    console.log("POOOOL",pool);
  if (pool !== null) {
    console.log("helloWORKD")
    let poolAddress = pool.swapAddress;
   
    // Workaround needed because batch_set_pool_asset_type() doesn't emit events
    // See https://etherscan.io/tx/0xf8e8d67ec16657ecc707614f733979d105e0b814aa698154c153ba9b44bf779b
    console.log("block-42",args.block);

    if (
      ((new bigdecimal.BigDecimal(args.block)).compareTo(new bigdecimal.BigDecimal("12667823")) == 1) 
      || 
      ((new bigdecimal.BigDecimal(args.block)).compareTo(new bigdecimal.BigDecimal("12667823")) == 0)
      ) {
    //if(args.block){
      console.log("block-46",args.block);
      // Reference asset
      if (pool.assetType === null) {
        //let assetType =  await registryContract.try_get_pool_asset_type(args.registryAddress,poolAddress)
        let assetType = 1;

        // if (!assetType.reverted) {
        if (assetType!==null) {
          // let type = assetType.value;
          let type = assetType;

          if (type == 0) {
            pool.assetType = "USD";
          } else if (type === 1) {
            pool.assetType = "ETH";
          } else if (type === 2) {
            pool.assetType = "BTC";
          } else if (type === 3) {
            if (pool.name === "link") {
              pool.assetType = "LINK";
            } else if (pool.name.startsWith("eur")) {
              pool.assetType = "EUR";
            } else {
              pool.assetType = "OTHER";
            }
          } else if (type == 4) {
            pool.assetType = "CRYPTO";
          }
        }
      }
    }

    // Update coin balances and underlying coin balances/rates
    await saveCoins(pool, args, session);

    // Save current virtual price
    // let virtualPrice = await poolContract.try_get_virtual_price(poolAddress);
    let virtualPrice = "1000000000";

    if (virtualPrice !== null) {
      // pool.virtualPrice = new bigdecimal.BigDecimal(virtualPrice.value);
      //pool.virtualPrice = new bigdecimal.BigDecimal(virtualPrice);
      pool.virtualPrice = virtualPrice;
      await pool.save({session});
    }
  }

  return pool;
}

const handleAddLiquidity = {
  type: responseType,
  description: "Handle Add Liquidity",
  args: {
    tokenAmounts: { type: GraphQLString },
    fees: { type: GraphQLString },
    invariant: { type: GraphQLString },
    tokenSupply: { type: GraphQLString },
    block: { type: GraphQLString },
    timestamp: { type: GraphQLString },
    poolId: { type: GraphQLString },
    providerId: { type: GraphQLString },
    transactionHash: { type: GraphQLString },
    logIndex: { type: GraphQLString },
    registryAddress: { type: GraphQLString },
    blockNumber: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    const session = await mongoose.startSession();
    //starting the transaction
    session.startTransaction();
    try {
      console.log("args",args);
      console.log("args.poolId",args.poolId);
      console.log("hello");
      let pool = await Pool.findOne({ id: args.poolId });
      if (pool !== null) {
        pool = await getPoolSnapshot(pool, args,session);
        let provider = await getOrRegisterAccount(args.providerId);
        let eventId =  getEventId(args.transactionHash, args.logIndex);
        let newData = new AddLiquidityEvent({
          id: "al-" + eventId,
          pool: pool.id,
          provider: provider.id,
          tokenAmounts: args.tokenAmounts,
          fees: args.fees,
          invariant: args.invariant,
          tokenSupply: args.tokenSupply,
          block: args.block,
          timestamp: args.timestamp,
          transaction: args.transactionHash,
        });
        await AddLiquidityEvent.create([newData],{session});
        await pool.save({session});
      }
      console.log("pool",pool);

       // updating mutation status
      //  let eventDataResult= await eventsData.findOne({_id:args.eventObjectId});
      //  eventDataResult.status="completed"
      //  await eventDataResult.save({ session });

      let response = await Response.findOne({ id: "1" });
      if (response === null) {
        // create new response
        response = new Response({
          id: "1",
          result: true,
        });
        await response.save({session});
      }
       //committing the transaction 
       await session.commitTransaction();

       // Ending the session
       session.endSession();

      return response;
    } catch (error) {
      // Rollback any changes made in the database
      await session.abortTransaction();

      throw new Error(error);
    }
  },
};

const handleRemoveLiquidity = {
  type: responseType,
  description: "Handle Remove Liquidity",
  args: {
    tokenAmounts: { type: GraphQLString },
    fees: { type: GraphQLString },
    tokenSupply: { type: GraphQLString },
    block: { type: GraphQLString },
    timestamp: { type: GraphQLString },
    poolId: { type: GraphQLString },
    providerId: { type: GraphQLString },
    transactionHash: { type: GraphQLString },
    logIndex: { type: GraphQLString },
    registryAddress: { type: GraphQLString },
    blockNumber: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    const session = await mongoose.startSession();
    //starting the transaction
    session.startTransaction();
    try {
      let pool = await Pool.findOne({ id: args.poolId });
      if (pool !== null) {
        pool = await getPoolSnapshot(pool, args,session);
        let provider = await getOrRegisterAccount(args.providerId);
        let eventId = getEventId(args.transactionHash, args.logIndex);
        let newData = new RemoveLiquidityEvent({
          id: "rl-" + eventId,
          pool: pool.id,
          provider: provider.id,
          tokenAmounts: args.tokenAmounts,
          fees: args.fees,
          tokenSupply: args.tokenSupply,
          block: args.block,
          timestamp: args.timestamp,
          transaction: args.transactionHash,
        });
        await RemoveLiquidityEvent.create([newData],{session});
        await pool.save({session});
      }

       // updating mutation status
      //  let eventDataResult= await eventsData.findOne({_id:args.eventObjectId});
      //  eventDataResult.status="completed"
      //  await eventDataResult.save({ session });

      let response = await Response.findOne({ id: "1" });
      if (response === null) {
        // create new response
        response = new Response({
          id: "1",
          result: true,
        });
        await response.save({session});
      }
       //committing the transaction 
       await session.commitTransaction();

       // Ending the session
       session.endSession();

      return response;
    } catch (error) {
      // Rollback any changes made in the database
      await session.abortTransaction();

      throw new Error(error);
    }
  },
};

const handleRemoveLiquidityImbalance = {
  type: responseType,
  description: "Handle Remove Liquidity Imbalance",
  args: {
    tokenAmounts: { type: GraphQLString },
    fees: { type: GraphQLString },
    invariant: { type: GraphQLString },
    tokenSupply: { type: GraphQLString },
    block: { type: GraphQLString },
    timestamp: { type: GraphQLString },
    poolId: { type: GraphQLString },
    providerId: { type: GraphQLString },
    transactionHash: { type: GraphQLString },
    logIndex: { type: GraphQLString },
    registryAddress: { type: GraphQLString },
    blockNumber: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    const session = await mongoose.startSession();
    //starting the transaction
    session.startTransaction();
    try {
      let pool = await Pool.findOne({ id: args.poolId });
      if (pool !== null) {
        pool = await getPoolSnapshot(pool, args, session);
        let provider = await getOrRegisterAccount(args.providerId);
        let eventId = getEventId(args.transactionHash, args.logIndex);
        let newData = new RemoveLiquidityEvent({
          id: "rli-" + eventId,
          pool: pool.id,
          provider: provider.id,
          tokenAmounts: args.tokenAmounts,
          fees: args.fees,
          invariant: args.invariant,
          tokenSupply: args.tokenSupply,
          block: args.block,
          timestamp: args.timestamp,
          transaction: args.transactionHash,
        });
        await RemoveLiquidityEvent.create( [newData],{session});
        await pool.save({session});
      }
       // updating mutation status
      //  let eventDataResult= await eventsData.findOne({_id:args.eventObjectId});
      //  eventDataResult.status="completed"
      //  await eventDataResult.save({ session });

      let response = await Response.findOne({ id: "1" });
      if (response === null) {
        // create new response
        response = new Response({
          id: "1",
          result: true,
        });
        await response.save({session});
      }
       //committing the transaction 
       await session.commitTransaction();

       // Ending the session
       session.endSession();

      return response;
    } catch (error) {
      // Rollback any changes made in the database
      await session.abortTransaction();

      throw new Error(error);
    }
  },
};

const handleRemoveLiquidityOne = {
  type: responseType,
  description: "Handle Remove Liquidity One",
  args: {

    tokenAmount: { type: GraphQLString },
    coinAmount: { type: GraphQLString },
    block: { type: GraphQLString },
    timestamp: { type: GraphQLString },
    poolId: { type: GraphQLString },
    providerId: { type: GraphQLString },
    transactionHash: { type: GraphQLString },
    logIndex: { type: GraphQLString },
    registryAddress: { type: GraphQLString },
    blockNumber: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    const session = await mongoose.startSession();
    //starting the transaction
    session.startTransaction();
    try {
      console.log('here',args.poolId);
      let pool = await Pool.findOne({ id: args.poolId });
      if (pool !== null) {
        pool = await getPoolSnapshot(pool, args, session);
        let provider = await getOrRegisterAccount(args.providerId);
        let eventId = getEventId(args.transactionHash, args.logIndex);
        console.log('tokenAmount', args.tokenAmount)
        let newData = new RemoveLiquidityOneEvent({
          id: "rlo-" + eventId,
          pool: pool.id,
          provider: provider.id,
          tokenAmounts: args.tokenAmount,
          coinAmounts: args.coinAmount,
          block: args.block,
          timestamp: args.timestamp,
          transaction: args.transactionHash,
        });
        console.log('tokenAmount', args.tokenAmount)
        await RemoveLiquidityOneEvent.create([newData],{session});
        await pool.save({session});
      }
       // updating mutation status
      //  let eventDataResult= await eventsData.findOne({_id:args.eventObjectId});
      //  eventDataResult.status="completed"
      //  await eventDataResult.save({ session });

      let response = await Response.findOne({ id: "1" });
      if (response === null) {
        // create new response
        response = new Response({
          id: "1",
          result: true,
        });
        await response.save({session});
      }
       //committing the transaction 
       await session.commitTransaction();

       // Ending the session
       session.endSession();

      return response;
    } catch (error) {
      // Rollback any changes made in the database
      await session.abortTransaction();

      throw new Error(error);
    }
  },
};

const handleTokenExchange = {
  type: responseType,
  description: "Handle TokenExchange",
  args: {
    poolId: { type: GraphQLString },
    transactionHash: { type: GraphQLString },
    block: { type: GraphQLString },
    timestamp: { type: GraphQLString },
    logIndex: { type: GraphQLString },
    buyer: { type: GraphQLString },
    sold_id: { type: GraphQLString },
    tokens_sold: { type: GraphQLString },
    bought_id: { type: GraphQLString },
    tokens_bought: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    const session = await mongoose.startSession();
    //starting the transaction
    session.startTransaction();
    try {
       let pool = await Pool.findOne({ id: args.poolId });

      if (pool != null) {
        pool = await getPoolSnapshot(pool, args, session);

        let coinSold = await Coin.findOne({ id: pool.id + "-" + args.sold_id });
        let tokenSold = await Token.findOne({ id: coinSold.token });
        //let amountSold = decimal.fromBigInt(event.params.tokens_sold, tokenSold.decimals.toI32()) //issue
        let amountSold = new bigdecimal.BigDecimal(args.token_sold,tokenSold);

        //let amountSold = new bigdecimal.BigDecimal(args.tokens_sold);

        let coinBought = await Coin.findOne({
          id: pool.id + "-" + args.bought_id,
        });
        let tokenBought = await Token.findOne({ id: coinBought.token });
        //let amountBought = decimal.fromBigInt(event.params.tokens_bought, tokenBought.decimals.toI32()); //issue

        let amountBought = new bigdecimal.BigDecimal(args.tokens_bought); //issue

        let buyer = await getOrRegisterAccount(args.buyer);

        let eventId = getEventId(args.transactionHash, args.logIndex);

        // Save event log
        let exchange = new Exchange({
          id: "e-" + eventId,
          pool: pool.id,
          buyer: buyer.id,
          receiver: buyer.id,
          tokenSold: tokenSold.id,
          tokenBought: tokenBought.id,
          amountSold: amountSold,
          amountBought: amountBought,
          block: args.block,
          timestamp: args.timestamp,
          transaction: args.transactionHash,
        });
        await Exchange.create([exchange],{session});

        // Save trade volume
        let volume =
          (new bigdecimal.BigDecimal(exchange.amountSold).add(
          new bigdecimal.BigDecimal(exchange.amountBought))).divide( new bigdecimal.BigDecimal("2"),18,halfUp);

         let hourlyVolume = await getHourlyTradeVolume(pool, args.timestamp, session);
        hourlyVolume.volume = (
          (new bigdecimal.BigDecimal(hourlyVolume.volume)).add( new bigdecimal.BigDecimal(volume)
        )).toString();
        await hourlyVolume.save({session});

        let dailyVolume = await getDailyTradeVolume(pool, args.timestamp, session);
        dailyVolume.volume = (
          (new bigdecimal.BigDecimal(dailyVolume.volume)).add(new bigdecimal.BigDecimal(volume)
        )).toString();
        await dailyVolume.save({session});

        let weeklyVolume = await getWeeklyTradeVolume(pool, args.timestamp, session);
        weeklyVolume.volume = (
          (new bigdecimal.BigDecimal(weeklyVolume.volume)).add(new bigdecimal.BigDecimal(volume)
        )).toString();
        await weeklyVolume.save({session});

        pool.exchangeCount = (
          (new bigdecimal.BigDecimal(pool.exchangeCount)).add(new bigdecimal.BigDecimal("1")
        )).toString();

        await pool.save({session});
      }

       // updating mutation status
      //  let eventDataResult= await eventsData.findOne({_id:args.eventObjectId});
      //  eventDataResult.status="completed"
      //  await eventDataResult.save({ session });

      let response = await Response.findOne({ id: "1" });
      if (response === null) {
        // create new response
        response = new Response({
          id: "1",
          result: true,
        });
        await response.save({session});
      }
       //committing the transaction 
       await session.commitTransaction();

       // Ending the session
       session.endSession();

      return response;
    } catch (error) {
      // Rollback any changes made in the database
      await session.abortTransaction();

      throw new Error(error);
    }
  },
};

const handleTokenExchangeUnderlying = {
  type: responseType,
  description: "Handle TokenExchangeUnderlying",
  args: {
    poolId: { type: GraphQLString },
    transactionHash: { type: GraphQLString },
    block: { type: GraphQLString },
    timestamp: { type: GraphQLString },
    logIndex: { type: GraphQLString },
    buyer: { type: GraphQLString },
    sold_id: { type: GraphQLString },
    tokens_sold: { type: GraphQLString },
    bought_id: { type: GraphQLString },
    tokens_bought: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    const session = await mongoose.startSession();
    //starting the transaction
    session.startTransaction();
    try {
      let pool = await Pool.findOne({ id: args.poolId });

      if (pool != null) {
        pool = await getPoolSnapshot(pool, args, session);

        let coinSold = await UnderlyingCoin.findOne({
          id: pool.id + "-" + args.sold_id,
        });
        console.log("Token:",Token.token);
        let tokenSold = await Token.findOne({ id: coinSold.token });
        //let amountSold = decimal.fromBigInt(event.params.tokens_sold, tokenSold.decimals.toI32()) //issue

       let amountSold = (new bigdecimal.BigDecimal(args.tokens_sold));

        let coinBought = await UnderlyingCoin.findOne({
          id: pool.id + "-" + args.bought_id,
        });
        let tokenBought = await Token.findOne({ id: coinBought.token });
        //let amountBought = decimal.fromBigInt(event.params.tokens_bought, tokenBought.decimals.toI32()); //issue

        let amountBought = (new bigdecimal.BigDecimal(args.tokens_bought)); //issue

        let buyer = await getOrRegisterAccount(args.buyer);

        let eventId = getEventId(args.transactionHash, args.logIndex);

        // Save event log
        let exchange = new Exchange({
          id: "e-" + eventId,
          pool: pool.id,
          buyer: buyer.id,
          receiver: buyer.id,
          tokenSold: tokenSold.id,
          tokenBought: tokenBought.id,
          amountSold: amountSold,
          amountBought: amountBought,
          block: args.block,
          timestamp: args.timestamp,
          transaction: args.transactionHash,
        });
        await Exchange.create([exchange],{session});

        // Save trade volume
        let volume =
          ((new bigdecimal.BigDecimal(exchange.amountSold)).add(
          new bigdecimal.BigDecimal(exchange.amountBought))).divide(new bigdecimal.BigDecimal("2"),18,halfUp);

        let hourlyVolume = await getHourlyTradeVolume(pool, args.timestamp, session);
        hourlyVolume.volume = (
          (new bigdecimal.BigDecimal(hourlyVolume.volume)).add(new bigdecimal.BigDecimal(volume)
        )).toString();
        await hourlyVolume.save({session});

        let dailyVolume = await getDailyTradeVolume(pool, args.timestamp, session);
        dailyVolume.volume = (
          (new bigdecimal.BigDecimal(dailyVolume.volume)).add(new bigdecimal.BigDecimal(volume)
        )).toString();
        await dailyVolume.save({session});

        let weeklyVolume = await getWeeklyTradeVolume(pool, args.timestamp, session);
        weeklyVolume.volume = (
          (new bigdecimal.BigDecimal(weeklyVolume.volume)).add(new bigdecimal.BigDecimal(volume))
        ).toString();
        await weeklyVolume.save({session});

        pool.exchangeCount = (
          (new bigdecimal.BigDecimal(pool.exchangeCount)).add(new bigdecimal.BigDecimal("1"))
        ).toString();

        await pool.save({session});
      }

       // updating mutation status
      //  let eventDataResult= await eventsData.findOne({_id:args.eventObjectId});
      //  eventDataResult.status="completed"
      //  await eventDataResult.save({ session });

      let response = await Response.findOne({ id: "1" });
      if (response === null) {
        // create new response
        response = new Response({
          id: "1",
          result: true,
        });
        await response.save({session});
      }
       //committing the transaction 
       await session.commitTransaction();

       // Ending the session
       session.endSession();

      return response;
    } catch (error) {
      // Rollback any changes made in the database
      await session.abortTransaction();

      throw new Error(error);
    }
  },
};

const handleNewAdmin = {
  type: responseType,
  description: "Handle NewAdmin",
  args: {
    poolId: { type: GraphQLString },
    transactionHash: { type: GraphQLString },
    block: { type: GraphQLString },
    timestamp: { type: GraphQLString },
    logIndex: { type: GraphQLString },
    admin: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    const session = await mongoose.startSession();
    //starting the transaction
    session.startTransaction();
    try {
      console.log("hello.");
      let pool = await Pool.findOne({ id: args.poolId });

      if (pool != null) {
        pool = await getPoolSnapshot(pool, args, session);

        // Save pool owner
        pool.owner = args.admin;

        let eventId = getEventId(args.transactionHash, args.logIndex);
        console.log("pool.admin",pool.admin);
        // Save event log
        let newData = new TransferOwnershipEvent({
          id: "to-" + eventId,
          pool: pool.id,
          //value: pool.admin,
          newAdmin: args.admin, 
          block: args.block,
          timestamp: args.timestamp,
          transaction: args.transactionHash,
        });
        await TransferOwnershipEvent.create([newData],{session});
        await pool.save({session});
      }

       // updating mutation status
      //  let eventDataResult= await eventsData.findOne({_id:args.eventObjectId});
      //  eventDataResult.status="completed"
      //  await eventDataResult.save({ session });

      let response = await Response.findOne({ id: "1" });
      if (response === null) {
        // create new response
        response = new Response({
          id: "1",
          result: true,
        });
        await response.save({session});
      }
       //committing the transaction 
       await session.commitTransaction();

       // Ending the session
       session.endSession();

      return response;
    } catch (error) {
      // Rollback any changes made in the database
      await session.abortTransaction();

      throw new Error(error);
    }
  },
};

const handleNewFee = {
  type: responseType,
  description: "Handle NewFee",
  args: {
    poolId: { type: GraphQLString },
    transactionHash: { type: GraphQLString },
    block: { type: GraphQLString },
    timestamp: { type: GraphQLString },
    logIndex: { type: GraphQLString },
    fee: { type: GraphQLString },
    admin_fee: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    const session = await mongoose.startSession();
    //starting the transaction
    session.startTransaction();
    try {
      let pool = await Pool.findOne({ id: args.poolId });

      if (pool != null) {
        pool = await getPoolSnapshot(pool, args, session);

        // Save pool parameters
        pool.fee = bigDecimal.round(args.fee, parseFloat(FEE_PRECISION)); //issue fixed
        pool.adminFee = bigDecimal.round(args.admin_fee,  parseFloat(FEE_PRECISION)); //issue fixed

        // pool.fee = args.fee;
        // pool.adminFee = args.admin_fee;

        let eventId = getEventId(args.transactionHash, args.logIndex);
        // Save event log
        let newData = new AdminFeeChangeLog({
          id: "af-" + eventId,
          pool: pool.id,
          value: pool.adminFee,
          block: args.block,
          timestamp: args.timestamp,
          transaction: args.transactionHash,
        });
        await AdminFeeChangeLog.create([newData],{session});

        let newData2 = new FeeChangeLog({
          id: "f-" + eventId,
          pool: pool.id,
          value: pool.fee,
          block: args.block,
          timestamp: args.timestamp,
          transaction: args.transactionHash,
        });
        await FeeChangeLog.create([newData2],{session});
        await pool.save({session});
      }

       // updating mutation status
      //  let eventDataResult= await eventsData.findOne({_id:args.eventObjectId});
      //  eventDataResult.status="completed"
      //  await eventDataResult.save({ session });

      let response = await Response.findOne({ id: "1" });
      if (response === null) {
        // create new response
        response = new Response({
          id: "1",
          result: true,
        });
        await response.save({session});
      }
       //committing the transaction 
       await session.commitTransaction();

       // Ending the session
       session.endSession();

      return response;
    } catch (error) {
      // Rollback any changes made in the database
      await session.abortTransaction();

      throw new Error(error);
    }
  },
};

const handleNewParameters = {
  type: responseType,
  description: "Handle NewParameters",
  args: {
    poolId: { type: GraphQLString },
    A: { type: GraphQLString },
    transactionHash: { type: GraphQLString },
    block: { type: GraphQLString },
    timestamp: { type: GraphQLString },
    logIndex: { type: GraphQLString },
    fee: { type: GraphQLString },
    admin_fee: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    const session = await mongoose.startSession();
    //starting the transaction
    session.startTransaction();
    try {
      console.log("args",args);
      console.log("args.poolId",args.poolId);
      console.log("hello");
      let pool = await Pool.findOne({ id: args.poolId });

       if (pool != null) {
         pool = await getPoolSnapshot(pool, args, session);


        // Save pool parameters
        pool.A = args.A;

        pool.fee = bigDecimal.round(args.fee, parseFloat(FEE_PRECISION)); //issue fixed
        pool.adminFee = bigDecimal.round(args.admin_fee,  parseFloat(FEE_PRECISION)); //issue fixed

        // pool.fee = args.fee;
        // pool.adminFee = args.admin_fee;

        let eventId = getEventId(args.transactionHash, args.logIndex);
        // Save event log
        let newData = new AdminFeeChangeLog({
          id: "af-" + eventId,
          pool: pool.id,
          value: pool.adminFee,
          block: args.block,
          timestamp: args.timestamp,
          transaction: args.transactionHash,
        });
        await AdminFeeChangeLog.create([newData],{session});

        let newData2 = new AmplificationCoeffChangelog({
          id: "a-" + eventId,
          pool: pool.id,
          value: pool.A,
          block: args.block,
          timestamp: args.timestamp,
          transaction: args.transactionHash,
        });
        await AmplificationCoeffChangelog.create([newData2],{session});

        let newData3 = new FeeChangeLog({
          id: "f-" + eventId,
          pool: pool.id,
          value: pool.fee,
          block: args.block,
          timestamp: args.timestamp,
          transaction: args.transactionHash,
        });
        await FeeChangeLog.create([newData3],{session});
        await pool.save({session});
       }
       
        // updating mutation status
      // let eventDataResult= await eventsData.findOne({_id:args.eventObjectId});
      // eventDataResult.status="completed"
      // await eventDataResult.save({ session });

      let response = await Response.findOne({ id: "1" });
      if (response === null) {
        // create new response
        response = new Response({
          id: "1",
          result: true,
        });
        await response.save({session});
      }
       //committing the transaction 
       await session.commitTransaction();

       // Ending the session
       session.endSession();

      return response;
    } catch (error) {
      // Rollback any changes made in the database
      await session.abortTransaction();

      throw new Error(error);
    }
  },
};
const handleRampA = {
  type: responseType,
  description: "Handle RampA",
  args: {
    poolId: { type: GraphQLString },
    new_A: { type: GraphQLString },
    transactionHash: { type: GraphQLString },
    block: { type: GraphQLString },
    timestamp: { type: GraphQLString },
    logIndex: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    const session = await mongoose.startSession();
    //starting the transaction
    session.startTransaction();
    try {
      let pool = await Pool.findOne({ id: args.poolId });

      if (pool != null) {
        pool = await getPoolSnapshot(pool, args, session);

        // Save pool parameters
        pool.A = args.new_A;
        let eventId = getEventId(args.transactionHash, args.logIndex);

        // Save event log
        let newData = new AmplificationCoeffChangelog({
          id: "a-" + eventId,
          pool: pool.id,
          value: pool.A,
          block: args.block,
          timestamp: args.timestamp,
          transaction: args.transactionHash,
        });
        await AmplificationCoeffChangelog.create([newData],{session});
        await pool.save({session});
      }
       // updating mutation status
      //  let eventDataResult= await eventsData.findOne({_id:args.eventObjectId});
      //  eventDataResult.status="completed"
      //  await eventDataResult.save({ session });

      let response = await Response.findOne({ id: "1" });
      if (response === null) {
        // create new response
        response = new Response({
          id: "1",
          result: true,
        });
        await response.save({session});
      }
       //committing the transaction 
       await session.commitTransaction();

       // Ending the session
       session.endSession();

      return response;
    } catch (error) {
      // Rollback any changes made in the database
      await session.abortTransaction();

      throw new Error(error);
    }
  },
};

const handleStopRampA = {
  type: responseType,
  description: "Handle StopRampA",
  args: {
    poolId: { type: GraphQLString },
    A: { type: GraphQLString },
    transactionHash: { type: GraphQLString },
    block: { type: GraphQLString },
    timestamp: { type: GraphQLString },
    logIndex: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    const session = await mongoose.startSession();
    //starting the transaction
    session.startTransaction();
    try {
      let pool = await Pool.findOne({ id: args.poolId });

      if (pool != null) {
        pool = await getPoolSnapshot(pool, args, session);

        // Save pool parameters
        pool.A = args.A;
        let eventId = getEventId(args.transactionHash, args.logIndex);

        // Save event log
        let newData = new AmplificationCoeffChangelog({
          id: "a-" + eventId,
          pool: pool.id,
          value: pool.A,
          block: args.block,
          timestamp: args.timestamp,
          transaction: args.transactionHash,
        });
        await AmplificationCoeffChangelog.create([newData],{session});
        await pool.save({session});
      }
       // updating mutation status
      //  let eventDataResult= await eventsData.findOne({_id:args.eventObjectId});
      //  eventDataResult.status="completed"
      //  await eventDataResult.save({ session });

      let response = await Response.findOne({ id: "1" });
      if (response === null) {
        // create new response
        response = new Response({
          id: "1",
          result: true,
        });
        await response.save({session});
      }
       //committing the transaction 
       await session.commitTransaction();

       // Ending the session
       session.endSession();

      return response;
    } catch (error) {
      // Rollback any changes made in the database
      await session.abortTransaction();

      throw new Error(error);
    }
  },
};

module.exports = {
  handleAddLiquidity,
  handleRemoveLiquidity,
  handleRemoveLiquidityImbalance,
  handleRemoveLiquidityOne,
  handleTokenExchange,
  handleTokenExchangeUnderlying,
  handleNewAdmin,
  handleNewFee,
  handleNewParameters,
  handleRampA,
  handleStopRampA,
};
