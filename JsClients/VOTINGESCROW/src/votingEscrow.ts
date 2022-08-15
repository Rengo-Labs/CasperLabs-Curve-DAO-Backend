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
  CLOption
} from "casper-js-sdk";
import { Some, None } from "ts-results";
import * as blake from "blakejs";
import { concat } from "@ethersproject/bytes";
import * as utils from "./utils";
import { RecipientType, IPendingDeploy } from "./types";
import {createRecipientAddress } from "./utils";

class VOTINGESCROWClient {
  private contractName: string = "votingescrow";
  private contractHash: string= "votingescrow";
  private contractPackageHash: string= "votingescrow";
  private namedKeys: {
    balances:string
    metadata: string;
    nonces: string;
    allowances: string;
    ownedTokens: string;
    owners: string;
    paused: string;
    minBalance: string;
    minAcceptQuorumPct: string;
    minTime:string;
    supportRequiredPct: string;
    voteTime: string;
    token: string;
  };

  private isListening = false;
  private pendingDeploys: IPendingDeploy[] = [];

  constructor(

    private nodeAddress: string,
    private chainName: string,
    private eventStreamAddress?: string,
    
  ) 
  {
    this.namedKeys= {
      balances:"null",
      metadata: "null",
      nonces: "null",
      allowances: "null",
      ownedTokens: "null",
      owners: "null",
      paused: "null",
      minBalance: "null",
      minAcceptQuorumPct: "null",
      minTime: "null",
      supportRequiredPct: "null",
      voteTime: "null",
      token: "null"
    }; 
  }

