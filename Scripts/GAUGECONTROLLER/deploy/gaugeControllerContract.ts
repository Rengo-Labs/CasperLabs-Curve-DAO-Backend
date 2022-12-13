import { config } from "dotenv";
config();
import { GaugeControllerClient, utils, constants } from "../../../JsClients/GAUGECONTROLLER/src";
import { parseTokenMeta, sleep, getDeploy } from "./utils";

import {
  Keys,
} from "casper-js-sdk";

const {
  NODE_ADDRESS,
  EVENT_STREAM_ADDRESS,
  CHAIN_NAME,
  GAUGE_CONTROLLER_WASM_PATH,
  GAUGE_CONTROLLER_MASTER_KEY_PAIR_PATH,
  GAUGE_CONTROLLER_INSTALL_PAYMENT_AMOUNT,
  GAUGE_CONTROLLER_CONTRACT_NAME,
  GAUGE_CONTROLLER_TOKEN,
  VOTING_ESCROW_PACKAGE_HASH,
  GAUGE_CONTROLLER_PACKAGE_HASH,
  GAUGE_CONTROLLER_PAYMENT_AMOUNT,
  GAUGE_CONTROLLER_PURSE_PROXY_WASM_PATH
} = process.env;

const KEYS = Keys.Ed25519.parseKeyFiles(
  `${GAUGE_CONTROLLER_MASTER_KEY_PAIR_PATH}/public_key.pem`,
  `${GAUGE_CONTROLLER_MASTER_KEY_PAIR_PATH}/secret_key.pem`
);


const gaugeController = new GaugeControllerClient(
  NODE_ADDRESS!,
  CHAIN_NAME!,
  EVENT_STREAM_ADDRESS!
);

const deploy = async () => {

  const installDeployHash = await gaugeController.install(
    KEYS,
    GAUGE_CONTROLLER_TOKEN!,
    VOTING_ESCROW_PACKAGE_HASH!,
    GAUGE_CONTROLLER_CONTRACT_NAME!,
    GAUGE_CONTROLLER_INSTALL_PAYMENT_AMOUNT!,
    GAUGE_CONTROLLER_WASM_PATH!
  );

  console.log(`... Contract installation deployHash: ${installDeployHash}`);

  await getDeploy(NODE_ADDRESS!, installDeployHash);

  console.log(`... Contract installed successfully.`);

  let accountInfo = await utils.getAccountInfo(NODE_ADDRESS!, KEYS.publicKey);

  console.log(`... Account Info: `);
  console.log(JSON.stringify(accountInfo, null, 2));

  const contractHash = await utils.getAccountNamedKeyValue(
    accountInfo,
    `${GAUGE_CONTROLLER_CONTRACT_NAME!}_contract_hash`
  );

  console.log(`... Contract Hash: ${contractHash}`);

  const packageHash = await utils.getAccountNamedKeyValue(
    accountInfo,
    `${GAUGE_CONTROLLER_CONTRACT_NAME!}_package_hash`
  );

  console.log(`... Package Hash: ${packageHash}`);
};

deploy();


const get_gauge_weight_session_code = async (addr : string) => {

  const installDeployHash = await gaugeController.installSessionCodeParamKeyAddr(
    KEYS,
    GAUGE_CONTROLLER_PACKAGE_HASH!,
    "get_gauge_weight",
    addr,
    GAUGE_CONTROLLER_PAYMENT_AMOUNT!,
    GAUGE_CONTROLLER_PURSE_PROXY_WASM_PATH!
  );

  console.log(`... get_gauge_weight Function deployHash: ${installDeployHash}`);

  await getDeploy(NODE_ADDRESS!, installDeployHash);

  console.log(`... get_gauge_weight Function called successfully through sessionCode.`);

};


