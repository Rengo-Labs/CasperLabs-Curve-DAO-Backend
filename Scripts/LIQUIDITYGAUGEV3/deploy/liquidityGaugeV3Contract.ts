import { config } from "dotenv";
config();
import { LIQUIDITYGAUGEV3Client, utils } from "../../../JsClients/LIQUIDITYGAUGEV3/src";
import { parseTokenMeta, sleep, getDeploy } from "./utils";

import {
  Keys,
} from "casper-js-sdk";

const {
  NODE_ADDRESS,
  EVENT_STREAM_ADDRESS,
  CHAIN_NAME,
  LIQUIDITY_GAUGE_V3_WASM_PATH,
  LIQUIDITY_GAUGE_V3_MASTER_KEY_PAIR_PATH,
  LIQUIDITY_GAUGE_V3_INSTALL_PAYMENT_AMOUNT,
  LIQUIDITY_GAUGE_V3_LP_ADDR,
  LIQUIDITY_GAUGE_V3_MINTER,
  LIQUIDITY_GAUGE_V3_CONTRACT_NAME,

  LIQUIDITY_GAUGE_V3_PACKAGE_HASH,
  LIQUIDITY_GAUGE_V3_PROXY_WASM_PATH,
  LIQUIDITY_GAUGE_V3_ADDR,
  LIQUIDITY_GAUGE_V3_TOKEN,
  LIQUIDITY_GAUGE_V3_RECIPIENT,
  LIQUIDITY_GAUGE_V3_AMOUNT,
} = process.env;

const KEYS = Keys.Ed25519.parseKeyFiles(
  `${LIQUIDITY_GAUGE_V3_MASTER_KEY_PAIR_PATH}/public_key.pem`,
  `${LIQUIDITY_GAUGE_V3_MASTER_KEY_PAIR_PATH}/secret_key.pem`
);

const test = async () => {
  const liquidityGaugeV3 = new LIQUIDITYGAUGEV3Client(
    NODE_ADDRESS!,
    CHAIN_NAME!,
    EVENT_STREAM_ADDRESS!
  );

  const installDeployHash = await liquidityGaugeV3.install(
    KEYS,
    LIQUIDITY_GAUGE_V3_LP_ADDR!,
    LIQUIDITY_GAUGE_V3_MINTER!,
    KEYS.publicKey,
    LIQUIDITY_GAUGE_V3_CONTRACT_NAME!,
    LIQUIDITY_GAUGE_V3_INSTALL_PAYMENT_AMOUNT!,
    LIQUIDITY_GAUGE_V3_WASM_PATH!

  );

  console.log(`... Contract installation deployHash: ${installDeployHash}`);

  await getDeploy(NODE_ADDRESS!, installDeployHash);

  console.log(`... Contract installed successfully.`);

  let accountInfo = await utils.getAccountInfo(NODE_ADDRESS!, KEYS.publicKey);

  console.log(`... Account Info: `);
  console.log(JSON.stringify(accountInfo, null, 2));

  const contractHash = await utils.getAccountNamedKeyValue(
    accountInfo,
    `${LIQUIDITY_GAUGE_V3_CONTRACT_NAME!}_contract_hash`
  );

  console.log(`... Contract Hash: ${contractHash}`);

  const packageHash = await utils.getAccountNamedKeyValue(
    accountInfo,
    `${LIQUIDITY_GAUGE_V3_CONTRACT_NAME!}_package_hash`
  );

  console.log(`... Package Hash: ${packageHash}`);
};

test();

const userCheckpointSessionCode = async () => {
  const liquidityGaugeV3 = new LIQUIDITYGAUGEV3Client(
    NODE_ADDRESS!,
    CHAIN_NAME!,
    EVENT_STREAM_ADDRESS!
  );

  const userCheckpointSessionCodeDeployHash = await liquidityGaugeV3.userCheckpointSessionCode(
    KEYS,
    "user_checkpoint",
    LIQUIDITY_GAUGE_V3_PACKAGE_HASH!,
    KEYS.publicKey!,
    LIQUIDITY_GAUGE_V3_INSTALL_PAYMENT_AMOUNT!,
    LIQUIDITY_GAUGE_V3_PROXY_WASM_PATH!
  );

  console.log(`... userCheckpointSessionCode Function deployHash: ${userCheckpointSessionCodeDeployHash}`);

  await getDeploy(NODE_ADDRESS!, userCheckpointSessionCodeDeployHash);

  console.log(`... userCheckpointSessionCode Function called successfully through sessionCode.`);

};
//userCheckpointSessionCode();

