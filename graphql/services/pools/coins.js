const Pool = require("../../../models/pool");
const Coin = require("../../../models/coin");
const UnderlyingCoin = require("../../../models/underlyingCoin");
const { getOrCreateToken } = require("../../services/token");
// let registryContract= require('../JsClients/Registry/test/installed.ts')

async function saveCoins(pool, args) {
  // const underlyingCoins = registryContract.try_get_underlying_coins(pool.registryAddress,args.swapAddress);
  let underlyingCoins = ["1","2"];
  if (underlyingCoins === null) {
    return false;
  }
  //const coins = registryContract.try_get_coins_coins(pool.registryAddress,args.swapAddress);
  const coins = ["1","2"];
  if (coins === null) {
    return false;
  }

  if (coins) {
    // const balances = registryContract.try_get_balances(pool.registryAddress,args.swapAddress)
    const balances = "1000000000";
    if (balances === null) {
      return false;
    }
    //const rates = registryContract.try_get_rates(pool.registryAddress,args.swapAddress);
    const rates = "1000000000";
    if (rates === null) {
      return false;
    }

     for (let i = BigInt(0), count = BigInt(pool.coinCount); i < count; ++i) {
       let token = await getOrCreateToken(coins[i], args);
      // let token = ["1000000000"];
      let data = new Coin({
        id: pool.id + "-" + i.toString(),
        index: i,
        pool: pool.id,
        token: token.id,
        //token: "123",
        Underlying: pool.id + "-" + i.toString(),
        //balance: balances ? BigInt(balances[i], token.toString()) : 0,
        balance: "1000000000",
        //rate: rates ? BigInt(rates[i]) : 1,
        rate: "123",
        updated: args.timestamp,
        updatedAtBlock: args.blockNumber,
        updatedAtTransaction: args.transactionHash,
      });
      await Coin.create( data );
     }
  }

  if (underlyingCoins) {
    //const balances = registryContract.try_get_underlying_balances(pool.registryAddress,args.swapAddress)
    const balances = "1000000000";
    if (balances === null) {
      return false;
    }

    for (let i = BigInt(0), count = BigInt(pool.underlyingCount); i < count; ++i) {
      let token = await getOrCreateToken(underlyingCoins[i], args);
      //let token = ["1000000000"];
      let data = new UnderlyingCoin({
        id: pool.id + "-" + i.toString(),
        index: i,
        pool: pool.id,
        token: token.id,
        coin: pool.id + "-" + i.toString(),
        //balance: balances ? BigInt(balances[i], token.toString()) : 0,
        balance: "1000000000",
        updated: args.timestamp,
        updatedAtBlock: args.blockNumber,
        updatedAtTransaction: args.transactionHash,
      });
      await UnderlyingCoin.create( data );
    }
  }
}

module.exports = {
  saveCoins,
};

//Dummy Coin Data:
// "id":"123-123",
//  "index": "123",
//  "pool": "123",
//  "token": "123",
//  "Underlying": "123-123",
//  "balance": "123",
//  "rate": "123",
//  "updated": "123",
//  "updatedAtBlock": "12343",
//  "updatedAtTransaction": "123"


//Dummy Underlying Coin:
// "id": "123-1234",
// "index": "1234",
// "pool": "123",
// "token": "123",
// "coin": "123-1234",
// "balance": "12343113",
// "updated": "123",
// "updatedAtBlock": "123456786",
// "updatedAtTransaction": "123" 