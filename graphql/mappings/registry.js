require("dotenv").config();
const { GraphQLString } = require("graphql");

const Response = require("../../models/response");
const { responseType } = require("../types/response");
const Pool = require("../../models/pool");
const Gauge = require("../../models/gauge");
const { getSystemState } = require("../services/system-state");
const { getOrCreateLpToken } = require("../services/token");
const FEE_PRECISION = require("../constants");
const { saveCoins } = require("../services/pools/coins");

// let registryContract= require('../JsClients/Registry/test/installed.ts')
// let poolContract= require('../JsClients/Registry/test/installed.ts')

const handlePoolAdded = {
  type: responseType,
  description: "Handle PoolAdded",
  args: {
    poolId: { type: GraphQLString },
    transactionHash: { type: GraphQLString },
    block: { type: GraphQLString },
    timestamp: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    try {
      await getOrCreatePool(args.poolId, args);
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
const handlePoolRemoved = {
  type: responseType,
  description: "Handle PoolRemoved",
  args: {
    poolId: { type: GraphQLString },
    transactionHash: { type: GraphQLString },
    block: { type: GraphQLString },
    timestamp: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    try {
      await removePool(args.poolId, args);
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

async function getOrCreatePool(address, args) {
  let pool = await Pool.findOne({ id: address });
  console.log("check", pool);

  if (pool == null) {
    //let coinCount = await registryContract.get_n_coins(args.registryAddress,address);
    let coinCount = ["2", "2"];

    //let metapool = await registryContract.try_is_meta(args.registryAddress,address);
    let metapool = true;
    // if (metapool != null)

    console.log("address: ", address);
    let pool = new Pool({
      id: address,
      //swapAddress: args.registryAddress,
      swapAddress: "1000000000",
      //registryAddress: address,
      registryAddress: "1000000000",
      coinCount: coinCount[0],
      exchangeCount: "0",
      gaugeCount: "0",
      underlyingCount: coinCount[1],
      //isMeta: metapool !== null && metapool,
      isMeta: metapool,
      //name : registryContract.get_pool_name(args.registryAddress,address),
      name: "Pool",
    });
    await Pool.create(pool);
    console.log("pool: ", pool);
    await saveCoins(pool, args);
    pool.locked = "0";

    //let lpToken = registryContract.try_get_lp_token(args.registryAddress,address);

    let lpToken = "123";
    if (lpToken != null) {
      let token = await getOrCreateLpToken(lpToken);
      token.pool = pool.id;
      await token.save();

      pool.lpToken = token.id;

      // Associate gauge to pool
      if (token.gauge != null) {
        let gauge = await Gauge.findOne({ id: token.gauge });
        gauge.pool = pool.id;
        await gauge.save();

        pool.gaugeCount = (BigInt(pool.gaugeCount) + BigInt("1")).toString();
      }
    }
    // let A = await poolContract.try_A(address);
    // let adminFee = await poolContract.try_admin_fee(address);
    // let fee = await poolContract.try_fee(address);

    let A = "1000000000";
    let adminFee = "1000000000";
    let fee = "1000000000";

    if (A != null) {
      pool.A = A;
    }

    if (fee != null) {
      // pool.fee = BigInt(fee, FEE_PRECISION); //issue
      pool.fee = fee;
    }

    if (adminFee != null) {
      // pool.adminFee = BigInt(adminFee, FEE_PRECISION); issue
      pool.adminFee = adminFee;
    }
    //let owner = await poolContract.try_owner(address);
    let owner = "1000000000";
    if (owner != null) {
      pool.owner = owner;
    }

    //let virtualPrice = await poolContract.try_get_virtual_price(address);
    let virtualPrice = "1000000000";

    if (virtualPrice == null) pool.virtualPrice = "0";

    pool.virtualPrice = virtualPrice;

    pool.addedAt = args.timestamp;
    pool.addedAtBlock = args.block;
    pool.addedAtTransaction = args.transactionHash;

    await pool.save();

    let state = await getSystemState(args);
    state.poolCount = (BigInt(state.poolCount) + BigInt("1")).toString();
    state.totalPoolCount = (
      BigInt(state.totalPoolCount) + BigInt("1")
    ).toString();
    await state.save();

    // let context = new DataSourceContext();
    // context.setBytes("registry", registryContract._address);

    // await PoolDataSource.createWithContext(address, context);
    return pool;
  }

  return pool;
}

async function removePool(address, args) {
  let pool = await Pool.findOne({ id: address });

  console.log("pool: ", pool);
  if (pool != null) {
    pool.removedAt = args.timestamp;
    pool.removedAtBlock = args.block;
    pool.removedAtTransaction = args.transactionHash;
    await pool.save();

    // Count pools
    let state = await getSystemState(args);
    state.poolCount = (BigInt(state.poolCount) - BigInt("1")).toString();
    await state.save();

    // TODO: Stop indexing pool events (not yet supported)
  }

  return pool;
}
module.exports = {
  handlePoolAdded,
  handlePoolRemoved,
};

