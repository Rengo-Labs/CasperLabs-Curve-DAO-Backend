const Token = require("../../models/token");
const LpToken = require("../../models/lpToken");
//let erc20= require('../JsClients/Registry/test/installed.ts')
const { getSystemState } = require("../services/system-state");
var bigdecimal = require("bigdecimal");

class TokenInfo {
  name;
  symbol;
  decimals;

  constructor(name, symbol, decimals) {
    this.name = name;
    this.symbol = symbol;
    this.decimals = decimals;
  }
}

async function getOrCreateToken(address, args,session) {
  let token = await Token.findOne({ id: address });
  if (token == null) {
    token = new Token({
      id: address,
      address: address,
    });
    await Token.create([token],{session});

    let ETH_TOKEN_ADDRESS="123";

    if (token.id == ETH_TOKEN_ADDRESS) {
      token.name = "Ether";
      token.symbol = "ETH";
      //token.decimals = BigInt.fromI32(18)
      token.decimals = "9";
    } else {
      let info = await getTokenInfo(address);

      token.name = info.name;
      token.symbol = info.symbol;
      token.decimals = info.decimals;
    }
    await token.save({session});

    let state = await getSystemState(args,session);
    state.tokenCount = ((new bigdecimal.BigDecimal(state.tokenCount)).add(new bigdecimal.BigDecimal("1"))).toString();
    await state.save({session});
  }

  return token;
}

async function getOrCreateLpToken(address,session) {
  let token = await LpToken.findOne({ id: address });
  if (token == null) {
    let info = await getTokenInfo(address);
    token = new LpToken({
      id: address,
      address: address,
      name: info.name,
      symbol: info.symbol,
      decimals: info.decimals,
    });
    await LpToken.create([token],{session});
  }
  return token;
}

async function getTokenInfo(address) {
  // let name = erc20.try_name(address);
  // let symbol = erc20.try_symbol(address);
  // let decimals = erc20.try_decimals(address);
  let name = "erc20";
  let symbol = "erc20";
  let decimals = "9";

  return new TokenInfo(name, symbol, decimals);
}

module.exports = {
  getOrCreateToken,
  getOrCreateLpToken,
  getTokenInfo,
};
