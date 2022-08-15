import { config } from "dotenv";
config();
import { LIQUIDITYGAUGEREWARDClient, utils } from "../../../JsClients/LIQUIDITYGAUGEREWARD/src";
import { parseTokenMeta, sleep, getDeploy } from "./utils";

import {
  Keys,
} from "casper-js-sdk";

const {
  NODE_ADDRESS,
  EVENT_STREAM_ADDRESS,
  CHAIN_NAME,
  LIQUIDITY_GAUGE_REWARD_WASM_PATH,
  LIQUIDITY_GAUGE_REWARD_MASTER_KEY_PAIR_PATH,
  LIQUIDITY_GAUGE_REWARD_INSTALL_PAYMENT_AMOUNT,
  LP_ADDR,
  MINTER,
  REWARD_CONTRACT,
  REWARDED_TOKEN,
  LIQUIDITY_GAUGE_REWARD_CONTRACT_NAME,
} = process.env;

const KEYS = Keys.Ed25519.parseKeyFiles(
  `${LIQUIDITY_GAUGE_REWARD_MASTER_KEY_PAIR_PATH}/public_key.pem`,
  `${LIQUIDITY_GAUGE_REWARD_MASTER_KEY_PAIR_PATH}/secret_key.pem`
);

const test = async () => {
  const liquidityGaugeReward = new LIQUIDITYGAUGEREWARDClient(
    NODE_ADDRESS!,
    CHAIN_NAME!,
    EVENT_STREAM_ADDRESS!
  );

  const installDeployHash = await liquidityGaugeReward.install(
    KEYS,
    LP_ADDR!,
    MINTER!,
    REWARD_CONTRACT!,
    REWARDED_TOKEN!,
    KEYS.publicKey,
    LIQUIDITY_GAUGE_REWARD_CONTRACT_NAME!,
    LIQUIDITY_GAUGE_REWARD_INSTALL_PAYMENT_AMOUNT!,
    LIQUIDITY_GAUGE_REWARD_WASM_PATH!

  );

  console.log(`... Contract installation deployHash: ${installDeployHash}`);

  await getDeploy(NODE_ADDRESS!, installDeployHash);

  console.log(`... Contract installed successfully.`);

  let accountInfo = await utils.getAccountInfo(NODE_ADDRESS!, KEYS.publicKey);

  console.log(`... Account Info: `);
  console.log(JSON.stringify(accountInfo, null, 2));

  const contractHash = await utils.getAccountNamedKeyValue(
    accountInfo,
    `${LIQUIDITY_GAUGE_REWARD_CONTRACT_NAME!}_contract_hash`
  );

  console.log(`... Contract Hash: ${contractHash}`);

  const packageHash = await utils.getAccountNamedKeyValue(
    accountInfo,
    `${LIQUIDITY_GAUGE_REWARD_CONTRACT_NAME!}_package_hash`
  );

  console.log(`... Package Hash: ${packageHash}`);
};

test();
