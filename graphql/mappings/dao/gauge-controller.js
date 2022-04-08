// import { BigInt } from '@graphprotocol/graph-ts'
// import { decimal, integer } from '@protofire/subgraph-toolkit'

// import {
//   GaugeController,
//   AddType,
//   NewGauge,
//   NewGaugeWeight,
//   NewTypeWeight,
//   VoteForGauge,
// } from '../../../generated/GaugeController/GaugeController'

// import { LiquidityGauge as GaugeContract } from '../../../generated/GaugeController/LiquidityGauge'

// import { LiquidityGauge } from '../../../generated/templates'

// import {
//   Gauge,
//   GaugeTotalWeight,
//   GaugeType,
//   GaugeTypeWeight,
//   GaugeWeight,
//   GaugeWeightVote,
//   Pool,
// } from '../../../generated/schema'

// import { getOrRegisterAccount } from '../../services/accounts'
// import { getGaugeType, registerGaugeType } from '../../services/gauge-types'
// import { getSystemState } from '../../services/system-state'
// import { getOrCreateLpToken } from '../../services/tokens'

// import { GAUGE_TOTAL_WEIGHT_PRECISION } from '../../constants'

// let WEEK = integer.fromNumber(604800)

// export function handleAddType(event: AddType): void {
//   let gaugeController = GaugeController.bind(event.address)

//   let nextWeek = nextPeriod(event.block.timestamp, WEEK)

//   // Add gauge type
//   let gaugeType = registerGaugeType(event.params.type_id.toString(), event.params.name)
//   gaugeType.save()

//   // Save gauge type weight
//   let typeWeight = new GaugeTypeWeight(nextWeek.toString())
//   typeWeight.type = gaugeType.id
//   typeWeight.time = nextWeek
//   typeWeight.weight = decimal.fromBigInt(gaugeController.points_type_weight(event.params.type_id, nextWeek))
//   typeWeight.save()

//   // Save total weight
//   let totalWeight = new GaugeTotalWeight(nextWeek.toString())
//   totalWeight.time = nextWeek
//   totalWeight.weight = decimal.fromBigInt(gaugeController.points_total(nextWeek), GAUGE_TOTAL_WEIGHT_PRECISION)
//   totalWeight.save()

//   // Count gauges types
//   let state = getSystemState(event)
//   state.gaugeTypeCount = integer.increment(state.gaugeTypeCount)
//   state.save()
// }

// export function handleNewGauge(event: NewGauge): void {
//   let gaugeController = GaugeController.bind(event.address)

//   let nextWeek = nextPeriod(event.block.timestamp, WEEK)

//   // Get or register gauge type
//   let gaugeType = getGaugeType(event.params.gauge_type.toString())

//   if (gaugeType == null) {
//     gaugeType = registerGaugeType(
//       event.params.gauge_type.toString(),
//       gaugeController.gauge_type_names(event.params.gauge_type),
//     )
//   }

//   gaugeType.gaugeCount = gaugeType.gaugeCount.plus(integer.ONE)
//   gaugeType.save()

//   // Add gauge instance
//   let gauge = new Gauge(event.params.addr.toHexString())
//   gauge.address = event.params.addr
//   gauge.type = gaugeType.id

//   gauge.created = event.block.timestamp
//   gauge.createdAtBlock = event.block.number
//   gauge.createdAtTransaction = event.transaction.hash

//   // Associate gauge to a pool via the LP token
//   let lpToken = GaugeContract.bind(event.params.addr).try_lp_token()

//   if (!lpToken.reverted) {
//     let token = getOrCreateLpToken(lpToken.value)
//     token.gauge = gauge.id
//     token.save()

//     if (token.pool != null) {
//       let pool = Pool.load(token.pool)!
//       gauge.pool = pool.id
//     }
//   }

//   gauge.save()

//   // Save gauge weight
//   let gaugeWeight = new GaugeWeight(gauge.id + '-' + nextWeek.toString())
//   gaugeWeight.gauge = gauge.id
//   gaugeWeight.time = nextWeek
//   gaugeWeight.weight = decimal.fromBigInt(event.params.weight)
//   gaugeWeight.save()

//   // Save total weight
//   let totalWeight = new GaugeTotalWeight(nextWeek.toString())
//   totalWeight.time = nextWeek
//   totalWeight.weight = decimal.fromBigInt(gaugeController.points_total(nextWeek), GAUGE_TOTAL_WEIGHT_PRECISION)
//   totalWeight.save()

