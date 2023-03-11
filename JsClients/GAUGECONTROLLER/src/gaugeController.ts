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
} from "casper-js-sdk";

const keccak = require('keccak');
import { Some, None } from "ts-results";
import * as blake from "blakejs";
import { concat } from "@ethersproject/bytes";
import { GAUGECONTROLLEREVENTS } from "./constants";
import * as utils from "./utils";
import { RecipientType, IPendingDeploy } from "./types";
import {createRecipientAddress } from "./utils";

class GaugeControllerClient {
  private contractName: string = "erc20";
  private contractHash: string= "erc20";
  private contractPackageHash: string= "erc20";
  private namedKeys: {
    gaugeTypes_ : string,
    gaugeTypeNames : string,
    voteUserSlopes : string,
    voteUserPower : string,
    lastUserVote : string,
    pointsWeight : string,
    changesWeight : string,
    timeWeight : string,
    gauges : string,
    timeSum : string,
    pointsSum : string,
    changesSum : string,
    pointsTotal : string,
    pointsTypeWeight: string,
    timeTypeWeight :string,
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
      gaugeTypes_:"null",
      gaugeTypeNames : "null",
      voteUserSlopes : "null",
      voteUserPower : "null",
      lastUserVote : "null",
      pointsWeight : "null",
      changesWeight : "null",
      timeWeight : "null",
      gauges : "null",
      timeSum : "null",
      pointsSum : "null",
      changesSum : "null",
      pointsTotal : "null",
      pointsTypeWeight : "null",
      timeTypeWeight : "null"
    }; 
  }

  public async install(
    keys: Keys.AsymmetricKey,
    token: string,
    votingEscrow : string,
    contractName: string,
    paymentAmount: string,
    wasmPath: string
  ) {


    const _token = new CLByteArray(Uint8Array.from(Buffer.from(token, 'hex')));
    const _votingEscrow = new CLByteArray(Uint8Array.from(Buffer.from(votingEscrow, 'hex')));

    const runtimeArgs = RuntimeArgs.fromMap({
      token: CLValueBuilder.key(_token),
      voting_escrow: CLValueBuilder.key(_votingEscrow),
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

  public async installSessionCodeNoParam(
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
      package_hash: utils.createRecipientAddress(_packageHash),
      entrypoint: CLValueBuilder.string(entrypointName),
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

  public async installSessionCodeParamKeyAddr(
    keys: Keys.AsymmetricKey,
    packageHash: string,
    entrypointName:string,
    addr: string,
    paymentAmount: string,
    wasmPath: string
  ) {
    const _packageHash = new CLByteArray(
			Uint8Array.from(Buffer.from(packageHash, "hex"))
		);

    const _addr = new CLByteArray(Uint8Array.from(Buffer.from(addr, 'hex')));
    const runtimeArgs = RuntimeArgs.fromMap({
      package_hash: utils.createRecipientAddress(_packageHash),
      entrypoint: CLValueBuilder.string(entrypointName),
      addr: CLValueBuilder.key(_addr),
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

  public async installSessionCodeParamU128TypeId(
    keys: Keys.AsymmetricKey,
    packageHash: string,
    entrypointName:string,
    type_id: string,
    paymentAmount: string,
    wasmPath: string
  ) {
    const _packageHash = new CLByteArray(
			Uint8Array.from(Buffer.from(packageHash, "hex"))
		);

    const runtimeArgs = RuntimeArgs.fromMap({
      package_hash: utils.createRecipientAddress(_packageHash),
      entrypoint: CLValueBuilder.string(entrypointName),
      type_id: CLValueBuilder.tuple2([CLValueBuilder.bool(true), CLValueBuilder.u128(type_id)])
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
      'gauge_types_',
      'gauge_type_names',
      'vote_user_slopes',
      "vote_user_power",
      "last_user_vote",
      "points_weight",
      "changes_weight",
      "time_weight",
      "gauges",
      "time_sum",
      "points_sum",
      "changes_sum",
      "points_total",
      "points_type_weight",
      "time_type_weight",
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

  public async commit_transfer_ownership(   
    keys: Keys.AsymmetricKey,
    addr: string,
    paymentAmount: string){

    const _addr = new CLByteArray(
			Uint8Array.from(Buffer.from(addr, "hex"))
		);

    const runtimeArgs = RuntimeArgs.fromMap({
      addr: utils.createRecipientAddress(_addr),
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

  public async apply_transfer_ownership(
    keys: Keys.AsymmetricKey,
    paymentAmount: string
  ){

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

  public async checkpoint_gauge(   
    keys: Keys.AsymmetricKey,
    addr: string,
    paymentAmount: string){

    const _addr = new CLByteArray(
			Uint8Array.from(Buffer.from(addr, "hex"))
		);

    const runtimeArgs = RuntimeArgs.fromMap({
      addr: CLValueBuilder.key(_addr),
    });

    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "checkpoint_gauge",
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
    paymentAmount: string){

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

  public async change_type_weight(   
    keys: Keys.AsymmetricKey,
    type_id: string,
    weight : string,
    paymentAmount: string){

    const runtimeArgs = RuntimeArgs.fromMap({
      type_id : CLValueBuilder.tuple2([CLValueBuilder.bool(true), CLValueBuilder.u128(type_id)]),
      weight : CLValueBuilder.u256(weight),
    });

    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "change_type_weight",
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

  public async change_gauge_weight(   
    keys: Keys.AsymmetricKey,
    addr: string,
    weight : string,
    paymentAmount: string){

    const _addr = new CLByteArray(
			Uint8Array.from(Buffer.from(addr, "hex"))
		);

    const runtimeArgs = RuntimeArgs.fromMap({
      addr: CLValueBuilder.key(_addr),
      weight : CLValueBuilder.u256(weight)
    });

    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "change_gauge_weight",
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
  
  public async add_type(   
    keys: Keys.AsymmetricKey,
    name: string,
    weight :string,
    paymentAmount: string){

    const runtimeArgs = RuntimeArgs.fromMap({
    name : CLValueBuilder.string(name),
    weight : new CLOption(Some(CLValueBuilder.u256(weight)))
    });

    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "add_type",
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

  public async add_gauge(   
    keys: Keys.AsymmetricKey,
    addr: string,
    gauge_type :string, 
    weight : string,
    paymentAmount: string,
    ){

    const _addr = new CLByteArray(
			Uint8Array.from(Buffer.from(addr, "hex"))
		);

    const runtimeArgs = RuntimeArgs.fromMap({
      addr: utils.createRecipientAddress(_addr),
      gauge_type : CLValueBuilder.tuple2([CLValueBuilder.bool(true), CLValueBuilder.u128(gauge_type)]),
      weight : new CLOption(Some(CLValueBuilder.u256(weight)))
    });

    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "add_gauge",
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

  public async vote_for_gauge_weights(   
    keys: Keys.AsymmetricKey,
    gauge_addr: string,
    user_weight :string, 
    paymentAmount: string,
    ){

    const _gauge_addr = new CLByteArray(
			Uint8Array.from(Buffer.from(gauge_addr, "hex"))
		);

    const runtimeArgs = RuntimeArgs.fromMap({
      gauge_addr: utils.createRecipientAddress(_gauge_addr),
      user_weight : CLValueBuilder.u256(user_weight)
    });

    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "vote_for_gauge_weights",
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

  public async gauge_types_(owner: string) {
    try {

      const result = await utils.contractDictionaryGetter(
        this.nodeAddress,
        owner,
        this.namedKeys.gaugeTypes_
      );
      const maybeValue = result.value().unwrap();
      return maybeValue.value().toString();

    } catch (error) {
      return "0";
    }
    
  }

  public async gauge_type_names(owner : string){
    try {

      const result = await utils.contractDictionaryGetter(
        this.nodeAddress,
        owner,
        this.namedKeys.gaugeTypeNames
      );
      const maybeValue = result.value().unwrap();
      return maybeValue.value().toString();

    } catch (error) {
      return "0";
    }
  }

  public async gauge_type_names_block(owner : string, stateRootHash : any){
    try {

      const result = await utils.contractDictionaryGetterBlock(
        stateRootHash,
        this.nodeAddress,
        owner,
        this.namedKeys.gaugeTypeNames
      );
      const maybeValue = result.value().unwrap();
      return maybeValue.value().toString();

    } catch (error) {
      return "0";
    }
  }

  public async vote_user_slopes(owner:string, spender:string) {
    try {
      let votedSlope = {
        slope : 0,
        power : 0,
        end : 0
      }

      votedSlope.slope = await this.voteUserSlopeSlope(owner, spender);
      votedSlope.power = await this.voteUserSlopePower(owner, spender);
      votedSlope.end = await this.voteUserSlopeEnd(owner, spender);

      return votedSlope;
    } catch (error) {
      return {
        slope : 0,
        power : 0,
        end : 0
      };
    }

  }

  async voteUserSlopeSlope(owner:string, spender:string) {
    try {
      
      const formattedString = "vote_user_slopes" + "_slope_" + owner + "_" + spender;
      const hash = keccak('keccak256').update(formattedString).digest('hex');

      const result = await utils.contractDictionaryGetter(
        this.nodeAddress,
        hash,
        this.namedKeys.voteUserSlopes
      );
        
      return parseInt(result.data.val.data._hex);
    } catch (error) {
      return 0;
    }
  }

  async voteUserSlopePower(owner:string, spender:string) {
    try {
      
      const formattedString = "vote_user_slopes" + "_power_" + owner + "_" + spender;
      const hash = keccak('keccak256').update(formattedString).digest('hex');

      const result = await utils.contractDictionaryGetter(
        this.nodeAddress,
        hash,
        this.namedKeys.voteUserSlopes
      );
        
      return parseInt(result.data.val.data._hex);
    } catch (error) {
      return 0;
    }
  }

  async voteUserSlopeEnd(owner:string, spender:string) {
    try {
      
      const formattedString = "vote_user_slopes" + "_end_" + owner + "_" + spender;
      const hash = keccak('keccak256').update(formattedString).digest('hex');

      const result = await utils.contractDictionaryGetter(
        this.nodeAddress,
        hash,
        this.namedKeys.voteUserSlopes
      );
        
      return parseInt(result.data.val.data._hex);
    } catch (error) {
      return 0;
    }
  }

  public get_blocktime(){
    return (new Date().getTime());
  }

  public async gaugeRelativeWeight(addr: string, time: number){
    try{
      let time_;
    
    if(time)
      time_ = time
    else
      time_= this.get_blocktime()
    
    return await this._gauge_relative_weight(addr, time_)
    }catch(error){
      return "0";
    }
  }

  async _gauge_relative_weight(addr: string, time: number){
    const WEEK = 604800000;
    const MULTIPLIER = 1000000000;
    let t = Math.floor((time / WEEK) * WEEK);
    
    let _total_weight = await this.points_total(t.toString());
    if (_total_weight > 0){
        let gauge_type = await this.gauge_types_(addr);
        gauge_type = gauge_type -  1;
        let _type_weight = await this.points_type_weight(gauge_type, t.toString());
        let points_weight = await this.points_weight(addr, t.toString());
        let _gauge_weight = points_weight.bias
        return Math.floor((MULTIPLIER * _type_weight * _gauge_weight) / _total_weight)
    } else {
        return 0
    }    
}

  public async getGaugeWeight(addr : string){
    try{
      let time_weight = await this.time_weight(addr);
      let pointWeight = await this.points_weight(addr, time_weight);
      return pointWeight.bias;
    }catch(error){
      return "0";
    }
  }

  public async getTotalWeight(){
    try{
      let time_total = await this.time_total();
      return await this.points_total(time_total.toString());
    }catch(error){
      return "0";
    }
  }

  public async vote_user_power(owner : string){
    try {
      
      const result = await utils.contractDictionaryGetter(
        this.nodeAddress,
        owner,
        this.namedKeys.voteUserPower
      );
      const maybeValue = result.value().unwrap();
      return maybeValue.value().toString();

    } catch (error) {
      return "0";
    }
  }

  public async last_user_vote(owner:string, spender:string) {
    try {
      const _spender = new CLByteArray(
        Uint8Array.from(Buffer.from(spender, "hex"))
      );

      const _owner=new CLKey(new CLAccountHash(Uint8Array.from(Buffer.from(owner, "hex"))));
      const key_spender = createRecipientAddress(_spender);
      const finalBytes = concat([CLValueParsers.toBytes(_owner).unwrap(), CLValueParsers.toBytes(key_spender).unwrap()]);
      const blaked = blake.blake2b(finalBytes, undefined, 32);
      const encodedBytes = Buffer.from(blaked).toString("hex");

      const result = await utils.contractDictionaryGetter(
        this.nodeAddress,
        encodedBytes,
        this.namedKeys.lastUserVote
      );

      const maybeValue = result.value().unwrap();
      return maybeValue.value().toString();
    } catch (error) {
      return "0";
    }

  }

  async pointsWeightBias(owner:string, spender:string) {
    try {
      
      const formattedString = "points_weight" + "_bias_" + owner + "_" + spender;
      const hash = keccak('keccak256').update(formattedString).digest('hex');

      const result = await utils.contractDictionaryGetter(
        this.nodeAddress,
        hash,
        this.namedKeys.pointsWeight
      );

      return parseInt(result.data.val.data._hex);
    } catch (error) {
      return 0;
    }
  }

  async pointsWeightSlope(owner:string, spender:string) {
    try {
      
      const formattedString = "points_weight" + "_slope_" + owner + "_" + spender;
      const hash = keccak('keccak256').update(formattedString).digest('hex');

      const result = await utils.contractDictionaryGetter(
        this.nodeAddress,
        hash,
        this.namedKeys.pointsWeight
      );

      return parseInt(result.data.val.data._hex);
    } catch (error) {
      return 0;
    }
  }

  async pointsWeightBiasBlock(owner:string, spender:string, stateRootHash:any) {
    try {
      
      const formattedString = "points_weight" + "_bias_" + owner + "_" + spender;
      const hash = keccak('keccak256').update(formattedString).digest('hex');

      const result = await utils.contractDictionaryGetterBlock(
        stateRootHash,
        this.nodeAddress,
        hash,
        this.namedKeys.pointsWeight
      );

      return parseInt(result.data.val.data._hex);
    } catch (error) {
      return 0;
    }
  }

  async pointsWeightSlopeBlock(owner:string, spender:string, stateRootHash:any) {
    try {
      
      const formattedString = "points_weight" + "_slope_" + owner + "_" + spender;
      const hash = keccak('keccak256').update(formattedString).digest('hex');

      const result = await utils.contractDictionaryGetterBlock(
        stateRootHash,
        this.nodeAddress,
        hash,
        this.namedKeys.pointsWeight
      );

      return parseInt(result.data.val.data._hex);
    } catch (error) {
      return 0;
    }
  }

  public async points_weight(owner:string, spender:string) {
    try {
    
    let pointsWeight = {
    bias : 0,
    slope : 0
    };

    pointsWeight.bias = await this.pointsWeightBias(owner, spender);
    pointsWeight.slope = await this.pointsWeightSlope(owner, spender);

    return pointsWeight;

    } catch (error) {
      return {bias : 0, slope : 0};
    }
  }

  public async points_weight_block(owner:string, spender:string, stateRootHash:any) {
    try {
    
    let pointsWeight = {
    bias : 0,
    slope : 0
    };

    pointsWeight.bias = await this.pointsWeightBiasBlock(owner, spender,stateRootHash);
    pointsWeight.slope = await this.pointsWeightSlopeBlock(owner, spender,stateRootHash);

    return pointsWeight;

    } catch (error) {
      return {bias : 0, slope : 0};
    }
  }

  public async changes_weight(owner:string, spender:string) {
    try {
      const _spender = CLValueBuilder.u256(spender);

      const _owner=new CLKey(new CLAccountHash(Uint8Array.from(Buffer.from(owner, "hex"))));
      const finalBytes = concat([CLValueParsers.toBytes(_owner).unwrap(), CLValueParsers.toBytes(_spender).unwrap()]);
      const blaked = blake.blake2b(finalBytes, undefined, 32);
      const encodedBytes = Buffer.from(blaked).toString("hex");

      const result = await utils.contractDictionaryGetter(
        this.nodeAddress,
        encodedBytes,
        this.namedKeys.changesWeight
      );

      const maybeValue = result.value().unwrap();
      return maybeValue.value().toString();
    } catch (error) {
      return "0";
    }

  }

  public async time_weight(owner: string) {
    try {

      const result = await utils.contractDictionaryGetter(
        this.nodeAddress,
        owner,
        this.namedKeys.timeWeight
      );
      const maybeValue = result.value().unwrap();
      return maybeValue.value().toString();

    } catch (error) {
      return "0";
    }
    
  }

  public async gauges(owner: string) {
    try {

      const result = await utils.contractDictionaryGetter(
        this.nodeAddress,
        owner,
        this.namedKeys.gauges
      );
      const maybeValue = result.value().unwrap();
      return maybeValue.value().toString();

    } catch (error) {
      return "0";
    }
    
  }

  public async time_sum(owner: string) {
    try {

      const result = await utils.contractDictionaryGetter(
        this.nodeAddress,
        owner,
        this.namedKeys.timeSum
      );
      const maybeValue = result.value().unwrap();
      return maybeValue.value().toString();

    } catch (error) {
      return "0";
    }
    
  }

  public async points_sum(owner:string, spender:string) {
    try {
      const _spender = CLValueBuilder.u256(spender);
      const _owner= CLValueBuilder.tuple2([CLValueBuilder.bool(true), CLValueBuilder.u128(owner)]);
      const finalBytes = concat([CLValueParsers.toBytes(_owner).unwrap(), CLValueParsers.toBytes(_spender).unwrap()]);
      const blaked = blake.blake2b(finalBytes, undefined, 32);
      const encodedBytes = Buffer.from(blaked).toString("hex");

      const result = await utils.contractDictionaryGetter(
        this.nodeAddress,
        encodedBytes,
        this.namedKeys.pointsSum
      );

      const maybeValue = result.value().unwrap();
      return maybeValue.value().toString();
    } catch (error) {
      return "0";
    }

  }

  public async changes_sum(owner:string, spender:string) {
    try {
      const _spender = CLValueBuilder.u256(spender);
      const _owner= CLValueBuilder.tuple2([CLValueBuilder.bool(true), CLValueBuilder.u128(owner)]);
      const finalBytes = concat([CLValueParsers.toBytes(_owner).unwrap(), CLValueParsers.toBytes(_spender).unwrap()]);
      const blaked = blake.blake2b(finalBytes, undefined, 32);
      const encodedBytes = Buffer.from(blaked).toString("hex");

      const result = await utils.contractDictionaryGetter(
        this.nodeAddress,
        encodedBytes,
        this.namedKeys.changesSum
      );

      const maybeValue = result.value().unwrap();
      return maybeValue.value().toString();
    } catch (error) {
      return "0";
    }

  }

  public async points_total(owner: string) {
    try {

      const result = await utils.contractDictionaryGetter(
        this.nodeAddress,
        owner,
        this.namedKeys.pointsTotal
      );
      const maybeValue = result.value().unwrap();
      return maybeValue.value().toString();

    } catch (error) {
      return "0";
    }
    
  }

  public async points_total_block(owner: string, stateRootHash:any) {
    try {

      const result = await utils.contractDictionaryGetterBlock(
        stateRootHash,
        this.nodeAddress,
        owner,
        this.namedKeys.pointsTotal
      );
      const maybeValue = result.value().unwrap();
      return maybeValue.value().toString();

    } catch (error) {
      return "0";
    }
    
  }

  public async points_type_weight(owner:string, spender:string) {
    try {
      const _spender = CLValueBuilder.u256(spender);
      const _owner= CLValueBuilder.tuple2([CLValueBuilder.bool(true), CLValueBuilder.u128(owner)]);
      const finalBytes = concat([CLValueParsers.toBytes(_owner).unwrap(), CLValueParsers.toBytes(_spender).unwrap()]);
      const blaked = blake.blake2b(finalBytes, undefined, 32);
      const encodedBytes = Buffer.from(blaked).toString("hex");

      const result = await utils.contractDictionaryGetter(
        this.nodeAddress,
        encodedBytes,
        this.namedKeys.pointsTypeWeight
      );

      const maybeValue = result.value().unwrap();
      return maybeValue.value().toString();
    } catch (error) {
      return "0";
    }

  }

  public async points_type_weight_block(owner:string, spender:string,stateRootHash:any) {
    try {
      const _spender = CLValueBuilder.u256(spender);
      const _owner= CLValueBuilder.tuple2([CLValueBuilder.bool(true), CLValueBuilder.u128(owner)]);
      const finalBytes = concat([CLValueParsers.toBytes(_owner).unwrap(), CLValueParsers.toBytes(_spender).unwrap()]);
      const blaked = blake.blake2b(finalBytes, undefined, 32);
      const encodedBytes = Buffer.from(blaked).toString("hex");

      const result = await utils.contractDictionaryGetterBlock(
        stateRootHash,
        this.nodeAddress,
        encodedBytes,
        this.namedKeys.pointsTypeWeight
      );

      const maybeValue = result.value().unwrap();
      return maybeValue.value().toString();
    } catch (error) {
      return "0";
    }

  }

  public async time_type_weight(owner: string) {
    try {

      const result = await utils.contractDictionaryGetter(
        this.nodeAddress,
        owner,
        this.namedKeys.timeTypeWeight
      );
      const maybeValue = result.value().unwrap();
      return maybeValue.value().toString();

    } catch (error) {
      return "0";
    }
    
  }

  public async time_total() {
    const result = await contractSimpleGetter(
      this.nodeAddress,
      this.contractHash,
      ["time_total"]
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

  public async future_admin() {
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

  public async n_gauge_types() {
    const result = await contractSimpleGetter(
      this.nodeAddress,
      this.contractHash,
      ["n_gauge_types"]
    );
    return result.value();
  }   

  public async n_gauges() {
    const result = await contractSimpleGetter(
      this.nodeAddress,
      this.contractHash,
      ["n_gauges"]
    );
    return result.value();
  }   

  public async voting_escrow() {
    const result = await contractSimpleGetter(
      this.nodeAddress,
      this.contractHash,
      ["voting_escrow"]
    );
    return result.value();
  } 

  public async get_hash() {
    const result = await contractSimpleGetter(
      this.nodeAddress,
      this.contractHash,
      ["self_contract_hash"]
    );
    return result.value();
  } 

  public async package_hash() {
    const result = await contractSimpleGetter(
      this.nodeAddress,
      this.contractHash,
      ["self_contract_package_hash"]
    );
    return result.value();
  }   
  
  public onEvent(
    eventNames: GAUGECONTROLLEREVENTS[],
    callback: (
      eventName: GAUGECONTROLLEREVENTS,
      deployStatus: {
        deployHash: string;
        success: boolean;
        error: string | null;
      },
      result: any | null
    ) => void
  ): any {
    if (!this.eventStreamAddress) {
      throw Error("Please set eventStreamAddress before!");
    }
    if (this.isListening) {
      throw Error(
        "Only one event listener can be create at a time. Remove the previous one and start new."
      );
    }
    const es = new EventStream(this.eventStreamAddress);
    this.isListening = true;

    es.subscribe(EventName.DeployProcessed, (value: any) => {
      const deployHash = value.body.DeployProcessed.deploy_hash;

      const pendingDeploy = this.pendingDeploys.find(
        (pending) => pending.deployHash === deployHash
      );

      if (!pendingDeploy) {
        return;
      }

      if (
        !value.body.DeployProcessed.execution_result.Success &&
        value.body.DeployProcessed.execution_result.Failure
      ) {
        callback(
          pendingDeploy.deployType,
          {
            deployHash,
            error:
              value.body.DeployProcessed.execution_result.Failure.error_message,
            success: false,
          },
          null
        );
      } else {
        const { transforms } =
          value.body.DeployProcessed.execution_result.Success.effect;

        const GAUGECONTROLLEREVENTS = transforms.reduce((acc: any, val: any) => {
          if (
            val.transform.hasOwnProperty("WriteCLValue") &&
            typeof val.transform.WriteCLValue.parsed === "object" &&
            val.transform.WriteCLValue.parsed !== null
          ) {
            const maybeCLValue = CLValueParsers.fromJSON(
              val.transform.WriteCLValue
            );
            const clValue = maybeCLValue.unwrap();
            if (clValue && clValue instanceof CLMap) {
              const hash = clValue.get(
                CLValueBuilder.string("contract_package_hash")
              );
              const event = clValue.get(CLValueBuilder.string("event_type"));
              if (
                hash &&
                // NOTE: Calling toLowerCase() because current JS-SDK doesn't support checksumed hashes and returns all lower case value
                // Remove it after updating SDK
                hash.value() === this.contractPackageHash.toLowerCase() &&
                event &&
                eventNames.includes(event.value())
              ) {
                acc = [...acc, { name: event.value(), clValue }];
              }
            }
          }
          return acc;
        }, []);

        GAUGECONTROLLEREVENTS.forEach((d: any) =>
          callback(
            d.name,
            { deployHash, error: null, success: true },
            d.clValue
          )
        );
      }

      this.pendingDeploys = this.pendingDeploys.filter(
        (pending) => pending.deployHash !== deployHash
      );
    });
    es.start();

    return {
      stopListening: () => {
        es.unsubscribe(EventName.DeployProcessed);
        es.stop();
        this.isListening = false;
        this.pendingDeploys = [];
      },
    };
  }

  public addPendingDeploy(deployType: GAUGECONTROLLEREVENTS, deployHash: string) {
    this.pendingDeploys = [...this.pendingDeploys, { deployHash, deployType }];
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

export default GaugeControllerClient;
