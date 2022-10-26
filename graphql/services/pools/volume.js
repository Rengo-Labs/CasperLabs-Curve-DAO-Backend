const DailyVolume = require("../../../models/dailyVolume");
const HourlyVolume = require("../../../models/hourlyVolume");
const Pool = require("../../../models/pool");
const WeeklyVolume = require("../../../models/weeklyVolume");
var bigdecimal = require("bigdecimal");
var halfUp = bigdecimal.RoundingMode.HALF_UP();

async function getHourlyTradeVolume(pool, timestamp,session) {
  let interval = (new bigdecimal.BigDecimal("60")).multiply(new bigdecimal.BigDecimal("60"));
  let hour = ((new bigdecimal.BigDecimal(timestamp))
            .divide(new bigdecimal.BigDecimal(interval)))
            .multiply(new bigdecimal.BigDecimal(interval));
  let id = pool.id + "-hour-" + hour.toString();
  console.log("id:", id);
  let volume = await HourlyVolume.findOne({ id: id });
  console.log("volume", volume);
  if (volume === null) {
    volume = new HourlyVolume({
      id: id,
      pool: pool.id,
      timestamp: hour,
      volume: "0",
    });
    await HourlyVolume.create([volume],{session});
  }

  return volume;
}

async function getDailyTradeVolume(pool, timestamp, session) {
  let interval = (new bigdecimal.BigDecimal(60)).multiply(new bigdecimal.BigDecimal(60)).multiply(new bigdecimal.BigDecimal(24));
  let day = ((new bigdecimal.BigDecimal(timestamp))
            .divide(new bigdecimal.BigDecimal(interval)))
            .multiply(new bigdecimal.BigDecimal(interval));
  let id = pool.id + "-day-" + day.toString();

  let volume = await DailyVolume.findOne({ id: id });

  if (volume == null) {
    volume = new DailyVolume({
      id: id,
      pool: pool.id,
      timestamp: day,
      volume: "0",
    });
    await DailyVolume.create([volume], {session});
  }

  return volume;
}

async function getWeeklyTradeVolume(pool, timestamp, session) {
  let interval = (new bigdecimal.BigDecimal(60)).multiply(new bigdecimal.BigDecimal(60)).multiply(new bigdecimal.BigDecimal(24)).multiply(new bigdecimal.BigDecimal(7));
  let week = ((new bigdecimal.BigDecimal(timestamp))
            .divide(new bigdecimal.BigDecimal(interval)))
            .multiply(new bigdecimal.BigDecimal(interval));
  let id = pool.id + "-week-" + week.toString();

  let volume = await WeeklyVolume.findOne({ id: id });

  if (volume == null) {
    volume = new WeeklyVolume({
      id: id,
      pool: pool.id,
      timestamp: week,
      volume: "0",
    });
    await WeeklyVolume.create([volume], {session});
  }

  return volume;
}

module.exports = {
  getHourlyTradeVolume,
  getDailyTradeVolume,
  getWeeklyTradeVolume,
};
