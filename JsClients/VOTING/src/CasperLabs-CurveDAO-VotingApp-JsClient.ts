import {
	CasperClient,
	CLPublicKey,
	CLAccountHash,
	CLByteArray,
	CLKey,
	CLString,
	CLTypeBuilder,
	CLValue,
	CLValueBuilder,
	CLValueParsers,
	CLMap,
	DeployUtil,
	EventName,
	EventStream,
	Keys,
	RuntimeArgs,
	CLURef,
	decodeBase16,
	AccessRights,
	CLU256,
	CLTuple2,
	CLList,
} from "casper-js-sdk";
import { VotingEvents } from "./constants";
import * as utils from "./utils";
import { RecipientType, IPendingDeploy } from "./types";
import { concat } from "@ethersproject/bytes";
import blake from "blakejs";

class VOTINGClient {
	private contractName: string = "Voting";
	private contractHash: string = "";
	private contractPackageHash: string = "";

	private namedKeys: {
		getVote : string;
		balances: string;
		metadata: string;
		nonces: string;
		allowances: string;
		ownedTokens: string;
		owners: string;
		paused: string;
	};

	private isListening = false;
	private pendingDeploys: IPendingDeploy[] = [];

	constructor(
		private nodeAddress: string,
		private chainName: string,
		private eventStreamAddress?: string
	) {
		this.namedKeys = {
			getVote : "null",
			balances: "null",
			metadata: "null",
			nonces: "null",
			allowances: "null",
			ownedTokens: "null",
			owners: "null",
			paused: "null",
		};
	}

	public async install(
		keys: Keys.AsymmetricKey,
		paymentAmount: string,
		wasmPath: string,
		contractName: string,
		token: string,
		supportRequiredPct: string,
		minAcceptQuorumPct: string,
		voteTime: string,
		minBalance: string,
		minTime: string,
		minBalanceLowerLimit: string,
		minBalanceUpperLimit: string,
		minTimeLowerLimit: string,
		minTimeUpperLimit: string
	) {
		const tokenHash = new CLByteArray(
			Uint8Array.from(Buffer.from(token, "hex"))
		);
		const runtimeArgs = RuntimeArgs.fromMap({
			token: CLValueBuilder.key(tokenHash),
			support_required_pct: CLValueBuilder.u64(supportRequiredPct),
			min_accept_quorum_pct: CLValueBuilder.u64(minAcceptQuorumPct),
			vote_time: CLValueBuilder.u64(voteTime),
			min_balance: CLValueBuilder.u256(minBalance),
			min_time: CLValueBuilder.u256(minTime),
			min_balance_lower_limit: CLValueBuilder.u256(minBalanceLowerLimit),
			min_balance_upper_limit: CLValueBuilder.u256(minBalanceUpperLimit),
			min_time_lower_limit: CLValueBuilder.u256(minTimeLowerLimit),
			min_time_upper_limit: CLValueBuilder.u256(minTimeUpperLimit),
			contract_name: CLValueBuilder.string(contractName),
		});
		const deployHash = await installWasmFile({
			chainName: this.chainName,
			paymentAmount,
			nodeAddress: this.nodeAddress,
			keys,
			pathToContract: wasmPath,
			runtimeArgs,
		});
		if (deployHash !== null) {
			return deployHash;
		} else {
			throw Error("Problem with installation");
		}
	}

	public async setContractHash(hash: string) {
		const stateRootHash = await utils.getStateRootHash(this.nodeAddress);
		const contractData = await utils.getContractData(
			this.nodeAddress,
			stateRootHash,
			hash
		);
		const { contractPackageHash, namedKeys } = contractData.Contract!;
		this.contractHash = hash;
		this.contractPackageHash = contractPackageHash.replace(
			"contract-package-wasm",
			""
		);
		const LIST_OF_NAMED_KEYS = [
			"get_vote",
			"balances",
			"nonces",
			"allowances",
			`${this.contractName}_package_hash`,
			`${this.contractName}_package_hash_wrapped`,
			`${this.contractName}_contract_hash`,
			`${this.contractName}_contract_hash_wrapped`,
			`${this.contractName}_package_access_token`,
		];
		// @ts-ignore
		this.namedKeys = namedKeys.reduce((acc, val) => {
			if (LIST_OF_NAMED_KEYS.includes(val.name)) {
				return { ...acc, [utils.camelCased(val.name)]: val.key };
			}
			return acc;
		}, {});
	}

