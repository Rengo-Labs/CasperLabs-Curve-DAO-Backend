import { config } from "dotenv";
config();
import { MINTERClient } from "../../../JsClients/MINTER/src";
import { getDeploy } from "./utils";

import {
  Keys
} from "casper-js-sdk";

const {
  NODE_ADDRESS,
  EVENT_STREAM_ADDRESS,
  CHAIN_NAME,
  MINTER_MASTER_KEY_PAIR_PATH,
  MINTER_CONTRACT,
  MINTER_PAYMENT_AMOUNT
} = process.env;


const KEYS = Keys.Ed25519.parseKeyFiles(
  `${MINTER_MASTER_KEY_PAIR_PATH}/public_key.pem`,
  `${MINTER_MASTER_KEY_PAIR_PATH}/secret_key.pem`
);


const minter = new MINTERClient(
  NODE_ADDRESS!,
  CHAIN_NAME!,
  EVENT_STREAM_ADDRESS!
);

const deploy = async () => {

  await minter.setContractHash(MINTER_CONTRACT!);

  //token
  const token = await minter.token();
  console.log(`... Minter token: ${token}`);
  
  //controller
  const controller = await minter.controller();
  console.log(`... Minter controller: ${controller}`);

  //minted
  let minted = await minter.minted("owner","spender");
 console.log(`... minted: ${minted}`);

  //minted
  let allowed_to_mint_for = await minter.allowed_to_mint_for("owner","spender");
 console.log(`... allowed_to_mint_for: ${allowed_to_mint_for}`);

 //toggle_approve_mint
  const toggleApproveMintDeployHash = await minter.toggle_approve_mint(
    KEYS,
    "user address",
    MINTER_PAYMENT_AMOUNT!
  );
  console.log("... toggle_approve_mint deploy hash: ", toggleApproveMintDeployHash);

  await getDeploy(NODE_ADDRESS!, toggleApproveMintDeployHash);
  console.log("... mint approved successfully");

   //mint_for
   const mintForDeployHash = await minter.mint_for(
    KEYS,
    "gauge address",
    "user_address",
    MINTER_PAYMENT_AMOUNT!
  );
  console.log("... mint_for deploy hash: ", mintForDeployHash);

  await getDeploy(NODE_ADDRESS!, mintForDeployHash);
  console.log("... mint_for called successfully");

  //mint_many
  const mintManyDeployHash = await minter.mint_many(
    KEYS,
    ["gauge address1, gaugeAddress2"],
    MINTER_PAYMENT_AMOUNT!
  );
  console.log("... mint_many deploy hash: ", mintManyDeployHash);

  await getDeploy(NODE_ADDRESS!, mintManyDeployHash);
  console.log("... mint_many called successfully");

  //mint
  const mintDeployHash = await minter.mint(
    KEYS,
    "gauge address",
    MINTER_PAYMENT_AMOUNT!
  );
  console.log("... mint deploy hash: ", mintDeployHash);

  await getDeploy(NODE_ADDRESS!, mintDeployHash);
  console.log("... mint called successfully");
  
};


deploy();

