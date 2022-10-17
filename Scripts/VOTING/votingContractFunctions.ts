import { config } from "dotenv";
config();
import { VOTINGClient } from "../../JsClients/VOTING/src";
import { getDeploy } from "./utils";
import { CLValueBuilder, Keys } from "casper-js-sdk";

const {
	CHAIN_NAME,
	NODE_ADDRESS,
	EVENT_STREAM_ADDRESS,
	MASTER_KEY_PAIR_PATH,
	CONTRACT_HASH,
	PACKAGE_HASH,
	SESSION_WASM_PATH,
	CHANGE_SUPPORT_REQUIRED_PCT_PAYMENT_AMOUNT,
	CHANGE_MIN_ACCEPT_QUORUM_PCT_PAYMENT_AMOUNT,
	SET_MIN_BALANCE_PAYMENT_AMOUNT,
	SET_MIN_TIME_PAYMENT_AMOUNT,
	ADD_ROLE_PAYMENT_AMOUNT,
	HAS_ROLE_PAYMENT_AMOUNT,
	GET_ROLE_PAYMENT_AMOUNT,
	CAN_EXECUTE_PAYMENT_AMOUNT,
	CAN_CREATE_NEW_VOTE_PAYMENT_AMOUNT,
	VOTE_PCT_PAYMENT_AMOUNT,
	VOTE_PAYMENT_AMOUNT,
	CAN_VOTE_PAYMENT_AMOUNT,
	SUPPORT_REQUIRED_PCT,
	MIN_ACCEPT_QUORUM_PCT,
	MIN_BALANCE,
	MIN_TIME,
	USER,
	ROLE,
	VOTE_ID,
	YEA_PCT,
	NAY_PCT,
	SENDER,
	VOTER,
	EXECUTION_SCRIPT_ENTRYPOINT,
	EXECUTION_SCRIPT_PACKAGE,
	METADATA,
} = process.env;

const KEYS = Keys.Ed25519.parseKeyFiles(
	`${MASTER_KEY_PAIR_PATH}/public_key.pem`,
	`${MASTER_KEY_PAIR_PATH}/secret_key.pem`
);

const voting = new VOTINGClient(
	NODE_ADDRESS!,
	CHAIN_NAME!,
	EVENT_STREAM_ADDRESS!
);

