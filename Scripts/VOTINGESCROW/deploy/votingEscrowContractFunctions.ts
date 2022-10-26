import { config } from "dotenv";
config();
import { VOTINGESCROWClient ,utils} from "../../../JsClients/VOTINGESCROW/src";
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
  VOTING_ESCROW_MASTER_KEY_PAIR_PATH,
  VOTING_ESCROW_PAYMENT_AMOUNT,
  VOTING_ESCROW_T,
  VOTING_ESCROW_ADDRESS,
  VOTING_ESCROW_IDX,
  VOTING_ESCROW_VALUE,
  VOTING_ESCROW_UNLOCK_TIME,
  VOTING_ESCROW_BLOCK,
  VOTINGESCROW_CONTRACT_HASH,
  VOTING_ESCROW_EPOCH,
  VOTING_ESCROW_USER,
  VOTING_ESCROW_USER_EPOCH,
  VOTING_ESCROW_TIME,
} = process.env;


const KEYS = Keys.Ed25519.parseKeyFiles(
  `${VOTING_ESCROW_MASTER_KEY_PAIR_PATH}/public_key.pem`,
  `${VOTING_ESCROW_MASTER_KEY_PAIR_PATH}/secret_key.pem`
);

function splitdata(data:string)
{
    var temp=data.split('(');
    var result=temp[1].split(')');
    return result[0];
}

const votingEscrow = new VOTINGESCROWClient(
  NODE_ADDRESS!,
  CHAIN_NAME!,
  EVENT_STREAM_ADDRESS!
);

