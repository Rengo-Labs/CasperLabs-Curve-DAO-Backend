import { config } from "dotenv";
config();
import { VESTINGESCROWFACTORYClient, utils } from "../../../JsClients/VESTINGESCROWFACTORY/src";
import { parseTokenMeta, sleep, getDeploy } from "./utils";

import {
  Keys,
} from "casper-js-sdk";

const {
  NODE_ADDRESS,
  EVENT_STREAM_ADDRESS,
  CHAIN_NAME,
  VESTING_ESCROW_FACTORY_WASM_PATH,
  VESTING_ESCROW_FACTORY_MASTER_KEY_PAIR_PATH,
  VESTING_ESCROW_FACTORY_INSTALL_PAYMENT_AMOUNT,
  VESTING_ESCROW_FACTORY_TARGET,
  VESTING_ESCROW_FACTORY_CONTRACT_NAME,
  VESTING_ESCROW_FACTORY_PACKAGE_HASH,
  VESTING_ESCROW_FACTORY_RECIPIENT,
  VESTING_ESCROW_FACTORY_PROXY_WASM_PATH,
  VESTING_ESCROW_FACTORY_ADDR,
} = process.env;

const KEYS = Keys.Ed25519.parseKeyFiles(
  `${VESTING_ESCROW_FACTORY_MASTER_KEY_PAIR_PATH}/public_key.pem`,
  `${VESTING_ESCROW_FACTORY_MASTER_KEY_PAIR_PATH}/secret_key.pem`
);

const test = async () => {
  const vestingEscrowFactory = new VESTINGESCROWFACTORYClient(
    NODE_ADDRESS!,
    CHAIN_NAME!,
    EVENT_STREAM_ADDRESS!
  );

  const installDeployHash = await vestingEscrowFactory.install(
    KEYS,
    VESTING_ESCROW_FACTORY_TARGET!,
    KEYS.publicKey,
    VESTING_ESCROW_FACTORY_CONTRACT_NAME!,
    VESTING_ESCROW_FACTORY_INSTALL_PAYMENT_AMOUNT!,
    VESTING_ESCROW_FACTORY_WASM_PATH!

  );

  console.log(`... Contract installation deployHash: ${installDeployHash}`);

  await getDeploy(NODE_ADDRESS!, installDeployHash);

  console.log(`... Contract installed successfully.`);

  let accountInfo = await utils.getAccountInfo(NODE_ADDRESS!, KEYS.publicKey);

  console.log(`... Account Info: `);
  console.log(JSON.stringify(accountInfo, null, 2));

  const contractHash = await utils.getAccountNamedKeyValue(
    accountInfo,
    `${VESTING_ESCROW_FACTORY_CONTRACT_NAME!}_contract_hash`
  );

  console.log(`... Contract Hash: ${contractHash}`);

  const packageHash = await utils.getAccountNamedKeyValue(
    accountInfo,
    `${VESTING_ESCROW_FACTORY_CONTRACT_NAME!}_package_hash`
  );

  console.log(`... Package Hash: ${packageHash}`);
};

test();

const vestedOfSessionCode = async () => {
  const vestingEscrowFactory = new VESTINGESCROWFACTORYClient(
    NODE_ADDRESS!,
    CHAIN_NAME!,
    EVENT_STREAM_ADDRESS!
  );
  const vestedOfSessionCodeDeployHash = await vestingEscrowFactory.vestedOfSessionCode(
    KEYS,
    "vested_of",
    VESTING_ESCROW_FACTORY_PACKAGE_HASH!,
    VESTING_ESCROW_FACTORY_RECIPIENT!,
    VESTING_ESCROW_FACTORY_INSTALL_PAYMENT_AMOUNT!,
    VESTING_ESCROW_FACTORY_PROXY_WASM_PATH!
  );

  console.log(`... vestedOfSessionCode Function deployHash: ${vestedOfSessionCodeDeployHash}`);
  
  let result = await getDeploy(NODE_ADDRESS!, vestedOfSessionCodeDeployHash);

  console.log(`... vestedOfSessionCode Function called successfully through sessionCode.`);

  console.log("vestedOfSessionCode Function Result: ",result);

};
//vestedOfSessionCode();

const balanceOfSessionCode = async () => {
  const vestingEscrowFactory = new VESTINGESCROWFACTORYClient(
    NODE_ADDRESS!,
    CHAIN_NAME!,
    EVENT_STREAM_ADDRESS!
  );
  const balanceOfSessionCodeDeployHash = await vestingEscrowFactory.balanceOfSessionCode(
    KEYS,
    "balance_of",
    VESTING_ESCROW_FACTORY_PACKAGE_HASH!,
    VESTING_ESCROW_FACTORY_RECIPIENT!,
    VESTING_ESCROW_FACTORY_INSTALL_PAYMENT_AMOUNT!,
    VESTING_ESCROW_FACTORY_PROXY_WASM_PATH!
  );

  console.log(`... balanceOfSessionCode Function deployHash: ${balanceOfSessionCodeDeployHash}`);
  
  let result = await getDeploy(NODE_ADDRESS!, balanceOfSessionCodeDeployHash);

  console.log(`... balanceOfSessionCode Function called successfully through sessionCode.`);

  console.log("balanceOfSessionCode Function Result: ",result);

};
//balanceOfSessionCode();

