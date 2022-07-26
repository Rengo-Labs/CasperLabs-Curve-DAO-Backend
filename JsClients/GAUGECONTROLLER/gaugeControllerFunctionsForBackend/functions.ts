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

// export const getAdmin = async (contractHash:string) => {
  
//   // We don't need hash- prefix so i'm removing it
//   await gaugeController.setContractHash(contractHash);

//   //admin
//   const admin = await gaugeController.admin();
//   console.log(contractHash +` =... Contract admin: ${admin}`);

//   return admin;
  
// };

// export const getFutureAdmin = async (contractHash:string) => {
  
//   // We don't need hash- prefix so i'm removing it
//   await gaugeController.setContractHash(contractHash);

//   //future admin
//   const futureAdmin = await gaugeController.future_admin();
//   console.log(contractHash +` =... Contract future admin: ${futureAdmin}`);

//   return futureAdmin;
  
// };

// export const getnGaugeTypes = async (contractHash:string) => {
  
//   // We don't need hash- prefix so i'm removing it
//   await gaugeController.setContractHash(contractHash);

//   //decimal
//   const nGaugeTypes = await gaugeController.n_gauge_types();
//   console.log(contractHash +" =... Contract n gauge types: ", nGaugeTypes);

//   return nGaugeTypes;
  
// };

// export const getToken = async (contractHash:string) => {
  
//   // We don't need hash- prefix so i'm removing it
//   await gaugeController.setContractHash(contractHash);

//    //totalsupply
//    let token = await gaugeController.token();
//    console.log(contractHash +` = ... Token: ${token}`);

//   return token;
  
// };

// export const getGaugeTypes = async (contractHash:string, key:string) => {
  
//   console.log(`... Contract Hash: ${contractHash}`);

//   // We don't need hash- prefix so i'm removing it
//   await gaugeController.setContractHash(contractHash);

//  //balanceof
//   let gauge_types_ = await gaugeController.gauge_types_(key);

//   console.log(`... Balance: ${gauge_types_}`);

//   return gauge_types_;

// };

// export const getVoteUserSlopes = async (contractHash:string, ownerkey:string, spenderkey:string) => {
  
//   console.log(`... Contract Hash: ${contractHash}`);

//   // We don't need hash- prefix so i'm removing it
//   await gaugeController.setContractHash(contractHash);

//   let voteUserSlope = await gaugeController.vote_user_slopes(ownerkey,spenderkey);

//   console.log(`... Vote user slope : ${voteUserSlope}`);

//   return voteUserSlope;

// };