const test = async () => {

  await votingEscrow.setContractHash(VOTINGESCROW_CONTRACT_HASH!);

  // // token 
  const token = await votingEscrow.token();
  console.log(`... token: ${token}`);

   // // supply 
   const supply = await votingEscrow.supply();
   console.log(`...  supply: ${supply}`);
 
   // // locked 
   const locked = await votingEscrow.locked();
   console.log(`... locked: ${locked}`);

   // // epoch 
  const epoch = await votingEscrow.epoch();
  console.log(`...  epoch: ${epoch}`);

  // // pointHistory 
  const pointHistory = await votingEscrow.pointHistory(VOTING_ESCROW_EPOCH!);
  console.log(`... pointHistory: ${pointHistory}`);

   // // userPointHistory 
   const userPointHistory = await votingEscrow.userPointHistory(VOTING_ESCROW_USER!,VOTING_ESCROW_USER_EPOCH!);
   console.log(`...  userPointHistory: ${userPointHistory}`);
 
   // // userPointEpoch 
   const userPointEpoch = await votingEscrow.userPointEpoch(VOTING_ESCROW_USER!);
   console.log(`... userPointEpoch: ${userPointEpoch}`);
  
   // // slopeChanges 
   const slopeChanges = await votingEscrow.slopeChanges(VOTING_ESCROW_TIME!);
   console.log(`...  epoch: ${slopeChanges}`);
 
   // // controller 
   const controller = await votingEscrow.controller();
   console.log(`... controller: ${controller}`);
 
    // // transfersEnabled 
    const transfersEnabled = await votingEscrow.transfersEnabled();
    console.log(`...  transfersEnabled: ${transfersEnabled}`);
  
    // // name 
    const name = await votingEscrow.name();
    console.log(`... name: ${name}`);

     // // symbol 
   const symbol = await votingEscrow.symbol();
   console.log(`...  symbol: ${symbol}`);
 
   // // version 
   const version = await votingEscrow.version();
   console.log(`... version: ${version}`);
 
    // // decimals 
    const decimals = await votingEscrow.decimals();
    console.log(`...  decimals: ${decimals}`);
  
    // // admin 
    const admin = await votingEscrow.admin();
    console.log(`... admin: ${admin}`);

    // // futureAdmin 
    const futureAdmin = await votingEscrow.futureAdmin();
    console.log(`... futureAdmin: ${futureAdmin}`);
 
  // //commitTransferOwnership
  // const commitTransferOwnershipDeployHash = await votingEscrow.commitTransferOwnership(
  //   KEYS!,
  //   //VOTING_ESCROW_ADDRESS!,
  //   KEYS.publicKey,
  //   VOTING_ESCROW_PAYMENT_AMOUNT!
  // );
  // console.log("... commitTransferOwnership deploy hash: ", commitTransferOwnershipDeployHash);

  // await getDeploy(NODE_ADDRESS!, commitTransferOwnershipDeployHash);
  // console.log("... commitTransferOwnership function called successfully.");

  // //applyTransferOwnership
  // const applyTransferOwnershipDeployHash = await votingEscrow.applyTransferOwnership(
  //   KEYS!,
  //   VOTING_ESCROW_PAYMENT_AMOUNT!
  // );
  // console.log("...  deploy hash: ", applyTransferOwnershipDeployHash);

  // await getDeploy(NODE_ADDRESS!, applyTransferOwnershipDeployHash);
  // console.log("... applyTransferOwnership function called successfully.");

  // //checkpoint
  // const checkpointDeployHash = await votingEscrow.checkpoint(
  //   KEYS!,
  //   VOTING_ESCROW_PAYMENT_AMOUNT!
  // );
  // console.log("... checkpoint deploy hash: ", checkpointDeployHash);

  // await getDeploy(NODE_ADDRESS!, checkpointDeployHash);
  // console.log("... checkpoint function called successfully");

  // //depositFor
  // const depositForDeployHash = await votingEscrow.depositFor(
  //   KEYS,
  //   VOTING_ESCROW_ADDRESS!,
  //   VOTING_ESCROW_VALUE!,
  //   VOTING_ESCROW_PAYMENT_AMOUNT!
  // );
  // console.log("... depositFor deploy hash: ", depositForDeployHash);

  // await getDeploy(NODE_ADDRESS!, depositForDeployHash);
  // console.log("... depositFor function called successfully");

  //createlock
  // const createlockDeployHash = await votingEscrow.createlock(
  //   KEYS!,
  //   VOTING_ESCROW_VALUE!,
  //   VOTING_ESCROW_UNLOCK_TIME!,
  //   VOTING_ESCROW_PAYMENT_AMOUNT!
  // );
  // console.log("... createlock deploy hash: ", createlockDeployHash);

  // await getDeploy(NODE_ADDRESS!, createlockDeployHash);
  // console.log("... createlock function called successfully");

//   //increaseAmount
//   const increaseAmountDeployHash = await votingEscrow.increaseAmount(
//     KEYS,
//     VOTING_ESCROW_VALUE!,
//     VOTING_ESCROW_PAYMENT_AMOUNT!
//   );
//   console.log("... increaseAmount deploy hash: ", increaseAmountDeployHash);

//   await getDeploy(NODE_ADDRESS!, increaseAmountDeployHash);
//   console.log("... increaseAmount function called successfully");

//   //increaseUnlockTime
//   const increaseUnlockTimeDeployHash = await votingEscrow.increaseUnlockTime(
//     KEYS,
//     VOTING_ESCROW_UNLOCK_TIME!,
//     VOTING_ESCROW_PAYMENT_AMOUNT!
//   );
//   console.log("... increaseUnlockTime deploy hash: ", increaseUnlockTimeDeployHash);

//   await getDeploy(NODE_ADDRESS!, increaseUnlockTimeDeployHash);
//   console.log("... increaseUnlockTime function called successfully");


//   //withdraw
//   const withdrawDeployHash = await votingEscrow.withdraw(
//     KEYS,
//     VOTING_ESCROW_PAYMENT_AMOUNT!
//   );
//   console.log("... withdraw deploy hash: ", withdrawDeployHash);

//   await getDeploy(NODE_ADDRESS!, withdrawDeployHash);
//   console.log("... withdraw function called successfully");


//   //changeController
  // const changeControllerDeployHash = await votingEscrow.changeController(
  //   KEYS,
  //   //VOTING_ESCROW_NEW_CONTROLLER!,
  //   KEYS.publicKey,
  //   VOTING_ESCROW_PAYMENT_AMOUNT!
  // );
  // console.log("... changeController deploy hash: ", changeControllerDeployHash);

  // await getDeploy(NODE_ADDRESS!, changeControllerDeployHash);
  // console.log("... changeController function called successfully");


};


test();
