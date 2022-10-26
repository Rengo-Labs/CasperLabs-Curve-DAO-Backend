import { config } from "dotenv";
config();
import { ERC20CRVClient ,utils} from "../../../JsClients/ERC20-CRV/src";
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
  
  ERC20CRV_MASTER_KEY_PAIR_PATH,
  ERC20CRV_PAYMENT_AMOUNT,
  ERC20CRV_VALUE,
  ERC20CRV_CONTRACT_HASH,
  ERC20CRV_SPENDER,
  ERC20CRV_AMOUNT,
  ERC20CRV_START,
  ERC20CRV_END,
  ERC20CRV_RECIPIENT,
  ERC20CRV_ACCOUNT,
  ERC20CRV_OWNER

} = process.env;


const KEYS = Keys.Ed25519.parseKeyFiles(
  `${ERC20CRV_MASTER_KEY_PAIR_PATH}/public_key.pem`,
  `${ERC20CRV_MASTER_KEY_PAIR_PATH}/secret_key.pem`
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

const erc20Crv = new ERC20CRVClient(
  NODE_ADDRESS!,
  CHAIN_NAME!,
  EVENT_STREAM_ADDRESS!
);

const test = async () => {

  await erc20Crv.setContractHash(ERC20CRV_CONTRACT_HASH!);


 //  // // //name
 const name = await erc20Crv.name();
 console.log(`... Contract name: ${name}`);

 //  // // //symbol
 const symbol = await erc20Crv.symbol();
 console.log(`... Contract symbol: ${symbol}`);

 //  // // //decimals
 const decimals = await erc20Crv.decimals();
 console.log(`... Contract decimals: ${decimals}`);

 //  // // //balanceOf
 const balanceOf = await erc20Crv.balanceOf(ERC20CRV_ACCOUNT!);
 console.log(`... Contract balanceOf: ${balanceOf}`);

 //  // // //allowances
 const allowances = await erc20Crv.allowances(ERC20CRV_OWNER!,ERC20CRV_SPENDER!);
 console.log(`... Contract allowances: ${allowances}`);

 //  // // //minter
 const minter = await erc20Crv.minter();
 console.log(`... Contract minter: ${minter}`);

 //  // // //admin
 const admin = await erc20Crv.admin();
 console.log(`... Contract admin: ${admin}`);

 //  // // //rate
 const rate = await erc20Crv.rate();
 console.log(`... Contract rate: ${rate}`);

   //setMinter
 const setMinterDeployHash = await erc20Crv.setMinter(
  KEYS!,
  KEYS.publicKey,
  ERC20CRV_PAYMENT_AMOUNT!
 );
 console.log("... setMinter deploy hash: ", setMinterDeployHash);

 await getDeploy(NODE_ADDRESS!, setMinterDeployHash);
 console.log("... setMinter function called successfully.");

 //burn
 const burnDeployHash = await erc20Crv.burn(
  KEYS!,
  ERC20CRV_VALUE!,
  ERC20CRV_PAYMENT_AMOUNT!
 );
 console.log("... burn deploy hash: ", burnDeployHash);

 await getDeploy(NODE_ADDRESS!, burnDeployHash);
 console.log("... burn function called successfully.");

 //setAdmin
 const setAdminDeployHash = await erc20Crv.setAdmin(
  KEYS!,
  KEYS.publicKey,
  ERC20CRV_PAYMENT_AMOUNT!
 );
 console.log("... setAdmin deploy hash: ", setAdminDeployHash);

 await getDeploy(NODE_ADDRESS!, setAdminDeployHash);
 console.log("... setAdmin function called successfully.");

 //updateMiningParameters
 const updateMiningParametersDeployHash = await erc20Crv.updateMiningParameters(
  KEYS!,
  ERC20CRV_PAYMENT_AMOUNT!
 );
 console.log("... updateMiningParameters deploy hash: ", updateMiningParametersDeployHash);

 await getDeploy(NODE_ADDRESS!, updateMiningParametersDeployHash);
 console.log("... updateMiningParameters function called successfully.");

 //transferFrom
 const transferFromDeployHash = await erc20Crv.transferFrom(
  KEYS!,
  KEYS.publicKey,
  ERC20CRV_RECIPIENT!,
  ERC20CRV_AMOUNT!,
  ERC20CRV_PAYMENT_AMOUNT!
 );
 console.log("... transferFrom deploy hash: ", transferFromDeployHash);

 await getDeploy(NODE_ADDRESS!, transferFromDeployHash);
 console.log("... transferFrom function called successfully.");

 //approve
 const approveDeployHash = await erc20Crv.approve(
  KEYS!,
  ERC20CRV_SPENDER!,
  ERC20CRV_AMOUNT!,
  ERC20CRV_PAYMENT_AMOUNT!
 );
 console.log("... approve deploy hash: ", approveDeployHash);

 await getDeploy(NODE_ADDRESS!, approveDeployHash);
 console.log("... approve function called successfully.");

 //transfer
 const transferDeployHash = await erc20Crv.transfer(
  KEYS!,
  ERC20CRV_RECIPIENT!,
  ERC20CRV_AMOUNT!,
  ERC20CRV_PAYMENT_AMOUNT!
 );
 console.log("... transfer deploy hash: ", transferDeployHash);

 await getDeploy(NODE_ADDRESS!, transferDeployHash);
 console.log("... transfer function called successfully.");



};


test();
