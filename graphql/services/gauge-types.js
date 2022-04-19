const GaugeType = require("../../models/guageType");

async function getGaugeType(id) {
  let gaugeType = await GaugeType.findOne({ id: id });
  return gaugeType;
}

async function registerGaugeType(id, name) {
  let gaugetype = new GaugeType({
    id: id,
    name: name,
    gaugeCount: "0",
  });
  await GaugeType.create(gaugetype);
  return gaugetype;
}

module.exports = {
  getGaugeType,
  registerGaugeType,
};