	public async changeSupportRequiredPct(
		keys: Keys.AsymmetricKey,
		paymentAmount: string,
		supportRequiredPct: string
	) {
		const runtimeArgs = RuntimeArgs.fromMap({
			support_required_pct: CLValueBuilder.u64(supportRequiredPct),
		});
		const deployHash = await contractCall({
			chainName: this.chainName,
			contractHash: this.contractHash,
			entryPoint: "support_required_pct",
			paymentAmount,
			nodeAddress: this.nodeAddress,
			keys: keys,
			runtimeArgs,
		});
		if (deployHash !== null) {
			return deployHash;
		} else {
			throw Error("Invalid Deploy");
		}
	}

	public async changeMinAcceptQuorumPct(
		keys: Keys.AsymmetricKey,
		paymentAmount: string,
		minAcceptQuorumPct: string
	) {
		const runtimeArgs = RuntimeArgs.fromMap({
			min_accept_quorum_pct: CLValueBuilder.u64(minAcceptQuorumPct),
		});
		const deployHash = await contractCall({
			chainName: this.chainName,
			contractHash: this.contractHash,
			entryPoint: "change_min_accept_quorum_pct",
			paymentAmount,
			nodeAddress: this.nodeAddress,
			keys: keys,
			runtimeArgs,
		});
		if (deployHash !== null) {
			return deployHash;
		} else {
			throw Error("Invalid Deploy");
		}
	}

	public async setMinBalance(
		keys: Keys.AsymmetricKey,
		paymentAmount: string,
		minBalance: string
	) {
		const runtimeArgs = RuntimeArgs.fromMap({
			min_balance: CLValueBuilder.u256(minBalance),
		});
		const deployHash = await contractCall({
			chainName: this.chainName,
			contractHash: this.contractHash,
			entryPoint: "set_min_balance",
			paymentAmount,
			nodeAddress: this.nodeAddress,
			keys: keys,
			runtimeArgs,
		});
		if (deployHash !== null) {
			return deployHash;
		} else {
			throw Error("Invalid Deploy");
		}
	}

	public async setMinTime(
		keys: Keys.AsymmetricKey,
		paymentAmount: string,
		minTime: string
	) {
		const runtimeArgs = RuntimeArgs.fromMap({
			min_time: CLValueBuilder.u256(minTime),
		});
		const deployHash = await contractCall({
			chainName: this.chainName,
			contractHash: this.contractHash,
			entryPoint: "set_min_time",
			paymentAmount,
			nodeAddress: this.nodeAddress,
			keys: keys,
			runtimeArgs,
		});
		if (deployHash !== null) {
			return deployHash;
		} else {
			throw Error("Invalid Deploy");
		}
	}

	public async addRole(
		keys: Keys.AsymmetricKey,
		paymentAmount: string,
		user: string,
		role: string
	) {
		const userHash = new CLByteArray(Uint8Array.from(Buffer.from(user, "hex")));
		const runtimeArgs = RuntimeArgs.fromMap({
			user: CLValueBuilder.key(userHash),
			role: CLValueBuilder.string(role),
		});
		const deployHash = await contractCall({
			chainName: this.chainName,
			contractHash: this.contractHash,
			entryPoint: "add_role",
			paymentAmount,
			nodeAddress: this.nodeAddress,
			keys: keys,
			runtimeArgs,
		});
		if (deployHash !== null) {
			return deployHash;
		} else {
			throw Error("Invalid Deploy");
		}
	}

