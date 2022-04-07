const GaugeType = require("../../models/guageType");

async function getGaugeType(id) {
  let gaugeType = await GaugeType.findOne({ id: id });
  return gaugeType;
}

async function registerGaugeType(id, name) {
  let newData = new GaugeType({
    id: name,
    name: name,
    gaugeCount: 0,
  });
  let gaugetype = await GaugeType.create(newData);
  return gaugetype;
}

module.exports = {
  getGaugeType,
  registerGaugeType,
};
