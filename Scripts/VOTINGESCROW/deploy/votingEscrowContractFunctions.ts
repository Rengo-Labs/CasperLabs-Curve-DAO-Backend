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
  T,
  ADDRESS,
  IDX,
  VALUE,
  UNLOCK_TIME,
  BLOCK,
  VOTINGESCROW_CONTRACT_HASH
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

  // console.log('key result');
  
  //  const unlockTime = await votingEscrow.unlockTime();
  // console.log(`... Contract blockTime: ${unlockTime}`);
 
  // //commitTransferOwnership
  // const commitTransferOwnershipDeployHash = await votingEscrow.commitTransferOwnership(
  //   KEYS!,
  //   //ADDRESS!,
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

  // //getLastUserSlopeJsClient
  // const getLastUserSlopeJsClientDeployHash = await votingEscrow.getLastUserSlopeJsClient(
  //   KEYS!,
  //   //ADDRESS!,
  //   KEYS.publicKey,
  //   VOTING_ESCROW_PAYMENT_AMOUNT!
  // );
  // console.log("... getLastUserSlopeJsClient deploy hash: ", getLastUserSlopeJsClientDeployHash);

  // await getDeploy(NODE_ADDRESS!, getLastUserSlopeJsClientDeployHash);
  // console.log("... getLastUserSlopeJsClient function called successfully.");

  // //userPointHistoryTsJsclient
  // const userPointHistoryTsJsclientDeployHash = await votingEscrow.userPointHistoryTsJsclient(
  //   KEYS!,
  //   //ADDRESS!,
  //   KEYS.publicKey,
  //   IDX!,
  //   VOTING_ESCROW_PAYMENT_AMOUNT!
  // );
  // console.log("... userPointHistoryTsJsclient deploy hash: ", userPointHistoryTsJsclientDeployHash);

  // await getDeploy(NODE_ADDRESS!, userPointHistoryTsJsclientDeployHash);
  // console.log("... userPointHistoryTsJsclient function called successfully.");

  // //lockedEndJsClient
  // const lockedEndJsClientDeployHash = await votingEscrow.lockedEndJsClient(
  //   KEYS!,
  //   //ADDRESS!,
  //   KEYS.publicKey,
  //   VOTING_ESCROW_PAYMENT_AMOUNT!
  // );
  // console.log("... lockedEndJsClient deploy hash: ", lockedEndJsClientDeployHash);

  // await getDeploy(NODE_ADDRESS!, lockedEndJsClientDeployHash);
  // console.log("... lockedEndJsClient function called successfully.");

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
  //   ADDRESS!,
  //   VALUE!,
  //   VOTING_ESCROW_PAYMENT_AMOUNT!
  // );
  // console.log("... depositFor deploy hash: ", depositForDeployHash);

  // await getDeploy(NODE_ADDRESS!, depositForDeployHash);
  // console.log("... depositFor function called successfully");

  //createlock
  // const createlockDeployHash = await votingEscrow.createlock(
  //   KEYS!,
  //   VALUE!,
  //   UNLOCK_TIME!,
  //   VOTING_ESCROW_PAYMENT_AMOUNT!
  // );
  // console.log("... createlock deploy hash: ", createlockDeployHash);

  // await getDeploy(NODE_ADDRESS!, createlockDeployHash);
  // console.log("... createlock function called successfully");

//   //increaseAmount
//   const increaseAmountDeployHash = await votingEscrow.increaseAmount(
//     KEYS,
//     VALUE!,
//     VOTING_ESCROW_PAYMENT_AMOUNT!
//   );
//   console.log("... increaseAmount deploy hash: ", increaseAmountDeployHash);

//   await getDeploy(NODE_ADDRESS!, increaseAmountDeployHash);
//   console.log("... increaseAmount function called successfully");

//   //increaseUnlockTime
//   const increaseUnlockTimeDeployHash = await votingEscrow.increaseUnlockTime(
//     KEYS,
//     UNLOCK_TIME!,
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


//   //balanceOfJsClient
  // const balanceOfJsClientDeployHash = await votingEscrow.balanceOfJsClient(
  //   KEYS,
  //   //ADDRESS!,
  //   KEYS.publicKey,
  //   T!,
  //   VOTING_ESCROW_PAYMENT_AMOUNT!
  // );
  // console.log("... balanceOfJsClient deploy hash: ", balanceOfJsClientDeployHash);

  // await getDeploy(NODE_ADDRESS!, balanceOfJsClientDeployHash);
  // console.log("... balanceOfJsClient function called successfully");


//  //balanceOfAtJsClient
//  const balanceOfAtJsClientDeployHash = await votingEscrow.balanceOfAtJsClient(
//    KEYS,
//    //ADDRESS!,
//    KEYS.publicKey,
//    BLOCK!,
//    VOTING_ESCROW_PAYMENT_AMOUNT!
//   );
//   console.log("... balanceOfAtJsClient deploy hash: ", balanceOfAtJsClientDeployHash);

//   await getDeploy(NODE_ADDRESS!, balanceOfAtJsClientDeployHash);
//   console.log("... balanceOfAtJsClient function called successfully");


//   //totalSupplyJsClient
  const totalSupplyJsClientDeployHash = await votingEscrow.totalSupplyJsClient(
    KEYS,
    T!,
    VOTING_ESCROW_PAYMENT_AMOUNT!
  );
  console.log("... totalSupplyJsClient deploy hash: ", totalSupplyJsClientDeployHash);

  await getDeploy(NODE_ADDRESS!, totalSupplyJsClientDeployHash);
  console.log("... totalSupplyJsClient function called successfully");


//   //totalSupplyAtJsClient
  // const totalSupplyAtJsClientDeployHash = await votingEscrow.totalSupplyAtJsClient(
  //   KEYS,
  //   BLOCK!,
  //   VOTING_ESCROW_PAYMENT_AMOUNT!
  // );
  // console.log("... totalSupplyAtJsClient deploy hash: ", totalSupplyAtJsClientDeployHash);

  // await getDeploy(NODE_ADDRESS!, totalSupplyAtJsClientDeployHash);
  // console.log("... totalSupplyAtJsClient function called successfully");


//   //changeController
  // const changeControllerDeployHash = await votingEscrow.changeController(
  //   KEYS,
  //   //NEW_CONTROLLER!,
  //   KEYS.publicKey,
  //   VOTING_ESCROW_PAYMENT_AMOUNT!
  // );
  // console.log("... changeController deploy hash: ", changeControllerDeployHash);

  // await getDeploy(NODE_ADDRESS!, changeControllerDeployHash);
  // console.log("... changeController function called successfully");


};


test();
