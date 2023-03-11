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
      user: {type: GraphQLString },
      CRVLocked:{type:GraphQLString},
      unlock_time:{type:GraphQLString},
    })
});
  
module.exports = { userBalanceType };
  
  