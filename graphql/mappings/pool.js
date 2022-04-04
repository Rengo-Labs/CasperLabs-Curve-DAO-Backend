const { responseType } = require("../types/response");

const Pool = require("../../models/pool");
const AmplificationCoeffChangelog = require("../../models/amplificationCoeffChangelog");
const AdminFeeChangeLog = require("../../models/adminFeeChangeLog");
const FeeChangeLog = require("../../models/feeChangeLog");
const TransferOwnershipEvent = require("../../models/transferOwnershipEvent");
const FEE_PRECISION = require("../constants");

// export function handleTokenExchange(event: TokenExchange): void {
//     let pool = Pool.load(event.address.toHexString())

//     if (pool != null) {
//       pool = getPoolSnapshot(pool!, event)

//       let coinSold = Coin.load(pool.id + '-' + event.params.sold_id.toString())!
//       let tokenSold = Token.load(coinSold.token)!
//       let amountSold = decimal.fromBigInt(event.params.tokens_sold, tokenSold.decimals.toI32())

//       let coinBought = Coin.load(pool.id + '-' + event.params.bought_id.toString())!
//       let tokenBought = Token.load(coinBought.token)!
//       let amountBought = decimal.fromBigInt(event.params.tokens_bought, tokenBought.decimals.toI32())

//       let buyer = getOrRegisterAccount(event.params.buyer)

//       // Save event log
//       let exchange = new Exchange('e-' + getEventId(event))
//       exchange.pool = pool.id
//       exchange.buyer = buyer.id
//       exchange.receiver = buyer.id
//       exchange.tokenSold = tokenSold.id
//       exchange.tokenBought = tokenBought.id
//       exchange.amountSold = amountSold
//       exchange.amountBought = amountBought
//       exchange.block = event.block.number
//       exchange.timestamp = event.block.timestamp
//       exchange.transaction = event.transaction.hash
//       exchange.save()

//       // Save trade volume
//       let volume = exchange.amountSold.plus(exchange.amountBought).div(decimal.TWO)

//       let hourlyVolume = getHourlyTradeVolume(pool!, event.block.timestamp)
//       hourlyVolume.volume = hourlyVolume.volume.plus(volume)
//       hourlyVolume.save()

//       let dailyVolume = getDailyTradeVolume(pool!, event.block.timestamp)
//       dailyVolume.volume = dailyVolume.volume.plus(volume)
//       dailyVolume.save()

//       let weeklyVolume = getWeeklyTradeVolume(pool!, event.block.timestamp)
//       weeklyVolume.volume = weeklyVolume.volume.plus(volume)
//       weeklyVolume.save()

//       pool.exchangeCount = integer.increment(pool.exchangeCount)
//       pool.save()
//     }
//   }

//   export function handleTokenExchangeUnderlying(event: TokenExchangeUnderlying): void {
//     let pool = Pool.load(event.address.toHexString())

//     if (pool != null) {
//       pool = getPoolSnapshot(pool!, event)

//       let coinSold = UnderlyingCoin.load(pool.id + '-' + event.params.sold_id.toString())!
//       let tokenSold = Token.load(coinSold.token)!
//       let amountSold = decimal.fromBigInt(event.params.tokens_sold, tokenSold.decimals.toI32())

//       let coinBought = UnderlyingCoin.load(pool.id + '-' + event.params.bought_id.toString())!
//       let tokenBought = Token.load(coinBought.token)!
//       let amountBought = decimal.fromBigInt(event.params.tokens_bought, tokenBought.decimals.toI32())

//       let buyer = getOrRegisterAccount(event.params.buyer)

//       // Save event log
//       let exchange = new Exchange('e-' + getEventId(event))
//       exchange.pool = pool.id
//       exchange.buyer = buyer.id
//       exchange.receiver = buyer.id
//       exchange.tokenSold = tokenSold.id
//       exchange.tokenBought = tokenBought.id
//       exchange.amountSold = amountSold
//       exchange.amountBought = amountBought
//       exchange.block = event.block.number
//       exchange.timestamp = event.block.timestamp
//       exchange.transaction = event.transaction.hash
//       exchange.save()

//       // Save trade volume
//       let volume = exchange.amountSold.plus(exchange.amountBought).div(decimal.TWO)

//       let hourlyVolume = getHourlyTradeVolume(pool!, event.block.timestamp)
//       hourlyVolume.volume = hourlyVolume.volume.plus(volume)
//       hourlyVolume.save()

//       let dailyVolume = getDailyTradeVolume(pool!, event.block.timestamp)
//       dailyVolume.volume = dailyVolume.volume.plus(volume)
//       dailyVolume.save()

//       let weeklyVolume = getWeeklyTradeVolume(pool!, event.block.timestamp)
//       weeklyVolume.volume = weeklyVolume.volume.plus(volume)
//       weeklyVolume.save()

//       pool.exchangeCount = integer.increment(pool.exchangeCount)
//       pool.save()
//     }
//   }

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
  
          let newData = new FeeChangeLog({
            id: "f-" + eventId,
            pool: pool.id,
            value: pool.fee,
            block: args.block,
            timestamp: args.timestamp,
            transaction: args.transactionHash,
          });
          await FeeChangeLog.create(newData);
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

        let newData = new AmplificationCoeffChangelog({
          id: "a-" + eventId,
          pool: pool.id,
          value: pool.A,
          block: args.block,
          timestamp: args.timestamp,
          transaction: args.transactionHash,
        });
        await AmplificationCoeffChangelog.create(newData);

        let newData = new FeeChangelog({
          id: "f-" + eventId,
          pool: pool.id,
          value: pool.fee,
          block: args.block,
          timestamp: args.timestamp,
          transaction: args.transactionHash,
        });
        await FeeChangelog.create(newData);
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
  handleNewAdmin,
  handleNewFee,
  handleNewParameters,
  handleRampA,
  handleStopRampA,
};
