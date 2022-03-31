const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
  } = require("graphql");
  
const hourlyVolumeType = new GraphQLObjectType({
    name: "HourlyVolume",
    description: "HourlyVolume type",
    fields: () => ({
        _id: {type: GraphQLID },
        id: {type:GraphQLString},
        pool:{type:GraphQLString},
        timestamp: {type:GraphQLString},
        volume: {type:GraphQLString},
        TradeVolume: {type:GraphQLString}

    })
});
  
module.exports = { hourlyVolumeType };