  public async install(
    keys: Keys.AsymmetricKey,
    tokenAddr: string,
    name: string,
    tokenSymbol: string,
    version: string,
    contractName: string,
    paymentAmount: string,
    wasmPath: string
  ) {
    const _tokenAddr = new CLByteArray(
			Uint8Array.from(Buffer.from(tokenAddr, "hex"))
		);
    const runtimeArgs = RuntimeArgs.fromMap({
      token_addr: utils.createRecipientAddress(_tokenAddr),
      name: CLValueBuilder.string(name),
      symbol: CLValueBuilder.string(tokenSymbol),
      version: CLValueBuilder.string(version),
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
      'balances',
      'nonces',
      'allowances',
      'minBalance',
      'minAcceptQuorumPct',
      'minTime',
      'supportRequiredPct',
      'voteTime',
      'token',
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

  //Backend Functions

  public async minBalance(account: string) {
		try {
		
		const result = await utils.contractDictionaryGetter(
			this.nodeAddress,
			account,
			this.namedKeys.minBalance
		);
		const maybeValue = result.value().unwrap();
		return maybeValue.value().toString();

		} catch (error) {
		return "0";
		}
		
	}

  public async minAcceptQuorumPct(account: string) {
		try {
		
		const result = await utils.contractDictionaryGetter(
			this.nodeAddress,
			account,
			this.namedKeys.minAcceptQuorumPct
		);
		const maybeValue = result.value().unwrap();
		return maybeValue.value().toString();

		} catch (error) {
		return "0";
		}
		
	}

  public async minTime(account: string) {
		try {
		
		const result = await utils.contractDictionaryGetter(
			this.nodeAddress,
			account,
			this.namedKeys.minTime
		);
		const maybeValue = result.value().unwrap();
		return maybeValue.value().toString();

		} catch (error) {
		return "0";
		}
		
	}

  public async supportRequiredPct(account: string) {
		try {
		
		const result = await utils.contractDictionaryGetter(
			this.nodeAddress,
			account,
			this.namedKeys.supportRequiredPct
		);
		const maybeValue = result.value().unwrap();
		return maybeValue.value().toString();

		} catch (error) {
		return "0";
		}
		
	}

  public async voteTime(account: string) {
		try {
		
		const result = await utils.contractDictionaryGetter(
			this.nodeAddress,
			account,
			this.namedKeys.voteTime
		);
		const maybeValue = result.value().unwrap();
		return maybeValue.value().toString();

		} catch (error) {
		return "0";
		}
		
	}

  public async token(account: string) {
		try {
		
		const result = await utils.contractDictionaryGetter(
			this.nodeAddress,
			account,
			this.namedKeys.token
		);
		const maybeValue = result.value().unwrap();
		return maybeValue.value().toString();

		} catch (error) {
		return "0";
		}
		
	}

  //VOTING_ESCROW FUNCTIONS

  public async unlockTime() {
    const unlockTime = await contractSimpleGetter(
      this.nodeAddress,
      this.contractHash,
      ["unlock_time"]
    );
    return unlockTime.value();
  }

  public async commitTransferOwnership(
    keys: Keys.AsymmetricKey,
    //addr: string,
    addr: RecipientType,
    paymentAmount: string
  ) {
    // const _addr = new CLByteArray(
		// 	Uint8Array.from(Buffer.from(addr, "hex"))
		// );
    const runtimeArgs = RuntimeArgs.fromMap({
      //addr: utils.createRecipientAddress(_addr),
      addr: utils.createRecipientAddress(addr),
    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "commit_transfer_ownership",
      keys,
      nodeAddress: this.nodeAddress,
      paymentAmount,
      runtimeArgs,
    });

    if (deployHash !== null) {
      
      return deployHash;
    } else {
      throw Error("Invalid Deploy");
    }
  }

  public async applyTransferOwnership(
    keys: Keys.AsymmetricKey,
    paymentAmount: string
  ) {
    const runtimeArgs = RuntimeArgs.fromMap({
    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "apply_transfer_ownership",
      keys,
      nodeAddress: this.nodeAddress,
      paymentAmount,
      runtimeArgs,
    });

    if (deployHash !== null) {
      
      return deployHash;
    } else {
      throw Error("Invalid Deploy");
    }
  }

  public async getLastUserSlopeJsClient(
    keys: Keys.AsymmetricKey,
    //addr: string,
    addr: RecipientType,
    paymentAmount: string
  ) {
    // const _addr = new CLByteArray(
		// 	Uint8Array.from(Buffer.from(addr, "hex"))
		// );
    const runtimeArgs = RuntimeArgs.fromMap({
      //addr: utils.createRecipientAddress(_addr),
      addr: utils.createRecipientAddress(addr),
    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "get_last_user_slope_js_client",
      keys,
      nodeAddress: this.nodeAddress,
      paymentAmount,
      runtimeArgs,
    });

    if (deployHash !== null) {
      
      return deployHash;
    } else {
      throw Error("Invalid Deploy");
    }
  }

  public async userPointHistoryTsJsclient(
    keys: Keys.AsymmetricKey,
    //addr: string,
    addr: RecipientType,
    idx: string,
    paymentAmount: string
  ) {
    // const _addr = new CLByteArray(
		// 	Uint8Array.from(Buffer.from(addr, "hex"))
		// );
    const runtimeArgs = RuntimeArgs.fromMap({
      // addr: utils.createRecipientAddress(_addr),
      addr: utils.createRecipientAddress(addr),
      idx: CLValueBuilder.u256(idx)
    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "user_point_history_ts_js_client",
      keys,
      nodeAddress: this.nodeAddress,
      paymentAmount,
      runtimeArgs,
    });

    if (deployHash !== null) {
      
      return deployHash;
    } else {
      throw Error("Invalid Deploy");
    }
  }

  public async lockedEndJsClient(
    keys: Keys.AsymmetricKey,
    //addr: string,
    addr: RecipientType,
    paymentAmount: string
  ) {
    // const _addr = new CLByteArray(
		// 	Uint8Array.from(Buffer.from(addr, "hex"))
		// );
    const runtimeArgs = RuntimeArgs.fromMap({
      // addr: utils.createRecipientAddress(_addr),
      addr: utils.createRecipientAddress(addr),
    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "locked_end_js_client",
      keys,
      nodeAddress: this.nodeAddress,
      paymentAmount,
      runtimeArgs,
    });

    if (deployHash !== null) {
      
      return deployHash;
    } else {
      throw Error("Invalid Deploy");
    }
  }

  public async checkpoint(
    keys: Keys.AsymmetricKey,
    paymentAmount: string
  ) {
    const runtimeArgs = RuntimeArgs.fromMap({
    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "checkpoint",
      keys,
      nodeAddress: this.nodeAddress,
      paymentAmount,
      runtimeArgs,
    });

    if (deployHash !== null) {
      
      return deployHash;
    } else {
      throw Error("Invalid Deploy");
    }
  }

  public async depositFor(
    keys: Keys.AsymmetricKey,
    addr: string,
    value: string,
    paymentAmount: string
  ) {
    const _addr = new CLByteArray(
			Uint8Array.from(Buffer.from(addr, "hex"))
		);
    const runtimeArgs = RuntimeArgs.fromMap({
      addr: utils.createRecipientAddress(_addr),
      value: CLValueBuilder.u256(value)
    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "deposit_for",
      keys,
      nodeAddress: this.nodeAddress,
      paymentAmount,
      runtimeArgs,
    });

    if (deployHash !== null) {
      
      return deployHash;
    } else {
      throw Error("Invalid Deploy");
    }
  }

  public async createlock(
    keys: Keys.AsymmetricKey,
    value: string,
    unlockTime: string,
    paymentAmount: string
  ) {
    const runtimeArgs = RuntimeArgs.fromMap({
      value: CLValueBuilder.u256(value),
      unlock_time: CLValueBuilder.u256(unlockTime)
    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "create_lock",
      keys,
      nodeAddress: this.nodeAddress,
      paymentAmount,
      runtimeArgs,
    });

    if (deployHash !== null) {
      
      return deployHash;
    } else {
      throw Error("Invalid Deploy");
    }
  }

  public async increaseAmount(
    keys: Keys.AsymmetricKey,
    value: string,
    paymentAmount: string
  ) {
    const runtimeArgs = RuntimeArgs.fromMap({
      value: CLValueBuilder.u256(value),
    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "increase_amount",
      keys,
      nodeAddress: this.nodeAddress,
      paymentAmount,
      runtimeArgs,
    });

    if (deployHash !== null) {
      
      return deployHash;
    } else {
      throw Error("Invalid Deploy");
    }
  }

  public async increaseUnlockTime(
    keys: Keys.AsymmetricKey,
    unlockTime: string,
    paymentAmount: string
  ) {
    const runtimeArgs = RuntimeArgs.fromMap({
      unlock_time: CLValueBuilder.u256(unlockTime),
    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "increase_unlock_time",
      keys,
      nodeAddress: this.nodeAddress,
      paymentAmount,
      runtimeArgs,
    });

    if (deployHash !== null) {
      
      return deployHash;
    } else {
      throw Error("Invalid Deploy");
    }
  }

  public async withdraw(
    keys: Keys.AsymmetricKey,
    paymentAmount: string
  ) {
    const runtimeArgs = RuntimeArgs.fromMap({
    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "withdraw",
      keys,
      nodeAddress: this.nodeAddress,
      paymentAmount,
      runtimeArgs,
    });

    if (deployHash !== null) {
      
      return deployHash;
    } else {
      throw Error("Invalid Deploy");
    }
  }

  public async balanceOfJsClient(
    keys: Keys.AsymmetricKey,
    //addr: string,
    addr: RecipientType,
    t: string,
    paymentAmount: string
  ) {
    // const _addr = new CLByteArray(
		// 	Uint8Array.from(Buffer.from(addr, "hex"))
		// );
    const runtimeArgs = RuntimeArgs.fromMap({
      // addr: utils.createRecipientAddress(_addr),
      addr: utils.createRecipientAddress(addr),
      //t: CLValueBuilder.u256(t) // let t: Option<U256> = runtime::get_named_arg("t");
      t: new CLOption(Some( CLValueBuilder.u256(t)))

    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "balance_of_js_client",
      keys,
      nodeAddress: this.nodeAddress,
      paymentAmount,
      runtimeArgs,
    });

    if (deployHash !== null) {
      
      return deployHash;
    } else {
      throw Error("Invalid Deploy");
    }
  }

  public async balanceOfAtJsClient(
    keys: Keys.AsymmetricKey,
    //addr: string,
    addr: RecipientType,
    block: string,
    paymentAmount: string
  ) {
    // const _addr = new CLByteArray(
		// 	Uint8Array.from(Buffer.from(addr, "hex"))
		// );
    const runtimeArgs = RuntimeArgs.fromMap({
      // addr: utils.createRecipientAddress(_addr),
      addr: utils.createRecipientAddress(addr),
      block: CLValueBuilder.u256(block)
    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "balance_of_at_js_client",
      keys,
      nodeAddress: this.nodeAddress,
      paymentAmount,
      runtimeArgs,
    });

    if (deployHash !== null) {
      
      return deployHash;
    } else {
      throw Error("Invalid Deploy");
    }
  }

  public async totalSupplyJsClient(
    keys: Keys.AsymmetricKey,
    t: string,
    paymentAmount: string
  ) {
    const runtimeArgs = RuntimeArgs.fromMap({
      //t: CLValueBuilder.u256(t),//// let t: Option<U256> = runtime::get_named_arg("t");
      t: new CLOption(Some( CLValueBuilder.u256(t)))
    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "total_supply_js_client",
      keys,
      nodeAddress: this.nodeAddress,
      paymentAmount,
      runtimeArgs,
    });

    if (deployHash !== null) {
      
      return deployHash;
    } else {
      throw Error("Invalid Deploy");
    }
  }

  public async totalSupplyAtJsClient(
    keys: Keys.AsymmetricKey,
    block: string,
    paymentAmount: string
  ) {
    const runtimeArgs = RuntimeArgs.fromMap({
      block: CLValueBuilder.u256(block),
    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "total_supply_at_js_client",
      keys,
      nodeAddress: this.nodeAddress,
      paymentAmount,
      runtimeArgs,
    });

    if (deployHash !== null) {
      
      return deployHash;
    } else {
      throw Error("Invalid Deploy");
    }
  }

  public async changeController(
    keys: Keys.AsymmetricKey,
    //newController: string,
    newController: RecipientType,
    paymentAmount: string
  ) {
    // const _newController = new CLByteArray(
		// 	Uint8Array.from(Buffer.from(newController, "hex"))
		// );
    const runtimeArgs = RuntimeArgs.fromMap({
      // new_controller: utils.createRecipientAddress(_newController),
      new_controller: utils.createRecipientAddress(newController),
    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "change_controller",
      keys,
      nodeAddress: this.nodeAddress,
      paymentAmount,
      runtimeArgs,
    });

    if (deployHash !== null) {
      
      return deployHash;
    } else {
      throw Error("Invalid Deploy");
    }
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

const toCLMap = (map: Map<string, string>) => {
  const clMap = CLValueBuilder.map([
    CLTypeBuilder.string(),
    CLTypeBuilder.string(),
  ]);
  for (const [key, value] of Array.from(map.entries())) {
    clMap.set(CLValueBuilder.string(key), CLValueBuilder.string(value));
  }
  return clMap;
};

const fromCLMap = (map: Map<CLString, CLString>) => {
  const jsMap = new Map();
  for (const [key, value] of Array.from(map.entries())) {
    jsMap.set(key.value(), value.value());
  }
  return jsMap;
};

export default VOTINGESCROWClient;
