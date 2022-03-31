const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
  } = require("graphql");
  
const amplificationCoeffChangelogType = new GraphQLObjectType({
    name: "AmplificationCoeffChangelog",
    description: "AmplificationCoeffChangelog type",
    fields: () => ({
        _id: {type: GraphQLID },
        id: {type:GraphQLString},
        pool:{type:GraphQLString},
        value: {type:GraphQLString},
        block: {type:GraphQLString},
        timestamp: {type:GraphQLString},
        transaction: {type:GraphQLString},
        PoolEvent: {type:GraphQLString},
    })
});
  
module.exports = { amplificationCoeffChangelogType };
  