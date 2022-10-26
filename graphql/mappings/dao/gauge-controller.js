const Gauge = require("../../../models/gauge");
const GaugeTotalWeight = require("../../../models/gaugeTotalWeight");
const GaugeType = require("../../../models/guageType");
const GaugeTypeWeight = require("../../../models/gaugeTypeWeight");
const GaugeWeight = require("../../../models/gaugeWeight");
const GaugeWeightVote = require("../../../models/gaugeWeightVote");
const Pool = require("../../../models/pool");
// const allcontractsData = require("../../../models/allcontractsData");
const { getOrRegisterAccount } = require("../../services/accounts");
const {
  getGaugeType,
  registerGaugeType,
} = require("../../services/gauge-types");
const { getSystemState } = require("../../services/system-state");
const { getOrCreateLpToken } = require("../../services/token");
const Response = require("../../../models/response");
const { responseType } = require("../../types/response");
const { GraphQLString } = require("graphql");
let gaugeController = require('../../../JsClients/GAUGECONTROLLER/gaugeControllerFunctionsForBackend/functions');
const mongoose = require("mongoose");
const bigDecimal = require("js-big-decimal");
// let gaugeController= require('../JsClients/Registry/test/installed.ts')
// let LpToken= require('../JsClients/Registry/test/installed.ts')

const { GAUGE_TOTAL_WEIGHT_PRECISION } = require("../../constants");
var bigdecimal = require("bigdecimal");
var halfUp = bigdecimal.RoundingMode.HALF_UP();
const GaugeVote = require("../../../models/gaugeVote");
// let votingEscrow = require("../../../JsClients/VOTINGESCROW/votingEscrowFunctionsForBackend/functions.ts");


let WEEK = "604800";

const handleAddType = {
  type: responseType,
  description: "Handle PoolAddType",
  args: {
    id: { type: GraphQLString },
    type_id: { type: GraphQLString },
    timestamp: { type: GraphQLString },
    name: {type: GraphQLString}
  },
  async resolve(parent, args, context) {
    const session = await mongoose.startSession();
    //starting the transaction
    session.startTransaction();

    try {
      // await gaugeController.setContractHash(address);
      
      let nextWeek = nextPeriod(args.timestamp, WEEK);
      console.log("args-name", args);

      let gaugeType = await registerGaugeType(args.type_id, args.name,session);
      await gaugeType.save({session});
      let newData = new GaugeTypeWeight({
        id: nextWeek.toString(),
        type: gaugeType.id,
        time: nextWeek.toString(),
        weight: 
          // gaugeController.points_type_weight(args.type_id, nextWeek)
         '1000000000'
        
      });
      await GaugeTypeWeight.create([newData],{session});

      let data = new GaugeTotalWeight({
        id: nextWeek.toString(),
        time: nextWeek.toString(),
        weight : bigDecimal.round(
          // parseFloat(gaugeController.points_total(nextWeek)),
          '1000000000',
          parseFloat(GAUGE_TOTAL_WEIGHT_PRECISION)), //issue fixed
        // weight:
        //   //gaugeController.points_total(nextWeek),
        //   '1000000000'
      });
      await GaugeTotalWeight.create([data], {session});

      let state = await getSystemState(args,session);
      state.gaugeTypeCount = ((new bigdecimal.BigDecimal(state.gaugeTypeCount)).add(new bigdecimal.BigDecimal('1'))).toString();
      await state.save({session});

      let response = await Response.findOne({ id: "1" });
      if (response === null) {
        // create new response
        response = new Response({
          id: "1",
          result: true,
        });
        await response.save({session});
      }

      //committing the transaction 
      await session.commitTransaction();

      // Ending the session
      session.endSession();

      return response;
    } catch (error) {
      // Rollback any changes made in the database
      await session.abortTransaction();

      throw new Error(error);
    }
  },
};

// const handleNewGauge = {
//   type: responseType,
//   description: "Handle HandleNewGauge",
//   args: {
//     gauge_type: { type: GraphQLString },
//     timestamp: { type: GraphQLString },
//     addr: { type: GraphQLString },
//     blockNumber: { type: GraphQLString },
//     transactionHash: { type: GraphQLString },
//     weight: { type: GraphQLString },
//   },
//   async resolve(parent, context, args) {
//     try {
//       // await gaugeController.setContractHash(address);
//       console.log(args.timestamp);
//       let nextWeek = nextPeriod(args.timestamp, WEEK);
//       // let gaugeType = await getGaugeType((args.gauge_type).toString());

