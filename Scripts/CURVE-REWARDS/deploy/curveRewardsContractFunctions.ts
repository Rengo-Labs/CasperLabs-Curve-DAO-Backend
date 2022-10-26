import { config } from "dotenv";
config();
import { CURVEREWARDSClient ,utils} from "../../../JsClients/CURVE-REWARDS/src";
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
  
  CURVE_REWARDS_MASTER_KEY_PAIR_PATH,
  CURVE_REWARDS_PAYMENT_AMOUNT,
  CURVE_REWARDS_CONTRACT_HASH,
  CURVE_REWARDS_OWNER,
  CURVE_REWARDS_AMOUNT,
  CURVE_REWARDS_DISTRIBUTION,
  CURVE_REWARDS_REWARD,
  CURVE_REWARDS_NEW_OWNER,
  CURVE_REWARDS_ACCOUNT

} = process.env;


const KEYS = Keys.Ed25519.parseKeyFiles(
  `${CURVE_REWARDS_MASTER_KEY_PAIR_PATH}/public_key.pem`,
  `${CURVE_REWARDS_MASTER_KEY_PAIR_PATH}/secret_key.pem`
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

const curveRewards = new CURVEREWARDSClient(
  NODE_ADDRESS!,
  CHAIN_NAME!,
  EVENT_STREAM_ADDRESS!
);

const test = async () => {

  await curveRewards.setContractHash(CURVE_REWARDS_CONTRACT_HASH!);

   // //totalSupplyJsClient
   const totalSupplyJsClient = await curveRewards.totalSupplyJsClient();
   console.log(`... totalSupply: ${totalSupplyJsClient}`);

    // //ownerJsClient
   const ownerJsClient = await curveRewards.ownerJsClient();
   console.log(`... owner: ${ownerJsClient}`);

   // //balanceOf
   const balanceOf = await curveRewards.balanceOf(CURVE_REWARDS_OWNER!);
   console.log(`... balance: ${balanceOf}`);

    // //uni
    const uni = await curveRewards.uni();
    console.log(`... uni: ${uni}`);

   // //snx
   const snx = await curveRewards.snx();
   console.log(`... snx: ${snx}`);

   // //duration
   const duration = await curveRewards.duration();
   console.log(`... duration: ${duration}`);

   // //periodFinish
   const periodFinish = await curveRewards.periodFinish();
   console.log(`... periodFinish: ${periodFinish}`);

  // //rewardRate
  const rewardRate = await curveRewards.rewardRate();
  console.log(`... rewardRate: ${rewardRate}`);

   // //lastUpdateTime
   const lastUpdateTime = await curveRewards.lastUpdateTime();
   console.log(`... lastUpdateTime: ${lastUpdateTime}`);

  // //rewardPerTokenStored
  const rewardPerTokenStored = await curveRewards.rewardPerTokenStored();
  console.log(`... rewardPerTokenStored: ${rewardPerTokenStored}`);

  // //userRewardPerTokenPaid
  const userRewardPerTokenPaid = await curveRewards.userRewardPerTokenPaid(CURVE_REWARDS_ACCOUNT!);
  console.log(`... userRewardPerTokenPaid: ${userRewardPerTokenPaid}`);

 // //rewards
 const rewards = await curveRewards.rewards(CURVE_REWARDS_ACCOUNT!);
 console.log(`... rewards: ${rewards}`);


 //stakeLp
 const stakeLpDeployHash = await curveRewards.stakeLp(
  KEYS!,
  CURVE_REWARDS_AMOUNT!,
  CURVE_REWARDS_PAYMENT_AMOUNT!
 );
 console.log("... stakeLp deploy hash: ", stakeLpDeployHash);

 await getDeploy(NODE_ADDRESS!, stakeLpDeployHash);
 console.log("... stakeLp function called successfully.");

 //withdrawLp
 const withdrawLpDeployHash = await curveRewards.withdrawLp(
  KEYS!,
  CURVE_REWARDS_AMOUNT!,
  CURVE_REWARDS_PAYMENT_AMOUNT!
 );
 console.log("... withdrawLp deploy hash: ", withdrawLpDeployHash);

 await getDeploy(NODE_ADDRESS!, withdrawLpDeployHash);
 console.log("... withdrawLp function called successfully.");

 //setRewardDistribution
 const setRewardDistributionDeployHash = await curveRewards.setRewardDistribution(
  KEYS!,
  CURVE_REWARDS_DISTRIBUTION!,
  CURVE_REWARDS_PAYMENT_AMOUNT!
 );
 console.log("... setRewardDistribution deploy hash: ", setRewardDistributionDeployHash);

 await getDeploy(NODE_ADDRESS!, setRewardDistributionDeployHash);
 console.log("... setRewardDistribution function called successfully.");

  //stake
 const stakeDeployHash = await curveRewards.stake(
  KEYS!,
  CURVE_REWARDS_AMOUNT!,
  CURVE_REWARDS_PAYMENT_AMOUNT!
 );
 console.log("... stake deploy hash: ", stakeDeployHash);

 await getDeploy(NODE_ADDRESS!, stakeDeployHash);
 console.log("... stake function called successfully.");

 //withdraw
 const withdrawDeployHash = await curveRewards.withdraw(
  KEYS!,
  CURVE_REWARDS_AMOUNT!,
  CURVE_REWARDS_PAYMENT_AMOUNT!
 );
 console.log("... withdraw deploy hash: ", withdrawDeployHash);

 await getDeploy(NODE_ADDRESS!, withdrawLpDeployHash);
 console.log("... withdraw function called successfully.");

 //getReward
 const getRewardDeployHash = await curveRewards.getReward(
  KEYS!,
  CURVE_REWARDS_PAYMENT_AMOUNT!
 );
 console.log("... getReward deploy hash: ", getRewardDeployHash);

 await getDeploy(NODE_ADDRESS!, getRewardDeployHash);
 console.log("... getReward function called successfully.");

 //exit
 const exitDeployHash = await curveRewards.exit(
  KEYS!,
  CURVE_REWARDS_PAYMENT_AMOUNT!
 );
 console.log("... exit deploy hash: ", exitDeployHash);

 await getDeploy(NODE_ADDRESS!, exitDeployHash);
 console.log("... exit function called successfully.");

 //notifyRewardAmount
 const notifyRewardAmountDeployHash = await curveRewards.notifyRewardAmount(
  KEYS!,
  CURVE_REWARDS_REWARD!,
  CURVE_REWARDS_PAYMENT_AMOUNT!
 );
 console.log("... notifyRewardAmount deploy hash: ", notifyRewardAmountDeployHash);

 await getDeploy(NODE_ADDRESS!, notifyRewardAmountDeployHash);
 console.log("... notifyRewardAmount function called successfully.");

  //renounceOwnership
 const renounceOwnershipDeployHash = await curveRewards.renounceOwnership(
  KEYS!,
  CURVE_REWARDS_PAYMENT_AMOUNT!
 );
 console.log("... renounceOwnership deploy hash: ", renounceOwnershipDeployHash);

 await getDeploy(NODE_ADDRESS!, renounceOwnershipDeployHash);
 console.log("... renounceOwnership function called successfully.");

 //transferOwnership
 const transferOwnershipDeployHash = await curveRewards.transferOwnership(
  KEYS!,
  CURVE_REWARDS_NEW_OWNER!,
  CURVE_REWARDS_PAYMENT_AMOUNT!
 );
 console.log("... transferOwnership deploy hash: ", transferOwnershipDeployHash);

 await getDeploy(NODE_ADDRESS!, transferOwnershipDeployHash);
 console.log("... transferOwnership function called successfully.")
};


test();
