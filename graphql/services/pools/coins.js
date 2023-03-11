const Pool = require("../../../models/pool");
const Coin = require("../../../models/coin");
const UnderlyingCoin = require("../../../models/underlyingCoin");
const { getOrCreateToken } = require("../../services/token");
var bigdecimal = require("bigdecimal");
// let registryContract= require('../JsClients/Registry/test/installed.ts')

async function saveCoins(pool, args,session) {
  // const underlyingCoins = registryContract.try_get_underlying_coins(pool.registryAddress,args.swapAddress);
  let underlyingCoins = ["1","2"];
  if (underlyingCoins === null) {
    return false;
  }
  //const coins = registryContract.try_get_coins_coins(pool.registryAddress,args.swapAddress);
  const coins = ["3","4"];
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

     for (let i = 0, count = parseFloat(pool.coinCount); i < count; ++i) {
       
      let token = await getOrCreateToken(coins[i], args,session);
      // let token = ["1000000000"];
      let coin = new Coin({
        id: pool.id + "-" + i.toString(),
        index: i,
        pool: pool.id,
        token: token.id,
        //token: "123",
        Underlying: pool.id + "-" + i.toString(),
        //balance: balances ? new bigdecimal.BigDecimal(balances[i], token.toString()) : 0,
        balance: balances,
        //rate: rates ? new bigdecimal.BigDecimal(rates[i]) : 1,
        rate: rates,
        updated: args.timestamp,
        updatedAtBlock: args.block,
        updatedAtTransaction: args.transactionHash,
      });
      await Coin.create( [coin],{session} );
     }
  }

  if (underlyingCoins) {
    console.log("hello underlyingcoin");
    //const balances = registryContract.try_get_underlying_balances(pool.registryAddress,args.swapAddress)
    const balances = "1000000000";
    if (balances === null) {
      return false;
    }

    for (let i = 0, count = parseFloat(pool.underlyingCount); i < count; ++i) {
      console.log("hello in loop2");
      let token = await getOrCreateToken(underlyingCoins[i], args,session);
      //let token = ["1000000000"];
      let coin = new UnderlyingCoin({
        id: pool.id + "-" + i.toString(),
        index: i,
        pool: pool.id,
        token: token.id,
        coin: pool.id + "-" + i.toString(),
        //balance: balances ? new bigdecimal.BigDecimal(balances[i], token.toString()) : 0,
        balance: balances,
        updated: args.timestamp,
        updatedAtBlock: args.block,
        updatedAtTransaction: args.transactionHash,
      });
      await UnderlyingCoin.create( [coin],{session} );
    }
  }
}

module.exports = {
  saveCoins,
};