//   // Update gauge counter
//   let state = getSystemState(event)
//   state.gaugeCount = integer.increment(state.gaugeCount)
//   state.save()

//   // Start indexing gauge events
//   LiquidityGauge.create(event.params.addr)
// }

// export function handleNewGaugeWeight(event: NewGaugeWeight): void {
//   let gauge = Gauge.load(event.params.gauge_address.toHexString())

//   if (gauge != null) {
//     let gaugeController = GaugeController.bind(event.address)

//     let nextWeek = nextPeriod(event.params.time, WEEK)

//     // Save gauge weight
//     let gaugeWeight = new GaugeWeight(gauge.id + '-' + nextWeek.toString())
//     gaugeWeight.gauge = gauge.id
//     gaugeWeight.time = nextWeek
//     gaugeWeight.weight = decimal.fromBigInt(event.params.weight)
//     gaugeWeight.save()

//     // Save total weight
//     let totalWeight = new GaugeTotalWeight(nextWeek.toString())
//     totalWeight.time = nextWeek
//     totalWeight.weight = decimal.fromBigInt(gaugeController.points_total(nextWeek), GAUGE_TOTAL_WEIGHT_PRECISION)
//     totalWeight.save()
//   }
// }

// export function handleNewTypeWeight(event: NewTypeWeight): void {
//   let gaugeType = GaugeType.load(event.params.type_id.toString())

//   if (gaugeType != null) {
//     let typeWeight = new GaugeTypeWeight(gaugeType.id + '-' + event.params.time.toString())
//     typeWeight.type = gaugeType.id
//     typeWeight.time = event.params.time
//     typeWeight.weight = decimal.fromBigInt(event.params.weight)
//     typeWeight.save()

//     let totalWeight = new GaugeTotalWeight(event.params.time.toString())
//     totalWeight.time = event.params.time
//     totalWeight.weight = decimal.fromBigInt(event.params.total_weight, GAUGE_TOTAL_WEIGHT_PRECISION)
//     totalWeight.save()
//   }
// }

// export function handleVoteForGauge(event: VoteForGauge): void {
//   let gauge = Gauge.load(event.params.gauge_addr.toHexString())

//   if (gauge != null) {
//     let gaugeController = GaugeController.bind(event.address)

//     let nextWeek = nextPeriod(event.params.time, WEEK)

//     // Save gauge weight
//     let gaugeWeight = new GaugeWeight(gauge.id + '-' + nextWeek.toString())
//     gaugeWeight.gauge = gauge.id
//     gaugeWeight.time = nextWeek
//     gaugeWeight.weight = decimal.fromBigInt(gaugeController.points_weight(event.params.gauge_addr, nextWeek).value0)
//     gaugeWeight.save()

//     // Save total weight
//     let totalWeight = new GaugeTotalWeight(nextWeek.toString())
//     totalWeight.time = nextWeek
//     totalWeight.weight = decimal.fromBigInt(gaugeController.points_total(nextWeek), GAUGE_TOTAL_WEIGHT_PRECISION)
//     totalWeight.save()

//     // Save user's gauge weight vote
//     let user = getOrRegisterAccount(event.params.user)

//     let vote = new GaugeWeightVote(gauge.id + '-' + user.id + '-' + event.params.time.toString())
//     vote.gauge = gauge.id
//     vote.user = user.id
//     vote.time = event.params.time
//     vote.weight = decimal.fromBigInt(event.params.weight)
//     vote.save()
//   }
// }

// function nextPeriod(timestamp: BigInt, period: BigInt): BigInt {
//   let nextPeriod = timestamp.plus(period)
//   return nextPeriod.div(period).times(period)
// }

const Gauge = require('../../../models/gauge');
const GaugeTotalWeight = require('../../../models/gaugeTotalWeight');
const GaugeType = require('../../../models/guageType');
const GaugeTypeWeight = require('../../../models/gaugeTypeWeight');
const GaugeWeight = require('../../../models/gaugeWeight');
const GaugeWeightVote = require('../../../models/gaugeWeightVote');
const Pool = require('../../../models/pool');
const {getOrRegisterAccount} = require('../../services/accounts');
const {getGaugeType, registerGaugeType} = require('../../services/gauge-types');
const { getSystemState } =  require('../../services/system-state');
const { getOrCreateLpToken } = require('../../services/token')
const Response = require('../../../models/response');
const { GraphQLString } = require("graphql");
// let gaugeController= require('../JsClients/Registry/test/installed.ts')
// let LpToken= require('../JsClients/Registry/test/installed.ts')

