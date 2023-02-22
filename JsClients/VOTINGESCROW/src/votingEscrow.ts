import {
  CasperClient,
  CLPublicKey,
  CLByteArray,
  CLString,
  CLTypeBuilder,
  CLValue,
  CLValueBuilder,
  DeployUtil,
  Keys,
  RuntimeArgs,
} from "casper-js-sdk";

const keccak = require('keccak');
import * as utils from "./utils";
import { RecipientType, IPendingDeploy } from "./types";

class VOTINGESCROWClient {
  private contractName: string = "votingescrow";
  private contractHash: string= "votingescrow";
  private contractPackageHash: string= "votingescrow";
  private namedKeys: {
    locked: string,
    pointHistory: string;
    slopeChanges: string;
    userPointHistory: string;
    userPointEpoch: string;
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
      locked: "null",
      pointHistory: "null",
      slopeChanges: "null",
      userPointHistory: "null",
      userPointEpoch: "null",
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

  public async getLastUserSlope(addr : string){
  try{
    let uepoch = await this.userPointEpoch(addr);
    return await this.userPointHistory(addr, uepoch);
  }catch(error){
    return 0;
  }
  }
  
  public async getLastUserSlopeSessionCode(
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

  public async userPointHistoryTsSessionCode(
    keys: Keys.AsymmetricKey,
    entrypointName:string,
    packageHash: string,
    addr:RecipientType,
    idx:string,
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
      idx: CLValueBuilder.u256(idx)
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
  public async lockedEnd(account: string) {
    try {
      let lockedEnd = {
        amount : 0,
        end : 0,
      };
      lockedEnd.amount = await this.lockedEndAmount(account); 
      lockedEnd.end = await this.lockedEndEnd(account);

      return lockedEnd;
    } catch (error) {
      return {
        amount : 0,
        end : 0,
    };
    }

  }

  async lockedEndAmount(account:string) {
    try {
      const formattedString = "locked" + "_amount_" + account;
      const hash = keccak('keccak256').update(formattedString).digest('hex');

      console.log("lockedEndAmount hash", hash);
      const result = await utils.contractDictionaryGetter(
        this.nodeAddress,
        hash,
        this.namedKeys.locked
      );

      console.log("lockedEndAmount value",parseInt(result.data.val.data._hex))
     
      return parseInt(result.data.val.data._hex);
    } catch (error) {
      return 0;
    }
  }

  async lockedEndEnd(account:string) {
    try {
      const formattedString = "locked" + "_end_" + account;
      const hash = keccak('keccak256').update(formattedString).digest('hex');

      console.log("lockedEndEnd hash", hash);
      const result = await utils.contractDictionaryGetter(
        this.nodeAddress,
        hash,
        this.namedKeys.locked
      );

      console.log("lockedEndEnd value",parseInt(result.data.val.data._hex))
     
      return parseInt(result.data.val.data._hex);
    } catch (error) {
      return 0;
    }
  }

  public async lockedEndSessionCode(
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

  public async balanceOfSessionCode(
    keys: Keys.AsymmetricKey,
    entrypointName:string,
    packageHash: string,
    addr:RecipientType,
    t:string,
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
      t: CLValueBuilder.u256(t)
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

  public async balanceOf(account: string, t: number) {
    try {
      
      if(t == null)
      {
        t = (new Date().getTime());
      }
      console.log("account: ",account);
      console.log("t: ",t);
      let epoch = await this.userPointEpoch(account);
      console.log("epoch: ",epoch);
      if(epoch == 0)
      {
        return "0";
      }
      else{
        let lastPoint  = await this.userPointHistory(account,epoch);
        console.log("lastPoint: ",lastPoint);
        lastPoint.bias = (lastPoint.bias -(lastPoint.slope * (t-lastPoint.ts)));
        if (lastPoint.bias < 0) {
            lastPoint.bias = 0;
        }
        return lastPoint.bias;
      }
   
    } catch (error) {
      return "0";
    }

  }

  public async balanceOfBlock(account: string, t: number,stateRootHash:any) {
    try {
      
      if(t == null)
      {
        t = (new Date().getTime());
      }
      console.log("account: ",account);
      console.log("t: ",t);
      let epoch = await this.userPointEpochBlock(account,stateRootHash);
      console.log("epoch: ",epoch);
      if(epoch == 0)
      {
        return "0";
      }
      else{
        let lastPoint  = await this.userPointHistoryBlock(account,epoch,stateRootHash);
        console.log("lastPoint: ",lastPoint);
        lastPoint.bias = (lastPoint.bias -(lastPoint.slope * (t-lastPoint.ts)));
        if (lastPoint.bias < 0) {
            lastPoint.bias = 0;
        }
        return lastPoint.bias;
      }
   
    } catch (error) {
      return "0";
    }

  }

  async findBlockEpoch(block:number,max_epoch:number){
     let min = 0;
     let max = max_epoch;

     for(let i = 0; i < 128; i++){
      if(min >= max)
        break;
      let mid = Math.floor((min + max + 1) / 2);
      let pointHistory = await this.pointHistory(mid);
      if(pointHistory.blk <= block)
        min = mid;
      else
        max = mid - 1;  
     }
     return min;
  }

  convert(a : number, b : number) {
    if (a > b) {
        return parseInt((a - b).toString());
    } else {
        return -parseInt((b - a).toString());
    }
  }

  public async balanceOfAt(addr : string, block : number){
    try{
      
      if(block > this.block_number()) {
        throw new Error("Invalid block number");
      }
  
      let min = 0;
      let max = parseFloat(await this.userPointEpoch(addr));
  
      for(let i = 0; i < 128; i++){
        if(min >= max)
          break;
        let mid = Math.floor((min + max + 1) / 2 );
        let pointHistory = await this.userPointHistory(addr,mid.toString());
      
        if(pointHistory.blk <= block)
          min = mid
        else
          max = mid - 1;  
      }
  
      let upoint = await this.userPointHistory(addr, min.toString());
      let max_epoch = await this.epoch();
      let epoch = await this.findBlockEpoch(block,max_epoch);
      let point_0 = await this.pointHistory(epoch);
      let d_block = 0;
      let d_t = 0;
  
      if (epoch < max_epoch ){
        let point_1 = await this.pointHistory(epoch + 1);
        d_block = point_1.blk - point_0.blk;
        d_t = point_1.ts - point_0.ts
           
    } else {
        d_block = this.block_number() - point_0.blk; 
        d_t = this.get_blocktime() - point_0.ts; 
    }
  
    let block_time = point_0.ts;
    if (d_block != 0) {
      block_time = block_time + Math.floor((d_t * (block - point_0.blk)) / d_block);
      }
      upoint.bias = upoint.bias - (upoint.slope * this.convert(block_time, upoint.ts))
      
    if (upoint.bias >= 0) {
        return upoint.bias
    } else {
        return 0
    }
    }catch(error){
      return "0";
    }  
  }

  public async totalSupply(t: number) {
    try {

      if(t == null)
      {
        t = (new Date().getTime());
      }
      console.log("t: ",t);
      let epoch = await this.epoch();
      console.log("epoch: ",parseInt(epoch._hex));
     
      let lastPoint = await this.pointHistory(epoch);
      return await this.supplyAt(lastPoint, t);

    } catch (error) {
      
      return "0";
    }

  }

  public async totalSupplyBlock(t: number,stateRootHash:any) {
    try {

      if(t == null)
      {
        t = (new Date().getTime());
      }
      console.log("t: ",t);
      let epoch = await this.epochBlock(stateRootHash);
      console.log("epoch: ",parseInt(epoch._hex));
     
      let lastPoint = await this.pointHistoryBlock(epoch,stateRootHash);
      return await this.supplyAtBlock(lastPoint, t,stateRootHash);

    } catch (error) {
      
      return "0";
    }

  }


  public block_number(){
    const AVG_BLOCK_TIME_IN_MS = 45000;
    return Math.floor((new Date().getTime()) / AVG_BLOCK_TIME_IN_MS);
  }

  public get_blocktime(){
    return (new Date().getTime());
  }

  public async totalSupplyAt(block : number){
    try{
      
      if(block > this.block_number()){
        console.log("Invalid block number")
      }
  
      let epoch = await this.epoch();
      let target_epoch = await this.findBlockEpoch(block, epoch);
      let point = await this.pointHistory(target_epoch);
      let dt= 0;
      
      if (target_epoch < epoch){
        let point_next = await this.pointHistory(target_epoch + 1);
  
        if (point.blk != point_next.blk){
          dt = Math.floor(((block - point.blk) * (point_next.ts - point.ts)) / (point_next.blk - point.blk));
        } 
      }else if(point.blk != this.block_number()){
        dt = Math.floor(((block - point.blk ) * (this.get_blocktime() - point.ts)) / (this.block_number() - point.blk));
      }
      return await this.supplyAt(point,point.ts + dt)
    
    }catch(error){
      return "0";
    }
    }

  public async supplyAt(point:{ts : number, bias : number, slope: number} , t: number) {   
      const WEEK = 604800000;
      let last_point = point;

      let t_i = Math.floor((last_point.ts / WEEK ) * WEEK);

      for (let i=0; i < 255; i++){
        t_i = t_i + WEEK;
        let d_slope = 0;

        if (t_i > t){
          t_i = t;
        } else {
            d_slope = await this.slopeChanges(t_i.toString());
        }

        last_point.bias = last_point.bias - (last_point.slope * this.convert(t_i, last_point.ts))

        if(t_i == t){
          break;
        }
        last_point.slope = last_point.slope + d_slope;
        last_point.ts = t_i;
      }
      if (last_point.bias < 0){
        last_point.bias = 0;
      }
      return last_point.bias;
  }

  public async supplyAtBlock(point:{ts : number, bias : number, slope: number} , t: number,stateRootHash:any) {   
    const WEEK = 604800000;
    let last_point = point;

    let t_i = Math.floor((last_point.ts / WEEK ) * WEEK);

    for (let i=0; i < 255; i++){
      t_i = t_i + WEEK;
      let d_slope = 0;

      if (t_i > t){
        t_i = t;
      } else {
          d_slope = await this.slopeChangesBlock(t_i.toString(),stateRootHash);
      }

      last_point.bias = last_point.bias - (last_point.slope * this.convert(t_i, last_point.ts))

      if(t_i == t){
        break;
      }
      last_point.slope = last_point.slope + d_slope;
      last_point.ts = t_i;
    }
    if (last_point.bias < 0){
      last_point.bias = 0;
    }
    return last_point.bias;
  }

  public async balanceOfAtSessionCode(
    keys: Keys.AsymmetricKey,
    entrypointName:string,
    packageHash: string,
    addr:RecipientType,
    time:string,
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
      time: CLValueBuilder.u256(time)
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

  public async totalSupplySessionCode(
    keys: Keys.AsymmetricKey,
    entrypointName:string,
    packageHash: string,
    t:string,
    paymentAmount: string,
    wasmPath: string
  ) {
    const _packageHash = new CLByteArray(
			Uint8Array.from(Buffer.from(packageHash, "hex"))
		);
    const runtimeArgs = RuntimeArgs.fromMap({
      entrypoint: CLValueBuilder.string(entrypointName),
      package_hash: utils.createRecipientAddress(_packageHash),
      t: CLValueBuilder.u256(t)
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

  public async totalSupplyAtSessionCode(
    keys: Keys.AsymmetricKey,
    entrypointName:string,
    packageHash: string,
    time:string,
    paymentAmount: string,
    wasmPath: string
  ) {
    const _packageHash = new CLByteArray(
			Uint8Array.from(Buffer.from(packageHash, "hex"))
		);
    const runtimeArgs = RuntimeArgs.fromMap({
      entrypoint: CLValueBuilder.string(entrypointName),
      package_hash: utils.createRecipientAddress(_packageHash),
      time: CLValueBuilder.u256(time)
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
      'locked',
      'point_history',
      'slope_changes',
      'user_point_history',
      'user_point_epoch'
    ];
    // @ts-ignore
    this.namedKeys = namedKeys.reduce((acc, val) => {
      if (LIST_OF_NAMED_KEYS.includes(val.name)) {
        return { ...acc, [utils.camelCased(val.name)]: val.key };
      }
      return acc;
    }, {});
  }

  //VOTING_ESCROW FUNCTIONS

  public async token() {
    const result = await contractSimpleGetter(
      this.nodeAddress,
      this.contractHash,
      ["token"]
    );
    return result.value();
  }

  public async supply() {
    const result = await contractSimpleGetter(
      this.nodeAddress,
      this.contractHash,
      ["supply"]
    );
    return result.value();
  }

  public async locked() {
    const result = await contractSimpleGetter(
      this.nodeAddress,
      this.contractHash,
      ["locked"]
    );
    return result.value();
  }

  public async epoch() {
    const result = await contractSimpleGetter(
      this.nodeAddress,
      this.contractHash,
      ["epoch"]
    );

    return result.value();
  }

  public async epochBlock(stateRootHash:any) {
    const result = await contractSimpleGetterBlock(
      stateRootHash,
      this.nodeAddress,
      this.contractHash,
      ["epoch"]
    );

    return result.value();
  }

  async pointHistoryBias(epoch: number) {
    try {

      const formattedString = "point_history" + "_bias_" + epoch;
      const hash = keccak('keccak256').update(formattedString).digest('hex');

      const result = await utils.contractDictionaryGetter(
        this.nodeAddress,
        hash,
        this.namedKeys.pointHistory
      );
      return parseInt(result.data.val.data[1].data._hex);

    } catch (error) {
      return 0;
    }
  }

  async pointHistorySlope(epoch: number) {
    try {

      const formattedString = "point_history" + "_slope_" + epoch;
      const hash = keccak('keccak256').update(formattedString).digest('hex');

      const result = await utils.contractDictionaryGetter(
        this.nodeAddress,
        hash,
        this.namedKeys.pointHistory
      );
      return parseInt(result.data.val.data[1].data._hex);

    } catch (error) {
      return 0;
    }
  }

  async pointHistoryTs(epoch: number) {
    try {

      const formattedString = "point_history" + "_ts_" + epoch;
      const hash = keccak('keccak256').update(formattedString).digest('hex');

      const result = await utils.contractDictionaryGetter(
        this.nodeAddress,
        hash,
        this.namedKeys.pointHistory
      );
      return parseInt(result.data.val.data._hex);

    } catch (error) {
      return 0;
    }
  }

  async pointHistoryBlk(epoch: number) {
    try {

      const formattedString = "point_history" + "_blk_" + epoch;
      const hash = keccak('keccak256').update(formattedString).digest('hex');

      const result = await utils.contractDictionaryGetter(
        this.nodeAddress,
        hash,
        this.namedKeys.pointHistory
      );
      return parseInt(result.data.val.data._hex);

    } catch (error) {
      return 0;
    }
  }

  public async pointHistory(epoch: number) {
    try {
      let pointHistory = {
        bias : 0,
        slope : 0,
        ts : 0,
        blk : 0
      }

      pointHistory.bias = await this.pointHistoryBias(epoch);
      pointHistory.slope = await this.pointHistorySlope(epoch);
      pointHistory.ts = await this.pointHistoryTs(epoch);
      pointHistory.blk = await this.pointHistoryBlk(epoch);
      
      return pointHistory;
    } catch (error) {
      return {
        bias : 0,
        slope : 0,
        ts : 0,
        blk : 0
      };
    }
  }

  async pointHistoryBiasBlock(epoch: number,stateRootHash:any) {
    try {

      const formattedString = "point_history" + "_bias_" + epoch;
      const hash = keccak('keccak256').update(formattedString).digest('hex');

      const result = await utils.contractDictionaryGetterBlock(
        stateRootHash,
        this.nodeAddress,
        hash,
        this.namedKeys.pointHistory
      );
      return parseInt(result.data.val.data[1].data._hex);

    } catch (error) {
      return 0;
    }
  }

  async pointHistorySlopeBlock(epoch: number,stateRootHash:any) {
    try {

      const formattedString = "point_history" + "_slope_" + epoch;
      const hash = keccak('keccak256').update(formattedString).digest('hex');

      const result = await utils.contractDictionaryGetterBlock(
        stateRootHash,
        this.nodeAddress,
        hash,
        this.namedKeys.pointHistory
      );
      return parseInt(result.data.val.data[1].data._hex);

    } catch (error) {
      return 0;
    }
  }

  async pointHistoryTsBlock(epoch: number,stateRootHash:any) {
    try {

      const formattedString = "point_history" + "_ts_" + epoch;
      const hash = keccak('keccak256').update(formattedString).digest('hex');

      const result = await utils.contractDictionaryGetterBlock(
        stateRootHash,
        this.nodeAddress,
        hash,
        this.namedKeys.pointHistory
      );
      return parseInt(result.data.val.data._hex);

    } catch (error) {
      return 0;
    }
  }

  async pointHistoryBlkBlock(epoch: number,stateRootHash:any) {
    try {

      const formattedString = "point_history" + "_blk_" + epoch;
      const hash = keccak('keccak256').update(formattedString).digest('hex');

      const result = await utils.contractDictionaryGetterBlock(
        stateRootHash,
        this.nodeAddress,
        hash,
        this.namedKeys.pointHistory
      );
      return parseInt(result.data.val.data._hex);

    } catch (error) {
      return 0;
    }
  }

  public async pointHistoryBlock(epoch: number,stateRootHash:any) {
    try {
      let pointHistory = {
        bias : 0,
        slope : 0,
        ts : 0,
        blk : 0
      }

      pointHistory.bias = await this.pointHistoryBiasBlock(epoch,stateRootHash);
      pointHistory.slope = await this.pointHistorySlopeBlock(epoch,stateRootHash);
      pointHistory.ts = await this.pointHistoryTsBlock(epoch,stateRootHash);
      pointHistory.blk = await this.pointHistoryBlkBlock(epoch,stateRootHash);
      
      return pointHistory;
    } catch (error) {
      return {
        bias : 0,
        slope : 0,
        ts : 0,
        blk : 0
      };
    }
  }
  

  async userPointHistoryBias(user:string, userEpoch:string) {
    try {
      
      const formattedString = "user_point_history" + "_bias_account-hash-" + user + "_" + userEpoch;
      const hash = keccak('keccak256').update(formattedString).digest('hex');

      console.log("bias hash", hash);
      const result = await utils.contractDictionaryGetter(
        this.nodeAddress,
        hash,
        this.namedKeys.userPointHistory
      );

      console.log("bias value",parseInt(result.data.val.data[1].data._hex))
     
      return parseInt(result.data.val.data[1].data._hex);
    } catch (error) {
      return 0;
    }
  }

  async userPointHistorySlope(user:string, userEpoch:string) {
    try {
      const formattedString = "user_point_history" + "_slope_account-hash-" + user + "_" + userEpoch;
      const hash = keccak('keccak256').update(formattedString).digest('hex');

      console.log("slope hash", hash);
      const result = await utils.contractDictionaryGetter(
        this.nodeAddress,
        hash,
        this.namedKeys.userPointHistory
      );

      console.log("slope value",parseInt(result.data.val.data[1].data._hex))
     
      return parseInt(result.data.val.data[1].data._hex);
    } catch (error) {
      return 0;
    }
  }

  async userPointHistoryTs(user:string, userEpoch:string) {
    try {
      const formattedString = "user_point_history" + "_ts_account-hash-" + user + "_" + userEpoch;
      const hash = keccak('keccak256').update(formattedString).digest('hex');

      console.log("ts hash", hash);
      const result = await utils.contractDictionaryGetter(
        this.nodeAddress,
        hash,
        this.namedKeys.userPointHistory
      );

      console.log("ts value",parseInt(result.data.val.data._hex))
     
      return parseInt(result.data.val.data._hex);
    } catch (error) {
      return 0;
    }
  }

  async userPointHistoryBlk(user:string, userEpoch:string) {
    try {
      const formattedString = "user_point_history" + "_blk_account-hash-" + user + "_" + userEpoch;
      const hash = keccak('keccak256').update(formattedString).digest('hex');

      console.log("blk hash", hash);
      const result = await utils.contractDictionaryGetter(
        this.nodeAddress,
        hash,
        this.namedKeys.userPointHistory
      );

      console.log("blk value",parseInt(result.data.val.data._hex))
     
      return parseInt(result.data.val.data._hex);
    } catch (error) {
      return 0;
    }
  }


  public async userPointHistory(user:string, userEpoch:string) {
    try {
      let userPointHistory = {
        bias : 0,
        slope : 0,
        ts : 0,
        blk : 0
    };
      userPointHistory.bias = await this.userPointHistoryBias(user, userEpoch); 
      userPointHistory.slope = await this.userPointHistorySlope(user, userEpoch); 
      userPointHistory.ts = await this.userPointHistoryTs(user, userEpoch); 
      userPointHistory.blk = await this.userPointHistoryBlk(user, userEpoch); 

      return userPointHistory;
    } catch (error) {
      return {
        bias : 0,
        slope : 0,
        ts : 0,
        blk : 0
    };
    }
  }

  async userPointHistoryBiasBlock(user:string, userEpoch:string, stateRootHash:any) {
    try {
      
      const formattedString = "user_point_history" + "_bias_account-hash-" + user + "_" + userEpoch;
      const hash = keccak('keccak256').update(formattedString).digest('hex');

      console.log("bias hash", hash);
      const result = await utils.contractDictionaryGetterBlock(
        stateRootHash,
        this.nodeAddress,
        hash,
        this.namedKeys.userPointHistory
      );

      console.log("bias value",parseInt(result.data.val.data[1].data._hex))
     
      return parseInt(result.data.val.data[1].data._hex);
    } catch (error) {
      return 0;
    }
  }

  async userPointHistorySlopeBlock(user:string, userEpoch:string, stateRootHash:any) {
    try {
      const formattedString = "user_point_history" + "_slope_account-hash-" + user + "_" + userEpoch;
      const hash = keccak('keccak256').update(formattedString).digest('hex');

      console.log("slope hash", hash);
      const result = await utils.contractDictionaryGetterBlock(
        stateRootHash,
        this.nodeAddress,
        hash,
        this.namedKeys.userPointHistory
      );

      console.log("slope value",parseInt(result.data.val.data[1].data._hex))
     
      return parseInt(result.data.val.data[1].data._hex);
    } catch (error) {
      return 0;
    }
  }

  async userPointHistoryTsBlock(user:string, userEpoch:string, stateRootHash:any) {
    try {
      const formattedString = "user_point_history" + "_ts_account-hash-" + user + "_" + userEpoch;
      const hash = keccak('keccak256').update(formattedString).digest('hex');

      console.log("ts hash", hash);
      const result = await utils.contractDictionaryGetterBlock(
        stateRootHash,
        this.nodeAddress,
        hash,
        this.namedKeys.userPointHistory
      );

      console.log("ts value",parseInt(result.data.val.data._hex))
     
      return parseInt(result.data.val.data._hex);
    } catch (error) {
      return 0;
    }
  }

  async userPointHistoryBlkBlock(user:string, userEpoch:string, stateRootHash:any) {
    try {
      const formattedString = "user_point_history" + "_blk_account-hash-" + user + "_" + userEpoch;
      const hash = keccak('keccak256').update(formattedString).digest('hex');

      console.log("blk hash", hash);
      const result = await utils.contractDictionaryGetterBlock(
        stateRootHash,
        this.nodeAddress,
        hash,
        this.namedKeys.userPointHistory
      );

      console.log("blk value",parseInt(result.data.val.data._hex))
     
      return parseInt(result.data.val.data._hex);
    } catch (error) {
      return 0;
    }
  }

  public async userPointHistoryBlock(user:string, userEpoch:string,stateRootHash:any) {
    try {
      let userPointHistory = {
        bias : 0,
        slope : 0,
        ts : 0,
        blk : 0
    };
      userPointHistory.bias = await this.userPointHistoryBiasBlock(user, userEpoch,stateRootHash); 
      userPointHistory.slope = await this.userPointHistorySlopeBlock(user, userEpoch,stateRootHash); 
      userPointHistory.ts = await this.userPointHistoryTsBlock(user, userEpoch,stateRootHash); 
      userPointHistory.blk = await this.userPointHistoryBlkBlock(user, userEpoch,stateRootHash); 

      return userPointHistory;
    } catch (error) {
      return {
        bias : 0,
        slope : 0,
        ts : 0,
        blk : 0
    };
    }
  }


  public async userPointEpoch(user: string) {
    try {
      
      const result = await utils.contractDictionaryGetter(
        this.nodeAddress,
        user,
        this.namedKeys.userPointEpoch
      );
      const maybeValue = result.value().unwrap();
      return maybeValue.value().toString();
      
    } catch (error) {
      return "0";
    }
  }

  public async userPointEpochBlock(user: string, stateRootHash:any) {
    try {
      
      const result = await utils.contractDictionaryGetterBlock(
        stateRootHash,
        this.nodeAddress,
        user,
        this.namedKeys.userPointEpoch
      );
      const maybeValue = result.value().unwrap();
      return maybeValue.value().toString();
      
    } catch (error) {
      return "0";
    }
  }

  public async slopeChanges(time: string) {
    try {

      const result = await utils.contractDictionaryGetter(
        this.nodeAddress,
        time,
        this.namedKeys.slopeChanges
      );
      const maybeValue = result.value().unwrap();
      return maybeValue.value().toString();

    } catch (error) {
      return "0";
    }
  }

  public async slopeChangesBlock(time: string,stateRootHash:any) {
    try {

      const result = await utils.contractDictionaryGetterBlock(
        stateRootHash,
        this.nodeAddress,
        time,
        this.namedKeys.slopeChanges
      );
      const maybeValue = result.value().unwrap();
      return maybeValue.value().toString();

    } catch (error) {
      return "0";
    }
  }

  public async controller() {
    const result = await contractSimpleGetter(
      this.nodeAddress,
      this.contractHash,
      ["controller"]
    );
    return result.value();
  }

  public async transfersEnabled() {
    const result = await contractSimpleGetter(
      this.nodeAddress,
      this.contractHash,
      ["transfers_enabled"]
    );
    return result.value();
  }

  public async name() {
    const result = await contractSimpleGetter(
      this.nodeAddress,
      this.contractHash,
      ["name"]
    );
    return result.value();
  }

  public async symbol() {
    const result = await contractSimpleGetter(
      this.nodeAddress,
      this.contractHash,
      ["symbol"]
    );
    return result.value();
  }

  public async version() {
    const result = await contractSimpleGetter(
      this.nodeAddress,
      this.contractHash,
      ["version"]
    );
    return result.value();
  }

  public async decimals() {
    const result = await contractSimpleGetter(
      this.nodeAddress,
      this.contractHash,
      ["decimals"]
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

const contractSimpleGetterBlock = async (
  stateRootHash:string,
  nodeAddress: string,
  contractHash: string,
  key: string[]
) => {
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
