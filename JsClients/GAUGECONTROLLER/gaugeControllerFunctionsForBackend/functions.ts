import { config } from "dotenv";
config();
import { GaugeControllerClient} from "../src";

const {
  NODE_ADDRESS,
  EVENT_STREAM_ADDRESS,
  CHAIN_NAME,
  GAUGE_CONTROLLER_CONTRACT
} = process.env;

const gaugeController = new GaugeControllerClient(
  NODE_ADDRESS!,
  CHAIN_NAME!,
  EVENT_STREAM_ADDRESS!,
);

export const points_type_weight = async (owner : string, spender : string) => {
 
  // We don't need hash- prefix so i'm removing it
 await gaugeController.setContractHash(GAUGE_CONTROLLER_CONTRACT!);

 //pointsTypeWeight
 const pointsTypeWeight = await gaugeController.points_type_weight(owner ,  spender);
 console.log(GAUGE_CONTROLLER_CONTRACT +` =... Points type weight: ${pointsTypeWeight}`);

 return pointsTypeWeight;
}

export const points_weight = async (owner : string, spender : string) => {
 
  // We don't need hash- prefix so i'm removing it
 await gaugeController.setContractHash(GAUGE_CONTROLLER_CONTRACT!);

 //pointsWeight
 const pointsWeight = await gaugeController.points_type_weight(owner ,  spender);
 console.log(GAUGE_CONTROLLER_CONTRACT +` =... Points type weight: ${pointsWeight}`);

 return pointsWeight;
}

export const points_total = async (owner : string) => {
  // We don't need hash- prefix so i'm removing it
  await gaugeController.setContractHash(GAUGE_CONTROLLER_CONTRACT!);

  //pointsTotal
  const pointsTotal = await gaugeController.points_total(owner);
  console.log(GAUGE_CONTROLLER_CONTRACT +` =... Points total: ${pointsTotal}`);
 
  return pointsTotal;
}

export const gauge_type_names = async (owner : string) => {
  // We don't need hash- prefix so i'm removing it
  await gaugeController.setContractHash(GAUGE_CONTROLLER_CONTRACT!);

  //gaugeTypeNames
  const gaugeTypeNames = await gaugeController.gauge_type_names(owner);
  console.log(GAUGE_CONTROLLER_CONTRACT +` =... Points total: ${gaugeTypeNames}`);
 
  return gaugeTypeNames;
}
