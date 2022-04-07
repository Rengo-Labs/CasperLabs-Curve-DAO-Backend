const SystemState = require("../../models/systemState");

async function getSystemState(args) {
  let state = await SystemState.findOne({id:"current"});
  if (state === null) {
    let newData = new SystemState({
      contractCount: 0,
      gaugeCount: 0,
      gaugeTypeCount: 0,
      poolCount: 0,
      tokenCount: 0,
      totalPoolCount: 0,
    });
    await SystemState.create(newData);
  }
  state.updated = args.timestamp;
  state.updatedAtBlock = args.blockNumber;
  state.updatedAtTransaction = args.transactionHash;
  await state.save();
  return state;
}

module.exports = {
  getSystemState
};