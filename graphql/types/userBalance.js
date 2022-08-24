const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
  } = require("graphql");
  
const userBalanceType = new GraphQLObjectType({
    name: "UserBalance",
    description: "UserBalance type",
    fields: () => ({
      _id: {type: GraphQLID },
      id: {type: GraphQLString },
      startTx:{type:GraphQLString},
      user: {type: GraphQLString },
      CRVLocked:{type:GraphQLString},
      lock_start: {type: GraphQLString },
      unlock_time:{type:GraphQLString},
      weight:{type:GraphQLString},
    })
});
  
module.exports = { userBalanceType };
  
  