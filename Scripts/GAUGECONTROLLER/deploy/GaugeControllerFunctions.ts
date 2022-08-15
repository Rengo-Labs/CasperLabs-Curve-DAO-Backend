import { config } from "dotenv";
config();
import { GaugeControllerClient ,utils, constants} from "../../../JsClients/GAUGECONTROLLER/src";
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

const { GAUGECONTROLLEREVENTS } = constants;

const {
  NODE_ADDRESS,
  EVENT_STREAM_ADDRESS,
  CHAIN_NAME,
  GAUGE_CONTROLLER_MASTER_KEY_PAIR_PATH
} = process.env;


const KEYS = Keys.Ed25519.parseKeyFiles(
  `${GAUGE_CONTROLLER_MASTER_KEY_PAIR_PATH}/public_key.pem`,
  `${GAUGE_CONTROLLER_MASTER_KEY_PAIR_PATH}/secret_key.pem`
);

const ROUTERKEYS = Keys.Ed25519.parseKeyFiles(
  `${GAUGE_CONTROLLER_MASTER_KEY_PAIR_PATH}/public_key.pem`,
  `${GAUGE_CONTROLLER_MASTER_KEY_PAIR_PATH}/secret_key.pem`
);

function splitdata(data:string)
{
    var temp=data.split('(');
    var result=temp[1].split(')');
    return result[0];
}

const gaugeController = new GaugeControllerClient(
  NODE_ADDRESS!,
  CHAIN_NAME!,
  EVENT_STREAM_ADDRESS!
);

const deploy = async () => {
  debugger;

  // await gaugeController.setContractHash(TOKEN1_CONTRACT!);
  // await gaugeController.setContractHash("9cc5f4dc6d94076a220bd472904d2823c5606d655067c88d0ecb0d45a06436f4");
  // getTotalSupply("hash-9cc5f4dc6d94076a220bd472904d2823c5606d655067c88d0ecb0d45a06436f4");
  // // //name
  // const name = await gaugeController.name();
  // console.log(`... Contract name: ${name}`);

  // // //symbol
  // const symbol = await gaugeController.symbol();
  // console.log(`... Contract symbol: ${symbol}`);

  // // //decimal
  // const decimal = await gaugeController.decimal();
  // console.log(`... Contract decimal: ${decimal}`);

  // // //totalsupply
  // let totalSupply = await gaugeController.totalSupply();
  // console.log(`... Total supply: ${totalSupply}`);

  // // // //balanceof
  // let balance = await gaugeController.balanceOf("7b217a09296d5ce360847a7d20f623476157c5f022333c4e988a464035cadd80");
  // console.log(`... Balance: ${balance}`);

  // // //nonce
  // // let nonce = await gaugeController.nonce(KEYS.publicKey);
  // // console.log(`... Nonce: ${nonce}`);

  // // // //allowance
  //let allowance = await gaugeController.allowance(KEYS.publicKey,KEYS.publicKey);
 // console.log(`... Allowance: ${allowance}`);
 
  //mint
  // const mintDeployHash = await gaugeController.mint(
  //   ROUTERKEYS,
  //   ROUTERKEYS.publicKey,
  //   MINT_AMOUNT!,
  //   MINT_PAYMENT_AMOUNT!
  // );
  // console.log("... Mint deploy hash: ", mintDeployHash);

  // await getDeploy(NODE_ADDRESS!, mintDeployHash);
  // console.log("... Token minted successfully.");

  //  balanceof
  // let balance = await gaugeController.balanceOfcontract(PAIR_CONTRACT!);
  // console.log(`... Balance: ${balance}`);

  // // //burn
  // // const burnDeployHash = await gaugeController.burn(
  // //   KEYS,
  // //   KEYS.publicKey,
  // //   BURN_AMOUNT!,
  // //   BURN_PAYMENT_AMOUNT!
  // // );
  // // console.log("... Burn deploy hash: ", burnDeployHash);

  // // await getDeploy(NODE_ADDRESS!, burnDeployHash);
  // // console.log("... Token burned successfully");

  // // //totalsupply
  // // totalSupply = await gaugeController.totalSupply();
  // // console.log(`... Total supply: ${totalSupply}`);

  //approve
  // const approveDeployHash = await gaugeController.approve(
  //   ROUTERKEYS,
  //   "e3671d95b214a45f48cf7ba078d378f585c59b36ff523951859b0f9a78e8dd93",
  //   "100000000000",
  //   APPROVE_PAYMENT_AMOUNT!
  // );
  // console.log("... Approve deploy hash: ", approveDeployHash);

  // await getDeploy(NODE_ADDRESS!, approveDeployHash);
  // console.log("... Token approved successfully");

  // // //transfer
  // // const transferDeployHash = await gaugeController.transfer(
  // //   KEYS,
  // //   KEYS.publicKey,
  // //   TRANSFER_AMOUNT!,
  // //   TRANSFER_PAYMENT_AMOUNT!
  // // );
  // // console.log("... Transfer deploy hash: ", transferDeployHash);

  // // await getDeploy(NODE_ADDRESS!, transferDeployHash);
  // // console.log("... Token transfer successfully");

  // // //transfer_from
  // // const transferfromDeployHash = await gaugeController.transferFrom(
  // //   KEYS,
  // //   KEYS.publicKey,
  // //   KEYS.publicKey,
  // //   TRANSFER_FROM_AMOUNT!,
  // //   TRANSFER_FROM_PAYMENT_AMOUNT!
  // // );
  // // console.log("... TransferFrom deploy hash: ", transferfromDeployHash);

  // // await getDeploy(NODE_ADDRESS!, transferfromDeployHash);
  // // console.log("... Token transfer successfully");

};


deploy();