const vestedSupplySessionCode = async () => {
  const vestingEscrowFactory = new VESTINGESCROWFACTORYClient(
    NODE_ADDRESS!,
    CHAIN_NAME!,
    EVENT_STREAM_ADDRESS!
  );
  const vestedSupplySessionCodeDeployHash = await vestingEscrowFactory.vestedSupplySessionCode(
    KEYS,
    "vested_supply",
    VESTING_ESCROW_FACTORY_PACKAGE_HASH!,
    VESTING_ESCROW_FACTORY_INSTALL_PAYMENT_AMOUNT!,
    VESTING_ESCROW_FACTORY_PROXY_WASM_PATH!
  );

  console.log(`... vestedSupplySessionCode Function deployHash: ${vestedSupplySessionCodeDeployHash}`);
  
  await getDeploy(NODE_ADDRESS!, vestedSupplySessionCodeDeployHash);

  console.log(`... vestedSupplySessionCode Function called successfully through sessionCode.`);

};
//vestedSupplySessionCode();

const lockedSupplySessionCode = async () => {
  const vestingEscrowFactory = new VESTINGESCROWFACTORYClient(
    NODE_ADDRESS!,
    CHAIN_NAME!,
    EVENT_STREAM_ADDRESS!
  );
  const lockedSupplySessionCodeDeployHash = await vestingEscrowFactory.lockedSupplySessionCode(
    KEYS,
    "locked_supply",
    VESTING_ESCROW_FACTORY_PACKAGE_HASH!,
    VESTING_ESCROW_FACTORY_INSTALL_PAYMENT_AMOUNT!,
    VESTING_ESCROW_FACTORY_PROXY_WASM_PATH!
  );

  console.log(`... lockedSupplySessionCode Function deployHash: ${lockedSupplySessionCodeDeployHash}`);
  
  await getDeploy(NODE_ADDRESS!, lockedSupplySessionCodeDeployHash);

  console.log(`... lockedSupplySessionCode Function called successfully through sessionCode.`);

};
//lockedSupplySessionCode();

const lockedOfSessionCode = async () => {
  const vestingEscrowFactory = new VESTINGESCROWFACTORYClient(
    NODE_ADDRESS!,
    CHAIN_NAME!,
    EVENT_STREAM_ADDRESS!
  );
  const lockedOfSessionCodeDeployHash = await vestingEscrowFactory.lockedOfSessionCode(
    KEYS,
    "locked_of",
    VESTING_ESCROW_FACTORY_PACKAGE_HASH!,
    VESTING_ESCROW_FACTORY_RECIPIENT!,
    VESTING_ESCROW_FACTORY_INSTALL_PAYMENT_AMOUNT!,
    VESTING_ESCROW_FACTORY_PROXY_WASM_PATH!
  );

  console.log(`... lockedOfSessionCode Function deployHash: ${lockedOfSessionCodeDeployHash}`);
  
  await getDeploy(NODE_ADDRESS!, lockedOfSessionCodeDeployHash);

  console.log(`... lockedOfSessionCode Function called successfully through sessionCode.`);

};
//lockedOfSessionCode();

const commitTransferOwnershipSessionCode = async () => {
  const vestingEscrowFactory = new VESTINGESCROWFACTORYClient(
    NODE_ADDRESS!,
    CHAIN_NAME!,
    EVENT_STREAM_ADDRESS!
  );
  const commitTransferOwnershipSessionCodeDeployHash = await vestingEscrowFactory.commitTransferOwnershipSessionCode(
    KEYS,
    "commit_transfer_owership",
    VESTING_ESCROW_FACTORY_PACKAGE_HASH!,
    VESTING_ESCROW_FACTORY_ADDR!,
    VESTING_ESCROW_FACTORY_INSTALL_PAYMENT_AMOUNT!,
    VESTING_ESCROW_FACTORY_PROXY_WASM_PATH!
  );

  console.log(`... commitTransferOwnershipSessionCode Function deployHash: ${commitTransferOwnershipSessionCodeDeployHash}`);
  
  await getDeploy(NODE_ADDRESS!, commitTransferOwnershipSessionCodeDeployHash);

  console.log(`... commitTransferOwnershipSessionCode Function called successfully through sessionCode.`);

};
//commitTransferOwnershipSessionCode();

const applyTransferOwnershipSessionCode = async () => {
  const vestingEscrowFactory = new VESTINGESCROWFACTORYClient(
    NODE_ADDRESS!,
    CHAIN_NAME!,
    EVENT_STREAM_ADDRESS!
  );
  const applyTransferOwnershipSessionCodeDeployHash = await vestingEscrowFactory.applyTransferOwnershipSessionCode(
    KEYS,
    "apply_transfer_ownership",
    VESTING_ESCROW_FACTORY_PACKAGE_HASH!,
    VESTING_ESCROW_FACTORY_INSTALL_PAYMENT_AMOUNT!,
    VESTING_ESCROW_FACTORY_PROXY_WASM_PATH!
  );

  console.log(`... applyTransferOwnershipSessionCode Function deployHash: ${applyTransferOwnershipSessionCodeDeployHash}`);
  
  await getDeploy(NODE_ADDRESS!, applyTransferOwnershipSessionCodeDeployHash);

  console.log(`... applyTransferOwnershipSessionCode Function called successfully through sessionCode.`);

};
//lockedSupplySessionCode();
