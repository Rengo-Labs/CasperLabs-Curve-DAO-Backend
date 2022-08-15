import { config } from "dotenv";
config();
import { MINTERClient ,utils, constants} from "../../../JsClients/MINTER/src";
import { sleep, getDeploy } from "./utils";

import {
  Keys
} from "casper-js-sdk";

const { ERC20Events } = constants;

const {
  NODE_ADDRESS,
  EVENT_STREAM_ADDRESS,
  CHAIN_NAME,
  MINTER_MASTER_KEY_PAIR_PATH,
  MINTER_CONTRACT
} = process.env;


const KEYS = Keys.Ed25519.parseKeyFiles(
  `${MINTER_MASTER_KEY_PAIR_PATH}/public_key.pem`,
  `${MINTER_MASTER_KEY_PAIR_PATH}/secret_key.pem`
);

const ROUTERKEYS = Keys.Ed25519.parseKeyFiles(
  `${MINTER_MASTER_KEY_PAIR_PATH}/public_key.pem`,
  `${MINTER_MASTER_KEY_PAIR_PATH}/secret_key.pem`
);

function splitdata(data:string)
{
    var temp=data.split('(');
    var result=temp[1].split(')');
    return result[0];
}

const minter = new MINTERClient(
  NODE_ADDRESS!,
  CHAIN_NAME!,
  EVENT_STREAM_ADDRESS!
);

const deploy = async () => {

  await minter.setContractHash(MINTER_CONTRACT!);
  //getTotalSupply(TOKEN1_CONTRACT!);
  // // //name
  // // const name = await erc20.name();
  // // console.log(`... Contract name: ${name}`);

  // // //symbol
  // // const symbol = await erc20.symbol();
  // // console.log(`... Contract symbol: ${symbol}`);

  // // //decimal
  // // const decimal = await erc20.decimal();
  // // console.log(`... Contract decimal: ${decimal}`);

  // // //totalsupply
  // // let totalSupply = await erc20.totalSupply();
  // // console.log(`... Total supply: ${totalSupply}`);

  // // // //balanceof
  // let balance = await erc20.balanceOf("7b217a09296d5ce360847a7d20f623476157c5f022333c4e988a464035cadd80");
  // console.log(`... Balance: ${balance}`);

  // // //nonce
  // // let nonce = await erc20.nonce(KEYS.publicKey);
  // // console.log(`... Nonce: ${nonce}`);

  // // // //allowance
  //let allowance = await erc20.allowance(KEYS.publicKey,KEYS.publicKey);
 // console.log(`... Allowance: ${allowance}`);
 
  //mint
  // const mintDeployHash = await erc20.mint(
  //   ROUTERKEYS,
  //   ROUTERKEYS.publicKey,
  //   MINT_AMOUNT!,
  //   MINT_PAYMENT_AMOUNT!
  // );
  // console.log("... Mint deploy hash: ", mintDeployHash);

  // await getDeploy(NODE_ADDRESS!, mintDeployHash);
  // console.log("... Token minted successfully.");

  //  balanceof
  // let balance = await erc20.balanceOfcontract(PAIR_CONTRACT!);
  // console.log(`... Balance: ${balance}`);

  // // //burn
  // // const burnDeployHash = await erc20.burn(
  // //   KEYS,
  // //   KEYS.publicKey,
  // //   BURN_AMOUNT!,
  // //   BURN_PAYMENT_AMOUNT!
  // // );
  // // console.log("... Burn deploy hash: ", burnDeployHash);

  // // await getDeploy(NODE_ADDRESS!, burnDeployHash);
  // // console.log("... Token burned successfully");

  // // //totalsupply
  // // totalSupply = await erc20.totalSupply();
  // // console.log(`... Total supply: ${totalSupply}`);

  //approve
  // const approveDeployHash = await erc20.approve(
  //   ROUTERKEYS,
  //   PACKAGE_HASH!,
  //   AMOUNT_B_DESIRED!,
  //   APPROVE_PAYMENT_AMOUNT!
  // );
  // console.log("... Approve deploy hash: ", approveDeployHash);

  // await getDeploy(NODE_ADDRESS!, approveDeployHash);
  // console.log("... Token approved successfully");

  // // //transfer
  // // const transferDeployHash = await erc20.transfer(
  // //   KEYS,
  // //   KEYS.publicKey,
  // //   TRANSFER_AMOUNT!,
  // //   TRANSFER_PAYMENT_AMOUNT!
  // // );
  // // console.log("... Transfer deploy hash: ", transferDeployHash);

  // // await getDeploy(NODE_ADDRESS!, transferDeployHash);
  // // console.log("... Token transfer successfully");

  // // //transfer_from
  // // const transferfromDeployHash = await erc20.transferFrom(
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

