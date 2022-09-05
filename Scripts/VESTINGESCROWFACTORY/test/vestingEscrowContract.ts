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
  VESTING_ESCROW_FACTORY_CONTRACT_NAME
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