const claimableTokensSessionCode = async () => {
  const liquidityGaugeV3 = new LIQUIDITYGAUGEV3Client(
    NODE_ADDRESS!,
    CHAIN_NAME!,
    EVENT_STREAM_ADDRESS!
  );

  const claimableTokensSessionCodeDeployHash = await liquidityGaugeV3.claimableTokensSessionCode(
    KEYS,
    "claimable_tokens",
    LIQUIDITY_GAUGE_V3_PACKAGE_HASH!,
    LIQUIDITY_GAUGE_V3_ADDR!,
    LIQUIDITY_GAUGE_V3_INSTALL_PAYMENT_AMOUNT!,
    LIQUIDITY_GAUGE_V3_PROXY_WASM_PATH!
  );

  console.log(`... claimableTokensSessionCode Function deployHash: ${claimableTokensSessionCodeDeployHash}`);

  await getDeploy(NODE_ADDRESS!, claimableTokensSessionCodeDeployHash);

  console.log(`... claimableTokensSessionCode Function called successfully through sessionCode.`);

};
//claimableTokensSessionCode();

const rewardContractSessionCode = async () => {
  const liquidityGaugeV3 = new LIQUIDITYGAUGEV3Client(
    NODE_ADDRESS!,
    CHAIN_NAME!,
    EVENT_STREAM_ADDRESS!
  );

  const rewardContractSessionCodeDeployHash = await liquidityGaugeV3.rewardContractSessionCode(
    KEYS,
    "reward_contract",
    LIQUIDITY_GAUGE_V3_PACKAGE_HASH!,
    LIQUIDITY_GAUGE_V3_INSTALL_PAYMENT_AMOUNT!,
    LIQUIDITY_GAUGE_V3_PROXY_WASM_PATH!
  );

  console.log(`... rewardContractSessionCode Function deployHash: ${rewardContractSessionCodeDeployHash}`);

  await getDeploy(NODE_ADDRESS!, rewardContractSessionCodeDeployHash);

  console.log(`... rewardContractSessionCode Function called successfully through sessionCode.`);

};
//rewardContractSessionCode();

const lastClaimSessionCode = async () => {
  const liquidityGaugeV3 = new LIQUIDITYGAUGEV3Client(
    NODE_ADDRESS!,
    CHAIN_NAME!,
    EVENT_STREAM_ADDRESS!
  );

  const lastClaimSessionCodeDeployHash = await liquidityGaugeV3.lastClaimSessionCode(
    KEYS,
    "last_claim",
    LIQUIDITY_GAUGE_V3_PACKAGE_HASH!,
    LIQUIDITY_GAUGE_V3_INSTALL_PAYMENT_AMOUNT!,
    LIQUIDITY_GAUGE_V3_PROXY_WASM_PATH!
  );

  console.log(`... lastClaimSessionCode Function deployHash: ${lastClaimSessionCodeDeployHash}`);

  await getDeploy(NODE_ADDRESS!, lastClaimSessionCodeDeployHash);

  console.log(`... lastClaimSessionCode Function called successfully through sessionCode.`);

};
//lastClaimSessionCode();