//       // if (gaugeType === null) {
//       //   gaugeType = registerGaugeType(
//       //     (args.gauge_type).toString(),
//       //    // gaugeController.gauge_type_names(args.gauge_type)
//       //    '1000000000'
//       //   );
//       // }

//       // //gaugeType.gaugeCount = ((new bigdecimal.BigDecimal(gaugeType.gaugeCount)).add (new bigdecimal.BigDecimal('1')).toString();
//       // gaugeType.gaugeCount = '1000000000'
//       //  await gaugeType.save();

//       // let gauge = new Gauge({
//       //   id: args.addr,
//       //   address: args.addr,
//       //   type: gaugeType.id,
//       //   created: args.timestamp,
//       //   createdAtBlock: args.BlockNumber,
//       //   createdAtTransaction: args.transactionHash,
//       // });
//       // await Gauge.create(gauge);

//       // // await lpToken.setContractHash(args.addr).try_lp_token();
//       // lpToken = "1000000000";

//       // if (lpToken !== null) {
//       //   //let token = getOrCreateLpToken(lpToken.value);
//       //   let token = await getOrCreateLpToken('1000000000');
//       //   token.gauge = gauge.id;
//       //   await token.save();

//       //   if (token.pool != null) {
//       //     let pool = await Pool.findOne(token.pool);
//       //     gauge.pool = pool.id;
//       //   }
//       // }
//       // await gauge.save();

//       // let data = new GaugeWeight({
//       //   id: gauge.id + "-" + nextWeek.toString(),
//       //   gauge: gauge.id,
//       //   time: nextWeek,
//       //   //weight: (new bigdecimalBigDecimal(args.weight)).toString(),
//       //   weight: '1000000000'
//       // });
//       // await GaugeWeight.create(data);

//       // let dataWeight = new GaugeTotalWeight({
//       //   id: nextWeek.toString(),
//       //   time: nextWeek.toString(),
//       //   // weight: BigInt(
//       //   //   gaugeController.points_total(nextWeek),
//       //   //   GAUGE_TOTAL_WEIGHT_PRECISION
//       //   // ),
//       //   weight: '1000000000'
//       // });
//       // await GaugeTotalWeight.create(dataWeight);

//       // let state = getSystemState(args);
//       // //state.gaugeCount = (BigInt(state.gaugeCount)+ BigInt('1')).toString();
//       // state.gaugeCount = '1000000000'
//       // await state.save();

//       // //LiquidityGauge.create(event.params.addr)

//       let response = await Response.findOne({ id: "1" });
//       if (response === null) {
//         // create new response
//         response = new Response({
//           id: "1",
//           result: true,
//         });
//         await response.save();
//       }
//       return response;s
//     } catch (error) {
//       throw new Error(error);
//     }
//   },
// };


