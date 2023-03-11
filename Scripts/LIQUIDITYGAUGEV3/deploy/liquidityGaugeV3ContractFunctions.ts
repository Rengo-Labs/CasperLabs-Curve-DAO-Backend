import { config } from "dotenv";
config();
import { LIQUIDITYGAUGEV3Client ,utils} from "../../../JsClients/LIQUIDITYGAUGEV3/src";
import { sleep, getDeploy } from "./utils";

import {
  CLValueBuilder,
  Keys,
  CLPublicKey,
  CLAccountHash,
  CLPublicKeyType,
  Contracts,
  CLByteArray
} from "casper-js-sdk";


const {
  NODE_ADDRESS,
  EVENT_STREAM_ADDRESS,
  CHAIN_NAME,
  
  LIQUIDITY_GAUGE_V3_MASTER_KEY_PAIR_PATH,
  LIQUIDITY_GAUGE_V3_PAYMENT_AMOUNT,
  LIQUIDITY_GAUGE_V3_ADDRESS,
  LIQUIDITY_GAUGE_V3_VALUE,
  LIQUIDITY_GAUGE_V3_CONTRACT_HASH,
  LIQUIDITY_GAUGE_V3_TOKEN,
  LIQUIDITY_GAUGE_V3_RECEIVER,
  LIQUIDITY_GAUGE_V3_TO,
  LIQUIDITY_GAUGE_V3_FROM,
  LIQUIDITY_GAUGE_V3_SPENDER,
  LIQUIDITY_GAUGE_V3_AMOUNT,
  LIQUIDITY_GAUGE_V3_REWARD_CONTRACT,
  LIQUIDITY_GAUGE_V3_CLAIM_SIG,
  LIQUIDITY_GAUGE_V3_OWNER,
} = process.env;


const KEYS = Keys.Ed25519.parseKeyFiles(
  `${LIQUIDITY_GAUGE_V3_MASTER_KEY_PAIR_PATH}/public_key.pem`,
  `${LIQUIDITY_GAUGE_V3_MASTER_KEY_PAIR_PATH}/secret_key.pem`
);

// const ROUTERKEYS = Keys.Ed25519.parseKeyFiles(
//   `${MASTER_KEY_PAIR_PATH}/public_key.pem`,
//   `${MASTER_KEY_PAIR_PATH}/secret_key.pem`
// );

function splitdata(data:string)
{
    var temp=data.split('(');
    var result=temp[1].split(')');
    return result[0];
}

const liquidityGaugeV3 = new LIQUIDITYGAUGEV3Client(
  NODE_ADDRESS!,
  CHAIN_NAME!,
  EVENT_STREAM_ADDRESS!
);

