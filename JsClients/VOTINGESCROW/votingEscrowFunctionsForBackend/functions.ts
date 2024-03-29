import { config } from "dotenv";
config();
import { VOTINGESCROWClient} from "../src";
const { fetchBlockStateRootHashHelper } = require("../../../utils/casper");

const {
  NODE_ADDRESS,
  EVENT_STREAM_ADDRESS,
  CHAIN_NAME,
} = process.env; 

const votingEscrow = new VOTINGESCROWClient(
  NODE_ADDRESS!,
  CHAIN_NAME!,
  EVENT_STREAM_ADDRESS!,
);

export const balanceOf = async (contractHash:string,account:string,t:number) => {

  // We don't need hash- prefix so i'm removing it
  await votingEscrow.setContractHash(contractHash);

  //balanceof
  const balance = await votingEscrow.balanceOf(account,t);
  console.log(contractHash +` =... balanceof : ${balance}`);

  return balance;

};

export const balanceOfBlock = async (contractHash:string,account:string,t:number,blockNumber:Number) => {

  let blockData = await fetchBlockStateRootHashHelper(blockNumber);
  console.log("stateRootHash: ",blockData.block.header.state_root_hash);

  // We don't need hash- prefix so i'm removing it
  await votingEscrow.setContractHash(contractHash);

  //balanceof
  const balance = await votingEscrow.balanceOfBlock(account,t,blockData.block.header.state_root_hash);
  console.log(contractHash +` =... balanceof : ${balance}`);

  return balance;

};

export const balanceOfAt = async (contractHash:string,addr:string,block:number) => {

  // We don't need hash- prefix so i'm removing it
  await votingEscrow.setContractHash(contractHash);

  //balanceof
  const balance = await votingEscrow.balanceOfAt(addr,block);
  console.log(contractHash +` =... balanceof : ${balance}`);

  return balance;

};

export const totalSupplyBlock = async (contractHash:string, t : number,blockNumber:Number) => {

  let blockData = await fetchBlockStateRootHashHelper(blockNumber);
  console.log("stateRootHash: ",blockData.block.header.state_root_hash);

  // We don't need hash- prefix so i'm removing it
  await votingEscrow.setContractHash(contractHash);

  //totalSupply
  const totalSupply = await votingEscrow.totalSupplyBlock(t,blockData.block.header.state_root_hash);
  console.log(contractHash +` =... totalSupply : ${totalSupply}`);

  return totalSupply;

};

export const totalSupply = async (contractHash:string, t : number) => {

  // We don't need hash- prefix so i'm removing it
  await votingEscrow.setContractHash(contractHash);

  //totalSupply
  const totalSupply = await votingEscrow.totalSupply(t);
  console.log(contractHash +` =... totalSupply : ${totalSupply}`);

  return totalSupply;

};

export const totalSupplyAt = async (contractHash:string, block : number) => {

  // We don't need hash- prefix so i'm removing it
  await votingEscrow.setContractHash(contractHash);

  //totalSupply
  const totalSupply = await votingEscrow.totalSupplyAt(block);
  console.log(contractHash +` =... totalSupplyAt : ${totalSupply}`);

  return totalSupply;

};

export const getLastUserSlope = async (contractHash:string, addr : string) => {

  // We don't need hash- prefix so i'm removing it
  await votingEscrow.setContractHash(contractHash);

  //getLastUserSlope
  const lastUserSlope = await votingEscrow.getLastUserSlope(addr);
  console.log(contractHash +` =... lastUserSlopeAt : ${lastUserSlope}`);

  return lastUserSlope;

};

export const lockedEnd = async (contractHash:string,account:string ) => {

  // We don't need hash- prefix so i'm removing it
  await votingEscrow.setContractHash(contractHash);
  
  //lockedEnd
  const lockedEnd = await votingEscrow.lockedEnd(account);
  console.log("locked End successfully");
  console.log("locked End: ", lockedEnd.end);
  
  return lockedEnd;
  
};

// export const minBalance = async (contractHash:string,addr:string) => {
  
//     // We don't need hash- prefix so i'm removing it
//     await votingEscrow.setContractHash(contractHash);
  
//     //minBalance
//     const minBalance = await votingEscrow.minBalance(addr);
//     console.log(contractHash +` =... Contract name: ${minBalance}`);
  
//     return minBalance;
    
// };

// export const minAcceptQuorumPct = async (contractHash:string,addr:string) => {
  
//     // We don't need hash- prefix so i'm removing it
//     await votingEscrow.setContractHash(contractHash);
  
//     //minAcceptQuorumPct
//     const minAcceptQuorumPct = await votingEscrow.minAcceptQuorumPct(addr);
//     console.log(contractHash +` =... Contract name: ${minAcceptQuorumPct}`);
  
//     return minAcceptQuorumPct;
    
// };

// export const minTime = async (contractHash:string,addr:string) => {
  
//     // We don't need hash- prefix so i'm removing it
//     await votingEscrow.setContractHash(contractHash);
  
//     //minTime
//     const minTime = await votingEscrow.minTime(addr);
//     console.log(contractHash +` =... Contract name: ${minTime}`);
  
//     return minTime;
    
// };

// export const supportRequiredPct = async (contractHash:string,addr:string) => {
  
//     // We don't need hash- prefix so i'm removing it
//     await votingEscrow.setContractHash(contractHash);
  
//     //supportRequiredPct
//     const supportRequiredPct = await votingEscrow.supportRequiredPct(addr);
//     console.log(contractHash +` =... Contract name: ${supportRequiredPct}`);
  
//     return supportRequiredPct;
    
// };

// export const voteTime = async (contractHash:string,addr:string) => {
  
//     // We don't need hash- prefix so i'm removing it
//     await votingEscrow.setContractHash(contractHash);
  
//     //voteTime
//     const voteTime = await votingEscrow.voteTime(addr);
//     console.log(contractHash +` =... Contract name: ${voteTime}`);
  
//     return voteTime;
    
// };

// export const token = async (contractHash:string,addr:string) => {
  
//     // We don't need hash- prefix so i'm removing it
//     await votingEscrow.setContractHash(contractHash);
  
//     //token
//     const token = await votingEscrow.token(addr);
//     console.log(contractHash +` =... Contract name: ${token}`);
  
//     return token;
    
// };
