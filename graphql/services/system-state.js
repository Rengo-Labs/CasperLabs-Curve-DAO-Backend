const SystemState = require("../../models/systemState");

async function getSystemState(args) {
  let state = await SystemState.findOne({ id: "current" });

  if (state === null) {
    state = new SystemState({
      id: "current",
      contractCount: "0",
      gaugeCount: "0",
      gaugeTypeCount: "0",
      poolCount: "0",
      tokenCount: "0",
      totalPoolCount: "0",
    });
  }
  state.updated = args.timestamp;
  state.updatedAtBlock = args.block;
  state.updatedAtTransaction = args.transactionHash;
  return state;
}

module.exports = {
  getSystemState,
};
