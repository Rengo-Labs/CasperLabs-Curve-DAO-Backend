const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList,
  } = require("graphql");
const gaugeWeight = require("../../models/gaugeWeight");
const { gaugeWeightType } = require("./gaugeWeight");
  
const gaugeVoteType = new GraphQLObjectType({
    name: "GaugeVote",
    description: "GaugeVote type",
    fields: () => ({
      _id: {type: GraphQLID },
      id: {type: GraphQLString },
      gauge:{type:GraphQLString},                             
      user : {type:GraphQLString},
      time: {type: GraphQLString },
      weight:{type:GraphQLString},
      total_weight : {type:GraphQLString},
      veCRV : {type:GraphQLString},
      totalveCRV : {type:GraphQLString},
      gauge_weights : {
        type: GraphQLList(gaugeWeightType),
        description: "Retrieves gauge weights",
        args: {
          block: { type: GraphQLString },
          first: {type : GraphQLString},
          orderBy: {type : GraphQLString},
          orderDirection: {type : GraphQLString},
          skip: {type : GraphQLString},
        },
        async resolve(parent, args, context) {
          try {
            debugger;
            let gaugeWeights = await gaugeWeight.find().skip(args.skip).limit(args.first).sort({[args.orderBy] : args.orderDirection == 'asc' ? 1 : -1});;
            return gaugeWeights;
          } catch (error) {
            throw new Error(error);
          }
        },
      }
    })
});
  
module.exports = { gaugeVoteType };

// gauge_weights(skip: Int = 0first: Int = 100orderBy: GaugeWeight_orderByorderDirection: OrderDirectionwhere: GaugeWeight_filter): [GaugeWeight!]
  
  