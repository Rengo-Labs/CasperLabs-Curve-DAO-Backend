const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
  } = require("graphql");
  
const dailyVolumeType = new GraphQLObjectType({
    name: "DailyVolume",
    description: "DailyVolume type",
    fields: () => ({
        _id: {type: GraphQLID },
        id: {type:GraphQLString},
        pool:{type:GraphQLString},
        timestamp: {type:GraphQLString},
        volume: {type:GraphQLString},
        TradeVolume: {type:GraphQLString}

    })
});
  
module.exports = { dailyVolumeType };

