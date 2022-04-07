const Pool = require("../../../models/pool");
const Coin = require("../../../models/coin");
const UnderlyingCoin = require("../../../models/underlyingCoin");
// let registryContract= require('../JsClients/Registry/test/installed.ts')

async function saveCoins(pool, args) {
  // const underlyingCoins = registryContract.try_get_underlying_coins(pool.registryAddress,args.swapAddress);
  let underlyingCoins = ["1000000000"];
  if (underlyingCoins === null) {
    return false;
  }
  //const coins = registryContract.try_get_coins_coins(pool.registryAddress,args.swapAddress);
  const coins = ["1000000000"];
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

    for (let i = 0, count = BigInt(pool.coinCount); i < count; ++i) {
      let token = await getOrCreateToken(coins[i], args);
      let data = new Coin({
        id: pool.id + "-" + i.toString(),
        index: i,
        pool: pool.id,
        token: token.id,
        Underlying: pool.id + "-" + i.toString(),
        balance: balances ? BigInt(balances[i], token.toString()) : 0,
        rate: rates ? BigInt(rates[i]) : 1,
        updated: args.timestamp,
        updatedAtBlock: args.blockNumber,
        updatedAtTransaction: args.transactionHash,
      });
      await Coin.create({ data });
    }
  }

  if (underlyingCoins) {
    //const balances = registryContract.try_get_underlying_balances(pool.registryAddress,args.swapAddress)
    const balances = "1000000000";
    if (balances === null) {
      return false;
    }

    for (let i = 0, count = BigInt(pool.underlyingCount); i < count; ++i) {
      let token = await getOrCreateToken(coins[i], args);
      let data = new UnderlyingCoin({
        id: pool.id + "-" + i.toString(),
        index: i,
        pool: pool.id,
        token: token.id,
        coin: pool.id + "-" + i.toString(),
        balance: balances ? BigInt(balances[i], token.toString()) : 0,
        updated: args.timestamp,
        updatedAtBlock: args.blockNumber,
        updatedAtTransaction: args.transactionHash,
      });
      await UnderlyingCoin.create({ data });
    }
  }
}

module.exports = {
  saveCoins,
};
