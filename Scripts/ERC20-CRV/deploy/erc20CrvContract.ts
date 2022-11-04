import { config } from "dotenv";
config();
import { ERC20CRVClient, utils } from "../../../JsClients/ERC20-CRV/src";
import { parseTokenMeta, sleep, getDeploy } from "./utils";

import {
  Keys,
} from "casper-js-sdk";

const {
  NODE_ADDRESS,
  EVENT_STREAM_ADDRESS,
  CHAIN_NAME,
  ERC20CRV_WASM_PATH,
  ERC20CRV_MASTER_KEY_PAIR_PATH,
  ERC20CRV_INSTALL_PAYMENT_AMOUNT,
  ERC20CRV_TOKEN_NAME,
  ERC20CRV_TOKEN_SYMBOL,
  ERC20CRV_DECIMALS,
  ERC20CRV_CONTRACT_NAME,
  ERC20CRV_PACKAGE_HASH,
  ERC20CRV_PROXY_WASM_PATH,
  ERC20CRV_START,
  ERC20CRV_END,
  ERC20CRV_AMOUNT
} = process.env;

const KEYS = Keys.Ed25519.parseKeyFiles(
  `${ERC20CRV_MASTER_KEY_PAIR_PATH}/public_key.pem`,
  `${ERC20CRV_MASTER_KEY_PAIR_PATH}/secret_key.pem`
);

const test = async () => {
  const erc20Crv = new ERC20CRVClient(
    NODE_ADDRESS!,
    CHAIN_NAME!,
    EVENT_STREAM_ADDRESS!
  );

  const installDeployHash = await erc20Crv.install(
    KEYS,
    ERC20CRV_TOKEN_NAME!,
    ERC20CRV_TOKEN_SYMBOL!,
    ERC20CRV_DECIMALS!,
    ERC20CRV_CONTRACT_NAME!,
    ERC20CRV_INSTALL_PAYMENT_AMOUNT!,
    ERC20CRV_WASM_PATH!
  );

  console.log(`... Contract installation deployHash: ${installDeployHash}`);

  await getDeploy(NODE_ADDRESS!, installDeployHash);

  console.log(`... Contract installed successfully.`);

  let accountInfo = await utils.getAccountInfo(NODE_ADDRESS!, KEYS.publicKey);

  console.log(`... Account Info: `);
  console.log(JSON.stringify(accountInfo, null, 2));

  const contractHash = await utils.getAccountNamedKeyValue(
    accountInfo,
    `${ERC20CRV_CONTRACT_NAME!}_contract_hash`
  );

  console.log(`... Contract Hash: ${contractHash}`);

  const packageHash = await utils.getAccountNamedKeyValue(
    accountInfo,
    `${ERC20CRV_CONTRACT_NAME!}_package_hash`
  );

  console.log(`... Package Hash: ${packageHash}`);
};

//test();

const startEpochTimeWritesessioncode = async () => {
  const erc20Crv = new ERC20CRVClient(
    NODE_ADDRESS!,
    CHAIN_NAME!,
    EVENT_STREAM_ADDRESS!
  );

  const startEpochTimeWritesessioncodeDeployHash = await erc20Crv.startEpochTimeWritesessioncode(
    KEYS,
    "start_epoch_time_write",
    ERC20CRV_PACKAGE_HASH!,
    ERC20CRV_INSTALL_PAYMENT_AMOUNT!,
    ERC20CRV_PROXY_WASM_PATH!
  );

  console.log(`... startEpochTimeWritesessioncode Function deployHash: ${startEpochTimeWritesessioncodeDeployHash}`);

  await getDeploy(NODE_ADDRESS!, startEpochTimeWritesessioncodeDeployHash);

  console.log(`... startEpochTimeWritesessioncode Function called successfully through sessionCode.`);

};
//startEpochTimeWritesessioncode();

const futureEpochTimeWritesessioncode = async () => {
  const erc20Crv = new ERC20CRVClient(
    NODE_ADDRESS!,
    CHAIN_NAME!,
    EVENT_STREAM_ADDRESS!
  );

  const futureEpochTimeWritesessioncodeDeployHash = await erc20Crv.futureEpochTimeWritesessioncode(
    KEYS,
    "future_epoch_time_write",
    ERC20CRV_PACKAGE_HASH!,
    ERC20CRV_INSTALL_PAYMENT_AMOUNT!,
    ERC20CRV_PROXY_WASM_PATH!
  );

  console.log(`... futureEpochTimeWritesessioncode Function deployHash: ${futureEpochTimeWritesessioncodeDeployHash}`);

  await getDeploy(NODE_ADDRESS!, futureEpochTimeWritesessioncodeDeployHash);

  console.log(`... futureEpochTimeWritesessioncode Function called successfully through sessionCode.`);

};
//futureEpochTimeWritesessioncode();

const availableSupplysessioncode = async () => {
  const erc20Crv = new ERC20CRVClient(
    NODE_ADDRESS!,
    CHAIN_NAME!,
    EVENT_STREAM_ADDRESS!
  );

  const availableSupplysessioncodeDeployHash = await erc20Crv.availableSupplysessioncode(
    KEYS,
    "available_supply",
    ERC20CRV_PACKAGE_HASH!,
    ERC20CRV_INSTALL_PAYMENT_AMOUNT!,
    ERC20CRV_PROXY_WASM_PATH!
  );

  console.log(`... availableSupplysessioncode Function deployHash: ${availableSupplysessioncodeDeployHash}`);

  await getDeploy(NODE_ADDRESS!, availableSupplysessioncodeDeployHash);

  console.log(`... availableSupplysessioncode Function called successfully through sessionCode.`);

};
//availableSupplysessioncode();

const mintableInTimeframesessioncode = async () => {
  const erc20Crv = new ERC20CRVClient(
    NODE_ADDRESS!,
    CHAIN_NAME!,
    EVENT_STREAM_ADDRESS!
  );

  const mintableInTimeframesessioncodeDeployHash = await erc20Crv.mintableInTimeframesessioncode(
    KEYS,
    "mintable_in_timeframe",
    ERC20CRV_PACKAGE_HASH!,
    ERC20CRV_START!,
    ERC20CRV_END!,
    ERC20CRV_INSTALL_PAYMENT_AMOUNT!,
    ERC20CRV_PROXY_WASM_PATH!
  );

  console.log(`... mintableInTimeframesessioncode Function deployHash: ${mintableInTimeframesessioncodeDeployHash}`);

  await getDeploy(NODE_ADDRESS!, mintableInTimeframesessioncodeDeployHash);

  console.log(`... mintableInTimeframesessioncode Function called successfully through sessionCode.`);

};
//mintableInTimeframesessioncode();

const mintsessioncode = async () => {
  const erc20Crv = new ERC20CRVClient(
    NODE_ADDRESS!,
    CHAIN_NAME!,
    EVENT_STREAM_ADDRESS!
  );

  const mintsessioncodeDeployHash = await erc20Crv.mintsessioncode(
    KEYS,
    "mint",
    ERC20CRV_PACKAGE_HASH!,
    KEYS.publicKey!,
    ERC20CRV_AMOUNT!,
    ERC20CRV_INSTALL_PAYMENT_AMOUNT!,
    ERC20CRV_PROXY_WASM_PATH!
  );

  console.log(`... mintsessioncode Function deployHash: ${mintsessioncodeDeployHash}`);

  await getDeploy(NODE_ADDRESS!, mintsessioncodeDeployHash);

  console.log(`... mintsessioncode Function called successfully through sessionCode.`);

};
//mintsessioncode();