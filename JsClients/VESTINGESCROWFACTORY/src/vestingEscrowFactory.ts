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

class VESTINGESCROWFACTORYClient {
  private contractName: string = "vestingEscrowFactory";
  private contractHash: string= "vestingEscrowFactory";
  private contractPackageHash: string= "vestingEscrowFactory";
  private namedKeys: {
    balances:string
    metadata: string;
    nonces: string;
    allowances: string;
    ownedTokens: string;
    owners: string;
    paused: string;
    initialLocked: string;
    totalClaimed: string;
    disabledAt: string;
    
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
      initialLocked: "null",
      totalClaimed: "null",
      disabledAt: "null"
    }; 
  }

  public async install(
    keys: Keys.AsymmetricKey,
    target: string,
    admin:RecipientType,
    contractName: string,
    paymentAmount: string,
    wasmPath: string
  ) {
    const _target = new CLByteArray(
			Uint8Array.from(Buffer.from(target, "hex"))
		);
    const runtimeArgs = RuntimeArgs.fromMap({
      target: utils.createRecipientAddress(_target),
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

  public async vestedOfSessionCode(
    keys: Keys.AsymmetricKey,
    entrypointName:string,
    packageHash: string,
    recipient:string,
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
      recipient:CLValueBuilder.key(_recipient)
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

  public async balanceOfSessionCode(
    keys: Keys.AsymmetricKey,
    entrypointName:string,
    packageHash: string,
    recipient:string,
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
      recipient:CLValueBuilder.key(_recipient)
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

  public block_number(){
    const AVG_BLOCK_TIME_IN_MS = 45000;
    return Math.floor((new Date().getTime()) / AVG_BLOCK_TIME_IN_MS);
  }

  public get_blocktime(){
    return (new Date().getTime());
  }

  public async lockedOf(recipient: string){
    try{
      let initial_locked = await this.initialLocked(recipient);
      let blocktime = this.get_blocktime();
      let total_vested_of = await this.totalVestedOf(recipient, blocktime);
      return (initial_locked - total_vested_of);
    }catch(error){
      return "0"
    }
  }

  public async balanceOf(recipient : string){
    try{
      let blocktime = this.get_blocktime();
      let total_vested_of= await this.totalVestedOf(recipient, blocktime);
      let self_total_claimed= await this.totalClaimed(recipient);
      return (total_vested_of - self_total_claimed);
    }catch(error){
      return "0";
    }
  }

  public async vestedOf(recipient : string){
    try{
      let blocktime =this.get_blocktime();
      return await this.totalVestedOf(recipient, blocktime)
    }catch(error){
      return "0"
    }
  }

  public async totalVestedOf(recipient: string, time: number){
    let blocktime = this.get_blocktime();
    let _time;
    if(time){
      _time = time;
    }else{
      _time = blocktime
    }
    
    let start= await this.startTime();
    let end = await this.endTime();
    let locked = await this.initialLocked(recipient);
    if( _time < start ){
        return 0;
    }
    let ans = Math.floor((locked * (_time - start)) / (end - start));
    ans = Math.min(ans, locked);
    return ans;
  }

  public async vestedSupplySessionCode(
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

  public async lockedSupplySessionCode(
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

  public async lockedOfSessionCode(
    keys: Keys.AsymmetricKey,
    entrypointName:string,
    packageHash: string,
    recipient:string,
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
      recipient:CLValueBuilder.key(_recipient)
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

  public async commitTransferOwnershipSessionCode(
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
      addr:CLValueBuilder.key(_addr)
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

  public async applyTransferOwnershipSessionCode(
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
      'initial_locked',
      'total_claimed',
      'disabled_at',
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

  //VESTING ESCROW FACTORY FUNCTIONS

  public async packageHash() {
    const result = await contractSimpleGetter(
      this.nodeAddress,
      this.contractHash,
      ["self_contract_package_hash"]
    );
    return result.value();
  }

  public async adminVef() {
    const result = await contractSimpleGetter(
      this.nodeAddress,
      this.contractHash,
      ["admin"]
    );
    return result.value();
  }

  public async target() {
    const result = await contractSimpleGetter(
      this.nodeAddress,
      this.contractHash,
      ["target"]
    );
    return result.value();
  }

  public async futureAdminVef() {
    const result = await contractSimpleGetter(
      this.nodeAddress,
      this.contractHash,
      ["future_admin"]
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

  public async startTime() {
    const result = await contractSimpleGetter(
      this.nodeAddress,
      this.contractHash,
      ["start_time"]
    );
    return result.value();
  }

  public async endTime() {
    const result = await contractSimpleGetter(
      this.nodeAddress,
      this.contractHash,
      ["end_time"]
    );
    return result.value();
  }

  public async initialLockedSupply() {
    const result = await contractSimpleGetter(
      this.nodeAddress,
      this.contractHash,
      ["initial_locked_supply"]
    );
    return result.value();
  }

  public async canDisable() {
    const result = await contractSimpleGetter(
      this.nodeAddress,
      this.contractHash,
      ["can_disable"]
    );
    return result.value();
  }

  public async admin() {
    const result = await contractSimpleGetter(
      this.nodeAddress,
      this.contractHash,
      ["admin"]
    );
    return result.value();
  }

  public async futureAdmin() {
    const result = await contractSimpleGetter(
      this.nodeAddress,
      this.contractHash,
      ["future_admin"]
    );
    return result.value();
  }

  public async initialLocked(owner: string) {
    try {

      const result = await utils.contractDictionaryGetter(
        this.nodeAddress,
        owner,
        this.namedKeys.initialLocked
      );
      const maybeValue = result.value().unwrap();
      return maybeValue.value().toString();

    } catch (error) {
      return "0";
    }
    
  }

  public async totalClaimed(owner: string) {
    try {

      const result = await utils.contractDictionaryGetter(
        this.nodeAddress,
        owner,
        this.namedKeys.totalClaimed
      );
      const maybeValue = result.value().unwrap();
      return maybeValue.value().toString();

    } catch (error) {
      return "0";
    }
    
  }

  public async disabledAt(owner: string) {
    try {

      const result = await utils.contractDictionaryGetter(
        this.nodeAddress,
        owner,
        this.namedKeys.disabledAt
      );
      const maybeValue = result.value().unwrap();
      return maybeValue.value().toString();

    } catch (error) {
      return "0";
    }
    
  }


  public async applyTransferOwnershipVef(
    keys: Keys.AsymmetricKey,
    paymentAmount: string
  ) {
    const runtimeArgs = RuntimeArgs.fromMap({
    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "apply_transfer_ownership_vef",
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

  public async commitTransferOwnershipVef(
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
      entryPoint: "commit_transfer_ownership_vef",
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

  public async deployVestingContract(
    keys: Keys.AsymmetricKey,
    token: string,
    recipient: RecipientType,
    amount: string,
    canDisable: boolean,
    vestingDuration: string,
    vestingStart: string,
    paymentAmount: string
  ) {
    const _token = new CLByteArray(
			Uint8Array.from(Buffer.from(token, "hex"))
		);
    const runtimeArgs = RuntimeArgs.fromMap({
      token: utils.createRecipientAddress(_token),
      recipient: utils.createRecipientAddress(recipient),
      amount: CLValueBuilder.u256(amount),
      can_disable:CLValueBuilder.bool(canDisable),
      vesting_duration: CLValueBuilder.u256(vestingDuration),
      vesting_start: new CLOption(Some(CLValueBuilder.u256(vestingStart)))
    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "deploy_vesting_contract",
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



  //VESTING-ESCROW-SIMPLE FUNCTIONS

//issue
  public async initialize(
    keys: Keys.AsymmetricKey,
    admin: RecipientType,
    token: string,
    recipient: string,
    amount: string,
    startTime: string,
    endTime: string,
    canDisable: boolean,
    paymentAmount: string
  ) {
    const _token = new CLByteArray(
			Uint8Array.from(Buffer.from(token, "hex"))
		);
    const _recipient = new CLByteArray(
			Uint8Array.from(Buffer.from(recipient, "hex"))
		);
    const runtimeArgs = RuntimeArgs.fromMap({
      admin: utils.createRecipientAddress(admin),
      token: utils.createRecipientAddress(_token),
      recipient: utils.createRecipientAddress(_recipient),
      amount: CLValueBuilder.u256(amount),
      start_time: CLValueBuilder.u256(startTime),
      end_time: CLValueBuilder.u256(endTime),
      can_disable:CLValueBuilder.bool(canDisable),
    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "initialize",
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

  public async toggleDisable(
    keys: Keys.AsymmetricKey,
    recipient:string,
    paymentAmount: string
  ) {
    const _recipient = new CLByteArray(
			Uint8Array.from(Buffer.from(recipient, "hex"))
		);
    const runtimeArgs = RuntimeArgs.fromMap({
      recipient: utils.createRecipientAddress(_recipient),
    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "toggle_disable",
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

  public async disableCanDisable(
    keys: Keys.AsymmetricKey,
    paymentAmount: string
  ) {
    const runtimeArgs = RuntimeArgs.fromMap({ 
    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "disable_can_disable",
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

  public async claim(
    keys: Keys.AsymmetricKey,
    addr: RecipientType,
    paymentAmount: string
  ) {
    const runtimeArgs = RuntimeArgs.fromMap({
      addr: new CLOption(Some(utils.createRecipientAddress(addr))),

    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "claim",
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

export default VESTINGESCROWFACTORYClient;