	public async votePct(
		keys: Keys.AsymmetricKey,
		paymentAmount: string,
		voteId: string,
		yeaPct: string,
		nayPct: string,
		executesIfDecided: boolean
	) {
		const runtimeArgs = RuntimeArgs.fromMap({
			vote_id: CLValueBuilder.u256(voteId),
			yea_pct: CLValueBuilder.u256(yeaPct),
			nay_pct: CLValueBuilder.u256(nayPct),
			executes_if_decided: CLValueBuilder.bool(executesIfDecided),
		});
		const deployHash = await contractCall({
			chainName: this.chainName,
			contractHash: this.contractHash,
			entryPoint: "vote_pct",
			paymentAmount,
			nodeAddress: this.nodeAddress,
			keys: keys,
			runtimeArgs,
		});
		if (deployHash !== null) {
			return deployHash;
		} else {
			throw Error("Invalid Deploy");
		}
	}

	public async vote(
		keys: Keys.AsymmetricKey,
		paymentAmount: string,
		voteData: string[],
		supports: boolean,
		executesIfDecided: boolean
	) {
		const runtimeArgs = RuntimeArgs.fromMap({
			vote_data: CLValueBuilder.list([
				CLValueBuilder.u256(voteData.pop()!),
				CLValueBuilder.u256(voteData.pop()!),
				CLValueBuilder.u256(voteData.pop()!),
			]),
			supports: CLValueBuilder.bool(supports),
			executes_if_decided: CLValueBuilder.bool(executesIfDecided),
		});
		const deployHash = await contractCall({
			chainName: this.chainName,
			contractHash: this.contractHash,
			entryPoint: "vote",
			paymentAmount,
			nodeAddress: this.nodeAddress,
			keys: keys,
			runtimeArgs,
		});
		if (deployHash !== null) {
			return deployHash;
		} else {
			throw Error("Invalid Deploy");
		}
	}

	public async executeVote(
		keys: Keys.AsymmetricKey,
		paymentAmount: string,
		voteId: string
	) {
		const runtimeArgs = RuntimeArgs.fromMap({
			vote_id: CLValueBuilder.u256(voteId),
		});
		const deployHash = await contractCall({
			chainName: this.chainName,
			contractHash: this.contractHash,
			entryPoint: "execute_vote",
			paymentAmount,
			nodeAddress: this.nodeAddress,
			keys: keys,
			runtimeArgs,
		});
		if (deployHash !== null) {
			return deployHash;
		} else {
			throw Error("Invalid Deploy");
		}
	}

	public async hasRole(
		keys: Keys.AsymmetricKey,
		packageHash: string,
		sessionWasmPath: string,
		paymentAmount: string,
		user: string,
		role: string
	) {
		const votingPackageHash = new CLByteArray(
			Uint8Array.from(Buffer.from(packageHash, "hex"))
		);
		const userHash = new CLByteArray(Uint8Array.from(Buffer.from(user, "hex")));
		const runtimeArgs = RuntimeArgs.fromMap({
			package_hash: CLValueBuilder.key(votingPackageHash),
			entrypoint: CLValueBuilder.string("has_role"),
			user: CLValueBuilder.key(userHash),
			role: CLValueBuilder.string(role),
		});
		const deployHash = await installWasmFile({
			chainName: this.chainName,
			paymentAmount,
			nodeAddress: this.nodeAddress,
			keys,
			pathToContract: sessionWasmPath,
			runtimeArgs,
		});
		if (deployHash !== null) {
			return deployHash;
		} else {
			throw Error("Invalid Deploy");
		}
	}

	public async getRole(
		keys: Keys.AsymmetricKey,
		packageHash: string,
		sessionWasmPath: string,
		paymentAmount: string,
		user: string
	) {
		const votingPackageHash = new CLByteArray(
			Uint8Array.from(Buffer.from(packageHash, "hex"))
		);
		const userHash = new CLByteArray(Uint8Array.from(Buffer.from(user, "hex")));
		const runtimeArgs = RuntimeArgs.fromMap({
			package_hash: CLValueBuilder.key(votingPackageHash),
			entrypoint: CLValueBuilder.string("get_role"),
			user: CLValueBuilder.key(userHash),
		});
		const deployHash = await installWasmFile({
			chainName: this.chainName,
			paymentAmount,
			nodeAddress: this.nodeAddress,
			keys,
			pathToContract: sessionWasmPath,
			runtimeArgs,
		});
		if (deployHash !== null) {
			return deployHash;
		} else {
			throw Error("Invalid Deploy");
		}
	}

