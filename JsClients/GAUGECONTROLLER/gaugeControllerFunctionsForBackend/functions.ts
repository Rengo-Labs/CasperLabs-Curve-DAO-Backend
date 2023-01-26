import { config } from "dotenv";
config();
import { GaugeControllerClient} from "../src";

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

export const points_weight = async (contractHash : string ,owner : string, spender : string) => {
 
  // We don't need hash- prefix so i'm removing it
  await gaugeController.setContractHash(contractHash);

 //pointsWeight
 const pointsWeight = await gaugeController.points_type_weight(owner ,  spender);
 console.log(`... Points type weight: ${pointsWeight}`);

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

export const gauge_type_names = async (contractHash : string,owner : string) => {
  // We don't need hash- prefix so i'm removing it
  await gaugeController.setContractHash(contractHash);

  //gaugeTypeNames
  const gaugeTypeNames = await gaugeController.gauge_type_names(owner);
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


