import { config } from "dotenv";
config();
import { VOTINGESCROWClient} from "../src";

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

export const balanceOf = async (contractHash:string,account:string) => {

  // We don't need hash- prefix so i'm removing it
  await votingEscrow.setContractHash(contractHash);

  //balanceof
  const balance = await votingEscrow.balanceOf(account);
  console.log(contractHash +` =... balanceof : ${balance}`);

  return balance;

};

export const totalSupply = async (contractHash:string) => {

  // We don't need hash- prefix so i'm removing it
  await votingEscrow.setContractHash(contractHash);

  //totalSupply
  const totalSupply = await votingEscrow.totalSupply();
  console.log(contractHash +` =... totalSupply : ${totalSupply}`);

  return totalSupply;

};

export const lockedEnd = async (contractHash:string,account:string ) => {

  // We don't need hash- prefix so i'm removing it
  await votingEscrow.setContractHash(contractHash);
  
  //lockedEnd
  const lockedEnd = await votingEscrow.lockedEnd(account);
  console.log("locked End successfully");
  console.log("locked End: ", lockedEnd.end);
  
  return lockedEnd.end;
  
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