	public async canExecute(
		keys: Keys.AsymmetricKey,
		packageHash: string,
		sessionWasmPath: string,
		paymentAmount: string,
		voteId: string
	) {
		const votingPackageHash = new CLByteArray(
			Uint8Array.from(Buffer.from(packageHash, "hex"))
		);
		const runtimeArgs = RuntimeArgs.fromMap({
			package_hash: CLValueBuilder.key(votingPackageHash),
			entrypoint: CLValueBuilder.string("can_execute"),
			vote_id: CLValueBuilder.u256(voteId),
		});
		const deployHash = await installWasmFile({
			chainName: this.chainName,
			paymentAmount,
			nodeAddress: this.nodeAddress,
			keys,
			pathToContract: sessionWasmPath,
			runtimeArgs,
		});
		if (deployHash !== null) {
			return deployHash;
		} else {
			throw Error("Invalid Deploy");
		}
	}

	public async canCreateNewVote(
		keys: Keys.AsymmetricKey,
		packageHash: string,
		sessionWasmPath: string,
		paymentAmount: string,
		sender: string
	) {
		const votingPackageHash = new CLByteArray(
			Uint8Array.from(Buffer.from(packageHash, "hex"))
		);
		const senderHash = new CLByteArray(
			Uint8Array.from(Buffer.from(sender, "hex"))
		);
		const runtimeArgs = RuntimeArgs.fromMap({
			package_hash: CLValueBuilder.key(votingPackageHash),
			entrypoint: CLValueBuilder.string("can_create_new_vote"),
			sender: CLValueBuilder.key(senderHash),
		});
		const deployHash = await installWasmFile({
			chainName: this.chainName,
			paymentAmount,
			nodeAddress: this.nodeAddress,
			keys,
			pathToContract: sessionWasmPath,
			runtimeArgs,
		});
		if (deployHash !== null) {
			return deployHash;
		} else {
			throw Error("Invalid Deploy");
		}
	}

	public async canVote(
		keys: Keys.AsymmetricKey,
		packageHash: string,
		sessionWasmPath: string,
		paymentAmount: string,
		voteId: string,
		voter: string
	) {
		const votingPackageHash = new CLByteArray(
			Uint8Array.from(Buffer.from(packageHash, "hex"))
		);
		const voterHash = new CLByteArray(
			Uint8Array.from(Buffer.from(voter, "hex"))
		);
		const runtimeArgs = RuntimeArgs.fromMap({
			package_hash: CLValueBuilder.key(votingPackageHash),
			entrypoint: CLValueBuilder.string("can_vote"),
			vote_id: CLValueBuilder.u256(voteId),
			voter: CLValueBuilder.key(voterHash),
		});
		const deployHash = await installWasmFile({
			chainName: this.chainName,
			paymentAmount,
			nodeAddress: this.nodeAddress,
			keys,
			pathToContract: sessionWasmPath,
			runtimeArgs,
		});
		if (deployHash !== null) {
			return deployHash;
		} else {
			throw Error("Invalid Deploy");
		}
	}

	public async newVote(
		keys: Keys.AsymmetricKey,
		packageHash: string,
		sessionWasmPath: string,
		paymentAmount: string,
		executionScriptEntrypoint: string,
		executionScriptPackage: string,
		executionScriptRuntimeArgs: CLTuple2[],
		metadata: string
	) {
		const votingPackageHash = new CLByteArray(
			Uint8Array.from(Buffer.from(packageHash, "hex"))
		);
		const executionScriptPackageHash = new CLByteArray(
			Uint8Array.from(Buffer.from(executionScriptPackage, "hex"))
		);
		const runtimeArgs = RuntimeArgs.fromMap({
			package_hash: CLValueBuilder.key(votingPackageHash),
			entrypoint: CLValueBuilder.string("new_vote"),
			execution_script: CLValueBuilder.tuple3([
				CLValueBuilder.string(executionScriptEntrypoint),
				CLValueBuilder.key(executionScriptPackageHash),
				CLValueBuilder.list(executionScriptRuntimeArgs),
			]),
			metadata: CLValueBuilder.string(metadata),
		});
		const deployHash = await installWasmFile({
			chainName: this.chainName,
			paymentAmount,
			nodeAddress: this.nodeAddress,
			keys,
			pathToContract: sessionWasmPath,
			runtimeArgs,
		});
		if (deployHash !== null) {
			return deployHash;
		} else {
			throw Error("Invalid Deploy");
		}
	}

