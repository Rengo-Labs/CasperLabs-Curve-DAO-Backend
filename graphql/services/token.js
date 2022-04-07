const Token = require("../../models/token");
const LpToken = require("../../models/lpToken");
//let erc20= require('../JsClients/Registry/test/installed.ts')

class TokenInfo {
  address;
  symbol;
  name;
  decimals;
  constructor(address, symbol, name, decimals) {
    this.address = address;
    this.symbol = symbol;
    this.name = name;
    this.decimals = decimals;
  }
}

async function getOrCreateToken(address, args) {
  let token = await Token.findOne({ id: address });
  if (token === null) {
    let newData = new Token({
      id: address,
      address: address,
    });
    await Token.create(newData);

    if (token.id == ETH_TOKEN_ADDRESS) {
      token.name = "Ether";
      token.symbol = "ETH";
      //token.decimals = BigInt.fromI32(18)
      token.decimals="9";
    } else {
      let info = await getTokenInfo(address);

      token.name = info.name;
      token.symbol = info.symbol;
      token.decimals = info.decimals;
    }
    await token.save();

    let state = await getSystemState(args);
    state.tokenCount = (BigInt(state.tokenCount)+ BigInt("1")).toString();
    await state.save();
  }

  return token;
}

async function getOrCreateLpToken(address) {
  let token = await LpToken.findOne({ id: address });
  if (token === null) {
    let info = await getTokenInfo(address);
    let newData = new LpToken({
      id: address,
      address: address,
      name: info.name,
      symbol: info.symbol,
      decimals: info.decimals,
    });
    await LpToken.create(newData);
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

  return new TokenInfo(
    name !== null ? "" : name,
    symbol !== null ? "" : symbol,
    decimals !== null ? 9 : decimals
  );
}

module.exports = {
  getOrCreateToken,
  getOrCreateLpToken,
  getTokenInfo
};
