const DailyVolume = require("../../../models/dailyVolume");
const HourlyVolume = require("../../../models/hourlyVolume");
const Pool = require("../../../models/pool");
const WeeklyVolume = require("../../../models/weeklyVolume");

async function getHourlyTradeVolume(pool, timestamp) {
  let interval = BigInt(60 * 60);
  let hour = (timestamp / interval) * interval;
  let id = pool.id + "-hour-" + hour.toString();

  let volume = await HourlyVolume.findOne({id:id});

  if (volume === null) {
    let newData = new HourlyVolume({
      id: id,
      pool: pool.id,
      timestamp: hour,
      voulume: 0,
    });
    await HourlyVolume.create(newData);
  }

  return volume;
}

async function getDailyTradeVolume(pool, timestamp) {
  let interval = BigInt(60 * 60 * 24);
  let day = (timestamp / interval) * interval;
  let id = pool.id + "-day-" + day.toString();

  let volume = await DailyVolume.findOne({id:id});

  if (volume == null) {
    let newData = new DailyVolume({
      id: id,
      pool: pool.id,
      timestamp: day,
      voulume: 0,
    });
    await DailyVolume.create(newData);
  }

  return volume;
}

async function getWeeklyTradeVolume(pool, timestamp) {
  let interval = BigInt(60 * 60 * 24 * 7);
  let week = (timestamp / interval) * interval;
  let id = pool.id + "-week-" + week.toString();

  let volume = await WeeklyVolume.findOne({id:id});

  if (volume == null) {
    let newData = new WeeklyVolume({
      id: id,
      pool: pool.id,
      timestamp: week,
      voulume: 0,
    });
    await WeeklyVolume.create(newData);
  }

  return volume;
}

module.exports = {
  getHourlyTradeVolume,
  getDailyTradeVolume,
  getWeeklyTradeVolume
};