const test = async () => {
	// We don't need hash- prefix so i'm removing it
	await voting.setContractHash(CONTRACT_HASH!);
	console.log("Voting contract Hash: ", CONTRACT_HASH!);

	/* Change Support Required Pct */
	const changeSupportRequiredPct = await voting.changeSupportRequiredPct(
		KEYS,
		CHANGE_SUPPORT_REQUIRED_PCT_PAYMENT_AMOUNT!,
		SUPPORT_REQUIRED_PCT!
	);
	console.log("... changeSupportRequiredPct deploy hash: ", changeSupportRequiredPct);
	await getDeploy(NODE_ADDRESS!, changeSupportRequiredPct);
	console.log("... changeSupportRequiredPct called successfully");

	/* Change Min Accept Quorum Pct */
	const changeMinAcceptQuorumPct = await voting.changeMinAcceptQuorumPct(
		KEYS,
		CHANGE_MIN_ACCEPT_QUORUM_PCT_PAYMENT_AMOUNT!,
		MIN_ACCEPT_QUORUM_PCT!
	);
	console.log("... changeMinAcceptQuorumPct deploy hash: ", changeMinAcceptQuorumPct);
	await getDeploy(NODE_ADDRESS!, changeMinAcceptQuorumPct);
	console.log("... changeMinAcceptQuorumPct called successfully");

	/* Set Min Balance */
	const setMinBalance = await voting.setMinBalance(
		KEYS,
		SET_MIN_BALANCE_PAYMENT_AMOUNT!,
		MIN_BALANCE!
	);
	console.log("... setMinBalance deploy hash: ", setMinBalance);
	await getDeploy(NODE_ADDRESS!, setMinBalance);
	console.log("... setMinBalance called successfully");

	/* Set Min Time */
	const setMinTime = await voting.setMinTime(
		KEYS,
		SET_MIN_TIME_PAYMENT_AMOUNT!,
		MIN_TIME!
	);
	console.log("... setMinTime deploy hash: ", setMinTime);
	await getDeploy(NODE_ADDRESS!, setMinTime);
	console.log("... setMinTime called successfully");

	/* Add Role */
	const addRole = await voting.addRole(
		KEYS,
		ADD_ROLE_PAYMENT_AMOUNT!,
		USER!,
		ROLE!
	);
	console.log("... addRole deploy hash: ", addRole);
	await getDeploy(NODE_ADDRESS!, addRole);
	console.log("... addRole called successfully");

	/* Vote PCT */
	let executesIfDecided = true;
	const votePct = await voting.votePct(
		KEYS,
		VOTE_PCT_PAYMENT_AMOUNT!,
		VOTE_ID!,
		YEA_PCT!,
		NAY_PCT!,
		executesIfDecided,
	);
	console.log("... votePct deploy hash: ", votePct);
	await getDeploy(NODE_ADDRESS!, votePct);
	console.log("... votePct called successfully");

	/* Vote */
	let voteData = [YEA_PCT!, NAY_PCT!, VOTE_ID!];
	let supports: boolean = true;
	let _executesIfDecided: boolean = true;
	const vote = await voting.vote(
		KEYS,
		VOTE_PAYMENT_AMOUNT!,
		voteData,
		supports,
		_executesIfDecided,
	);
	console.log("... vote deploy hash: ", vote);
	await getDeploy(NODE_ADDRESS!, vote);
	console.log("... vote called successfully");

	/* Execute Vote */
	const executeVote = await voting.executeVote(
		KEYS,
		VOTE_PAYMENT_AMOUNT!,
		VOTE_ID!
	);
	console.log("... executeVote deploy hash: ", executeVote);
	await getDeploy(NODE_ADDRESS!, executeVote);
	console.log("... executeVote called successfully");

	// --- SESSION CALLS --- //

	/* Has Role */
	const hasRole = await voting.hasRole(
		KEYS,
		PACKAGE_HASH!,
		SESSION_WASM_PATH!,
		HAS_ROLE_PAYMENT_AMOUNT!,
		USER!,
		ROLE!
	);
	console.log("... hasRole deploy hash: ", hasRole);
	await getDeploy(NODE_ADDRESS!, hasRole);
	console.log("... hasRole called successfully");

	/* Get Role */
	const getRole = await voting.getRole(
		KEYS,
		PACKAGE_HASH!,
		SESSION_WASM_PATH!,
		GET_ROLE_PAYMENT_AMOUNT!,
		USER!
	);
	console.log("... getRole deploy hash: ", getRole);
	await getDeploy(NODE_ADDRESS!, getRole);
	console.log("... getRole called successfully");

	/* Can Execute */
	const canExecute = await voting.canExecute(
		KEYS,
		PACKAGE_HASH!,
		SESSION_WASM_PATH!,
		CAN_EXECUTE_PAYMENT_AMOUNT!,
		VOTE_ID!
	);
	console.log("... canExecute deploy hash: ", canExecute);
	await getDeploy(NODE_ADDRESS!, canExecute);
	console.log("... canExecute called successfully");

	/* Can Create New Vote */
	const canCreateNewVote = await voting.canCreateNewVote(
		KEYS,
		PACKAGE_HASH!,
		SESSION_WASM_PATH!,
		CAN_CREATE_NEW_VOTE_PAYMENT_AMOUNT!,
		SENDER!
	);
	console.log("... canCreateNewVote deploy hash: ", canCreateNewVote);
	await getDeploy(NODE_ADDRESS!, canCreateNewVote);
	console.log("... canCreateNewVote called successfully");

	/* Can Vote */
	const canVote = await voting.canVote(
		KEYS,
		PACKAGE_HASH!,
		SESSION_WASM_PATH!,
		CAN_VOTE_PAYMENT_AMOUNT!,
		VOTE_ID!,
		VOTER!,
	);
	console.log("... canVote deploy hash: ", canVote);
	await getDeploy(NODE_ADDRESS!, canVote);
	console.log("... canVote called successfully");

	/* New Vote */
	const newVote = await voting.newVote(
		KEYS,
		PACKAGE_HASH!,
		SESSION_WASM_PATH!,
		CAN_VOTE_PAYMENT_AMOUNT!,
		EXECUTION_SCRIPT_ENTRYPOINT!,
		EXECUTION_SCRIPT_PACKAGE!,
		// EXAMPLE RUNTIMEARGS
		[CLValueBuilder.tuple2([
			CLValueBuilder.string("Key"),
			CLValueBuilder.string("Value"),
		]),
		CLValueBuilder.tuple2([
			CLValueBuilder.string("Key"),
			CLValueBuilder.string("Value"),
		])],
		METADATA!,
	);
	console.log("... newVote deploy hash: ", newVote);
	await getDeploy(NODE_ADDRESS!, newVote);
	console.log("... newVote called successfully");

	/* New Vote _ */
	const newVote_ = await voting.newVote_(
		KEYS,
		PACKAGE_HASH!,
		SESSION_WASM_PATH!,
		CAN_VOTE_PAYMENT_AMOUNT!,
		EXECUTION_SCRIPT_ENTRYPOINT!,
		EXECUTION_SCRIPT_PACKAGE!,
		// EXAMPLE RUNTIMEARGS
		[CLValueBuilder.tuple2([
			CLValueBuilder.string("Key"),
			CLValueBuilder.string("Value"),
		]),
		CLValueBuilder.tuple2([
			CLValueBuilder.string("Key"),
			CLValueBuilder.string("Value"),
		])],
		METADATA!,
		true,
		true
	);
	console.log("... newVote_ deploy hash: ", newVote_);
	await getDeploy(NODE_ADDRESS!, newVote_);
	console.log("... newVote_ called successfully");

	/* Get Vote */
	const getVote = await voting.getVote(
		KEYS,
		PACKAGE_HASH!,
		SESSION_WASM_PATH!,
		CAN_VOTE_PAYMENT_AMOUNT!,
		VOTE_ID!
	);
	console.log("... getVote deploy hash: ", getVote);
	await getDeploy(NODE_ADDRESS!, getVote);
	console.log("... getVote called successfully");

	/* Get Voter State */
	const getVoterState = await voting.getVoterState(
		KEYS,
		PACKAGE_HASH!,
		SESSION_WASM_PATH!,
		CAN_VOTE_PAYMENT_AMOUNT!,
		VOTE_ID!,
		VOTER!
	);
	console.log("... getVoterState deploy hash: ", getVoterState);
	await getDeploy(NODE_ADDRESS!, getVoterState);
	console.log("... getVoterState called successfully");
};

// test();