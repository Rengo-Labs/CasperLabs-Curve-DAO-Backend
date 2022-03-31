const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
  } = require("graphql");
  
const weeklyVolumeType = new GraphQLObjectType({
    name: "WeeklyVolume",
    description: "WeeklyVolume type",
    fields: () => ({
        _id: {type: GraphQLID },
        id: {type:GraphQLString},
        pool:{type:GraphQLString},
        timestamp: {type:GraphQLString},
        volume: {type:GraphQLString},
        TradeVolume: {type:GraphQLString}

    })
});
  
module.exports = { weeklyVolumeType };

