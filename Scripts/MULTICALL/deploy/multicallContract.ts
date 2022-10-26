import { config } from "dotenv";
config();
import { MULTICALLClient, utils } from "../../../JsClients/MULTICALL/src";
import { parseTokenMeta, sleep, getDeploy } from "./utils";

import {
  Keys,
} from "casper-js-sdk";

const {
  NODE_ADDRESS,
  EVENT_STREAM_ADDRESS,
  CHAIN_NAME,
  MULTICALL_MASTER_KEY_PAIR_PATH,
  MULTICALL_CONTRACT_NAME,
  MULTICALL_INSTALL_PAYMENT_AMOUNT,
  MULTICALL_WASM_PATH,
  MULTICALL_PACKAGE_HASH,
  MULTICALL_PROXY_WASM_PATH
} = process.env;

const KEYS = Keys.Ed25519.parseKeyFiles(
  `${MULTICALL_MASTER_KEY_PAIR_PATH}/public_key.pem`,
  `${MULTICALL_MASTER_KEY_PAIR_PATH}/secret_key.pem`
);

const test = async () => {
  const multicall = new MULTICALLClient(
    NODE_ADDRESS!,
    CHAIN_NAME!,
    EVENT_STREAM_ADDRESS!
  );

  const installDeployHash = await multicall.install(
    KEYS,
    MULTICALL_CONTRACT_NAME!,
    MULTICALL_INSTALL_PAYMENT_AMOUNT!,
    MULTICALL_WASM_PATH!
  );

  console.log(`... Contract installation deployHash: ${installDeployHash}`);

  await getDeploy(NODE_ADDRESS!, installDeployHash);

  console.log(`... Contract installed successfully.`);

  let accountInfo = await utils.getAccountInfo(NODE_ADDRESS!, KEYS.publicKey);

  console.log(`... Account Info: `);
  console.log(JSON.stringify(accountInfo, null, 2));

  const contractHash = await utils.getAccountNamedKeyValue(
    accountInfo,
    `${MULTICALL_CONTRACT_NAME!}_contract_hash`
  );

  console.log(`... Contract Hash: ${contractHash}`);

  const packageHash = await utils.getAccountNamedKeyValue(
    accountInfo,
    `${MULTICALL_CONTRACT_NAME!}_package_hash`
  );

  console.log(`... Package Hash: ${packageHash}`);
};

test();

const getCurrentBlockTimestampsessioncode = async () => {
  const multicall = new MULTICALLClient(
    NODE_ADDRESS!,
    CHAIN_NAME!,
    EVENT_STREAM_ADDRESS!
  );

  const getCurrentBlockTimestampsessioncodeDeployHash = await multicall.getCurrentBlockTimestampsessioncode(
    KEYS,
    "get_current_block_timestamp",
    MULTICALL_PACKAGE_HASH!,
    MULTICALL_INSTALL_PAYMENT_AMOUNT!,
    MULTICALL_PROXY_WASM_PATH!
  );

  console.log(`... getCurrentBlockTimestampsessioncode Function deployHash: ${getCurrentBlockTimestampsessioncodeDeployHash}`);

  await getDeploy(NODE_ADDRESS!, getCurrentBlockTimestampsessioncodeDeployHash);

  console.log(`... getCurrentBlockTimestampsessioncode Function called successfully through sessionCode.`);

};

//getCurrentBlockTimestampsessioncode();