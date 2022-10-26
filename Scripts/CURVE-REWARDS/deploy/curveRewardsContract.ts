import { config } from "dotenv";
config();
import { CURVEREWARDSClient, utils } from "../../../JsClients/CURVE-REWARDS/src";
import { parseTokenMeta, sleep, getDeploy } from "./utils";

import {
  Keys,
} from "casper-js-sdk";

const {
  NODE_ADDRESS,
  EVENT_STREAM_ADDRESS,
  CHAIN_NAME,
  CURVE_REWARDS_MASTER_KEY_PAIR_PATH,
  CURVE_REWARDS_TOKEN,
  CURVE_REWARDS_REWARD,
  CURVE_REWARDS_CONTRACT_NAME,
  CURVE_REWARDS_INSTALL_PAYMENT_AMOUNT,
  CURVE_REWARDS_WASM_PATH,
  CURVE_REWARDS_PROXY_WASM_PATH,
  CURVE_REWARDS_PACKAGE_HASH
,
} = process.env;

const KEYS = Keys.Ed25519.parseKeyFiles(
  `${CURVE_REWARDS_MASTER_KEY_PAIR_PATH}/public_key.pem`,
  `${CURVE_REWARDS_MASTER_KEY_PAIR_PATH}/secret_key.pem`
);

const test = async () => {
  const curveRewards = new CURVEREWARDSClient(
    NODE_ADDRESS!,
    CHAIN_NAME!,
    EVENT_STREAM_ADDRESS!
  );

  const installDeployHash = await curveRewards.install(
    KEYS,
    CURVE_REWARDS_TOKEN!,
    CURVE_REWARDS_REWARD!,
    CURVE_REWARDS_CONTRACT_NAME!,
    CURVE_REWARDS_INSTALL_PAYMENT_AMOUNT!,
    CURVE_REWARDS_WASM_PATH!,
  );

  console.log(`... Contract installation deployHash: ${installDeployHash}`);

  await getDeploy(NODE_ADDRESS!, installDeployHash);

  console.log(`... Contract installed successfully.`);

  let accountInfo = await utils.getAccountInfo(NODE_ADDRESS!, KEYS.publicKey);

  console.log(`... Account Info: `);
  console.log(JSON.stringify(accountInfo, null, 2));

  const contractHash = await utils.getAccountNamedKeyValue(
    accountInfo,
    `${CURVE_REWARDS_CONTRACT_NAME!}_contract_hash`
  );

  console.log(`... Contract Hash: ${contractHash}`);

  const packageHash = await utils.getAccountNamedKeyValue(
    accountInfo,
    `${CURVE_REWARDS_CONTRACT_NAME!}_package_hash`
  );

  console.log(`... Package Hash: ${packageHash}`);
};

test();

const lastTimeRewardApplicableJsClientsessioncode = async () => {
  const curveRewards = new CURVEREWARDSClient(
    NODE_ADDRESS!,
    CHAIN_NAME!,
    EVENT_STREAM_ADDRESS!
  );

  const lastTimeRewardApplicableJsClientsessioncodeDeployHash = await curveRewards.lastTimeRewardApplicableJsClientsessioncode(
    KEYS,
    CURVE_REWARDS_PACKAGE_HASH!,
    "last_time_reward_applicable",
    CURVE_REWARDS_INSTALL_PAYMENT_AMOUNT!,
    CURVE_REWARDS_PROXY_WASM_PATH!
  );

  console.log(`... lastTimeRewardApplicableJsClientsessioncode Function deployHash: ${lastTimeRewardApplicableJsClientsessioncodeDeployHash}`);

  await getDeploy(NODE_ADDRESS!, lastTimeRewardApplicableJsClientsessioncodeDeployHash);

  console.log(`... lastTimeRewardApplicableJsClientsessioncode Function called successfully through sessionCode.`);

};

lastTimeRewardApplicableJsClientsessioncode();

const isOwnersessioncode = async () => {
  const curveRewards = new CURVEREWARDSClient(
    NODE_ADDRESS!,
    CHAIN_NAME!,
    EVENT_STREAM_ADDRESS!
  );

  const isOwnersessioncodeDeployHash = await curveRewards.isOwnersessioncode(
    KEYS,
    CURVE_REWARDS_PACKAGE_HASH!,
    "is_owner",
    CURVE_REWARDS_INSTALL_PAYMENT_AMOUNT!,
    CURVE_REWARDS_PROXY_WASM_PATH!
  );

  console.log(`... isOwnersessioncode Function deployHash: ${isOwnersessioncodeDeployHash}`);

  await getDeploy(NODE_ADDRESS!, isOwnersessioncodeDeployHash);

  console.log(`... isOwnersessioncode Function called successfully through sessionCode.`);

};

//isOwnersessioncode();

const rewardPerTokenJsClientsessioncode = async () => {
  const curveRewards = new CURVEREWARDSClient(
    NODE_ADDRESS!,
    CHAIN_NAME!,
    EVENT_STREAM_ADDRESS!
  );

  const rewardPerTokenJsClientsessioncodeDeployHash = await curveRewards.rewardPerTokenJsClientsessioncode(
    KEYS,
    CURVE_REWARDS_PACKAGE_HASH!,
    "reward_per_token",
    CURVE_REWARDS_INSTALL_PAYMENT_AMOUNT!,
    CURVE_REWARDS_PROXY_WASM_PATH!
  );

  console.log(`... rewardPerTokenJsClientsessioncode Function deployHash: ${rewardPerTokenJsClientsessioncodeDeployHash}`);

  await getDeploy(NODE_ADDRESS!, rewardPerTokenJsClientsessioncodeDeployHash);

  console.log(`... rewardPerTokenJsClientsessioncode Function called successfully through sessionCode.`);

};

rewardPerTokenJsClientsessioncode();

const earnedJsClientsessioncode = async () => {
  const curveRewards = new CURVEREWARDSClient(
    NODE_ADDRESS!,
    CHAIN_NAME!,
    EVENT_STREAM_ADDRESS!
  );

  const earnedJsClientsessioncodeDeployHash = await curveRewards.earnedJsClientsessioncode(
    KEYS,
    CURVE_REWARDS_PACKAGE_HASH!,
    "earned",
    KEYS.publicKey,
    CURVE_REWARDS_INSTALL_PAYMENT_AMOUNT!,
    CURVE_REWARDS_PROXY_WASM_PATH!
  );

  console.log(`... earnedJsClientsessioncode Function deployHash: ${earnedJsClientsessioncodeDeployHash}`);

  await getDeploy(NODE_ADDRESS!, earnedJsClientsessioncodeDeployHash);

  console.log(`... earnedJsClientsessioncode Function called successfully through sessionCode.`);

};

earnedJsClientsessioncode();
