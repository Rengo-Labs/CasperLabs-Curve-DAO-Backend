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

class LIQUIDITYGAUGEV3Client {
  private contractName: string = "liquiditygaugev3";
  private contractHash: string= "liquiditygaugev3";
  private contractPackageHash: string= "liquiditygaugev3";
  private namedKeys: {
    balances:string
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
      paused: "null"
    }; 
  }

  public async install(
    keys: Keys.AsymmetricKey,
    lpAddr: string,
    minter: string,
    admin:RecipientType,
    contractName: string,
    paymentAmount: string,
    wasmPath: string
  ) {
    const _lpAddr = new CLByteArray(
			Uint8Array.from(Buffer.from(lpAddr, "hex"))
		);
    const _minter = new CLByteArray(
			Uint8Array.from(Buffer.from(minter, "hex"))
		);
    const runtimeArgs = RuntimeArgs.fromMap({
      lp_addr: utils.createRecipientAddress(_lpAddr),
      minter: utils.createRecipientAddress(_minter),
      admin: utils.createRecipientAddress(admin),
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

  public async userCheckpointSessionCode(
    keys: Keys.AsymmetricKey,
    entrypointName:string,
    packageHash: string,
    addr:RecipientType,
    paymentAmount: string,
    wasmPath: string
  ) {
    const _packageHash = new CLByteArray(
			Uint8Array.from(Buffer.from(packageHash, "hex"))
		);
    const runtimeArgs = RuntimeArgs.fromMap({
      entrypoint: CLValueBuilder.string(entrypointName),
      package_hash: utils.createRecipientAddress(_packageHash),
      addr: utils.createRecipientAddress(addr),
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

  public async claimableTokensSessionCode(
    keys: Keys.AsymmetricKey,
    entrypointName:string,
    packageHash: string,
    addr:string,
    paymentAmount: string,
    wasmPath: string
  ) {
    const _packageHash = new CLByteArray(
			Uint8Array.from(Buffer.from(packageHash, "hex"))
		);
    const _addr = new CLByteArray(
			Uint8Array.from(Buffer.from(addr, "hex"))
		);
    const runtimeArgs = RuntimeArgs.fromMap({
      entrypoint: CLValueBuilder.string(entrypointName),
      package_hash: utils.createRecipientAddress(_packageHash),
      addr: utils.createRecipientAddress(_addr),
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

  public async rewardContractSessionCode(
    keys: Keys.AsymmetricKey,
    entrypointName:string,
    packageHash: string,
    paymentAmount: string,
    wasmPath: string
  ) {
    const _packageHash = new CLByteArray(
			Uint8Array.from(Buffer.from(packageHash, "hex"))
		);
    const runtimeArgs = RuntimeArgs.fromMap({
      entrypoint: CLValueBuilder.string(entrypointName),
      package_hash: utils.createRecipientAddress(_packageHash),
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

  public async lastClaimSessionCode(
    keys: Keys.AsymmetricKey,
    entrypointName:string,
    packageHash: string,
    paymentAmount: string,
    wasmPath: string
  ) {
    const _packageHash = new CLByteArray(
			Uint8Array.from(Buffer.from(packageHash, "hex"))
		);
    const runtimeArgs = RuntimeArgs.fromMap({
      entrypoint: CLValueBuilder.string(entrypointName),
      package_hash: utils.createRecipientAddress(_packageHash),
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

  public async claimedRewardSessionCode(
    keys: Keys.AsymmetricKey,
    entrypointName:string,
    packageHash: string,
    addr:RecipientType,
    token:string,
    paymentAmount: string,
    wasmPath: string
  ) {
    const _packageHash = new CLByteArray(
			Uint8Array.from(Buffer.from(packageHash, "hex"))
		);
    const _token = new CLByteArray(
			Uint8Array.from(Buffer.from(token, "hex"))
		);
    const runtimeArgs = RuntimeArgs.fromMap({
      entrypoint: CLValueBuilder.string(entrypointName),
      package_hash: utils.createRecipientAddress(_packageHash),
      addr: utils.createRecipientAddress(addr),
      token: utils.createRecipientAddress(_token),
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

  public async claimableRewardSessionCode(
    keys: Keys.AsymmetricKey,
    entrypointName:string,
    packageHash: string,
    addr:RecipientType,
    token:string,
    paymentAmount: string,
    wasmPath: string
  ) {
    const _packageHash = new CLByteArray(
			Uint8Array.from(Buffer.from(packageHash, "hex"))
		);
    const _token = new CLByteArray(
			Uint8Array.from(Buffer.from(token, "hex"))
		);
    const runtimeArgs = RuntimeArgs.fromMap({
      entrypoint: CLValueBuilder.string(entrypointName),
      package_hash: utils.createRecipientAddress(_packageHash),
      addr: utils.createRecipientAddress(addr),
      token: utils.createRecipientAddress(_token),
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

  public async claimableRewardWriteSessionCode(
    keys: Keys.AsymmetricKey,
    entrypointName:string,
    packageHash: string,
    addr:RecipientType,
    token:string,
    paymentAmount: string,
    wasmPath: string
  ) {
    const _packageHash = new CLByteArray(
			Uint8Array.from(Buffer.from(packageHash, "hex"))
		);
    const _token = new CLByteArray(
			Uint8Array.from(Buffer.from(token, "hex"))
		);
    const runtimeArgs = RuntimeArgs.fromMap({
      entrypoint: CLValueBuilder.string(entrypointName),
      package_hash: utils.createRecipientAddress(_packageHash),
      addr: utils.createRecipientAddress(addr),
      token: utils.createRecipientAddress(_token),
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

  public async transferSessionCode(
    keys: Keys.AsymmetricKey,
    entrypointName:string,
    packageHash: string,
    recipient:string,
    amount:string,
    paymentAmount: string,
    wasmPath: string
  ) {
    const _packageHash = new CLByteArray(
			Uint8Array.from(Buffer.from(packageHash, "hex"))
		);
    const _recipient = new CLByteArray(
			Uint8Array.from(Buffer.from(recipient, "hex"))
		);
    const runtimeArgs = RuntimeArgs.fromMap({
      entrypoint: CLValueBuilder.string(entrypointName),
      package_hash: utils.createRecipientAddress(_packageHash),
      recipient: utils.createRecipientAddress(_recipient),
      amount: CLValueBuilder.u256(amount),
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

  public async transferFromSessionCode(
    keys: Keys.AsymmetricKey,
    entrypointName:string,
    packageHash: string,
    owner:RecipientType,
    recipient:string,
    amount:string,
    paymentAmount: string,
    wasmPath: string
  ) {
    const _packageHash = new CLByteArray(
			Uint8Array.from(Buffer.from(packageHash, "hex"))
		);
    const _recipient = new CLByteArray(
			Uint8Array.from(Buffer.from(recipient, "hex"))
		);
    const runtimeArgs = RuntimeArgs.fromMap({
      entrypoint: CLValueBuilder.string(entrypointName),
      package_hash: utils.createRecipientAddress(_packageHash),
      owner: utils.createRecipientAddress(owner),
      recipient: utils.createRecipientAddress(_recipient),
      amount: CLValueBuilder.u256(amount),
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

  public async decimals() {
    const result = await contractSimpleGetter(
      this.nodeAddress,
      this.contractHash,
      ["decimals"]
    );
    return result.value();
  }

  public async integrateCheckpoint() {
    const result = await contractSimpleGetter(
      this.nodeAddress,
      this.contractHash,
      ["period_timestamp"]
    );
    return result.value();
  }

  //LIQUIDITY GAUGE V3 FUNCTIONS

  // public async decimals(
  //   keys: Keys.AsymmetricKey,
  //   paymentAmount: string
  // ) {
  //   const runtimeArgs = RuntimeArgs.fromMap({
  //   });
  //   const deployHash = await contractCall({
  //     chainName: this.chainName,
  //     contractHash: this.contractHash,
  //     entryPoint: "decimals",
  //     keys,
  //     nodeAddress: this.nodeAddress,
  //     paymentAmount,
  //     runtimeArgs,
  //   });

  //   if (deployHash !== null) {
      
  //     return deployHash;
  //   } else {
  //     throw Error("Invalid Deploy");
  //   }
  // }

  public async userCheckpoint(
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
      entryPoint: "user_checkpoint",
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

  public async claimableTokens(
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
      entryPoint: "claimable_tokens",
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

  public async rewardContract(
    keys: Keys.AsymmetricKey,
    paymentAmount: string
  ) {
    const runtimeArgs = RuntimeArgs.fromMap({
    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "rewardContract",
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

  public async lastClaim(
    keys: Keys.AsymmetricKey,
    paymentAmount: string
  ) {
    const runtimeArgs = RuntimeArgs.fromMap({
    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "last_claim",
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

  public async claimedReward(
    keys: Keys.AsymmetricKey,
    addr: RecipientType,
    token: string,
    paymentAmount: string
  ) {
     const _token = new CLByteArray(
		 	Uint8Array.from(Buffer.from(token, "hex"))
		 );
    const runtimeArgs = RuntimeArgs.fromMap({
      addr: utils.createRecipientAddress(addr),
      token: utils.createRecipientAddress(_token),
    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "claimed_reward",
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

  public async claimableReward(
    keys: Keys.AsymmetricKey,
    addr: RecipientType,
    token: string,
    paymentAmount: string
  ) {
     const _token = new CLByteArray(
		 	Uint8Array.from(Buffer.from(token, "hex"))
		 );
    const runtimeArgs = RuntimeArgs.fromMap({
      addr: utils.createRecipientAddress(addr),
      token: utils.createRecipientAddress(_token),
    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "claimable_reward",
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

  public async claimableRewardWrite(
    keys: Keys.AsymmetricKey,
    addr: RecipientType,
    token: string,
    paymentAmount: string
  ) {
     const _token = new CLByteArray(
		 	Uint8Array.from(Buffer.from(token, "hex"))
		 );
    const runtimeArgs = RuntimeArgs.fromMap({
      addr: utils.createRecipientAddress(addr),
      token: utils.createRecipientAddress(_token),
    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "claimable_reward_write",
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

  public async setRewardsReceiver(
    keys: Keys.AsymmetricKey,
    receiver: string,
    paymentAmount: string
  ) {
     const _receiver = new CLByteArray(
		 	Uint8Array.from(Buffer.from(receiver, "hex"))
		 );
    const runtimeArgs = RuntimeArgs.fromMap({
      receiver: utils.createRecipientAddress(_receiver),
    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "set_rewards_receiver",
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

  public async kick(
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
      entryPoint: "kick",
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

  public async deposit(
    keys: Keys.AsymmetricKey,
    value: string,
    addr: RecipientType,
    claimRewards: boolean,
    paymentAmount: string
  ) {
    const runtimeArgs = RuntimeArgs.fromMap({
      value: CLValueBuilder.u256(value),
      addr: new CLOption(Some(utils.createRecipientAddress(addr))),
      claim_rewards: new CLOption(Some(CLValueBuilder.bool(claimRewards)))

    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "deposit",
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
    value: string,
    claimRewards: boolean,
    paymentAmount: string
  ) {
    const runtimeArgs = RuntimeArgs.fromMap({
      value: CLValueBuilder.u256(value),
      claim_rewards: new CLOption(Some(CLValueBuilder.bool(claimRewards)))
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

  public async transfer(
    keys: Keys.AsymmetricKey,
    to: string,
    value: string,
    paymentAmount: string
  ) {
     const _to = new CLByteArray(
		 	Uint8Array.from(Buffer.from(to, "hex"))
		 );
    const runtimeArgs = RuntimeArgs.fromMap({
      to: utils.createRecipientAddress(_to),
      value:CLValueBuilder.u256(value), 
    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "transfer",
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

  public async transferFrom(
    keys: Keys.AsymmetricKey,
    from:string,
    to: string,
    value: string,
    paymentAmount: string
  ) {
     const _to = new CLByteArray(
		 	Uint8Array.from(Buffer.from(to, "hex"))
		 );
     const _from = new CLByteArray(
      Uint8Array.from(Buffer.from(from, "hex"))
    );
    const runtimeArgs = RuntimeArgs.fromMap({
      from: utils.createRecipientAddress(_from),
      to: utils.createRecipientAddress(_to),
      value:CLValueBuilder.u256(value), 
    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "transfer_from",
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

  public async approve(
    keys: Keys.AsymmetricKey,
    spender: string,
    amount: string,
    paymentAmount: string
  ) {
     const _spender = new CLByteArray(
		 	Uint8Array.from(Buffer.from(spender, "hex"))
		 );
    const runtimeArgs = RuntimeArgs.fromMap({
      spender: utils.createRecipientAddress(_spender),
      amount:CLValueBuilder.u256(amount), 
    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "approve",
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

  public async increaseAllowance(
    keys: Keys.AsymmetricKey,
    spender: string,
    amount: string,
    paymentAmount: string
  ) {
     const _spender = new CLByteArray(
		 	Uint8Array.from(Buffer.from(spender, "hex"))
		 );
    const runtimeArgs = RuntimeArgs.fromMap({
      spender: utils.createRecipientAddress(_spender),
      amount:CLValueBuilder.u256(amount), 
    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "increase_allowance",
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

  public async decreaseAllowance(
    keys: Keys.AsymmetricKey,
    spender: string,
    amount: string,
    paymentAmount: string
  ) {
     const _spender = new CLByteArray(
		 	Uint8Array.from(Buffer.from(spender, "hex"))
		 );
    const runtimeArgs = RuntimeArgs.fromMap({
      spender: utils.createRecipientAddress(_spender),
      amount:CLValueBuilder.u256(amount), 
    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "decrease_allowance",
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

  public async setRewards(
    keys: Keys.AsymmetricKey,
    rewardContract: string,
    claimSig: string,
    rewardTokens: string[],
    paymentAmount: string
  ) {
     const _rewardContract = new CLByteArray(
		 	Uint8Array.from(Buffer.from(rewardContract, "hex"))
		 );
    const runtimeArgs = RuntimeArgs.fromMap({
      reward_contract: utils.createRecipientAddress(_rewardContract),
      claim_sig:CLValueBuilder.string(claimSig),
      reward_tokens: CLValueBuilder.list(rewardTokens.map(id => CLValueBuilder.string(id))),

    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "set_rewards",
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

  public async setKilled(
    keys: Keys.AsymmetricKey,
    isKilled: boolean,
    paymentAmount: string
  ) {
    const runtimeArgs = RuntimeArgs.fromMap({
      is_killed: CLValueBuilder.bool(isKilled)
    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "set_killed",
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

  public async comitTransferOwnership(
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
      entryPoint: "comit_transfer_ownership",
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

  public async acceptTransferOwnership(
    keys: Keys.AsymmetricKey,
    paymentAmount: string
  ) {
    const runtimeArgs = RuntimeArgs.fromMap({
    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "accept_transfer_ownership",
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

export default LIQUIDITYGAUGEV3Client;
