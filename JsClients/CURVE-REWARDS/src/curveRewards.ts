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
  CLOption,
  ToBytes
} from "casper-js-sdk";
import { Some, None } from "ts-results";
import * as blake from "blakejs";
import { concat } from "@ethersproject/bytes";
import * as utils from "./utils";
import { RecipientType, IPendingDeploy } from "./types";
import {createRecipientAddress } from "./utils";

class CURVEREWARDSClient {
  private contractName: string = "curveRewards";
  private contractHash: string= "curveRewards";
  private contractPackageHash: string= "curveRewards";
  private namedKeys: {
    balances:string
    metadata: string;
    nonces: string;
    allowances: string;
    ownedTokens: string;
    owners: string;
    paused: string;
    user_reward_per_token_paid: string;
    rewards: string;
    
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
      user_reward_per_token_paid: "null",
      rewards: "null"
    }; 
  }

  public async install(
    keys: Keys.AsymmetricKey,
    token: string,
    reward: string,
    contractName: string,
    paymentAmount: string,
    wasmPath: string
  ) {
    const _token = new CLByteArray(
			Uint8Array.from(Buffer.from(token, "hex"))
		);
    const _reward = new CLByteArray(
			Uint8Array.from(Buffer.from(reward, "hex"))
		);
    const runtimeArgs = RuntimeArgs.fromMap({
      token: utils.createRecipientAddress(_token),
      reward: utils.createRecipientAddress(_reward),
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

  public async lastTimeRewardApplicableJsClientsessioncode(
    keys: Keys.AsymmetricKey,
    packageHash: string,
    entrypointName:string,
    paymentAmount: string,
    wasmPath: string
  ) {
    const _packageHash = new CLByteArray(
			Uint8Array.from(Buffer.from(packageHash, "hex"))
		);
    const runtimeArgs = RuntimeArgs.fromMap({
      destination_package_hash: utils.createRecipientAddress(_packageHash),
      destination_entrypoint: CLValueBuilder.string(entrypointName),
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

  public async isOwnersessioncode(
    keys: Keys.AsymmetricKey,
    packageHash: string,
    entrypointName:string,
    paymentAmount: string,
    wasmPath: string
  ) {
    const _packageHash = new CLByteArray(
			Uint8Array.from(Buffer.from(packageHash, "hex"))
		);
    const runtimeArgs = RuntimeArgs.fromMap({
      destination_package_hash: utils.createRecipientAddress(_packageHash),
      destination_entrypoint: CLValueBuilder.string(entrypointName),
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

  public async rewardPerTokenJsClientsessioncode(
    keys: Keys.AsymmetricKey,
    packageHash: string,
    entrypointName:string,
    paymentAmount: string,
    wasmPath: string
  ) {
    const _packageHash = new CLByteArray(
			Uint8Array.from(Buffer.from(packageHash, "hex"))
		);
    const runtimeArgs = RuntimeArgs.fromMap({
      destination_package_hash: utils.createRecipientAddress(_packageHash),
      destination_entrypoint: CLValueBuilder.string(entrypointName),
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

  public async earnedJsClientsessioncode(
    keys: Keys.AsymmetricKey,
    packageHash: string,
    entrypointName:string,
    account:RecipientType,
    paymentAmount: string,
    wasmPath: string
  ) {
    const _packageHash = new CLByteArray(
			Uint8Array.from(Buffer.from(packageHash, "hex"))
		);
    const runtimeArgs = RuntimeArgs.fromMap({
      destination_package_hash: utils.createRecipientAddress(_packageHash),
      destination_entrypoint: CLValueBuilder.string(entrypointName),
      account:utils.createRecipientAddress(account)
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
      'user_reward_per_token_paid',
      'rewards',
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

  public async totalSupplyJsClient() {
    const result = await contractSimpleGetter(
      this.nodeAddress,
      this.contractHash,
      ["total_supply"]
    );
    return result.value();
  }

  public async ownerJsClient() {
    const result = await contractSimpleGetter(
      this.nodeAddress,
      this.contractHash,
      ["owner"]
    );
    return result.value();
  }

  public async balanceOf(owner: string) {
    try {
		  const _account = CLPublicKey.fromHex(owner);
		  const key = createRecipientAddress(_account);
		  const keyBytes = CLValueParsers.toBytes(key).unwrap();
		  const itemKey = Buffer.from(keyBytes).toString("base64");
		  const result = await utils.contractDictionaryGetter(
			this.nodeAddress,
			itemKey,
			this.namedKeys!.balances
		  );
		  return result.value();
	
		} catch (error) {
		  return "0";
		}
  }

  public async uni() {
    const result = await contractSimpleGetter(
      this.nodeAddress,
      this.contractHash,
      ["uni"]
    );
    return result.value();
  }

  public async snx() {
    const result = await contractSimpleGetter(
      this.nodeAddress,
      this.contractHash,
      ["snx"]
    );
    return result.value();
  }

  public async duration() {
    const result = await contractSimpleGetter(
      this.nodeAddress,
      this.contractHash,
      ["duration"]
    );
    return result.value();
  }

  public async periodFinish() {
    const result = await contractSimpleGetter(
      this.nodeAddress,
      this.contractHash,
      ["period_finish"]
    );
    return result.value();
  }

  public async rewardRate() {
    const result = await contractSimpleGetter(
      this.nodeAddress,
      this.contractHash,
      ["reward_rate"]
    );
    return result.value();
  }

  public async lastUpdateTime() {
    const result = await contractSimpleGetter(
      this.nodeAddress,
      this.contractHash,
      ["last_update_time"]
    );
    return result.value();
  }

  public async rewardPerTokenStored() {
    const result = await contractSimpleGetter(
      this.nodeAddress,
      this.contractHash,
      ["reward_per_token_stored"]
    );
    return result.value();
  }

  public async userRewardPerTokenPaid(account: string) {
    try {
      
      const result = await utils.contractDictionaryGetter(
        this.nodeAddress,
        account,
        this.namedKeys.user_reward_per_token_paid
      );
      const maybeValue = result.value().unwrap();
      return maybeValue.value().toString();

    } catch (error) {
      return "0";
    }
    
  }

  public async rewards(account: string) {
    try {
      
      const result = await utils.contractDictionaryGetter(
        this.nodeAddress,
        account,
        this.namedKeys.rewards
      );
      const maybeValue = result.value().unwrap();
      return maybeValue.value().toString();

    } catch (error) {
      return "0";
    }
    
  }

  

  
  //CURVE-REWARDS FUNCTIONS

  public async stakeLp(
    keys: Keys.AsymmetricKey,
    amount: string,
    paymentAmount: string
  ) {
    const runtimeArgs = RuntimeArgs.fromMap({
      amount: CLValueBuilder.u256(amount),
    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "stake_lp",
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

  public async withdrawLp(
    keys: Keys.AsymmetricKey,
    amount: string,
    paymentAmount: string
  ) {
    const runtimeArgs = RuntimeArgs.fromMap({
      amount: CLValueBuilder.u256(amount),
    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "withdraw_lp",
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

  public async setRewardDistribution(
    keys: Keys.AsymmetricKey,
    rewardDistribution: string,
    paymentAmount: string
  ) {
     const _rewardDistribution = new CLByteArray(
			Uint8Array.from(Buffer.from(rewardDistribution, "hex"))
		);
    const runtimeArgs = RuntimeArgs.fromMap({
      reward_distribution: utils.createRecipientAddress(_rewardDistribution),
    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "set_reward_distribution",
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

  public async stake(
    keys: Keys.AsymmetricKey,
    amount: string,
    paymentAmount: string
  ) {
    const runtimeArgs = RuntimeArgs.fromMap({
      amount: CLValueBuilder.u256(amount),
    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "stake",
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
    amount: string,
    paymentAmount: string
  ) {
    const runtimeArgs = RuntimeArgs.fromMap({
      amount: CLValueBuilder.u256(amount),
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

  public async getReward(
    keys: Keys.AsymmetricKey,
    paymentAmount: string
  ) {
    const runtimeArgs = RuntimeArgs.fromMap({
    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "get_reward",
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

  public async exit(
    keys: Keys.AsymmetricKey,
    paymentAmount: string
  ) {
    const runtimeArgs = RuntimeArgs.fromMap({
    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "exit",
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

  public async notifyRewardAmount(
    keys: Keys.AsymmetricKey,
    reward: string,
    paymentAmount: string
  ) {
    const runtimeArgs = RuntimeArgs.fromMap({
      reward: CLValueBuilder.u256(reward),
    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "notify_reward_amount",
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

  public async renounceOwnership(
    keys: Keys.AsymmetricKey,
    paymentAmount: string
  ) {
    const runtimeArgs = RuntimeArgs.fromMap({
    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "renounce_ownership",
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

  public async transferOwnership(
    keys: Keys.AsymmetricKey,
    newOwner: string,
    paymentAmount: string
  ) {
     const _newOwner = new CLByteArray(
			Uint8Array.from(Buffer.from(newOwner, "hex"))
		);
    const runtimeArgs = RuntimeArgs.fromMap({
      new_owner: utils.createRecipientAddress(_newOwner),
    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "transfer_ownership",
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

export default CURVEREWARDSClient;
