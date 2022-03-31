
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
  } = require("graphql");
  
const tradeVolumeType = new GraphQLObjectType({
    name: "TradeVolume",
    description: "TradeVolume type",
    fields: () => ({
        _id: {type: GraphQLID },
        id: {type:GraphQLString},
        pool:{type:GraphQLString},
        timestamp: {type:GraphQLString},
        volume: {type:GraphQLString},
        HourlyVolume: {type:GraphQLString},
        DailyVolume: {type:GraphQLString},
        WeeklyVolume:{type:GraphQLString},
    
    })
});
  
module.exports = { tradeVolumeType };

