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
  LIQUIDITYGAUGEV3_CONTRACT_HASH,
  LIQUIDITY_GAUGE_V3_TOKEN,
  LIQUIDITY_GAUGE_V3_RECEIVER,
  LIQUIDITY_GAUGE_V3_TO,
  LIQUIDITY_GAUGE_V3_FROM,
  LIQUIDITY_GAUGE_V3_SPENDER,
  LIQUIDITY_GAUGE_V3_AMOUNT,
  LIQUIDITY_GAUGE_V3_REWARD_CONTRACT,
  LIQUIDITY_GAUGE_V3_CLAIM_SIG,
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

  await liquidityGaugeV3.setContractHash(LIQUIDITYGAUGEV3_CONTRACT_HASH!);

 
  //decimals
 const decimalsDeployHash = await liquidityGaugeV3.decimals(
  KEYS!,
  LIQUIDITY_GAUGE_V3_PAYMENT_AMOUNT!
 );
 console.log("... decimals deploy hash: ", decimalsDeployHash);

 await getDeploy(NODE_ADDRESS!, decimalsDeployHash);
 console.log("... decimals function called successfully.");

 //userCheckpoint
 const userCheckpointDeployHash = await liquidityGaugeV3.userCheckpoint(
  KEYS!,
  KEYS.publicKey,
  LIQUIDITY_GAUGE_V3_PAYMENT_AMOUNT!
 );
 console.log("... userCheckpoint deploy hash: ", userCheckpointDeployHash);

 await getDeploy(NODE_ADDRESS!, userCheckpointDeployHash);
 console.log("... userCheckpoint function called successfully.");

 //claimableTokens
 const claimableTokensDeployHash = await liquidityGaugeV3.claimableTokens(
  KEYS!,
  KEYS.publicKey,
  LIQUIDITY_GAUGE_V3_PAYMENT_AMOUNT!
 );
 console.log("... claimableTokens deploy hash: ", claimableTokensDeployHash);

 await getDeploy(NODE_ADDRESS!, claimableTokensDeployHash);
 console.log("... claimableTokens function called successfully.");

 //rewardContract
 const rewardContractDeployHash = await liquidityGaugeV3.rewardContract(
  KEYS!,
  LIQUIDITY_GAUGE_V3_PAYMENT_AMOUNT!
 );
 console.log("... rewardContract deploy hash: ", rewardContractDeployHash);

 await getDeploy(NODE_ADDRESS!, rewardContractDeployHash);
 console.log("... rewardContract function called successfully.");

 //lastClaim
 const lastClaimDeployHash = await liquidityGaugeV3.lastClaim(
  KEYS!,
  LIQUIDITY_GAUGE_V3_PAYMENT_AMOUNT!
 );
 console.log("... lastClaim deploy hash: ", lastClaimDeployHash);

 await getDeploy(NODE_ADDRESS!, lastClaimDeployHash);
 console.log("... lastClaim function called successfully.");

 //claimedReward
 const claimedRewardDeployHash = await liquidityGaugeV3.claimedReward(
  KEYS!,
  KEYS.publicKey,
  LIQUIDITY_GAUGE_V3_TOKEN!,
  LIQUIDITY_GAUGE_V3_PAYMENT_AMOUNT!
 );
 console.log("... claimedReward deploy hash: ", claimedRewardDeployHash);

 await getDeploy(NODE_ADDRESS!, claimedRewardDeployHash);
 console.log("... claimedReward function called successfully.");

 //claimableReward
 const claimableRewardDeployHash = await liquidityGaugeV3.claimableReward(
  KEYS!,
  KEYS.publicKey,
  LIQUIDITY_GAUGE_V3_TOKEN!,
  LIQUIDITY_GAUGE_V3_PAYMENT_AMOUNT!
 );
 console.log("... claimableReward deploy hash: ", claimableRewardDeployHash);

 await getDeploy(NODE_ADDRESS!, claimableRewardDeployHash);
 console.log("... claimableReward function called successfully.");

 //claimableRewardWrite
 const claimableRewardWriteDeployHash = await liquidityGaugeV3.claimableRewardWrite(
  KEYS!,
  KEYS.publicKey,
  LIQUIDITY_GAUGE_V3_TOKEN!,
  LIQUIDITY_GAUGE_V3_PAYMENT_AMOUNT!
 );
 console.log("... claimableRewardWrite deploy hash: ", claimableRewardWriteDeployHash);

 await getDeploy(NODE_ADDRESS!, claimableRewardWriteDeployHash);
 console.log("... claimableRewardWrite function called successfully.");

 //setRewardsReceiver
 const setRewardsReceiverDeployHash = await liquidityGaugeV3.setRewardsReceiver(
  KEYS!,
  LIQUIDITY_GAUGE_V3_RECEIVER!,
  LIQUIDITY_GAUGE_V3_PAYMENT_AMOUNT!
 );
 console.log("... setRewardsReceiver deploy hash: ", setRewardsReceiverDeployHash);

 await getDeploy(NODE_ADDRESS!, setRewardsReceiverDeployHash);
 console.log("... setRewardsReceiver function called successfully.");

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

 //transfer
 const transferDeployHash = await liquidityGaugeV3.transfer(
  KEYS!,
  LIQUIDITY_GAUGE_V3_TO!,
  LIQUIDITY_GAUGE_V3_VALUE!,
  LIQUIDITY_GAUGE_V3_PAYMENT_AMOUNT!
 );
 console.log("... transfer deploy hash: ", transferDeployHash);

 await getDeploy(NODE_ADDRESS!, transferDeployHash);
 console.log("... transfer function called successfully.");

 //transferFrom
 const transferFromDeployHash = await liquidityGaugeV3.transferFrom(
  KEYS!,
  LIQUIDITY_GAUGE_V3_FROM!,
  LIQUIDITY_GAUGE_V3_TO!,
  LIQUIDITY_GAUGE_V3_VALUE!,
  LIQUIDITY_GAUGE_V3_PAYMENT_AMOUNT!
 );
 console.log("... transferFrom deploy hash: ", transferFromDeployHash);

 await getDeploy(NODE_ADDRESS!, transferFromDeployHash);
 console.log("... transferFrom function called successfully.");

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
 const comitTransferOwnershipDeployHash = await liquidityGaugeV3.comitTransferOwnership(
  KEYS!,
  //LIQUIDITY_GAUGE_V3_ADDRESS!,
  KEYS.publicKey,
  LIQUIDITY_GAUGE_V3_PAYMENT_AMOUNT!
 );
 console.log("... comitTransferOwnership deploy hash: ", comitTransferOwnershipDeployHash);

 await getDeploy(NODE_ADDRESS!, comitTransferOwnershipDeployHash);
 console.log("... comitTransferOwnership function called successfully.");

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
