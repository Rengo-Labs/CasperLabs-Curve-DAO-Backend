import { config } from "dotenv";
config();
import {
	VOTINGClient,
	utils,
} from "../../../JsClients/VOTING/src";
import { getDeploy } from "./utils";

import { Keys } from "casper-js-sdk";

const {
	NODE_ADDRESS,
	EVENT_STREAM_ADDRESS,
	CHAIN_NAME,
	WASM_PATH,
	MASTER_KEY_PAIR_PATH,
	INSTALL_PAYMENT_AMOUNT,
	CONTRACT_NAME,
	TOKEN,
	SUPPORT_REQUIRED_PCT,
	MIN_ACCEPT_QUORUM_PCT,
	VOTE_TIME,
	MIN_BALANCE,
	MIN_TIME,
	MIN_BALANCE_LOWER_LIMIT,
	MIN_BALANCE_UPPER_LIMIT,
	MIN_TIME_LOWER_LIMIT,
	MIN_TIME_UPPER_LIMIT,
} = process.env;

const KEYS = Keys.Ed25519.parseKeyFiles(
	`${MASTER_KEY_PAIR_PATH}/public_key.pem`,
	`${MASTER_KEY_PAIR_PATH}/secret_key.pem`
);

const test = async () => {
	const voting = new VOTINGClient(
		NODE_ADDRESS!,
		CHAIN_NAME!,
		EVENT_STREAM_ADDRESS!
	);

	const installDeployHash = await voting.install(
		KEYS,
		INSTALL_PAYMENT_AMOUNT!,
		WASM_PATH!,
		CONTRACT_NAME!,
		TOKEN!,
		SUPPORT_REQUIRED_PCT!,
		MIN_ACCEPT_QUORUM_PCT!,
		VOTE_TIME!,
		MIN_BALANCE!,
		MIN_TIME!,
		MIN_BALANCE_LOWER_LIMIT!,
		MIN_BALANCE_UPPER_LIMIT!,
		MIN_TIME_LOWER_LIMIT!,
		MIN_TIME_UPPER_LIMIT!,
	);

	console.log(`... Contract installation deployHash: ${installDeployHash}`);

	await getDeploy(NODE_ADDRESS!, installDeployHash);

	console.log(`... Contract installed successfully.`);

	let accountInfo = await utils.getAccountInfo(NODE_ADDRESS!, KEYS.publicKey);

	console.log(`... Account Info: `);
	console.log(JSON.stringify(accountInfo, null, 2));

	const contractHash = await utils.getAccountNamedKeyValue(
		accountInfo,
		`${CONTRACT_NAME!}_contract_hash`
	);

	console.log(`... Contract Hash: ${contractHash}`);

	const packageHash = await utils.getAccountNamedKeyValue(
		accountInfo,
		`${CONTRACT_NAME!}_package_hash`
	);

	console.log(`... Package Hash: ${packageHash}`);
};

test();
