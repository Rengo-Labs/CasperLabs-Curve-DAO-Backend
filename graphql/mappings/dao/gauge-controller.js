const Gauge = require("../../../models/gauge");
const GaugeTotalWeight = require("../../../models/gaugeTotalWeight");
const GaugeType = require("../../../models/guageType");
const GaugeTypeWeight = require("../../../models/gaugeTypeWeight");
const GaugeWeight = require("../../../models/gaugeWeight");
const GaugeWeightVote = require("../../../models/gaugeWeightVote");
const Pool = require("../../../models/pool");
const allcontractsData = require("../../../models/allcontractsData");
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
// let LpToken= require('../JsClients/Registry/test/installed.ts');

const { GAUGE_TOTAL_WEIGHT_PRECISION } = require("../../constants");
var bigdecimal = require("bigdecimal");
var halfUp = bigdecimal.RoundingMode.HALF_UP();
const GaugeVote = require("../../../models/gaugeVote");
const votingEscrow = require("../../../JsClients/VOTINGESCROW/votingEscrowFunctionsForBackend/functions");
const eventsData = require("../../../models/eventsData");

let WEEK = "604800";

const transactionOptions = {
  readPreference: "primary",
  readConcern: { level: "local" },
  writeConcern: { w: "majority" },
};

const handleAddType = {
  type: responseType,
  description: "Handle PoolAddType",
  args: {
    id: { type: GraphQLString },
    type_id: { type: GraphQLString },
    timestamp: { type: GraphQLString },
    name: {type: GraphQLString},
    blockNumber: {type: GraphQLString},
    eventObjectId : { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    try {
      // updating mutation status
      let eventDataResult = await eventsData.findOne({
        _id: args.eventObjectId,
      });
      eventDataResult.status = "completed";

      let response = await Response.findOne({ id: "1" });
      if (response === null) {
        // create new response
        response = new Response({
          id: "1",
        });
        response.result = true;
      }
    
      const contractData = await allcontractsData.findOne({packageHash : process.env.GAUGE_CONTROLLER_PACKAGE_HASH});

      let nextWeek = nextPeriod(args.timestamp, WEEK);
      nextWeek = Math.floor(nextWeek);
      
      console.log("args-name", args);

      let gaugeType = await registerGaugeType(args.type_id, args.name);

      let gaugeControllerPointsTypeWeight = await gaugeController.points_type_weight_block(contractData.contractHash, args.type_id, nextWeek.toString(),parseFloat(args.blockNumber));

      let newData = new GaugeTypeWeight({
        id: nextWeek.toString(),
        type: gaugeType.id,
        time: nextWeek.toString(),
        //weight: '1000000000',
        weight: gaugeControllerPointsTypeWeight
      });

      let gaugeControllerPointsTotal = await gaugeController.points_total_block(contractData.contractHash, nextWeek.toString(),parseFloat(args.blockNumber));

      let data = new GaugeTotalWeight({
        id: nextWeek.toString(),
        time: nextWeek.toString(),
        weight : bigDecimal.round(
          parseFloat(gaugeControllerPointsTotal),
          // '1000000000',
          parseFloat(GAUGE_TOTAL_WEIGHT_PRECISION)), //issue fixed
      });

      let state = await getSystemState(args);
      state.gaugeTypeCount = ((new bigdecimal.BigDecimal(state.gaugeTypeCount)).add(new bigdecimal.BigDecimal('1'))).toString();
      
      const session = await mongoose.startSession();
      try{
        await session.withTransaction(async () => {
          await GaugeType.create([gaugeType], {session});
          await GaugeTypeWeight.create([newData],{session});
          await GaugeTotalWeight.create([data], {session});
          await state.save({session});
          await eventDataResult.save({ session });
          await response.save({ session });
        }, transactionOptions);
        return response;
      }catch(error){
        throw new Error(error);
      }finally{

      // Ending the session
      await session.endSession();
      }
     
    }catch (error) {
      throw new Error(error);
    }
  },
};

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
    eventObjectId : { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    try {
      
      // updating mutation status
      let eventDataResult = await eventsData.findOne({
        _id: args.eventObjectId,
      });
      eventDataResult.status = "completed";

      let response = await Response.findOne({ id: "1" });
      if (response === null) {
        // create new response
        response = new Response({
          id: "1",
        });
        response.result = true;
      }

      const contractData = await allcontractsData.findOne({packageHash : process.env.GAUGE_CONTROLLER_PACKAGE_HASH});

      let nextWeek = nextPeriod(args.timestamp, WEEK);
      nextWeek = Math.floor(nextWeek);
      let gaugeType = await getGaugeType((args.gaugeType).toString());

      let gaugeControllerGaugeTypeNames= await gaugeController.gauge_type_names_block(contractData.contractHash ,args.gaugeType,parseFloat(args.blockNumber));

      if (gaugeType === null) {
        gaugeType = await registerGaugeType(
          (args.gaugeType).toString(),
          gaugeControllerGaugeTypeNames,
          //'1000000000',
        );
      }

      gaugeType.gaugeCount = ((new bigdecimal.BigDecimal(gaugeType.gaugeCount)).add(new bigdecimal.BigDecimal('1'))).toString();
      //gaugeType.gaugeCount = '1000000000';

      let gauge = new Gauge({
        id: args.addr,
        address: args.addr,
        type: gaugeType.id,
        created: args.timestamp,
        createdAtBlock: args.blockNumber,
        createdAtTransaction: args.transactionHash,
      });

      console.log(gauge);

      // // await lpToken.setContractHash(args.addr).try_lp_token();
      // let lpToken = "1000000000";
      // let token;
      // if (lpToken !== null) {
      //   //let token = await getOrCreateLpToken(lpToken.value);
        
      //   token = await getOrCreateLpToken('1000000000');
      //   token.gauge = gauge.id;

      //   if (token.pool != null) {
      //     let pool = await Pool.findOne(token.pool);
      //     gauge.pool = pool.id;
      //   }
      // }

      let data = new GaugeWeight({
        id: gauge.id + "-" + nextWeek.toString(),
        gauge: gauge.id,
        time: nextWeek,
        weight: (new bigdecimal.BigDecimal(args.weight)).toString(),
        //weight: '1000000000'
      });

      let gaugeControllerPointsTotal= await gaugeController.points_total_block(contractData.contractHash, nextWeek.toString(),parseFloat(args.blockNumber));

      let dataWeight = new GaugeTotalWeight({
        id: nextWeek.toString(),
        time: nextWeek.toString(),
        weight : bigDecimal.round(
          parseFloat(gaugeControllerPointsTotal),
          //'1000000000',
          parseFloat(GAUGE_TOTAL_WEIGHT_PRECISION)), //issue fixed 
        // weight: '1000000000'
      });

      let state = await getSystemState(args);
      state.gaugeCount = ((new bigdecimal.BigDecimal(state.gaugeCount)).add(new bigdecimal.BigDecimal('1'))).toString();
      //state.gaugeCount = '1000000000'

      const session = await mongoose.startSession();
      try{
        await session.withTransaction(async () => {
          await gaugeType.save({session});
          await gauge.save({session});
          // await token.save({session});
          await GaugeWeight.create([data], {session});
          await GaugeTotalWeight.create([dataWeight], {session});
          await state.save({session});
          await eventDataResult.save({ session });
          await response.save({ session });
        }, transactionOptions);
        return response;
      }catch(error){
        throw new Error(error);
      }finally {
        // Ending the session
        await session.endSession();
      }
    }catch (error) {
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
    blockNumber: { type: GraphQLString },
    eventObjectId : { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    try {
      // updating mutation status
      let eventDataResult = await eventsData.findOne({
        _id: args.eventObjectId,
      });
      eventDataResult.status = "completed";

      let response = await Response.findOne({ id: "1" });
      if (response === null) {
        // create new response
        response = new Response({
          id: "1",
        });
        response.result = true;
      }
    
      const contractData = await allcontractsData.findOne({packageHash : process.env.GAUGE_CONTROLLER_PACKAGE_HASH});

      let gauge = await Gauge.findOne({ id: args.gauge_address });
      //let gauge = '1000000000';
      let data, newData;
      if (gauge != null) {
        let nextWeek = nextPeriod(args.time, WEEK);
        newData = new GaugeWeight({
          id: gauge.id + "-" + nextWeek.toString(),
          gauge: gauge.id,
          time: nextWeek,
          weight: args.weight,
        // weight: '1000000000'
        });

        let gaugeControllerPointsTotal= await gaugeController.points_total_block(contractData.contractHash, nextWeek,parseFloat(args.blockNumber));

        data = new GaugeTotalWeight({
          id: nextWeek.toString(),
          time: nextWeek,
          weight : bigDecimal.round(
            parseFloat(gaugeControllerPointsTotal),
            //'1000000000',
            parseFloat(GAUGE_TOTAL_WEIGHT_PRECISION)), //issue fixed
          // weight: '1000000000'
        });
      }

      const session = await mongoose.startSession();
      try{
        await session.withTransaction(async () => {
          if(gauge != null){
            await GaugeWeight.create([newData],{session});
            await GaugeTotalWeight.create([data],{session});
          }
          await eventDataResult.save({ session });
          await response.save({ session });
        }, transactionOptions);
  
        return response;
      }catch(error){
        throw new Error(error);
      } finally {
      // Ending the session
      await session.endSession();
    }
    }catch (error) {
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
    eventObjectId : { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    try {
      
        // updating mutation status
        let eventDataResult = await eventsData.findOne({
          _id: args.eventObjectId,
        });
        eventDataResult.status = "completed";

        let response = await Response.findOne({ id: "1" });
        if (response === null) {
          // create new response
          response = new Response({
            id: "1",
          });
          response.result = true;
        }
    
        let gaugeType = await GaugeType.findOne({ id: (args.type_id.toString()) });
        //let gaugeType = '1000000000';
        let gaugeTypeWeight, gaugeTotalWeight;

        if (gaugeType !== null) {
          gaugeTypeWeight = new GaugeTypeWeight({
            id: gaugeType.id + "-" + args.time.toString(),
            type: gaugeType.id,
            time: args.time,
            weight: new bigdecimal.BigDecimal(args.weight),
            //weight:"1000000000"
          });

          gaugeTotalWeight = new GaugeTotalWeight({
            id: gaugeType.id + "-" + args.time.toString(),
            time: args.time,
            weight : bigDecimal.round(
              args.total_weight,
              parseFloat(GAUGE_TOTAL_WEIGHT_PRECISION)), //issue fixed
          //weight: "1000000000"
          });
        }
        
        const session = await mongoose.startSession();
        try{
          await session.withTransaction(async () => {
            
            if(gaugeType !== null){
              await GaugeTypeWeight.create([gaugeTypeWeight],{session});
              await GaugeTotalWeight.create([gaugeTotalWeight], {session});
            }
            await eventDataResult.save({ session });
            await response.save({ session });
          }, transactionOptions);
        }catch(error){
          
          throw new Error(error);
        }finally{
          // Ending the session
          await session.endSession();
        }
       
  
        return response;
      }
      catch (error) {
        
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
    blockNumber: {type: GraphQLString},
    eventObjectId : { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    try {
      // updating mutation status
      let eventDataResult = await eventsData.findOne({
        _id: args.eventObjectId,
      });
      eventDataResult.status = "completed";

      let response = await Response.findOne({ id: "1" });
      if (response === null) {
        // create new response
        response = new Response({
          id: "1",
        });
        response.result = true;
      }
      
      let contractData = await allcontractsData.findOne({packageHash : process.env.GAUGE_CONTROLLER_PACKAGE_HASH});

      let gauge = await Gauge.findOne({ id: args.gauge_addr });
      //let gauge = '1000000000';
      console.log("gauge: ",gauge);

      let gaugeWeight, gaugeTotalWeight, user, gaugeWeightVote, gaugeVote;

      if (gauge !== null) {
        let nextWeek = nextPeriod(args.time, WEEK);

        let gaugeControllerPointsWeight= (await gaugeController.points_weight_block(contractData.contractHash, args.gauge_addr, nextWeek,parseFloat(args.blockNumber))).value0;

        gaugeWeight = new GaugeWeight({
          id: gauge.id + "-" + nextWeek.toString(),
          gauge: gauge.id,
          time: nextWeek,
          weight: new bigdecimal.BigDecimal(gaugeControllerPointsWeight),
          //weight: "1000000000"
        });
        console.log("gaugeWeight: ",gaugeWeight);

        let gaugeControllerPointsTotal= await gaugeController.points_total_block(contractData.contractHash,nextWeek,parseFloat(args.blockNumber));

        gaugeTotalWeight = new GaugeTotalWeight({
          id: nextWeek.toString(),
          time: nextWeek,
          weight : bigDecimal.round(
            parseFloat(gaugeControllerPointsTotal),
            //'1000000000',
            parseFloat(GAUGE_TOTAL_WEIGHT_PRECISION)), //issue fixed
          // weight: "1000000000"
        });
        console.log("gaugeTotalWeight: ",gaugeTotalWeight);

        user = await getOrRegisterAccount(args.user);

        gaugeWeightVote = new GaugeWeightVote({
          id: gauge.id + "-" + user.id + "-" + args.time.toString(),
          gauge: gauge.id,
          user: user.id,
          time: args.time,
          weight: new bigdecimal.BigDecimal(args.weight),
          //weight:"1000000000"
        });
        console.log("gaugeWeightVote: ",gaugeWeightVote);

        
        contractData = await allcontractsData.findOne({packageHash : process.env.VOTING_ESCROW_PACKAGE_HASH});
        
        let veCRV = await votingEscrow.balanceOfBlock(contractData.contractHash, user.id,null,parseFloat(args.blockNumber));
        let totalveCRV = await votingEscrow.totalSupplyBlock(contractData.contractHash,null,parseFloat(args.blockNumber));

        // suppossed values
        //let veCRV = '1000';
        //let totalveCRV = '10000';

        gaugeVote = new GaugeVote({
          id: gauge.id + "-" + user.id + "-" + args.time.toString(),
          gauge: gauge.id,
          user: user.id,
          time: args.time,
          weight: new bigdecimal.BigDecimal(args.weight),
          total_weight : gaugeTotalWeight.weight,
          veCRV : veCRV,
          totalveCRV : totalveCRV,
          gaugeWeights : [gaugeWeight._id]
        });
        console.log("gaugeVote: ",gaugeVote);
      }

      const session = await mongoose.startSession();
      try{
        await session.withTransaction(async () => {
          if(gauge !== null){
            await GaugeWeight.create([gaugeWeight],{ session });
            await GaugeTotalWeight.create([gaugeTotalWeight],{ session });
            await user.save({session});
            await GaugeWeightVote.create([gaugeWeightVote], {session});
            await GaugeVote.create(gaugeVote);
          }
          await eventDataResult.save({ session });
          await response.save({ session });
        }, transactionOptions);
  
        return response;
      }catch(error){
        throw new Error(error);
      }finally {
      // Ending the session
      await session.endSession();
    }
     
    }catch (error) {
      throw new Error(error);
    } 
  },
};

function nextPeriod(timestamp, period) {
  console.log(timestamp);
  console.log(period);
  let nextPeriod = (new bigdecimal.BigDecimal(timestamp)).add(new bigdecimal.BigDecimal(period));
  return nextPeriod.divide(new bigdecimal.BigDecimal(period), 10, halfUp).multiply(new bigdecimal.BigDecimal(period));
}

module.exports = {
  handleAddType,
  handleNewGauge,
  handleNewGaugeWeight,
  handleNewTypeWeight,
  handleVoteForGauge,
};
