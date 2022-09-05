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


  //packageHash
 const packageHashDeployHash = await vestingEscrowFactory.packageHash(
  KEYS!,
  VESTING_ESCROW_FACTORY_PAYMENT_AMOUNT!
 );
 console.log("... packageHash deploy hash: ", packageHashDeployHash);

 await getDeploy(NODE_ADDRESS!, packageHashDeployHash);
 console.log("... packageHash function called successfully.");

 //adminVef
 const adminVefDeployHash = await vestingEscrowFactory.adminVef(
  KEYS!,
  VESTING_ESCROW_FACTORY_PAYMENT_AMOUNT!
 );
 console.log("... adminVef deploy hash: ", adminVefDeployHash);

 await getDeploy(NODE_ADDRESS!, adminVefDeployHash);
 console.log("... adminVef function called successfully.");

 //target
 const targetDeployHash = await vestingEscrowFactory.target(
  KEYS!,
  VESTING_ESCROW_FACTORY_PAYMENT_AMOUNT!
 );
 console.log("... target deploy hash: ", targetDeployHash);

 await getDeploy(NODE_ADDRESS!, targetDeployHash);
 console.log("... target function called successfully.");

 //futureAdminVef
 const futureAdminVefDeployHash = await vestingEscrowFactory.futureAdminVef(
  KEYS!,
  VESTING_ESCROW_FACTORY_PAYMENT_AMOUNT!
 );
 console.log("... futureAdminVef deploy hash: ", futureAdminVefDeployHash);

 await getDeploy(NODE_ADDRESS!, futureAdminVefDeployHash);
 console.log("... futureAdminVef function called successfully.");

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

  //vestedOf
 const vestedOfDeployHash = await vestingEscrowFactory.vestedOf(
  KEYS!,
  VESTING_ESCROW_FACTORY_RECIPIENT!,
  VESTING_ESCROW_FACTORY_PAYMENT_AMOUNT!
 );
 console.log("... vestedOf deploy hash: ", vestedOfDeployHash);

 await getDeploy(NODE_ADDRESS!, vestedOfDeployHash);
 console.log("... vestedOf function called successfully.");

  //balanceOf
 const balanceOfDeployHash = await vestingEscrowFactory.balanceOf(
  KEYS!,
  VESTING_ESCROW_FACTORY_RECIPIENT!,
  VESTING_ESCROW_FACTORY_PAYMENT_AMOUNT!
 );
 console.log("... balanceOf deploy hash: ", balanceOfDeployHash);

 await getDeploy(NODE_ADDRESS!, balanceOfDeployHash);
 console.log("... balanceOf function called successfully.");

 //vestedSupply
 const vestedSupplyDeployHash = await vestingEscrowFactory.vestedSupply(
  KEYS!,
  VESTING_ESCROW_FACTORY_PAYMENT_AMOUNT!
 );
 console.log("... vestedSupply deploy hash: ", vestedSupplyDeployHash);

 await getDeploy(NODE_ADDRESS!, vestedSupplyDeployHash);
 console.log("... vestedSupply function called successfully.");

 //lockedSupply
 const lockedSupplyDeployHash = await vestingEscrowFactory.lockedSupply(
  KEYS!,
  VESTING_ESCROW_FACTORY_PAYMENT_AMOUNT!
 );
 console.log("... lockedSupply deploy hash: ", lockedSupplyDeployHash);

 await getDeploy(NODE_ADDRESS!, lockedSupplyDeployHash);
 console.log("... lockedSupply function called successfully.");

 //lockedOf
 const lockedOfDeployHash = await vestingEscrowFactory.lockedOf(
  KEYS!,
  VESTING_ESCROW_FACTORY_RECIPIENT!,
  VESTING_ESCROW_FACTORY_PAYMENT_AMOUNT!
 );
 console.log("... lockedOf deploy hash: ", lockedOfDeployHash);

 await getDeploy(NODE_ADDRESS!, lockedOfDeployHash);
 console.log("... lockedOf function called successfully.");

 //commitTransferOwnership
 const commitTransferOwnershipDeployHash = await vestingEscrowFactory.commitTransferOwnership(
  KEYS!,
  KEYS.publicKey,
  VESTING_ESCROW_FACTORY_PAYMENT_AMOUNT!
 );
 console.log("... commitTransferOwnership deploy hash: ", commitTransferOwnershipDeployHash);

 await getDeploy(NODE_ADDRESS!, commitTransferOwnershipDeployHash);
 console.log("... commitTransferOwnership function called successfully.");

 //applyTransferOwnership
 const applyTransferOwnershipDeployHash = await vestingEscrowFactory.applyTransferOwnership(
  KEYS!,
  VESTING_ESCROW_FACTORY_PAYMENT_AMOUNT!
 );
 console.log("... applyTransferOwnership deploy hash: ", applyTransferOwnershipDeployHash);

 await getDeploy(NODE_ADDRESS!, applyTransferOwnershipDeployHash);
 console.log("... applyTransferOwnership function called successfully.");

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