	public async newVote_(
		keys: Keys.AsymmetricKey,
		packageHash: string,
		sessionWasmPath: string,
		paymentAmount: string,
		executionScriptEntrypoint: string,
		executionScriptPackage: string,
		executionScriptRuntimeArgs: CLTuple2[],
		metadata: string,
		castVote: boolean,
		executesIfDecided: boolean
	) {
		const votingPackageHash = new CLByteArray(
			Uint8Array.from(Buffer.from(packageHash, "hex"))
		);
		const executionScriptPackageHash = new CLByteArray(
			Uint8Array.from(Buffer.from(executionScriptPackage, "hex"))
		);
		const runtimeArgs = RuntimeArgs.fromMap({
			package_hash: CLValueBuilder.key(votingPackageHash),
			entrypoint: CLValueBuilder.string("new_vote_"),
			execution_script: CLValueBuilder.tuple3([
				CLValueBuilder.string(executionScriptEntrypoint),
				CLValueBuilder.key(executionScriptPackageHash),
				CLValueBuilder.list(executionScriptRuntimeArgs)
			]),
			metadata: CLValueBuilder.string(metadata),
			cast_vote: CLValueBuilder.bool(castVote),
			executes_if_decided: CLValueBuilder.bool(executesIfDecided),
		});
		const deployHash = await installWasmFile({
			chainName: this.chainName,
			paymentAmount,
			nodeAddress: this.nodeAddress,
			keys,
			pathToContract: sessionWasmPath,
			runtimeArgs,
		});
		if (deployHash !== null) {
			return deployHash;
		} else {
			throw Error("Invalid Deploy");
		}
	}

	public async getVoteDictionaryGetter(voteId : string)
	{
		try {
			const result = await utils.contractDictionaryGetter(
			  this.nodeAddress,
			  voteId,
			  this.namedKeys.getVote
			);
			const maybeValue = result.value().unwrap();
			return maybeValue.value().toString();
	  
		  } catch (error) {
			return "0";
		  }
	}

	public async getVote(
		keys: Keys.AsymmetricKey,
		packageHash: string,
		sessionWasmPath: string,
		paymentAmount: string,
		voteId: string
	) {
		const votingPackageHash = new CLByteArray(
			Uint8Array.from(Buffer.from(packageHash, "hex"))
		);
		const runtimeArgs = RuntimeArgs.fromMap({
			package_hash: CLValueBuilder.key(votingPackageHash),
			entrypoint: CLValueBuilder.string("get_vote"),
			vote_id: CLValueBuilder.u256(voteId),
		});
		const deployHash = await installWasmFile({
			chainName: this.chainName,
			paymentAmount,
			nodeAddress: this.nodeAddress,
			keys,
			pathToContract: sessionWasmPath,
			runtimeArgs,
		});
		if (deployHash !== null) {
			return deployHash;
		} else {
			throw Error("Invalid Deploy");
		}
	}

	public async getVoterState(
		keys: Keys.AsymmetricKey,
		packageHash: string,
		sessionWasmPath: string,
		paymentAmount: string,
		voteId: string,
		voter: string,
	) {
		const votingPackageHash = new CLByteArray(
			Uint8Array.from(Buffer.from(packageHash, "hex"))
		);
		const voterHash = new CLByteArray(
			Uint8Array.from(Buffer.from(voter, "hex"))
		);
		const runtimeArgs = RuntimeArgs.fromMap({
			package_hash: CLValueBuilder.key(votingPackageHash),
			entrypoint: CLValueBuilder.string("get_voter_state"),
			vote_id: CLValueBuilder.u256(voteId),
			voter: CLValueBuilder.key(voterHash),
		});
		const deployHash = await installWasmFile({
			chainName: this.chainName,
			paymentAmount,
			nodeAddress: this.nodeAddress,
			keys,
			pathToContract: sessionWasmPath,
			runtimeArgs,
		});
		if (deployHash !== null) {
			return deployHash;
		} else {
			throw Error("Invalid Deploy");
		}
	}

