const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
  } = require("graphql");
  
const transferOwnershipEventType = new GraphQLObjectType({
    name: "TransferOwnershipEvent",
    description: "TransferOwnershipEvent type",
    fields: () => ({
        _id: {type: GraphQLID },
        id: {type:GraphQLString},
        pool:{type:GraphQLString},
        newAdmin: {type:GraphQLString},
        block: {type:GraphQLString},
        timestamp: {type:GraphQLString},
        transaction: {type:GraphQLString},
        PoolEvent: {type:GraphQLString},
    })
});
  
module.exports = { transferOwnershipEventType };
  