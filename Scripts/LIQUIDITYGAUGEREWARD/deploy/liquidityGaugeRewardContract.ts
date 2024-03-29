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
  LIQUIDITY_GAUGE_REWARD_LP_ADDR,
  LIQUIDITY_GAUGE_REWARD_MINTER,
  LIQUIDITY_GAUGE_REWARD_REWARD_CONTRACT,
  LIQUIDITY_GAUGE_REWARD_REWARDED_TOKEN,
  LIQUIDITY_GAUGE_REWARD_CONTRACT_NAME,
  LIQUIDITY_GAUGE_REWARD_PACKAGE_HASH,
  LIQUIDITY_GAUGE_REWARD_PROXY_WASM_PATH
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
    LIQUIDITY_GAUGE_REWARD_LP_ADDR!,
    LIQUIDITY_GAUGE_REWARD_MINTER!,
    LIQUIDITY_GAUGE_REWARD_REWARD_CONTRACT!,
    LIQUIDITY_GAUGE_REWARD_REWARDED_TOKEN!,
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


const userCheckpointSessionCode = async () => {
  const liquidityGaugeReward = new LIQUIDITYGAUGEREWARDClient(
    NODE_ADDRESS!,
    CHAIN_NAME!,
    EVENT_STREAM_ADDRESS!
  );

  const userCheckpointSessionCodeDeployHash = await liquidityGaugeReward.userCheckpointSessionCode(
    KEYS,
    "user_checkpoint",
    LIQUIDITY_GAUGE_REWARD_PACKAGE_HASH!,
    KEYS.publicKey!,
    LIQUIDITY_GAUGE_REWARD_INSTALL_PAYMENT_AMOUNT!,
    LIQUIDITY_GAUGE_REWARD_PROXY_WASM_PATH!
  );

  console.log(`... userCheckpointSessionCode Function deployHash: ${userCheckpointSessionCodeDeployHash}`);

  await getDeploy(NODE_ADDRESS!, userCheckpointSessionCodeDeployHash);

  console.log(`... userCheckpointSessionCode Function called successfully through sessionCode.`);

};
//userCheckpointSessionCode();

const claimableTokensSessionCode = async () => {
  const liquidityGaugeReward = new LIQUIDITYGAUGEREWARDClient(
    NODE_ADDRESS!,
    CHAIN_NAME!,
    EVENT_STREAM_ADDRESS!
  );

  const claimableTokensSessionCodeDeployHash = await liquidityGaugeReward.claimableTokensSessionCode(
    KEYS,
    "claimable_tokens",
    LIQUIDITY_GAUGE_REWARD_PACKAGE_HASH!,
    KEYS.publicKey!,
    LIQUIDITY_GAUGE_REWARD_INSTALL_PAYMENT_AMOUNT!,
    LIQUIDITY_GAUGE_REWARD_PROXY_WASM_PATH!
  );

  console.log(`... claimableTokensSessionCode Function deployHash: ${claimableTokensSessionCodeDeployHash}`);

  await getDeploy(NODE_ADDRESS!, claimableTokensSessionCodeDeployHash);

  console.log(`... claimableTokensSessionCode Function called successfully through sessionCode.`);

};
//claimableTokensSessionCode();

const claimableRewardSessionCode = async () => {
  const liquidityGaugeReward = new LIQUIDITYGAUGEREWARDClient(
    NODE_ADDRESS!,
    CHAIN_NAME!,
    EVENT_STREAM_ADDRESS!
  );

  const claimableRewardSessionCodeDeployHash = await liquidityGaugeReward.claimableRewardSessionCode(
    KEYS,
    "claimable_reward",
    LIQUIDITY_GAUGE_REWARD_PACKAGE_HASH!,
    KEYS.publicKey!,
    LIQUIDITY_GAUGE_REWARD_INSTALL_PAYMENT_AMOUNT!,
    LIQUIDITY_GAUGE_REWARD_PROXY_WASM_PATH!
  );

  console.log(`... claimableRewardSessionCode Function deployHash: ${claimableRewardSessionCodeDeployHash}`);

  await getDeploy(NODE_ADDRESS!, claimableRewardSessionCodeDeployHash);

  console.log(`... claimableRewardSessionCode Function called successfully through sessionCode.`);

};
//claimableRewardSessionCode();

const integrateCheckpointSessionCode = async () => {
  const liquidityGaugeReward = new LIQUIDITYGAUGEREWARDClient(
    NODE_ADDRESS!,
    CHAIN_NAME!,
    EVENT_STREAM_ADDRESS!
  );

  const integrateCheckpointSessionCodeDeployHash = await liquidityGaugeReward.integrateCheckpointSessionCode(
    KEYS,
    "integrate_checkpoint",
    LIQUIDITY_GAUGE_REWARD_PACKAGE_HASH!,
    LIQUIDITY_GAUGE_REWARD_INSTALL_PAYMENT_AMOUNT!,
    LIQUIDITY_GAUGE_REWARD_PROXY_WASM_PATH!
  );

  console.log(`... integrateCheckpointSessionCode Function deployHash: ${integrateCheckpointSessionCodeDeployHash}`);

  await getDeploy(NODE_ADDRESS!, integrateCheckpointSessionCodeDeployHash);

  console.log(`... integrateCheckpointSessionCode Function called successfully through sessionCode.`);

};
//integrateCheckpointSessionCode();