	public async min_balance() {
		const result = await contractSimpleGetter(
			this.nodeAddress,
			this.contractHash,
			["min_balance"]
		);
		return result.value();
	}

	public async minTime() {
		const result = await contractSimpleGetter(
			this.nodeAddress,
			this.contractHash,
			["min_time"]
		);
		return result.value();
	}
	
	public async supportRequiredPct() {
		const result = await contractSimpleGetter(
			this.nodeAddress,
			this.contractHash,
			["support_required_pct"]
		);
		return result.value();
	}

	public async voteTime() {
		const result = await contractSimpleGetter(
			this.nodeAddress,
			this.contractHash,
			["vote_time"]
		);
		return result.value();
	}

	public async token() {
		const result = await contractSimpleGetter(
			this.nodeAddress,
			this.contractHash,
			["token"]
		);
		return result.value();
	}

	public async minAcceptQuorumPct() {
		const result = await contractSimpleGetter(
			this.nodeAddress,
			this.contractHash,
			["min_accept_quorum_pct"]
		);
		return result.value();
	}

}

interface IInstallParams {
	nodeAddress: string;
	keys: Keys.AsymmetricKey;
	chainName: string;
	pathToContract: string;
	runtimeArgs: RuntimeArgs;
	paymentAmount: string;
}

const installWasmFile = async ({
	nodeAddress,
	keys,
	chainName,
	pathToContract,
	runtimeArgs,
	paymentAmount,
}: IInstallParams): Promise<string> => {
	const client = new CasperClient(nodeAddress);

	// Set contract installation deploy (unsigned).
	let deploy = DeployUtil.makeDeploy(
		new DeployUtil.DeployParams(
			CLPublicKey.fromHex(keys.publicKey.toHex()),
			chainName
		),
		DeployUtil.ExecutableDeployItem.newModuleBytes(
			utils.getBinary(pathToContract),
			runtimeArgs
		),
		DeployUtil.standardPayment(paymentAmount)
	);

	// Sign deploy.
	deploy = client.signDeploy(deploy, keys);

	// Dispatch deploy to node.
	return await client.putDeploy(deploy);
};

interface IContractCallParams {
	nodeAddress: string;
	keys: Keys.AsymmetricKey;
	chainName: string;
	entryPoint: string;
	runtimeArgs: RuntimeArgs;
	paymentAmount: string;
	contractHash: string;
}

const contractCall = async ({
	nodeAddress,
	keys,
	chainName,
	contractHash,
	entryPoint,
	runtimeArgs,
	paymentAmount,
}: IContractCallParams) => {
	const client = new CasperClient(nodeAddress);
	const contractHashAsByteArray = utils.contractHashToByteArray(contractHash);

	let deploy = DeployUtil.makeDeploy(
		new DeployUtil.DeployParams(keys.publicKey, chainName),
		DeployUtil.ExecutableDeployItem.newStoredContractByHash(
			contractHashAsByteArray,
			entryPoint,
			runtimeArgs
		),
		DeployUtil.standardPayment(paymentAmount)
	);

	// Sign deploy.
	deploy = client.signDeploy(deploy, keys);

	// Dispatch deploy to node.
	const deployHash = await client.putDeploy(deploy);

	return deployHash;
};

const contractSimpleGetter = async (
	nodeAddress: string,
	contractHash: string,
	key: string[]
) => {
	const stateRootHash = await utils.getStateRootHash(nodeAddress);
	const clValue = await utils.getContractData(
		nodeAddress,
		stateRootHash,
		contractHash,
		key
	);

	if (clValue && clValue.CLValue instanceof CLValue) {
		return clValue.CLValue!;
	} else {
		throw Error("Invalid stored value");
	}
};

export default VOTINGClient;
