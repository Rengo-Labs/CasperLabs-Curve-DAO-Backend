import { config } from "dotenv";
config();
import { CERC20Client, utils } from "../../../JsClients/CERC20/src";
import { parseTokenMeta, sleep, getDeploy } from "./utils";

import {
  Keys,
} from "casper-js-sdk";

const {
  NODE_ADDRESS,
  EVENT_STREAM_ADDRESS,
  CHAIN_NAME,
  CERC20_WASM_PATH,
  CERC20_MASTER_KEY_PAIR_PATH,
  CERC20_INSTALL_PAYMENT_AMOUNT,
  CERC20_CONTRACT_NAME,
  CERC20_TOKEN_NAME,
  CERC20_TOKEN_SYMBOL,
  CERC20_DECIMALS,
  CERC20_TOTAL_SUPPLY,
  UNDERLYING,
  COMPTROLLER,
  INTEREST_RATE_MODEL,
  INITIAL_EXCHANGE_RATE_MANTISSA,
} = process.env;

const KEYS = Keys.Ed25519.parseKeyFiles(
  `${CERC20_MASTER_KEY_PAIR_PATH}/public_key.pem`,
  `${CERC20_MASTER_KEY_PAIR_PATH}/secret_key.pem`
);

const deploy = async () => {
  const cerc20 = new CERC20Client(
    NODE_ADDRESS!,
    CHAIN_NAME!,
    EVENT_STREAM_ADDRESS!
  );

  const installDeployHash = await cerc20.install(
    KEYS,
    UNDERLYING!,
    COMPTROLLER!,
    INTEREST_RATE_MODEL!,
    INITIAL_EXCHANGE_RATE_MANTISSA!,
    CERC20_TOKEN_NAME!,
    CERC20_TOKEN_SYMBOL!,
    CERC20_DECIMALS!,
    CERC20_INSTALL_PAYMENT_AMOUNT!,
    CERC20_WASM_PATH!

  );

  console.log(`... Contract installation deployHash: ${installDeployHash}`);

  await getDeploy(NODE_ADDRESS!, installDeployHash);

  console.log(`... Contract installed successfully.`);

  let accountInfo = await utils.getAccountInfo(NODE_ADDRESS!, KEYS.publicKey);

  console.log(`... Account Info: `);
  console.log(JSON.stringify(accountInfo, null, 2));

  const contractHash = await utils.getAccountNamedKeyValue(
    accountInfo,
    `${CERC20_CONTRACT_NAME!}_contract_hash`
  );

  console.log(`... Contract Hash: ${contractHash}`);

  const packageHash = await utils.getAccountNamedKeyValue(
    accountInfo,
    `${CERC20_CONTRACT_NAME!}_package_hash`
  );

  console.log(`... Package Hash: ${packageHash}`);
};

deploy();
