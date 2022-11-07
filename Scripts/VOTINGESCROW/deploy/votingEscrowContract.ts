import { config } from "dotenv";
config();
import { VOTINGESCROWClient, utils } from "../../../JsClients/VOTINGESCROW/src";
import { parseTokenMeta, sleep, getDeploy } from "./utils";

import {
  Keys,
} from "casper-js-sdk";
const {
  NODE_ADDRESS,
  EVENT_STREAM_ADDRESS,
  CHAIN_NAME,
  VOTING_ESCROW_WASM_PATH,
  VOTING_ESCROW_MASTER_KEY_PAIR_PATH,
  VOTING_ESCROW_INSTALL_PAYMENT_AMOUNT,
  VOTING_ESCROW_NAME,
  VOTING_ESCROW_SYMBOL,
  VOTING_ESCROW_VERSION,
  ERC20CRV_PACKAGE_HASH,
  VOTING_ESCROW_CONTRACT_NAME,
  VOTING_ESCROW_PACKAGE_HASH,
  VOTING_ESCROW_PROXY_WASM_PATH,
  VOTING_ESCROW_T,
  VOTING_ESCROW_TIME,
  VOTING_ESCROW_IDX,
} = process.env;

const KEYS = Keys.Ed25519.parseKeyFiles(
  `${VOTING_ESCROW_MASTER_KEY_PAIR_PATH}/public_key.pem`,
  `${VOTING_ESCROW_MASTER_KEY_PAIR_PATH}/secret_key.pem`
);

const deploy = async () => {
  const votingEscrow = new VOTINGESCROWClient(
    NODE_ADDRESS!,
    CHAIN_NAME!,
    EVENT_STREAM_ADDRESS!
  );

  const installDeployHash = await votingEscrow.install(
    KEYS,
    ERC20CRV_PACKAGE_HASH!,
    VOTING_ESCROW_NAME!,
    VOTING_ESCROW_SYMBOL!,
    VOTING_ESCROW_VERSION!,
    VOTING_ESCROW_CONTRACT_NAME!,
    VOTING_ESCROW_INSTALL_PAYMENT_AMOUNT!,
    VOTING_ESCROW_WASM_PATH!
  );

  console.log(`... Contract installation deployHash: ${installDeployHash}`);

  await getDeploy(NODE_ADDRESS!, installDeployHash);

  console.log(`... Contract installed successfully.`);

  let accountInfo = await utils.getAccountInfo(NODE_ADDRESS!, KEYS.publicKey);

  console.log(`... Account Info: `);
  console.log(JSON.stringify(accountInfo, null, 2));

  const contractHash = await utils.getAccountNamedKeyValue(
    accountInfo,
    `${VOTING_ESCROW_CONTRACT_NAME!}_contract_hash`
  );

  console.log(`... Contract Hash: ${contractHash}`);

  const packageHash = await utils.getAccountNamedKeyValue(
    accountInfo,
    `${VOTING_ESCROW_CONTRACT_NAME!}_package_hash`
  );

  console.log(`... Package Hash: ${packageHash}`);
};

//deploy();

const getLastUserSlopeSessionCode = async () => {
  const votingEscrow = new VOTINGESCROWClient(
    NODE_ADDRESS!,
    CHAIN_NAME!,
    EVENT_STREAM_ADDRESS!
  );

  const getLastUserSlopeSessionCodeDeployHash = await votingEscrow.getLastUserSlopeSessionCode(
    KEYS,
    "get_last_user_slope",
    VOTING_ESCROW_PACKAGE_HASH!,
    KEYS.publicKey!,
    VOTING_ESCROW_INSTALL_PAYMENT_AMOUNT!,
    VOTING_ESCROW_PROXY_WASM_PATH!
  );

  console.log(`... getLastUserSlopeSessionCode Function deployHash: ${getLastUserSlopeSessionCodeDeployHash}`);

  await getDeploy(NODE_ADDRESS!, getLastUserSlopeSessionCodeDeployHash);

  console.log(`... getLastUserSlopeSessionCode Function called successfully through sessionCode.`);

};
//getLastUserSlopeSessionCode();

const userPointHistoryTsSessionCode = async () => {
  const votingEscrow = new VOTINGESCROWClient(
    NODE_ADDRESS!,
    CHAIN_NAME!,
    EVENT_STREAM_ADDRESS!
  );

  const userPointHistoryTsSessionCodeDeployHash = await votingEscrow.userPointHistoryTsSessionCode(
    KEYS,
    "user_point_history_ts",
    VOTING_ESCROW_PACKAGE_HASH!,
    KEYS.publicKey!,
    VOTING_ESCROW_IDX!,
    VOTING_ESCROW_INSTALL_PAYMENT_AMOUNT!,
    VOTING_ESCROW_PROXY_WASM_PATH!
  );

  console.log(`... userPointHistoryTsSessionCode Function deployHash: ${userPointHistoryTsSessionCodeDeployHash}`);

  await getDeploy(NODE_ADDRESS!, userPointHistoryTsSessionCodeDeployHash);

  console.log(`... userPointHistoryTsSessionCode Function called successfully through sessionCode.`);

};
//userPointHistoryTsSessionCode();