const { GAUGE_TOTAL_WEIGHT_PRECISION } = require ('../../constants');

let WEEK = 604800;

 const handleAddType = {

    type: responseType,
    description: "Handle PoolAddType",
    args: {
        id: { type: GraphQLString },
        type_id: { type: GraphQLString },
        timestamp: { type: GraphQLString },
    },
    async resolve(parent, args, context){
        try {
            // await gaugeController.setContractHash(address);
            let nextWeek = nextPeriod(args.timestamp, WEEK);

            let gaugeType = registerGaugeType(args.type_id, args.name);
            gaugeType.save();
            let newData  = new GaugeTypeWeight({
                id: nextWeek.toString(),
                type: id,
                time: nextWeek,
                weight: BigInt(gaugeController.points_type_weight(args.type_id, nextWeek))
            });
            await GaugeTypeWeight.create(newData);

            let data  = new GaugeTotalWeight({
                time: nextWeek,
                weight: BigInt(gaugeController.points_total(nextWeek), GAUGE_TOTAL_WEIGHT_PRECISION)
            });
            await GaugeTotalWeight.create(data);

            let state = getSystemState(args);
            state.gaugeTypeCount = state.gaugeTypeCount ++ ;
            state.save();

            let response = await Response.findOne({ id: "1" });
            if (response === null) {
                // create new response
                response = new Response({
                id: "1",
                result: true,
                });
                await response.save();
            }
            return response;
            
        } catch (error) {
            throw new Error(error);
        }
    }
    
}

const handleNewGauge = {
    type: responseType,
    description: "Handle PoolNewGauge",
    args: {
        gauge_type: { type: GraphQLString },
        timestamp: { type: GraphQLString },
        addr: { type: GraphQLString },
        BlockNumber: { type: GraphQLString },
        transactionHash: { type: GraphQLString },
        weight: { type: GraphQLString },

    },
    async resolve(parent,context,args){
        try {
            // await gaugeController.setContractHash(address);
            let nextWeek = nextPeriod(args.timestamp, WEEK);
            let gaugeType = getGaugeType(args.gauge_type.toString());

            if (gaugeType === null) {
                gaugeType = registerGaugeType(
                args.gauge_type.toString(),
                gaugeController.gauge_type_names(args.gauge_type),
                );
            }

            gaugeType.gaugeCount = gaugeType.gaugeCount ++;
            gaugeType.save();

            let newData  = new Gauge({
                address : args.addr,
                type:  gaugeType.id,
                created: args.timestamp,
                createdAtBlock : args.BlockNumber,
                createdAtTransaction : args.transactionHash
            });
            await Gauge.create(newData);

            // await lpToken.setContractHash(args.addr).try_lp_token();
            lpToken = '1000000000'

            if (lpToken !== null) {
                let token = getOrCreateLpToken(lpToken.value)
                token.gauge = gauge.id
                token.save()

                if (token.pool != null) {
                let pool = await Pool.findOne(token.pool);
                gauge.pool = pool.id;
                }
            }
            await  gauge.save();

            let data  = new GaugeWeight({
                id: gauge.id + '-' + nextWeek.toString(),
                gauge : gauge.id,
                time:  nextweek,
                weight: BigInt(args.weight)
            });
            await GaugeWeight.create(data);

            let dataWeight  = new GaugeTotalWeight({
                id: nextWeek.toString(),
                time:  nextweek,
                weight: BigInt(gaugeController.points_total(nextWeek), GAUGE_TOTAL_WEIGHT_PRECISION)
            });
            await GaugeTotalWeight.create(dataWeight);

            let state = getSystemState(args)
            state.gaugeCount = state.gaugeCount++
            await state.save();

            //LiquidityGauge.create(event.params.addr)

            let response = await Response.findOne({ id: "1" });
            if (response === null) {
                // create new response
                response = new Response({
                id: "1",
                result: true,
                });
                await response.save();
            }
            return response;
            
        } catch (error) {
            throw new Error(error);   
        }
    }
}

