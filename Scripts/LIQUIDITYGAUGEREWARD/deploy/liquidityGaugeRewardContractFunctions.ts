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
  ADDRESS,
  VALUE,
  LIQUIDITYGAUGEREWARD_CONTRACT_HASH,
  CAN_DEPOSIT,
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

  await liquidityGaugeReward.setContractHash(LIQUIDITYGAUGEREWARD_CONTRACT_HASH!);

 
 
  //userCheckpointJsClient
  const userCheckpointJsClientDeployHash = await liquidityGaugeReward.userCheckpointJsClient(
    KEYS!,
    //ADDRESS!,
    KEYS.publicKey,
    LIQUIDITY_GAUGE_REWARD_PAYMENT_AMOUNT!
  );
  console.log("... userCheckpointJsClient deploy hash: ", userCheckpointJsClientDeployHash);

  await getDeploy(NODE_ADDRESS!, userCheckpointJsClientDeployHash);
  console.log("... userCheckpointJsClient function called successfully.");

  //claimableTokensJsClient
  const claimableTokensJsClientDeployHash = await liquidityGaugeReward.claimableTokensJsClient(
    KEYS!,
    //ADDRESS!,
    KEYS.publicKey,
    LIQUIDITY_GAUGE_REWARD_PAYMENT_AMOUNT!
  );
  console.log("... claimableTokensJsClient deploy hash: ", claimableTokensJsClientDeployHash);

  await getDeploy(NODE_ADDRESS!, claimableTokensJsClientDeployHash);
  console.log("... claimableTokensJsClient function called successfully.");

  //claimableRewardJsClient
  const claimableRewardJsClientDeployHash = await liquidityGaugeReward.claimableRewardJsClient(
    KEYS!,
    //ADDRESS!,
    KEYS.publicKey,
    LIQUIDITY_GAUGE_REWARD_PAYMENT_AMOUNT!
  );
  console.log("... claimableRewardJsClient deploy hash: ", claimableRewardJsClientDeployHash);

  await getDeploy(NODE_ADDRESS!, claimableRewardJsClientDeployHash);
  console.log("... claimableRewardJsClient function called successfully.");

 //kick
 const kickDeployHash = await liquidityGaugeReward.kick(
  KEYS!,
  //ADDRESS!,
  KEYS.publicKey,
  LIQUIDITY_GAUGE_REWARD_PAYMENT_AMOUNT!
 );
 console.log("... kick deploy hash: ", kickDeployHash);

 await getDeploy(NODE_ADDRESS!, kickDeployHash);
 console.log("... kick function called successfully.");

 //setApproveDeposit
 const setApproveDepositDeployHash = await liquidityGaugeReward.setApproveDeposit(
  KEYS!,
  //ADDRESS!,
  KEYS.publicKey,
  //CAN_DEPOSIT!, //issue
  true,
  LIQUIDITY_GAUGE_REWARD_PAYMENT_AMOUNT!
 );
 console.log("... setApproveDeposit deploy hash: ", setApproveDepositDeployHash);

 await getDeploy(NODE_ADDRESS!, setApproveDepositDeployHash);
 console.log("... setApproveDeposit function called successfully.");

 //deposit
 const depositDeployHash = await liquidityGaugeReward.deposit(
  KEYS!,
  VALUE!,
  //ADDRESS!,
  KEYS.publicKey,
  LIQUIDITY_GAUGE_REWARD_PAYMENT_AMOUNT!
 );
 console.log("... deposit deploy hash: ", depositDeployHash);

 await getDeploy(NODE_ADDRESS!, depositDeployHash);
 console.log("... deposit function called successfully.");

 //withdraw
 const withdrawDeployHash = await liquidityGaugeReward.withdraw(
  KEYS!,
  VALUE!,
  true,
  LIQUIDITY_GAUGE_REWARD_PAYMENT_AMOUNT!
 );
 console.log("... withdraw deploy hash: ", withdrawDeployHash);

 await getDeploy(NODE_ADDRESS!, withdrawDeployHash);
 console.log("... withdraw function called successfully.");

 //claimRewards
 const claimRewardsDeployHash = await liquidityGaugeReward.claimRewards(
  KEYS!,
  //ADDRESS!,
  KEYS.publicKey,
  LIQUIDITY_GAUGE_REWARD_PAYMENT_AMOUNT!
 );
 console.log("... claimRewards deploy hash: ", claimRewardsDeployHash);

 await getDeploy(NODE_ADDRESS!, claimRewardsDeployHash);
 console.log("... claimRewards function called successfully.");

 //integrateCheckpointJsClient
 const integrateCheckpointJsClientDeployHash = await liquidityGaugeReward.integrateCheckpointJsClient(
  KEYS!,
  LIQUIDITY_GAUGE_REWARD_PAYMENT_AMOUNT!
 );
 console.log("... integrateCheckpointJsClient deploy hash: ", integrateCheckpointJsClientDeployHash);

 await getDeploy(NODE_ADDRESS!, integrateCheckpointJsClientDeployHash);
 console.log("... integrateCheckpointJsClient function called successfully.");

 //killMe
 const killMeDeployHash = await liquidityGaugeReward.killMe(
  KEYS!,
  LIQUIDITY_GAUGE_REWARD_PAYMENT_AMOUNT!
 );
 console.log("... killMe deploy hash: ", killMeDeployHash);

 await getDeploy(NODE_ADDRESS!, killMeDeployHash);
 console.log("... killMe function called successfully.");

 //comitTransferOwnership
 const comitTransferOwnershipDeployHash = await liquidityGaugeReward.comitTransferOwnership(
  KEYS!,
  //ADDRESS!,
  KEYS.publicKey,
  LIQUIDITY_GAUGE_REWARD_PAYMENT_AMOUNT!
 );
 console.log("... comitTransferOwnership deploy hash: ", comitTransferOwnershipDeployHash);

 await getDeploy(NODE_ADDRESS!, comitTransferOwnershipDeployHash);
 console.log("... comitTransferOwnership function called successfully.");

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