const test = async () => {

  await liquidityGaugeV3.setContractHash(LIQUIDITY_GAUGE_V3_CONTRACT_HASH!);

 // // //decimals
 const decimals = await liquidityGaugeV3.decimals();
 console.log(`... Contract decimals: ${decimals}`);

 // // //integrate_checkpoint
 const integrateCheckpoint = await liquidityGaugeV3.integrateCheckpoint();
 console.log(`... Contract integrateCheckpoint: ${integrateCheckpoint}`);

  //  // // //minter
 const minter = await liquidityGaugeV3.minter();
 console.log(`... minter: ${minter}`);

  //  // // //crvToken
  const crvToken = await liquidityGaugeV3.crvToken();
  console.log(`... crvToken: ${crvToken}`);

  //  // // //lpToken
 const lpToken = await liquidityGaugeV3.lpToken();
 console.log(`... lpToken: ${lpToken}`);

  //  // // //controller
  const controller = await liquidityGaugeV3.controller();
  console.log(`... controller: ${controller}`);

  //  // // //votingEscrow
 const votingEscrow = await liquidityGaugeV3.votingEscrow();
 console.log(`... votingEscrow: ${votingEscrow}`);

 //  // // //futureEpochTime
 const futureEpochTime = await liquidityGaugeV3.futureEpochTime();
 console.log(`... futureEpochTime: ${futureEpochTime}`);

  //  // // //balanceOf
  const balanceOf = await liquidityGaugeV3.balanceOf(LIQUIDITY_GAUGE_V3_OWNER!);
  console.log(`... balanceOf: ${balanceOf}`);

  //  // // //totalSupply
 const totalSupply = await liquidityGaugeV3.totalSupply();
 console.log(`... totalSupply: ${totalSupply}`);

  //  // // //allowances
  const allowances = await liquidityGaugeV3.allowances(LIQUIDITY_GAUGE_V3_OWNER!,LIQUIDITY_GAUGE_V3_SPENDER!);
  console.log(`... allowances: ${allowances}`);

  //  // // //name
 const name = await liquidityGaugeV3.name();
 console.log(`... name: ${name}`);

  //  // // //symbol
 const symbol = await liquidityGaugeV3.symbol();
 console.log(`... symbol: ${symbol}`);

  //  // // //workingBalances
 const workingBalances = await liquidityGaugeV3.workingBalances(LIQUIDITY_GAUGE_V3_OWNER!);
 console.log(`... workingBalances: ${workingBalances}`);

  //  // // //workingSupply
  const workingSupply = await liquidityGaugeV3.workingSupply();
  console.log(`... workingSupply: ${workingSupply}`);

  //  // // //period
 const period = await liquidityGaugeV3.period();
 console.log(`... period: ${period}`);

  //  // // //periodTimestamp
 const periodTimestamp = await liquidityGaugeV3.periodTimestamp(LIQUIDITY_GAUGE_V3_OWNER!);
 console.log(`... periodTimestamp: ${periodTimestamp}`);

  //  // // //integrateInvSupply
 const integrateInvSupply = await liquidityGaugeV3.integrateInvSupply(LIQUIDITY_GAUGE_V3_OWNER!);
 console.log(`... integrateInvSupply: ${integrateInvSupply}`);

  //  // // //integrateInvSupplyOf
  const integrateInvSupplyOf = await liquidityGaugeV3.integrateInvSupplyOf(LIQUIDITY_GAUGE_V3_OWNER!);
  console.log(`... integrateInvSupplyOf: ${integrateInvSupplyOf}`);

  //  // // //integrateCheckpointOf
 const integrateCheckpointOf = await liquidityGaugeV3.integrateCheckpointOf(LIQUIDITY_GAUGE_V3_OWNER!);
 console.log(`... integrateCheckpointOf: ${integrateCheckpointOf}`);

  //  // // //integrateFraction
 const integrateFraction = await liquidityGaugeV3.integrateFraction(LIQUIDITY_GAUGE_V3_OWNER!);
 console.log(`... integrateFraction: ${integrateFraction}`);

  //  // // //inflationRate
  const inflationRate = await liquidityGaugeV3.inflationRate();
  console.log(`... inflationRate: ${inflationRate}`);
 
  //  // // //rewardTokens
  const rewardTokens = await liquidityGaugeV3.rewardTokens(LIQUIDITY_GAUGE_V3_OWNER!);
  console.log(`... rewardTokens: ${rewardTokens}`);
 
  //  // // //rewardsReceiver
  const rewardsReceiver = await liquidityGaugeV3.rewardsReceiver(LIQUIDITY_GAUGE_V3_OWNER!);
  console.log(`... rewardsReceiver: ${rewardsReceiver}`);
 
  //  // // //rewardIntegral
  const rewardIntegral = await liquidityGaugeV3.rewardIntegral(LIQUIDITY_GAUGE_V3_OWNER!);
  console.log(`... rewardIntegral: ${rewardIntegral}`);

  //  // // //rewardIntegralFor
  const rewardIntegralFor = await liquidityGaugeV3.rewardIntegralFor(LIQUIDITY_GAUGE_V3_OWNER!,LIQUIDITY_GAUGE_V3_SPENDER!);
  console.log(`... rewardIntegralFor: ${rewardIntegralFor}`);
 
  //  // // //admin
  const admin = await liquidityGaugeV3.admin();
  console.log(`... admin: ${admin}`);
 
  //  // // //futureAdmin
  const futureAdmin = await liquidityGaugeV3.futureAdmin();
  console.log(`... futureAdmin: ${futureAdmin}`);
 
   //  // // //isKilled
  const isKilled = await liquidityGaugeV3.isKilled();
  console.log(`... isKilled: ${isKilled}`);


 //setRewardsReceiver
 const setRewardsReceiverDeployHash = await liquidityGaugeV3.setRewardsReceiver(
  KEYS!,
  LIQUIDITY_GAUGE_V3_RECEIVER!,
  LIQUIDITY_GAUGE_V3_PAYMENT_AMOUNT!
 );
 console.log("... setRewardsReceiver deploy hash: ", setRewardsReceiverDeployHash);

 await getDeploy(NODE_ADDRESS!, setRewardsReceiverDeployHash);
 console.log("... setRewardsReceiver function called successfully.");

  //claimRewards
  const claimRewardsDeployHash = await liquidityGaugeV3.claimRewards(
    KEYS!,
    KEYS.publicKey,
    LIQUIDITY_GAUGE_V3_RECEIVER!,
    LIQUIDITY_GAUGE_V3_PAYMENT_AMOUNT!
   );
   console.log("... claimRewards deploy hash: ", claimRewardsDeployHash);
  
   await getDeploy(NODE_ADDRESS!, claimRewardsDeployHash);
   console.log("... claimRewards function called successfully.");

  //kick
 const kickDeployHash = await liquidityGaugeV3.kick(
  KEYS!,
  //LIQUIDITY_GAUGE_V3_ADDRESS!,
  KEYS.publicKey,
  LIQUIDITY_GAUGE_V3_PAYMENT_AMOUNT!
 );
 console.log("... kick deploy hash: ", kickDeployHash);

 await getDeploy(NODE_ADDRESS!, kickDeployHash);
 console.log("... kick function called successfully.");

 //deposit
 const depositDeployHash = await liquidityGaugeV3.deposit(
  KEYS!,
  LIQUIDITY_GAUGE_V3_VALUE!,
  //LIQUIDITY_GAUGE_V3_ADDRESS!,
  KEYS.publicKey,
  true,
  LIQUIDITY_GAUGE_V3_PAYMENT_AMOUNT!
 );
 console.log("... deposit deploy hash: ", depositDeployHash);

 await getDeploy(NODE_ADDRESS!, depositDeployHash);
 console.log("... deposit function called successfully.");

  //withdraw
 const withdrawDeployHash = await liquidityGaugeV3.withdraw(
  KEYS!,
  LIQUIDITY_GAUGE_V3_VALUE!,
  true,
  LIQUIDITY_GAUGE_V3_PAYMENT_AMOUNT!
 );
 console.log("... withdraw deploy hash: ", withdrawDeployHash);

 await getDeploy(NODE_ADDRESS!, withdrawDeployHash);
 console.log("... withdraw function called successfully.");

 //approve
 const approveDeployHash = await liquidityGaugeV3.approve(
  KEYS!,
  LIQUIDITY_GAUGE_V3_SPENDER!,
  LIQUIDITY_GAUGE_V3_AMOUNT!,
  LIQUIDITY_GAUGE_V3_PAYMENT_AMOUNT!
 );
 console.log("... approve deploy hash: ", approveDeployHash);

 await getDeploy(NODE_ADDRESS!, approveDeployHash);
 console.log("... approve function called successfully.");

 //increaseAllowance
 const increaseAllowanceDeployHash = await liquidityGaugeV3.increaseAllowance(
  KEYS!,
  LIQUIDITY_GAUGE_V3_SPENDER!,
  LIQUIDITY_GAUGE_V3_AMOUNT!,
  LIQUIDITY_GAUGE_V3_PAYMENT_AMOUNT!
 );
 console.log("... increaseAllowance deploy hash: ", increaseAllowanceDeployHash);

 await getDeploy(NODE_ADDRESS!, increaseAllowanceDeployHash);
 console.log("... increaseAllowance function called successfully.");

 //decreaseAllowance
 const decreaseAllowanceDeployHash = await liquidityGaugeV3.decreaseAllowance(
  KEYS!,
  LIQUIDITY_GAUGE_V3_SPENDER!,
  LIQUIDITY_GAUGE_V3_AMOUNT!,
  LIQUIDITY_GAUGE_V3_PAYMENT_AMOUNT!
 );
 console.log("... decreaseAllowance deploy hash: ", decreaseAllowanceDeployHash);

 await getDeploy(NODE_ADDRESS!, decreaseAllowanceDeployHash);
 console.log("... decreaseAllowance function called successfully.");

 //setRewards
 const setRewardsDeployHash = await liquidityGaugeV3.setRewards(
  KEYS!,
  LIQUIDITY_GAUGE_V3_REWARD_CONTRACT!,
  LIQUIDITY_GAUGE_V3_CLAIM_SIG!,
  [''],
  LIQUIDITY_GAUGE_V3_PAYMENT_AMOUNT!
 );
 console.log("... setRewards deploy hash: ", setRewardsDeployHash);

 await getDeploy(NODE_ADDRESS!, setRewardsDeployHash);
 console.log("... setRewards function called successfully.");

 //setKilled
 const setKilledDeployHash = await liquidityGaugeV3.setKilled(
  KEYS!,
  true,
  LIQUIDITY_GAUGE_V3_PAYMENT_AMOUNT!
 );
 console.log("... setKilled deploy hash: ", setKilledDeployHash);

 await getDeploy(NODE_ADDRESS!, setKilledDeployHash);
 console.log("... setKilled function called successfully.");

 //comitTransferOwnership
 const commitTransferOwnershipDeployHash = await liquidityGaugeV3.commitTransferOwnership(
  KEYS!,
  //LIQUIDITY_GAUGE_V3_ADDRESS!,
  KEYS.publicKey,
  LIQUIDITY_GAUGE_V3_PAYMENT_AMOUNT!
 );
 console.log("... commitTransferOwnership deploy hash: ", commitTransferOwnershipDeployHash);

 await getDeploy(NODE_ADDRESS!, commitTransferOwnershipDeployHash);
 console.log("... commitTransferOwnership function called successfully.");

  //acceptTransferOwnership
  const acceptTransferOwnershipDeployHash = await liquidityGaugeV3.acceptTransferOwnership(
    KEYS!,
    LIQUIDITY_GAUGE_V3_PAYMENT_AMOUNT!
  );
  console.log("... acceptTransferOwnership deploy hash: ", acceptTransferOwnershipDeployHash);

  await getDeploy(NODE_ADDRESS!, acceptTransferOwnershipDeployHash);
  console.log("... acceptTransferOwnershipOwnership function called successfully.");


};


test();
