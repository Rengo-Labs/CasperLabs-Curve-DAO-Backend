import { config } from "dotenv";
config();
import { LIQUIDITYGAUGEREWARDClient ,utils} from "../../../JsClients/LIQUIDITYGAUGEREWARD/src";
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
  
  LIQUIDITY_GAUGE_REWARD_MASTER_KEY_PAIR_PATH,
  LIQUIDITY_GAUGE_REWARD_PAYMENT_AMOUNT,
  LIQUIDITY_GAUGE_REWARD_ADDRESS,
  LIQUIDITY_GAUGE_REWARD_VALUE,
  LIQUIDITY_GAUGE_REWARD_CONTRACT_HASH,
  LIQUIDITY_GAUGE_REWARD_CAN_DEPOSIT,
  LIQUIDITY_GAUGE_REWARD_OWNER,
  LIQUIDITY_GAUGE_REWARD_SPENDER,
} = process.env;


const KEYS = Keys.Ed25519.parseKeyFiles(
  `${LIQUIDITY_GAUGE_REWARD_MASTER_KEY_PAIR_PATH}/public_key.pem`,
  `${LIQUIDITY_GAUGE_REWARD_MASTER_KEY_PAIR_PATH}/secret_key.pem`
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

const liquidityGaugeReward = new LIQUIDITYGAUGEREWARDClient(
  NODE_ADDRESS!,
  CHAIN_NAME!,
  EVENT_STREAM_ADDRESS!
);

const test = async () => {

  await liquidityGaugeReward.setContractHash(LIQUIDITY_GAUGE_REWARD_CONTRACT_HASH!);


   //  // // //minter
 const minter = await liquidityGaugeReward.minter();
 console.log(`... minter: ${minter}`);

  //  // // //crvToken
  const crvToken = await liquidityGaugeReward.crvToken();
  console.log(`... crvToken: ${crvToken}`);

  //  // // //lpToken
 const lpToken = await liquidityGaugeReward.lpToken();
 console.log(`... lpToken: ${lpToken}`);

  //  // // //controller
  const controller = await liquidityGaugeReward.controller();
  console.log(`... controller: ${controller}`);

  //  // // //votingEscrow
 const votingEscrow = await liquidityGaugeReward.votingEscrow();
 console.log(`... votingEscrow: ${votingEscrow}`);

  //  // // //balanceOf
  const balanceOf = await liquidityGaugeReward.balanceOf(LIQUIDITY_GAUGE_REWARD_OWNER!);
  console.log(`... balanceOf: ${balanceOf}`);

  //  // // //totalSupply
 const totalSupply = await liquidityGaugeReward.totalSupply();
 console.log(`... totalSupply: ${totalSupply}`);

  //  // // //futureEpochTime
  const futureEpochTime = await liquidityGaugeReward.futureEpochTime();
  console.log(`... futureEpochTime: ${futureEpochTime}`);

  //  // // //approvedToDeposit
 const approvedToDeposit = await liquidityGaugeReward.approvedToDeposit(LIQUIDITY_GAUGE_REWARD_OWNER!,LIQUIDITY_GAUGE_REWARD_SPENDER!);
 console.log(`... approvedToDeposit: ${approvedToDeposit}`);

  //  // // //workingBalances
  const workingBalances = await liquidityGaugeReward.workingBalances(LIQUIDITY_GAUGE_REWARD_OWNER!);
  console.log(`... workingBalances: ${workingBalances}`);

  //  // // //workingSupply
 const workingSupply = await liquidityGaugeReward.workingSupply();
 console.log(`... workingSupply: ${workingSupply}`);

  //  // // //period
  const period = await liquidityGaugeReward.period();
  console.log(`... period: ${period}`);

    //  // // //periodTimestamp
 const periodTimestamp = await liquidityGaugeReward.periodTimestamp(LIQUIDITY_GAUGE_REWARD_OWNER!);
 console.log(`... periodTimestamp: ${periodTimestamp}`);

  //  // // //integrateInvSupply
  const integrateInvSupply = await liquidityGaugeReward.integrateInvSupply(LIQUIDITY_GAUGE_REWARD_OWNER!);
  console.log(`... integrateInvSupply: ${integrateInvSupply}`);

  //  // // //integrateInvSupplyOf
 const integrateInvSupplyOf = await liquidityGaugeReward.integrateInvSupplyOf(LIQUIDITY_GAUGE_REWARD_OWNER!);
 console.log(`... integrateInvSupplyOf: ${integrateInvSupplyOf}`);

  //  // // //integrateCheckpointOf
  const integrateCheckpointOf = await liquidityGaugeReward.integrateCheckpointOf(LIQUIDITY_GAUGE_REWARD_OWNER!);
  console.log(`... integrateCheckpointOf: ${integrateCheckpointOf}`);

      //  // // //integrateFraction
 const integrateFraction = await liquidityGaugeReward.integrateFraction(LIQUIDITY_GAUGE_REWARD_OWNER!);
 console.log(`... integrateFraction: ${integrateFraction}`);

  //  // // //inflationRate
  const inflationRate = await liquidityGaugeReward.inflationRate();
  console.log(`... inflationRate: ${inflationRate}`);

  //  // // //rewardContract
 const rewardContract = await liquidityGaugeReward.rewardContract();
 console.log(`... rewardContract: ${rewardContract}`);

  //  // // //rewardedToken
  const rewardedToken = await liquidityGaugeReward.rewardedToken();
  console.log(`... rewardedToken: ${rewardedToken}`);

        //  // // //rewardIntegral
 const rewardIntegral = await liquidityGaugeReward.rewardIntegral();
 console.log(`... rewardIntegral: ${rewardIntegral}`);

  //  // // //rewardIntegralFor
  const rewardIntegralFor = await liquidityGaugeReward.rewardIntegralFor(LIQUIDITY_GAUGE_REWARD_OWNER!);
  console.log(`... rewardIntegralFor: ${rewardIntegralFor}`);

  //  // // //rewardsFor
 const rewardsFor = await liquidityGaugeReward.rewardsFor(LIQUIDITY_GAUGE_REWARD_OWNER!);
 console.log(`... rewardsFor: ${rewardsFor}`);

  //  // // //claimedRewardsFor
  const claimedRewardsFor = await liquidityGaugeReward.claimedRewardsFor(LIQUIDITY_GAUGE_REWARD_OWNER!);
  console.log(`... claimedRewardsFor: ${claimedRewardsFor}`);

          //  // // //admin
 const admin = await liquidityGaugeReward.admin();
 console.log(`... admin: ${admin}`);

  //  // // //futureAdmin
  const futureAdmin = await liquidityGaugeReward.futureAdmin();
  console.log(`... futureAdmin: ${futureAdmin}`);

  //  // // //isKilled
 const isKilled = await liquidityGaugeReward.isKilled();
 console.log(`... isKilled: ${isKilled}`);

  //  // // //isClaimingRewards
  const isClaimingRewards = await liquidityGaugeReward.isClaimingRewards();
  console.log(`... isClaimingRewards: ${isClaimingRewards}`);





 //kick
 const kickDeployHash = await liquidityGaugeReward.kick(
  KEYS!,
  //LIQUIDITY_GAUGE_REWARD_ADDRESS!,
  KEYS.publicKey,
  LIQUIDITY_GAUGE_REWARD_PAYMENT_AMOUNT!
 );
 console.log("... kick deploy hash: ", kickDeployHash);

 await getDeploy(NODE_ADDRESS!, kickDeployHash);
 console.log("... kick function called successfully.");

 //setApproveDeposit
 const setApproveDepositDeployHash = await liquidityGaugeReward.setApproveDeposit(
  KEYS!,
  //LIQUIDITY_GAUGE_REWARD_ADDRESS!,
  KEYS.publicKey,
  //LIQUIDITY_GAUGE_REWARD_CAN_DEPOSIT!, //issue
  true,
  LIQUIDITY_GAUGE_REWARD_PAYMENT_AMOUNT!
 );
 console.log("... setApproveDeposit deploy hash: ", setApproveDepositDeployHash);

 await getDeploy(NODE_ADDRESS!, setApproveDepositDeployHash);
 console.log("... setApproveDeposit function called successfully.");

 //deposit
 const depositDeployHash = await liquidityGaugeReward.deposit(
  KEYS!,
  LIQUIDITY_GAUGE_REWARD_VALUE!,
  //LIQUIDITY_GAUGE_REWARD_ADDRESS!,
  KEYS.publicKey,
  LIQUIDITY_GAUGE_REWARD_PAYMENT_AMOUNT!
 );
 console.log("... deposit deploy hash: ", depositDeployHash);

 await getDeploy(NODE_ADDRESS!, depositDeployHash);
 console.log("... deposit function called successfully.");

 //withdraw
 const withdrawDeployHash = await liquidityGaugeReward.withdraw(
  KEYS!,
  LIQUIDITY_GAUGE_REWARD_VALUE!,
  true,
  LIQUIDITY_GAUGE_REWARD_PAYMENT_AMOUNT!
 );
 console.log("... withdraw deploy hash: ", withdrawDeployHash);

 await getDeploy(NODE_ADDRESS!, withdrawDeployHash);
 console.log("... withdraw function called successfully.");

 //claimRewards
 const claimRewardsDeployHash = await liquidityGaugeReward.claimRewards(
  KEYS!,
  //LIQUIDITY_GAUGE_REWARD_ADDRESS!,
  KEYS.publicKey,
  LIQUIDITY_GAUGE_REWARD_PAYMENT_AMOUNT!
 );
 console.log("... claimRewards deploy hash: ", claimRewardsDeployHash);

 await getDeploy(NODE_ADDRESS!, claimRewardsDeployHash);
 console.log("... claimRewards function called successfully.");

 //killMe
 const killMeDeployHash = await liquidityGaugeReward.killMe(
  KEYS!,
  LIQUIDITY_GAUGE_REWARD_PAYMENT_AMOUNT!
 );
 console.log("... killMe deploy hash: ", killMeDeployHash);

 await getDeploy(NODE_ADDRESS!, killMeDeployHash);
 console.log("... killMe function called successfully.");

 //comitTransferOwnership
 const commitTransferOwnershipDeployHash = await liquidityGaugeReward.commitTransferOwnership(
  KEYS!,
  //LIQUIDITY_GAUGE_REWARD_ADDRESS!,
  KEYS.publicKey,
  LIQUIDITY_GAUGE_REWARD_PAYMENT_AMOUNT!
 );
 console.log("... commitTransferOwnership deploy hash: ", commitTransferOwnershipDeployHash);

 await getDeploy(NODE_ADDRESS!, commitTransferOwnershipDeployHash);
 console.log("... commitTransferOwnership function called successfully.");

  //applyTransferOwnership
  const applyTransferOwnershipDeployHash = await liquidityGaugeReward.applyTransferOwnership(
    KEYS!,
    LIQUIDITY_GAUGE_REWARD_PAYMENT_AMOUNT!
  );
  console.log("...  deploy hash: ", applyTransferOwnershipDeployHash);

  await getDeploy(NODE_ADDRESS!, applyTransferOwnershipDeployHash);
  console.log("... applyTransferOwnership function called successfully.");

 //toggleExternalRewardsClaim
 const toggleExternalRewardsClaimDeployHash = await liquidityGaugeReward.toggleExternalRewardsClaim(
  KEYS!,
  true,
  LIQUIDITY_GAUGE_REWARD_PAYMENT_AMOUNT!
 );
 console.log("... toggleExternalRewardsClaim deploy hash: ", toggleExternalRewardsClaimDeployHash);

 await getDeploy(NODE_ADDRESS!, toggleExternalRewardsClaimDeployHash);
 console.log("... toggleExternalRewardsClaim function called successfully.");

  


};


test();