const gauge_types_session_code = async (addr : string) => {

  const installDeployHash = await gaugeController.installSessionCodeParamKeyAddr(
    KEYS,
    GAUGE_CONTROLLER_PACKAGE_HASH!,
    "gauge_types",
    addr,
    GAUGE_CONTROLLER_PAYMENT_AMOUNT!,
    GAUGE_CONTROLLER_PURSE_PROXY_WASM_PATH!
  );

  console.log(`... gauge_types Function deployHash: ${installDeployHash}`);

  await getDeploy(NODE_ADDRESS!, installDeployHash);

  console.log(`... gauge_types Function called successfully through sessionCode.`);

};

const gauge_relative_weight_session_code = async (addr : string) => {

  const installDeployHash = await gaugeController.installSessionCodeParamKeyAddr(
    KEYS,
    GAUGE_CONTROLLER_PACKAGE_HASH!,
    "gauge_relative_weight",
    addr,
    GAUGE_CONTROLLER_PAYMENT_AMOUNT!,
    GAUGE_CONTROLLER_PURSE_PROXY_WASM_PATH!
  );

  console.log(`... gauge_relative_weight Function deployHash: ${installDeployHash}`);

  await getDeploy(NODE_ADDRESS!, installDeployHash);

  console.log(`... gauge_relative_weight Function called successfully through sessionCode.`);

};


const gauge_relative_weight_write_session_code = async (addr : string) => {

  const installDeployHash = await gaugeController.installSessionCodeParamKeyAddr(
    KEYS,
    GAUGE_CONTROLLER_PACKAGE_HASH!,
    "gauge_relative_weight_write",
    addr,
    GAUGE_CONTROLLER_PAYMENT_AMOUNT!,
    GAUGE_CONTROLLER_PURSE_PROXY_WASM_PATH!
  );

  console.log(`... gauge_relative_weight_write Function deployHash: ${installDeployHash}`);

  await getDeploy(NODE_ADDRESS!, installDeployHash);

  console.log(`... gauge_relative_weight_write Function called successfully through sessionCode.`);

};


const get_type_weight_session_code = async (type_id : string) => {

  const installDeployHash = await gaugeController.installSessionCodeParamU128TypeId(
    KEYS,
    GAUGE_CONTROLLER_PACKAGE_HASH!,
    "get_type_weight",
    type_id,
    GAUGE_CONTROLLER_PAYMENT_AMOUNT!,
    GAUGE_CONTROLLER_PURSE_PROXY_WASM_PATH!
  );

  console.log(`... get_type_weight Function deployHash: ${installDeployHash}`);

  await getDeploy(NODE_ADDRESS!, installDeployHash);

  console.log(`... get_type_weight Function called successfully through sessionCode.`);

};

const get_weights_sum_per_type_session_code = async (type_id : string) => {

  const installDeployHash = await gaugeController.installSessionCodeParamU128TypeId(
    KEYS,
    GAUGE_CONTROLLER_PACKAGE_HASH!,
    "get_weights_sum_per_type",
    type_id,
    GAUGE_CONTROLLER_PAYMENT_AMOUNT!,
    GAUGE_CONTROLLER_PURSE_PROXY_WASM_PATH!
  );

  console.log(`... get_weights_sum_per_type Function deployHash: ${installDeployHash}`);

  await getDeploy(NODE_ADDRESS!, installDeployHash);

  console.log(`... get_weights_sum_per_type Function called successfully through sessionCode.`);

};

const get_total_weight_session_code = async () => {

  const installDeployHash = await gaugeController.installSessionCodeNoParam(
    KEYS,
    GAUGE_CONTROLLER_PACKAGE_HASH!,
    "get_total_weight",
    GAUGE_CONTROLLER_PAYMENT_AMOUNT!,
    GAUGE_CONTROLLER_PURSE_PROXY_WASM_PATH!
  );

  console.log(`... get_total_weight Function deployHash: ${installDeployHash}`);

  await getDeploy(NODE_ADDRESS!, installDeployHash);

  console.log(`... get_total_weight Function called successfully through sessionCode.`);

};


export {
  get_total_weight_session_code,
  get_weights_sum_per_type_session_code,
  get_type_weight_session_code,
  gauge_relative_weight_write_session_code,
  gauge_relative_weight_session_code, 
  gauge_types_session_code,
  get_gauge_weight_session_code
};