const lockedEndSessionCode = async () => {
  const votingEscrow = new VOTINGESCROWClient(
    NODE_ADDRESS!,
    CHAIN_NAME!,
    EVENT_STREAM_ADDRESS!
  );

  const lockedEndSessionCodeDeployHash = await votingEscrow.lockedEndSessionCode(
    KEYS,
    "locked_end",
    VOTING_ESCROW_PACKAGE_HASH!,
    KEYS.publicKey!,
    VOTING_ESCROW_INSTALL_PAYMENT_AMOUNT!,
    VOTING_ESCROW_PROXY_WASM_PATH!
  );

  console.log(`... lockedEndSessionCode Function deployHash: ${lockedEndSessionCodeDeployHash}`);

  await getDeploy(NODE_ADDRESS!, lockedEndSessionCodeDeployHash);

  console.log(`... lockedEndSessionCode Function called successfully through sessionCode.`);

};
//lockedEndSessionCode();

const balanceOfSessionCode = async () => {
  const votingEscrow = new VOTINGESCROWClient(
    NODE_ADDRESS!,
    CHAIN_NAME!,
    EVENT_STREAM_ADDRESS!
  );

  const balanceOfSessionCodeDeployHash = await votingEscrow.balanceOfSessionCode(
    KEYS,
    "balance_of",
    VOTING_ESCROW_PACKAGE_HASH!,
    KEYS.publicKey!,
    VOTING_ESCROW_T!,
    VOTING_ESCROW_INSTALL_PAYMENT_AMOUNT!,
    VOTING_ESCROW_PROXY_WASM_PATH!
  );

  console.log(`... balanceOfSessionCode Function deployHash: ${balanceOfSessionCodeDeployHash}`);

  await getDeploy(NODE_ADDRESS!, balanceOfSessionCodeDeployHash);

  console.log(`... balanceOfSessionCode Function called successfully through sessionCode.`);

};

const balanceOfATSessionCode = async () => {
  const votingEscrow = new VOTINGESCROWClient(
    NODE_ADDRESS!,
    CHAIN_NAME!,
    EVENT_STREAM_ADDRESS!
  );

  const balanceOfAtSessionCodeDeployHash = await votingEscrow.balanceOfAtSessionCode(
    KEYS,
    "balance_of_at",
    VOTING_ESCROW_PACKAGE_HASH!,
    KEYS.publicKey!,
    VOTING_ESCROW_TIME!,
    VOTING_ESCROW_INSTALL_PAYMENT_AMOUNT!,
    VOTING_ESCROW_PROXY_WASM_PATH!
  );

  console.log(`... balanceOfAtSessionCode Function deployHash: ${balanceOfAtSessionCodeDeployHash}`);

  await getDeploy(NODE_ADDRESS!, balanceOfAtSessionCodeDeployHash);

  console.log(`... balanceOfAtSessionCode Function called successfully through sessionCode.`);

};

const totalSupplySessionCode = async () => {
  const votingEscrow = new VOTINGESCROWClient(
    NODE_ADDRESS!,
    CHAIN_NAME!,
    EVENT_STREAM_ADDRESS!
  );

  const totalSupplySessionCodeDeployHash = await votingEscrow.totalSupplySessionCode(
    KEYS,
    "total_supply",
    VOTING_ESCROW_PACKAGE_HASH!,
    VOTING_ESCROW_T!,
    VOTING_ESCROW_INSTALL_PAYMENT_AMOUNT!,
    VOTING_ESCROW_PROXY_WASM_PATH!
  );

  console.log(`... totalSupplySessionCode Function deployHash: ${totalSupplySessionCodeDeployHash}`);

  await getDeploy(NODE_ADDRESS!, totalSupplySessionCodeDeployHash);

  console.log(`... totalSupplySessionCode Function called successfully through sessionCode.`);

};

const totalSupplyAtSessionCode = async () => {
  const votingEscrow = new VOTINGESCROWClient(
    NODE_ADDRESS!,
    CHAIN_NAME!,
    EVENT_STREAM_ADDRESS!
  );

  const totalSupplyAtSessionCodeDeployHash = await votingEscrow.totalSupplyAtSessionCode(
    KEYS,
    "total_supply_at",
    VOTING_ESCROW_PACKAGE_HASH!,
    VOTING_ESCROW_TIME!,
    VOTING_ESCROW_INSTALL_PAYMENT_AMOUNT!,
    VOTING_ESCROW_PROXY_WASM_PATH!
  );

  console.log(`... totalSupplyAtSessionCode Function deployHash: ${totalSupplyAtSessionCodeDeployHash}`);

  await getDeploy(NODE_ADDRESS!, totalSupplyAtSessionCodeDeployHash);

  console.log(`... totalSupplyAtSessionCode Function called successfully through sessionCode.`);

};