const handleNewGaugeWeight = {
    type: responseType,
    description: "Handle NewGaugeWeight",
    args: {
        id: { type: GraphQLString },
        time: { type: GraphQLString },
        weight: { type: GraphQLString },
        gauge_address: {type: GraphQLString}
    },
    async resolve(parent, args, context){
        try {
            let gauge = await Gauge.findOne({id: args.gauge_address});
            if(gauge !== null){
                 // await gaugeController.setContractHash(address);
                 let nextWeek = nextPeriod(args.time, WEEK);
                 let newData  = new GaugeWeight({
                    id: gauge.id + '-' + nextWeek.toString(),
                    gauge:  gauge.id,
                    time: nextWeek,
                    weight: BigInt(args.weight)
                });
                await GaugeWeight.create(newData);

                let data  = new GaugeTotalWeight({
                   id:  nextWeek.toString(),
                   time: nextWeek,
                   weight: BigInt(gaugeController.points_total(nextWeek), GAUGE_TOTAL_WEIGHT_PRECISION)
                });
                await GaugeTotalWeight.create(data);

                let response = await Response.findOne({ id: "1" });
                if (response === null) {
                    // create new response
                    response = new Response({
                    id: "1",
                    result: true,
                    });
                    await response.save();
                }
                return response;
                 
            }
        } catch (error) {
            throw new Error(error);  
        }
    }
}

const handleNewTypeWeight = {
    type: responseType,
    description: "Handle NewTypeWeight",
    args: {
        id: { type: GraphQLString },
        time: { type: GraphQLString },
        weight: { type: GraphQLString },
        type_id: {type: GraphQLString},
        total_weight : {type: GraphQLString}
    },
    async resolve(parent, args, context){
        try {
            let gaugeType  = await GaugeType.findOne({id: args.type_id});
            if(gaugeType !== null){
                 let newData  = new GaugeTypeWeight({
                    id: gaugeType.id + '-' + args.time.toString(),
                    type:  gaugeType.id,
                    time: args.time,
                    weight: BigInt(args.weight),
                });
                await GaugeTypeWeight.create(newData);

                let data  = new GaugeTotalWeight({
                   time: args.time,
                   weight: BigInt(args.total_weight, GAUGE_TOTAL_WEIGHT_PRECISION)
                });
                await GaugeTotalWeight.create(data);

                let response = await Response.findOne({ id: "1" });
                if (response === null) {
                    // create new response
                    response = new Response({
                    id: "1",
                    result: true,
                    });
                    await response.save();
                }
                return response;
                 
            }
        } catch (error) {
            throw new Error(error);  
        }
    }
}

const handleVoteForGauge = {
    type: responseType,
    description: "Handle VoteForGauge",
    args: {
        id: { type: GraphQLString },
        time: { type: GraphQLString },
        weight: { type: GraphQLString },
        gauge_addr: {type: GraphQLString},
        user : {type: GraphQLString}
    },
    async resolve(parent, args, context){
        try {
            let gauge  = await Gauge.findOne({id: args.gauge_addr});
            if(gauge !== null){
                // await gaugeController.setContractHash(address);
                let nextWeek = nextPeriod(args.time, WEEK);

                 let newData  = new GaugeWeight({
                    id: gauge.id + '-' + nextWeek.toString(),
                    gauge:  gauge.id,
                    time: nextWeek,
                    weight: BigInt(gaugeController.points_weight(args.gauge_addr, nextWeek).value0),
                });
                await GaugeWeight.create(newData);

                let data  = new GaugeTotalWeight({
                   time: nextWeek,
                   weight: BigInt(gaugeController.points_total(nextWeek), GAUGE_TOTAL_WEIGHT_PRECISION)
                });
                await GaugeTotalWeight.create(data);

                let user = getOrRegisterAccount(args.user);
             
                let voteData  = new GaugeWeightVote({
                    id: gauge.id + '-' + user.id + '-' + args.time.toString(),
                    gauge:  gauge.id,
                    user: user.id,
                    time: args.time,
                    weight: BigInt(args.weight),
                });
                await GaugeWeightVote.create(voteData);

                let response = await Response.findOne({ id: "1" });
                if (response === null) {
                    // create new response
                    response = new Response({
                    id: "1",
                    result: true,
                    });
                    await response.save();
                }
                return response;
                 
            }
        } catch (error) {
            throw new Error(error);  
        }
    }
}

function nextPeriod(timestamp, period) {
    let nextPeriod = timestamp+period;
    return (nextPeriod/period)*(period);
  }

  module.exports = {
    handleAddType,
    handleNewGauge,
    handleNewGaugeWeight,
    handleNewTypeWeight,
    handleVoteForGauge
  }; 