const claimableRewardSessionCode = async () => {
  const liquidityGaugeV3 = new LIQUIDITYGAUGEV3Client(
    NODE_ADDRESS!,
    CHAIN_NAME!,
    EVENT_STREAM_ADDRESS!
  );

  const claimableRewardSessionCodeDeployHash = await liquidityGaugeV3.claimableRewardSessionCode(
    KEYS,
    "claimable_reward",
    LIQUIDITY_GAUGE_V3_PACKAGE_HASH!,
    KEYS.publicKey!,
    LIQUIDITY_GAUGE_V3_TOKEN!,
    LIQUIDITY_GAUGE_V3_INSTALL_PAYMENT_AMOUNT!,
    LIQUIDITY_GAUGE_V3_PROXY_WASM_PATH!
  );

  console.log(`... claimableRewardSessionCode Function deployHash: ${claimableRewardSessionCodeDeployHash}`);

  await getDeploy(NODE_ADDRESS!, claimableRewardSessionCodeDeployHash);

  console.log(`... claimableRewardSessionCode Function called successfully through sessionCode.`);

};
//claimableRewardSessionCode();

const claimableRewardWriteSessionCode = async () => {
  const liquidityGaugeV3 = new LIQUIDITYGAUGEV3Client(
    NODE_ADDRESS!,
    CHAIN_NAME!,
    EVENT_STREAM_ADDRESS!
  );

  const claimableRewardWriteSessionCodeDeployHash = await liquidityGaugeV3.claimableRewardWriteSessionCode(
    KEYS,
    "claimable_reward_write",
    LIQUIDITY_GAUGE_V3_PACKAGE_HASH!,
    KEYS.publicKey!,
    LIQUIDITY_GAUGE_V3_TOKEN!,
    LIQUIDITY_GAUGE_V3_INSTALL_PAYMENT_AMOUNT!,
    LIQUIDITY_GAUGE_V3_PROXY_WASM_PATH!
  );

  console.log(`... claimableRewardWriteSessionCode Function deployHash: ${claimableRewardWriteSessionCodeDeployHash}`);

  await getDeploy(NODE_ADDRESS!, claimableRewardWriteSessionCodeDeployHash);

  console.log(`... claimableRewardWriteSessionCode Function called successfully through sessionCode.`);

};
//claimableRewardWriteSessionCode();

const transferSessionCode = async () => {
  const liquidityGaugeV3 = new LIQUIDITYGAUGEV3Client(
    NODE_ADDRESS!,
    CHAIN_NAME!,
    EVENT_STREAM_ADDRESS!
  );

  const transferSessionCodeDeployHash = await liquidityGaugeV3.transferSessionCode(
    KEYS,
    "transfer",
    LIQUIDITY_GAUGE_V3_PACKAGE_HASH!,
    LIQUIDITY_GAUGE_V3_RECIPIENT!,
    LIQUIDITY_GAUGE_V3_AMOUNT!,
    LIQUIDITY_GAUGE_V3_INSTALL_PAYMENT_AMOUNT!,
    LIQUIDITY_GAUGE_V3_PROXY_WASM_PATH!
  );

  console.log(`... transferSessionCode Function deployHash: ${transferSessionCodeDeployHash}`);

  await getDeploy(NODE_ADDRESS!, transferSessionCodeDeployHash);

  console.log(`... transferSessionCode Function called successfully through sessionCode.`);

};
//transferSessionCode();

const transferFromSessionCode = async () => {
  const liquidityGaugeV3 = new LIQUIDITYGAUGEV3Client(
    NODE_ADDRESS!,
    CHAIN_NAME!,
    EVENT_STREAM_ADDRESS!
  );

  const transferFromSessionCodeDeployHash = await liquidityGaugeV3.transferFromSessionCode(
    KEYS,
    "transfer_from",
    LIQUIDITY_GAUGE_V3_PACKAGE_HASH!,
    KEYS.publicKey!,
    LIQUIDITY_GAUGE_V3_RECIPIENT!,
    LIQUIDITY_GAUGE_V3_AMOUNT!,
    LIQUIDITY_GAUGE_V3_INSTALL_PAYMENT_AMOUNT!,
    LIQUIDITY_GAUGE_V3_PROXY_WASM_PATH!
  );

  console.log(`... transferFromSessionCode Function deployHash: ${transferFromSessionCodeDeployHash}`);

  await getDeploy(NODE_ADDRESS!, transferFromSessionCodeDeployHash);

  console.log(`... transferFromSessionCode Function called successfully through sessionCode.`);

};
//transferFromSessionCode();