const handleNewGauge = {
  type: responseType,
  description: "Handle PoolNewGauge",
  args: {
    gaugeType: { type: GraphQLString },
    addr: { type: GraphQLString },
    blockNumber: { type: GraphQLString },
    transactionHash: { type: GraphQLString },
    weight: { type: GraphQLString },
    timestamp: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    const session = await mongoose.startSession();
    //starting the transaction
    session.startTransaction();

    try {
      
      let nextWeek = nextPeriod(args.timestamp, WEEK);
       let gaugeType = await getGaugeType((args.gaugeType).toString());

      if (gaugeType === null) {
        gaugeType = await registerGaugeType(
          (args.gaugeType).toString(),
          // gaugeController.gauge_type_names(args.gauge_type),
          '1000000000',
          session
        );
      }

      gaugeType.gaugeCount = ((new bigdecimal.BigDecimal(gaugeType.gaugeCount)).add(new bigdecimal.BigDecimal('1'))).toString();
      //gaugeType.gaugeCount = '1000000000';
       await gaugeType.save({session});

      let gauge = new Gauge({
        id: args.addr,
        address: args.addr,
        type: gaugeType.id,
        created: args.timestamp,
        createdAtBlock: args.blockNumber,
        createdAtTransaction: args.transactionHash,
      });
      await Gauge.create([gauge],{session});
      console.log(gauge);

      // await lpToken.setContractHash(args.addr).try_lp_token();
      lpToken = "1000000000";

      if (lpToken !== null) {
        //let token = getOrCreateLpToken(lpToken.value);
        let token = await getOrCreateLpToken('1000000000', session);
        token.gauge = gauge.id;
        await token.save({session});

        if (token.pool != null) {
          let pool = await Pool.findOne(token.pool);
          gauge.pool = pool.id;
        }
      }
      await gauge.save({session});


      let data = new GaugeWeight({
        id: gauge.id + "-" + nextWeek.toString(),
        gauge: gauge.id,
        time: nextWeek,
        weight: (new bigdecimal.BigDecimal(args.weight)).toString(),
        //weight: '1000000000'
      });
      await GaugeWeight.create([data], {session});

      let dataWeight = new GaugeTotalWeight({
        id: nextWeek.toString(),
        time: nextWeek.toString(),
        weight : bigDecimal.round(
          // parseFloat(gaugeController.points_total(nextWeek)),
          '1000000000',
          parseFloat(GAUGE_TOTAL_WEIGHT_PRECISION)), //issue fixed 
        // weight: '1000000000'
      });
      await GaugeTotalWeight.create([dataWeight], {session});

      let state = await getSystemState(args, session);
      state.gaugeCount = ((new bigdecimal.BigDecimal(state.gaugeCount)).add(new bigdecimal.BigDecimal('1'))).toString();
      //state.gaugeCount = '1000000000'
      await state.save({session});

      //LiquidityGauge.create(args.addr);


      let response = await Response.findOne({ id: "1" });
      if (response === null) {
        // create new response
        response = new Response({
          id: "1",
          result: true,
        });
        await response.save({session});
      }
      
      //committing the transaction 
      await session.commitTransaction();

      // Ending the session
      session.endSession();
      
      return response;
    } catch (error) {
      // Rollback any changes made in the database
      await session.abortTransaction();

      throw new Error(error);
    }
  },
};

const handleNewGaugeWeight = {
  type: responseType,
  description: "Handle NewGaugeWeight",
  args: {
    id: { type: GraphQLString },
    time: { type: GraphQLString },
    weight: { type: GraphQLString },
    gauge_address: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    const session = await mongoose.startSession();
    //starting the transaction
    session.startTransaction();
    
    try {
      let gauge = await Gauge.findOne({ id: args.gauge_address });
      //let gauge = '1000000000';
      if (gauge != null) {
        // await gaugeController.setContractHash(address);
        let nextWeek = nextPeriod(args.time, WEEK);
        let newData = new GaugeWeight({
          id: gauge.id + "-" + nextWeek.toString(),
          gauge: gauge.id,
          time: nextWeek,
          weight: args.weight,
        // weight: '1000000000'
        });
        await GaugeWeight.create([newData],{session});

        let data = new GaugeTotalWeight({
          id: nextWeek.toString(),
          time: nextWeek,
          weight : bigDecimal.round(
            // parseFloat(gaugeController.points_total(nextWeek)),
            '1000000000',
            parseFloat(GAUGE_TOTAL_WEIGHT_PRECISION)), //issue fixed
          // weight: '1000000000'
        });
        await GaugeTotalWeight.create([data],{session});
      }
        let response = await Response.findOne({ id: "1" });
        if (response === null) {
          // create new response
          response = new Response({
            id: "1",
            result: true,
          });
          await response.save({session});
        }

        //committing the transaction 
        await session.commitTransaction();

        // Ending the session
        session.endSession();
        return response;
      
    } catch (error) {
      // Rollback any changes made in the database
      await session.abortTransaction();

      throw new Error(error);
    }
  },
};

