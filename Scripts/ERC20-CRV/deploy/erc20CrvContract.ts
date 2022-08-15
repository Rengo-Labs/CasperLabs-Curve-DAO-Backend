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
  TOKEN_NAME,
  TOKEN_SYMBOL,
  DECIMALS,
  ERC20CRV_CONTRACT_NAME,
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
    TOKEN_NAME!,
    TOKEN_SYMBOL!,
    DECIMALS!,
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

test();
