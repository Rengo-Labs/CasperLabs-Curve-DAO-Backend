import { config } from "dotenv";
config();
import { GaugeControllerClient} from "../src";
const { fetchBlockStateRootHashHelper } = require("../../../utils/casper");

const {
  NODE_ADDRESS,
  EVENT_STREAM_ADDRESS,
  CHAIN_NAME
} = process.env;

const gaugeController = new GaugeControllerClient(
  NODE_ADDRESS!,
  CHAIN_NAME!,
  EVENT_STREAM_ADDRESS!,
);

export const points_type_weight = async (contractHash : string ,owner : string, spender : string) => {
 
  // We don't need hash- prefix so i'm removing it
 await gaugeController.setContractHash(contractHash);

 //pointsTypeWeight
 const pointsTypeWeight = await gaugeController.points_type_weight(owner ,  spender);
 console.log(`... Points type weight: ${pointsTypeWeight}`);

 return pointsTypeWeight;
}

export const points_type_weight_block = async (contractHash : string ,owner : string, spender : string, blockNumber : Number) => {
 
 let blockData = await fetchBlockStateRootHashHelper(blockNumber);
 console.log("stateRootHash: ",blockData.block.header.state_root_hash);

  // We don't need hash- prefix so i'm removing it
 await gaugeController.setContractHash(contractHash);

 //pointsTypeWeight
 const pointsTypeWeight = await gaugeController.points_type_weight_block(owner ,  spender, blockData.block.header.state_root_hash);
 console.log(`... Points type weight: ${pointsTypeWeight}`);

 return pointsTypeWeight;
}

export const points_weight = async (contractHash : string ,owner : string, spender : string) => {
 
  // We don't need hash- prefix so i'm removing it
  await gaugeController.setContractHash(contractHash);

 //pointsWeight
 const pointsWeight = await gaugeController.points_weight(owner ,  spender);
 console.log(`... Points weight: ${pointsWeight}`);

 return pointsWeight;
}

export const points_weight_block = async (contractHash : string ,owner : string, spender : string, blockNumber : Number) => {
  
 let blockData = await fetchBlockStateRootHashHelper(blockNumber);
 console.log("stateRootHash: ",blockData.block.header.state_root_hash);

 // We don't need hash- prefix so i'm removing it
 await gaugeController.setContractHash(contractHash);

 //pointsWeight
 const pointsWeight = await gaugeController.points_weight_block(owner ,  spender, blockData.block.header.state_root_hash);
 console.log(`... Points weight: ${pointsWeight}`);

 return pointsWeight;
}

export const points_total = async (contractHash : string, owner : string) => {
  // We don't need hash- prefix so i'm removing it
  await gaugeController.setContractHash(contractHash);

  //pointsTotal
  const pointsTotal = await gaugeController.points_total(owner);
  console.log(`... Points total: ${pointsTotal}`);
 
  return pointsTotal;
}

export const points_total_block = async (contractHash : string, owner : string, blockNumber : Number) => {
  
  let blockData = await fetchBlockStateRootHashHelper(blockNumber);
  console.log("stateRootHash: ",blockData.block.header.state_root_hash);
  
  // We don't need hash- prefix so i'm removing it
  await gaugeController.setContractHash(contractHash);

  //pointsTotal
  const pointsTotal = await gaugeController.points_total_block(owner, blockData.block.header.state_root_hash);
  console.log(`... Points total: ${pointsTotal}`);
 
  return pointsTotal;
}

export const gauge_type_names = async (contractHash : string,owner : string) => {
  // We don't need hash- prefix so i'm removing it
  await gaugeController.setContractHash(contractHash);

  //gaugeTypeNames
  const gaugeTypeNames = await gaugeController.gauge_type_names(owner);
  console.log(`... Points total: ${gaugeTypeNames}`);
 
  return gaugeTypeNames;
}

export const gauge_type_names_block = async (contractHash : string,owner : string, blockNumber : Number) => {
   
  let blockData = await fetchBlockStateRootHashHelper(blockNumber);
  console.log("stateRootHash: ",blockData.block.header.state_root_hash);
  
  // We don't need hash- prefix so i'm removing it
  await gaugeController.setContractHash(contractHash);

  //gaugeTypeNames
  const gaugeTypeNames = await gaugeController.gauge_type_names_block(owner, blockData.block.header.state_root_hash);
  console.log(`... Points total: ${gaugeTypeNames}`);
 
  return gaugeTypeNames;
}

export const gauge_relative_weight = async (contractHash : string,addr : string, time : number) => {
  // We don't need hash- prefix so i'm removing it
  await gaugeController.setContractHash(contractHash);

  //gaugeTypeNames
  const gaugeRelativeWeight = await gaugeController.gaugeRelativeWeight(addr, time);
  console.log(`... gaugeRelativeWeight: ${gaugeRelativeWeight}`);
 
  return gaugeRelativeWeight;
}

export const get_gauge_weight = async (contractHash : string,addr : string) => {
  // We don't need hash- prefix so i'm removing it
  await gaugeController.setContractHash(contractHash);

  //gaugeTypeNames
  const gaugeWeight = await gaugeController.getGaugeWeight(addr);
  console.log(`... gaugeWeight: ${gaugeWeight}`);
 
  return gaugeWeight;
}

export const get_total_weight = async (contractHash : string) => {
  // We don't need hash- prefix so i'm removing it
  await gaugeController.setContractHash(contractHash);

  //gaugeTypeNames
  const guageTotalWeight = await gaugeController.getTotalWeight();
  console.log(`... guageTotalWeight: ${guageTotalWeight}`);
 
  return guageTotalWeight;
}

export const vote_user_slopes = async (contractHash : string, owner : string, spender : string) => {
  // We don't need hash- prefix so i'm removing it
  await gaugeController.setContractHash(contractHash);

  //gaugeTypeNames
  const voteUserSlopes = await gaugeController.vote_user_slopes(owner, spender);
  console.log(`... voteUserSlopes: ${voteUserSlopes}`);
 
  return voteUserSlopes;
}