const handleNewTypeWeight = {
  type: responseType,
  description: "Handle NewTypeWeight",
  args: {
    id: { type: GraphQLString },
    time: { type: GraphQLString },
    weight: { type: GraphQLString },
    type_id: { type: GraphQLString },
    total_weight: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    const session = await mongoose.startSession();
    //starting the transaction
    session.startTransaction();

    try {
          let gaugeType = await GaugeType.findOne({ id: (args.type_id.toString()) });
          //let gaugeType = '1000000000';
          if (gaugeType !== null) {
            let d = new GaugeTypeWeight({
              id: gaugeType.id + "-" + args.time.toString(),
              type: gaugeType.id,
              time: args.time,
              weight: new bigdecimal.BigDecimal(args.weight),
             //weight:"1000000000"
            });
            await GaugeTypeWeight.create([d],{session});

            let data = new GaugeTotalWeight({
              id: gaugeType.id + "-" + args.time.toString(),
              time: args.time,
              weight : bigDecimal.round(
                args.total_weight,
                parseFloat(GAUGE_TOTAL_WEIGHT_PRECISION)), //issue fixed
            //weight: "1000000000"
            });
            await GaugeTotalWeight.create([data], {session});
          }
            let response = await Response.findOne({ id: "1" });
            if (response == null) {
              // create new response
              response = new Response({
                id: "1",
                result: true,
              });
              await response.save({session});
            }

              //committing the transaction 
              await session.commitTransaction();

              // Ending the session
              session.endSession();

            return response;
          
          
      }  
      catch (error) {
        // Rollback any changes made in the database
      await session.abortTransaction();

        throw new Error(error);
      }
  },
};

const handleVoteForGauge = {
  type: responseType,
  description: "Handle VoteForGauge",
  args: {
    id: { type: GraphQLString },
    time: { type: GraphQLString },
    weight: { type: GraphQLString },
    gauge_addr: { type: GraphQLString },
    user: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    const session = await mongoose.startSession();
    //starting the transaction
    session.startTransaction();
    
    try {
      //We get contract hash for gauge controller package hash below
      // const contractData = await allcontractsData.findOne({packageHash : process.env.GAUGE_CONTROLLER_PACKAGE_HASH});

      let gauge = await Gauge.findOne({ id: args.gauge_addr });
      //let gauge = '1000000000';
      if (gauge !== null) {
        // await gaugeController.setContractHash(address);
        let nextWeek = nextPeriod(args.time, WEEK);

        let gaugeWeight = new GaugeWeight({
          id: gauge.id + "-" + nextWeek.toString(),
          gauge: gauge.id,
          time: nextWeek,
          // weight: new bigdecimal.BigDecimal(
          //   gaugeController.points_weight(args.gauge_addr, nextWeek).value0
          // ),
          weight: "1000000000"
        });
        await GaugeWeight.create([gaugeWeight],{ session });

        let gaugeTotalWeight = new GaugeTotalWeight({
          id: nextWeek.toString(),
          time: nextWeek,
          weight : bigDecimal.round(
            // parseFloat(gaugeController.points_total(nextWeek)),
            '1000000000',
            parseFloat(GAUGE_TOTAL_WEIGHT_PRECISION)), //issue fixed
          // weight: "1000000000"
        });
        await GaugeTotalWeight.create([gaugeTotalWeight],{ session });

        let user = await getOrRegisterAccount(args.user, session);

        let gaugeWeightVote = new GaugeWeightVote({
          id: gauge.id + "-" + user.id + "-" + args.time.toString(),
          gauge: gauge.id,
          user: user.id,
          time: args.time,
          weight: new bigdecimal.BigDecimal(args.weight),
        //weight:"1000000000"
        });
        await GaugeWeightVote.create([gaugeWeightVote], {session});
      }
        let response = await Response.findOne({ id: "1" });
        if (response === null) {
          // create new response
          response = new Response({
            id: "1",
            result: true,
          });
          await response.save({session});
        }

         //committing the transaction 
         await session.commitTransaction();

         // Ending the session
         session.endSession();

        return response;
      
    } catch (error) {
      // Rollback any changes made in the database
      await session.abortTransaction();
      
      throw new Error(error);
    }
  },
};

function nextPeriod(timestamp, period) {
  console.log(timestamp);
  console.log(period);
  let nextPeriod = (new bigdecimal.BigDecimal(timestamp)).add(new bigdecimal.BigDecimal(period));
  return (nextPeriod.divide((new bigdecimal.BigDecimal(period)))).multiply(new bigdecimal.BigDecimal(period));
  
}

module.exports = {
  handleAddType,
  handleNewGauge,
  handleNewGaugeWeight,
  handleNewTypeWeight,
  handleVoteForGauge,
};
