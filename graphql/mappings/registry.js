
require("dotenv").config();
const { GraphQLString } = require("graphql");

const Response = require("../../models/response");
const { responseType } = require("../types/response");
const Pool = require("../../models/pool");
const Gauge = require("../../models/gauge");
const {getSystemState} = require("../services/system-state");
const getOrCreateLpToken = require("../services/token");
const FEE_PRECISION = require("../constants");
const {saveCoins} = require("../services/pools/coins");
//const { token } = require("morgan");
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
  

  if (pool === null) {
    // await registryContract.setContractHash(args.registryAddress);
    // await poolContract.setContractHash(args.poolAddress);
    //let coinCount = await registryContract.get_n_coins(args.registryAddress,address);
    let coinCount = ["3","4"];
    //let metapool = await registryContract.try_is_meta(args.registryAddress,address);
    let metapool = "1000000000";
    //let virtualPrice = await poolContract.try_get_virtual_price(args.poolAddress);
    let virtualPrice = "1000000000";

     pool = new Pool({
      //id: address,
      id: '123',
      //swapAddress: poolContract._address,
      swapAddress:'1000000000',
      //registryAddress: registryContract._address,
      registryAddress:'1000000000',
      coinCount: coinCount[0],
      exchangeCount: 0,
      gaugeCount: 0,
      underlyingCount: coinCount[1],
      //underlyingCount: '123',
      //isMeta: metapool !== null && metapool,
      //isMeta: '123',
      isMeta: 'true',
      //name : registryContract.get_pool_name(address),
      name: "1000000000",
      locked: 0,
      lpToken: '1000000000',
      gaugeCount:'112',
      A:'1223',
      fee: '4123',
      admin: '112456',
      owner: '1234',
      virtualPrice: virtualPrice === null ? 0 : BigInt(virtualPrice),
      addedAt: args.timestamp,
      addedAtBlock: args.blockNumber,
      addedAtTransaction: args.transactionHash,
    });
    await Pool.create(pool);
 
    

    //let lpToken = registryContract.try_get_lp_token(address);
    //  let lpToken = "1000000000";
    //  if (lpToken !== null) {
    //    let token = await getOrCreateLpToken(lpToken);
    //    token.pool = pool.id;
    //    await token.save();

    //   pool.lpToken = token.id;

    //   // Associate gauge to pool
      //  if (token.gauge !== null) {
      //    let gauge = await Gauge.findOne({id:token.gauge});
      //    gauge.pool = pool.id;
      //    await gauge.save();

      //    pool.gaugeCount = (BigInt(pool.gaugeCount) + BigInt("1")).toString();;
      //  }
    // }
    // let A = poolContract.try_A(args.poolAddress);
    // let adminFee = poolContract.try_admin_fee(args.poolAddress);
    // let fee = poolContract.try_fee(args.poolAddress);
    // let A = "1000000000";
    // let adminFee = "1000000000";
    // let fee = "1000000000";

    // if (A !== null) {
    //   pool.A = A;
    // }

    // if (fee !== null) {
    //   // pool.fee = BigInt(fee, FEE_PRECISION); //issue
    //   pool.fee = fee;
    // }

    // if (adminFee !== null) {
    //   // pool.adminFee = BigInt(adminFee, FEE_PRECISION); issue
    //   pool.adminFee = adminFee;
    // }

    //let owner = poolContract.try_owner()
    // let owner = "1000000000";
    // if (owner !== null) {
    //   pool.owner = owner;
    // }

    // let state = await getSystemState(args);
    // state.poolCount =  (BigInt(state.poolCount) + BigInt("1")).toString();
    // state.totalPoolCount = (BigInt(state.totalPoolCount) + BigInt("1")).toString();;
    // await state.save();

    // let context = new DataSourceContext();
    // context.setBytes("registry", registryContract._address);

    // await PoolDataSource.createWithContext(address, context);
  }
  await saveCoins(pool, args);
    console.log("check again",pool);
  return pool;
}

async function removePool(address, args) {
  let pool = await Pool.findOne({ id: address });

  if (pool !== null) {
    pool.removedAt = args.timestamp;
    pool.removedAtBlock = args.blockNumber;
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
  handlePoolRemoved
};


// "id":"123",
// "poolId":"123"
// "swapAddress":"1000000000",
// "registryAddress":"1000000000",
// "coinCount":"1233",
// "exchangeCount":"4124",
// "gaugeCount":"123443",
// "underlyingCount":"121314",
// "isMeta":"true",
// "name": "1000000000",
// "locked": "0",
// "lpToken": "1000000000",
// "gaugeCount":"112",
// "A":"1223",
// "fee": "4123",
// "admin": "112456",
// "owner": "1234",
// "virtualPrice": "123255334",
// "addedAt": "11324234",
// "addedAtBlock": "1000000000",
// "addedAtTransaction": "1000000000"