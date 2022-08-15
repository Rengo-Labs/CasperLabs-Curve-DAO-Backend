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
  GAUGE_CONTROLLER_VOTING_ESCROW,
  GAUGE_CONTROLLER_CONTRACT_PACKAGE,
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
    GAUGE_CONTROLLER_VOTING_ESCROW!,
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


const get_gauge_weight = async (addr : string) => {

  const installDeployHash = await gaugeController.installSessionCodeParamKeyAddr(
    KEYS,
    GAUGE_CONTROLLER_CONTRACT_PACKAGE!,
    "get_gauge_weight",
    addr,
    GAUGE_CONTROLLER_PAYMENT_AMOUNT!,
    GAUGE_CONTROLLER_PURSE_PROXY_WASM_PATH!
  );

  console.log(`... Deposit Function deployHash: ${installDeployHash}`);

  await getDeploy(NODE_ADDRESS!, installDeployHash);

  console.log(`... Deposit Function called successfully through sessionCode.`);

};


const gauge_types = async (addr : string) => {

  const installDeployHash = await gaugeController.installSessionCodeParamKeyAddr(
    KEYS,
    GAUGE_CONTROLLER_CONTRACT_PACKAGE!,
    "gauge_types",
    addr,
    GAUGE_CONTROLLER_PAYMENT_AMOUNT!,
    GAUGE_CONTROLLER_PURSE_PROXY_WASM_PATH!
  );

  console.log(`... Deposit Function deployHash: ${installDeployHash}`);

  await getDeploy(NODE_ADDRESS!, installDeployHash);

  console.log(`... Deposit Function called successfully through sessionCode.`);

};

const gauge_relative_weight = async (addr : string) => {

  const installDeployHash = await gaugeController.installSessionCodeParamKeyAddr(
    KEYS,
    GAUGE_CONTROLLER_CONTRACT_PACKAGE!,
    "gauge_relative_weight",
    addr,
    GAUGE_CONTROLLER_PAYMENT_AMOUNT!,
    GAUGE_CONTROLLER_PURSE_PROXY_WASM_PATH!
  );

  console.log(`... Deposit Function deployHash: ${installDeployHash}`);

  await getDeploy(NODE_ADDRESS!, installDeployHash);

  console.log(`... Deposit Function called successfully through sessionCode.`);

};


const gauge_relative_weight_write = async (addr : string) => {

  const installDeployHash = await gaugeController.installSessionCodeParamKeyAddr(
    KEYS,
    GAUGE_CONTROLLER_CONTRACT_PACKAGE!,
    "gauge_relative_weight_write",
    addr,
    GAUGE_CONTROLLER_PAYMENT_AMOUNT!,
    GAUGE_CONTROLLER_PURSE_PROXY_WASM_PATH!
  );

  console.log(`... Deposit Function deployHash: ${installDeployHash}`);

  await getDeploy(NODE_ADDRESS!, installDeployHash);

  console.log(`... Deposit Function called successfully through sessionCode.`);

};



const get_type_weight = async (type_id : string) => {

  const installDeployHash = await gaugeController.installSessionCodeParamU128TypeId(
    KEYS,
    GAUGE_CONTROLLER_CONTRACT_PACKAGE!,
    "get_type_weight",
    type_id,
    GAUGE_CONTROLLER_PAYMENT_AMOUNT!,
    GAUGE_CONTROLLER_PURSE_PROXY_WASM_PATH!
  );

  console.log(`... Deposit Function deployHash: ${installDeployHash}`);

  await getDeploy(NODE_ADDRESS!, installDeployHash);

  console.log(`... Deposit Function called successfully through sessionCode.`);

};

const get_weights_sum_per_type = async (type_id : string) => {

  const installDeployHash = await gaugeController.installSessionCodeParamU128TypeId(
    KEYS,
    GAUGE_CONTROLLER_CONTRACT_PACKAGE!,
    "get_weights_sum_per_type",
    type_id,
    GAUGE_CONTROLLER_PAYMENT_AMOUNT!,
    GAUGE_CONTROLLER_PURSE_PROXY_WASM_PATH!
  );

  console.log(`... Deposit Function deployHash: ${installDeployHash}`);

  await getDeploy(NODE_ADDRESS!, installDeployHash);

  console.log(`... Deposit Function called successfully through sessionCode.`);

};

const get_total_weight = async () => {

  const installDeployHash = await gaugeController.installSessionCodeNoParam(
    KEYS,
    GAUGE_CONTROLLER_CONTRACT_PACKAGE!,
    "get_total_weight",
    GAUGE_CONTROLLER_PAYMENT_AMOUNT!,
    GAUGE_CONTROLLER_PURSE_PROXY_WASM_PATH!
  );

  console.log(`... Deposit Function deployHash: ${installDeployHash}`);

  await getDeploy(NODE_ADDRESS!, installDeployHash);

  console.log(`... Deposit Function called successfully through sessionCode.`);

};
