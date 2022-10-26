import { config } from "dotenv";
config();
import { VESTINGESCROWFACTORYClient ,utils} from "../../../JsClients/VESTINGESCROWFACTORY/src";
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
  
  VESTING_ESCROW_FACTORY_MASTER_KEY_PAIR_PATH,
  VESTING_ESCROW_FACTORY_PAYMENT_AMOUNT,
  VESTINGESCROWFACTORY_CONTRACT_HASH,
  VESTING_ESCROW_FACTORY_TOKEN,
  VESTING_ESCROW_FACTORY_AMOUNT,
  VESTING_ESCROW_FACTORY_VESTING_DURATION,
  VESTING_ESCROW_FACTORY_VESTING_START,
  VESTING_ESCROW_FACTORY_RECIPIENT,
  VESTING_ESCROW_FACTORY_START_TIME,
  VESTING_ESCROW_FACTORY_END_TIME,
  VESTING_ESCROW_FACTORY_OWNER,
} = process.env;


const KEYS = Keys.Ed25519.parseKeyFiles(
  `${VESTING_ESCROW_FACTORY_MASTER_KEY_PAIR_PATH}/public_key.pem`,
  `${VESTING_ESCROW_FACTORY_MASTER_KEY_PAIR_PATH}/secret_key.pem`
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

const vestingEscrowFactory = new VESTINGESCROWFACTORYClient(
  NODE_ADDRESS!,
  CHAIN_NAME!,
  EVENT_STREAM_ADDRESS!
);

const test = async () => {

  await vestingEscrowFactory.setContractHash(VESTINGESCROWFACTORY_CONTRACT_HASH!);


 //  // // //packageHash
 const packageHash = await vestingEscrowFactory.packageHash();
 console.log(`... Contract packageHash: ${packageHash}`);

  //  // // //adminVef
  const adminVef = await vestingEscrowFactory.adminVef();
  console.log(`... Contract adminVef: ${adminVef}`);

  //  // // //target
  const target = await vestingEscrowFactory.target();
  console.log(`... Contract target: ${target}`);

  //  // // //futureAdminVef
  const futureAdminVef = await vestingEscrowFactory.futureAdminVef();
  console.log(`... Contract futureAdminVef: ${futureAdminVef}`);

  //  // // //token
  const token = await vestingEscrowFactory.token();
  console.log(`... Contract token: ${token}`);

   //  // // //startTime
   const startTime = await vestingEscrowFactory.startTime();
   console.log(`... Contract startTime: ${startTime}`);

    //  // // //endTime
  const endTime = await vestingEscrowFactory.endTime();
  console.log(`... Contract endTime: ${endTime}`);

  //  // // //initialLockedSupply
  const initialLockedSupply = await vestingEscrowFactory.initialLockedSupply();
  console.log(`... Contract initialLockedSupply: ${initialLockedSupply}`);

  //  // // //canDisable
  const canDisable = await vestingEscrowFactory.canDisable();
  console.log(`... Contract canDisable: ${canDisable}`);

   //  // // //admin
   const admin = await vestingEscrowFactory.admin();
   console.log(`... Contract admin: ${admin}`);

    //  // // //futureAdmin
  const futureAdmin = await vestingEscrowFactory.futureAdmin();
  console.log(`... Contract futureAdmin: ${futureAdmin}`);

  //  // // //initialLocked
  const initialLocked = await vestingEscrowFactory.initialLocked(VESTING_ESCROW_FACTORY_OWNER!);
  console.log(`... Contract initialLocked: ${initialLocked}`);

  //  // // //totalClaimed
  const totalClaimed = await vestingEscrowFactory.totalClaimed(VESTING_ESCROW_FACTORY_OWNER!);
  console.log(`... Contract totalClaimed: ${totalClaimed}`);

  //  // // //disabledAt
  const disabledAt = await vestingEscrowFactory.disabledAt(VESTING_ESCROW_FACTORY_OWNER!);
  console.log(`... Contract disabledAt: ${disabledAt}`);

 //applyTransferOwnershipVef
 const applyTransferOwnershipVefDeployHash = await vestingEscrowFactory.applyTransferOwnershipVef(
  KEYS!,
  VESTING_ESCROW_FACTORY_PAYMENT_AMOUNT!
 );
 console.log("... applyTransferOwnershipVef deploy hash: ", applyTransferOwnershipVefDeployHash);

 await getDeploy(NODE_ADDRESS!, applyTransferOwnershipVefDeployHash);
 console.log("... applyTransferOwnershipVef function called successfully.");

 //commitTransferOwnershipVef
 const commitTransferOwnershipVefDeployHash = await vestingEscrowFactory.commitTransferOwnershipVef(
   KEYS!,
   KEYS.publicKey,
   VESTING_ESCROW_FACTORY_PAYMENT_AMOUNT!
  );
  console.log("... commitTransferOwnershipVef deploy hash: ", commitTransferOwnershipVefDeployHash);
 
  await getDeploy(NODE_ADDRESS!, commitTransferOwnershipVefDeployHash);
  console.log("... commitTransferOwnershipVef function called successfully.");

  //deployVestingContract
 const deployVestingContractDeployHash = await vestingEscrowFactory.deployVestingContract(
  KEYS!,
  VESTING_ESCROW_FACTORY_TOKEN!,
  KEYS.publicKey,
  VESTING_ESCROW_FACTORY_AMOUNT!,
  true,
  VESTING_ESCROW_FACTORY_VESTING_DURATION!,
  VESTING_ESCROW_FACTORY_VESTING_START!,
  VESTING_ESCROW_FACTORY_PAYMENT_AMOUNT!
 );
 console.log("... deployVestingContract deploy hash: ", deployVestingContractDeployHash);

 await getDeploy(NODE_ADDRESS!, deployVestingContractDeployHash);
 console.log("... deployVestingContract function called successfully.");



 //VESTING-SIMPLE FUNCTIONS

 //initialize
 const initializeDeployHash = await vestingEscrowFactory.initialize(
  KEYS!,
  KEYS.publicKey,
  VESTING_ESCROW_FACTORY_TOKEN!,
  VESTING_ESCROW_FACTORY_RECIPIENT!,
  VESTING_ESCROW_FACTORY_AMOUNT!,
  VESTING_ESCROW_FACTORY_START_TIME!,
  VESTING_ESCROW_FACTORY_END_TIME!,
  true,
  VESTING_ESCROW_FACTORY_PAYMENT_AMOUNT!
 );
 console.log("... initialize deploy hash: ", initializeDeployHash);

 await getDeploy(NODE_ADDRESS!, initializeDeployHash);
 console.log("... initialize function called successfully.");

 //toggleDisable
 const toggleDisableDeployHash = await vestingEscrowFactory.toggleDisable(
  KEYS!,
  VESTING_ESCROW_FACTORY_RECIPIENT!,
  VESTING_ESCROW_FACTORY_PAYMENT_AMOUNT!
 );
 console.log("... toggleDisable deploy hash: ", toggleDisableDeployHash);

 await getDeploy(NODE_ADDRESS!, toggleDisableDeployHash);
 console.log("... toggleDisable function called successfully.");

 //disableCanDisable
 const disableCanDisableDeployHash = await vestingEscrowFactory.disableCanDisable(
  KEYS!,
  VESTING_ESCROW_FACTORY_PAYMENT_AMOUNT!
 );
 console.log("... disableCanDisable deploy hash: ", disableCanDisableDeployHash);

 await getDeploy(NODE_ADDRESS!, disableCanDisableDeployHash);
 console.log("... disableCanDisable function called successfully.");

 //claim
 const claimDeployHash = await vestingEscrowFactory.claim(
  KEYS!,
  KEYS.publicKey,
  VESTING_ESCROW_FACTORY_PAYMENT_AMOUNT!
 );
 console.log("... claim deploy hash: ", claimDeployHash);

 await getDeploy(NODE_ADDRESS!, claimDeployHash);
 console.log("... claim function called successfully.");

};


test();
