require("dotenv").config();
const {
  GraphQLString
} = require("graphql");

const { responseType } = require("../types/response");

const Pool = require("../../models/pool");
const Exchange = require("../../models/exchange");
const Coin = require("../../models/coin");
const Token = require("../../models/token");
const AmplificationCoeffChangelog = require("../../models/amplificationCoeffChangelog");
const AdminFeeChangeLog = require("../../models/adminFeeChangeLog");
const FeeChangeLog = require("../../models/feeChangeLog");
const TransferOwnershipEvent = require("../../models/transferOwnershipEvent");
const FEE_PRECISION = require("../constants");
const { getHourlyTradeVolume, getDailyTradeVolume, getWeeklyTradeVolume  }= require('../services/pools/volume');
const { getOrRegisterAccount } =require('../services/accounts');

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
      try {
        let pool = await Pool.findOne({ id: args.poolId });
  
        if (pool != null) {
          pool = await getPoolSnapshot(pool, args);

          let coinSold = await Coin.findOne({id: pool.id + '-' + args.sold_id});
          let tokenSold = await Token.findOne({id:coinSold.token});
          //let amountSold = decimal.fromBigInt(event.params.tokens_sold, tokenSold.decimals.toI32()) //issue

          let amountSold = BigInt(args.tokens_sold);

          let coinBought = await Coin.findOne({id:pool.id + '-' + args.bought_id});
          let tokenBought = await Token.findOne({id:coinBought.token});
          //let amountBought = decimal.fromBigInt(event.params.tokens_bought, tokenBought.decimals.toI32()); //issue

          let amountBought = BigInt(args.tokens_bought); //issue

          let buyer = await getOrRegisterAccount(args.buyer);

          let eventId = await getEventId(args.transactionHash, args.logIndex);

          // Save event log
          let newData = new Exchange({
            id: "e-" + eventId,
            pool : pool.id,
            buyer : buyer.id,
            receiver : buyer.id,
            tokenSold : tokenSold.id,
            tokenBought : tokenBought.id,
            amountSold : amountSold,
            amountBought : amountBought,
            block : args.block,
            timestamp : args.timestamp,
            transaction : args.transactionHash
          });
          await Exchange.create(newData);

          let exchange=newData;

          // Save trade volume
          let volume = BigInt(exchange.amountSold)+(BigInt(exchange.amountBought)/BigInt("2"));

          let hourlyVolume = await getHourlyTradeVolume(pool, args.timestamp);
          hourlyVolume.volume = (BigInt(hourlyVolume.volume)+BigInt(volume)).toString();
          await hourlyVolume.save();

          let dailyVolume = await getDailyTradeVolume(pool, args.timestamp);
          dailyVolume.volume = (BigInt(dailyVolume.volume)+BigInt(volume)).toString();
          await dailyVolume.save();

          let weeklyVolume = await getWeeklyTradeVolume(pool, args.timestamp);
          weeklyVolume.volume = (BigInt(weeklyVolume.volume)+BigInt(volume)).toString();
          await weeklyVolume.save();

          pool.exchangeCount = (BigInt(pool.exchangeCount) + BigInt("1")).toString();

          await pool.save();

        }
  
        let response = await Response.findOne({ id: "1" });
        if (response === null) {
          // create new response
          response = new Response({
            id: "1",
            result: true,
          });
          await response.save();
        }
        return response;
      } catch (error) {
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
    try {
      let pool = await Pool.findOne({ id: args.poolId });

      if (pool != null) {
        pool = await getPoolSnapshot(pool, args);

        let coinSold = await UnderlyingCoin.findOne({id: pool.id + '-' + args.sold_id});
        let tokenSold = await Token.findOne({id:coinSold.token});
        //let amountSold = decimal.fromBigInt(event.params.tokens_sold, tokenSold.decimals.toI32()) //issue

        let amountSold = BigInt(args.tokens_sold);

        let coinBought = await UnderlyingCoin.findOne({id:pool.id + '-' + args.bought_id});
        let tokenBought = await Token.findOne({id:coinBought.token});
        //let amountBought = decimal.fromBigInt(event.params.tokens_bought, tokenBought.decimals.toI32()); //issue

        let amountBought = BigInt(args.tokens_bought); //issue

        let buyer = await getOrRegisterAccount(args.buyer);

        let eventId = await getEventId(args.transactionHash, args.logIndex);
  
        // Save event log
        let newData = new Exchange({
          id: "e-" + eventId,
          pool : pool.id,
          buyer : buyer.id,
          receiver : buyer.id,
          tokenSold : tokenSold.id,
          tokenBought : tokenBought.id,
          amountSold : amountSold,
          amountBought : amountBought,
          block : args.block,
          timestamp : args.timestamp,
          transaction : args.transactionHash
        });
        await Exchange.create(newData);

        let exchange=newData;
        
        // Save trade volume
        let volume = BigInt(exchange.amountSold)+(BigInt(exchange.amountBought)/BigInt("2"));

        let hourlyVolume = await getHourlyTradeVolume(pool, args.timestamp);
        hourlyVolume.volume = (BigInt(hourlyVolume.volume)+BigInt(volume)).toString();
        await hourlyVolume.save();

        let dailyVolume = await getDailyTradeVolume(pool, args.timestamp);
        dailyVolume.volume = (BigInt(dailyVolume.volume)+BigInt(volume)).toString();
        await dailyVolume.save();

        let weeklyVolume = await getWeeklyTradeVolume(pool, args.timestamp);
        weeklyVolume.volume = (BigInt(weeklyVolume.volume)+BigInt(volume)).toString();
        await weeklyVolume.save();

        pool.exchangeCount = (BigInt(pool.exchangeCount) + BigInt("1")).toString();

        await pool.save();
        
      }

      let response = await Response.findOne({ id: "1" });
      if (response === null) {
        // create new response
        response = new Response({
          id: "1",
          result: true,
        });
        await response.save();
      }
      return response;
    } catch (error) {
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
      try {
        let pool = await Pool.findOne({ id: args.poolId });
  
        if (pool != null) {
          pool = await getPoolSnapshot(pool, args);
  
          // Save pool owner
          pool.owner = args.admin;

          let eventId = await getEventId(args.transactionHash, args.logIndex);

          // Save event log
          let newData = new TransferOwnershipEvent({
            id: "to-" + eventId,
            pool: pool.id,
            value: pool.admin,
            block: args.block,
            timestamp: args.timestamp,
            transaction: args.transactionHash,
          });
          await TransferOwnershipEvent.create(newData);
          await pool.save();

        }
  
        let response = await Response.findOne({ id: "1" });
        if (response === null) {
          // create new response
          response = new Response({
            id: "1",
            result: true,
          });
          await response.save();
        }
        return response;
      } catch (error) {
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
      try {
        let pool = await Pool.findOne({ id: args.poolId });
  
        if (pool != null) {
          pool = await getPoolSnapshot(pool, args);
  
          // Save pool parameters

          // pool.fee = decimal.fromBigInt(args.fee, FEE_PRECISION);  //issue
          // pool.adminFee = decimal.fromBigInt(args.admin_fee, FEE_PRECISION);  //issue
  
          pool.fee = args.fee;
          pool.adminFee = args.admin_fee;
  
          let eventId = await getEventId(args.transactionHash, args.logIndex);
          // Save event log
          let newData = new AdminFeeChangeLog({
            id: "af-" + eventId,
            pool: pool.id,
            value: pool.adminFee,
            block: args.block,
            timestamp: args.timestamp,
            transaction: args.transactionHash,
          });
          await AdminFeeChangeLog.create(newData);
  
          let newData2 = new FeeChangeLog({
            id: "f-" + eventId,
            pool: pool.id,
            value: pool.fee,
            block: args.block,
            timestamp: args.timestamp,
            transaction: args.transactionHash,
          });
          await FeeChangeLog.create(newData2);
          await pool.save();
        }
  
        let response = await Response.findOne({ id: "1" });
        if (response === null) {
          // create new response
          response = new Response({
            id: "1",
            result: true,
          });
          await response.save();
        }
        return response;
      } catch (error) {
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
    try {
      let pool = await Pool.findOne({ id: args.poolId });

      if (pool != null) {
        pool = await getPoolSnapshot(pool, args);

        // Save pool parameters
        pool.A = args.A;
        // pool.fee = decimal.fromBigInt(args.fee, FEE_PRECISION);  //issue
        // pool.adminFee = decimal.fromBigInt(args.admin_fee, FEE_PRECISION);  //issue

        pool.fee = args.fee;
        pool.adminFee = args.admin_fee;

        let eventId = await getEventId(args.transactionHash, args.logIndex);
        // Save event log
        let newData = new AdminFeeChangelog({
          id: "af-" + eventId,
          pool: pool.id,
          value: pool.adminFee,
          block: args.block,
          timestamp: args.timestamp,
          transaction: args.transactionHash,
        });
        await AdminFeeChangelog.create(newData);

        let newData2 = new AmplificationCoeffChangelog({
          id: "a-" + eventId,
          pool: pool.id,
          value: pool.A,
          block: args.block,
          timestamp: args.timestamp,
          transaction: args.transactionHash,
        });
        await AmplificationCoeffChangelog.create(newData2);

        let newData3 = new FeeChangelog({
          id: "f-" + eventId,
          pool: pool.id,
          value: pool.fee,
          block: args.block,
          timestamp: args.timestamp,
          transaction: args.transactionHash,
        });
        await FeeChangelog.create(newData3);
        await pool.save();
      }

      let response = await Response.findOne({ id: "1" });
      if (response === null) {
        // create new response
        response = new Response({
          id: "1",
          result: true,
        });
        await response.save();
      }
      return response;
    } catch (error) {
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
    try {
      let pool = await Pool.findOne({ id: args.poolId });

      if (pool != null) {
        pool = await getPoolSnapshot(pool, args);

        // Save pool parameters
        pool.A = args.new_A;
        let eventId = await getEventId(args.transactionHash, args.logIndex);

        // Save event log
        let newData = new AmplificationCoeffChangelog({
          id: "a-" + eventId,
          pool: pool.id,
          value: pool.A,
          block: args.block,
          timestamp: args.timestamp,
          transaction: args.transactionHash,
        });
        await AmplificationCoeffChangelog.create(newData);
        await pool.save();
      }
      let response = await Response.findOne({ id: "1" });
      if (response === null) {
        // create new response
        response = new Response({
          id: "1",
          result: true,
        });
        await response.save();
      }
      return response;
    } catch (error) {
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
    try {
      let pool = await Pool.findOne({ id: args.poolId });

      if (pool != null) {
        pool = await getPoolSnapshot(pool, args);

        // Save pool parameters
        pool.A = args.A;
        let eventId = await getEventId(args.transactionHash, args.logIndex);

        // Save event log
        let newData = new AmplificationCoeffChangelog({
          id: "a-" + eventId,
          pool: pool.id,
          value: pool.A,
          block: args.block,
          timestamp: args.timestamp,
          transaction: args.transactionHash,
        });
        await AmplificationCoeffChangelog.create(newData);
        await pool.save();
      }
      let response = await Response.findOne({ id: "1" });
      if (response === null) {
        // create new response
        response = new Response({
          id: "1",
          result: true,
        });
        await response.save();
      }
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
};

module.exports = {
  handleTokenExchange,
  handleTokenExchangeUnderlying,
  handleNewAdmin,
  handleNewFee,
  handleNewParameters,
  handleRampA,
  handleStopRampA,
};
