import { config } from "dotenv";
config();
import { VOTINGClient} from "../src";

const {
  NODE_ADDRESS,
  EVENT_STREAM_ADDRESS,
  CHAIN_NAME,
} = process.env;

const voting = new VOTINGClient(
  NODE_ADDRESS!,
  CHAIN_NAME!,
  EVENT_STREAM_ADDRESS!,
);

export const getVote = async (contractHash:string,voteId:string) => {
  
    // We don't need hash- prefix so i'm removing it
    await voting.setContractHash(contractHash);
  
    //balanceof
    const vote = await voting.getVoteDictionaryGetter(voteId);
    console.log(contractHash +` =... vote : ${vote}`);
  
    return vote;
    
};


export const min_balance = async (contractHash:string) => {
  
  // We don't need hash- prefix so i'm removing it
  await voting.setContractHash(contractHash);

  //balanceof
  const min_balance = await voting.min_balance();
  console.log(contractHash +` =... min_balance : ${min_balance}`);

  return min_balance;
  
};

export const minTime = async (contractHash:string) => {
  
  // We don't need hash- prefix so i'm removing it
  await voting.setContractHash(contractHash);

  //balanceof
  const minTime = await voting.minTime();
  console.log(contractHash +` =... minTime : ${minTime}`);

  return minTime;
  
};

export const supportRequiredPct = async (contractHash:string) => {
  
  // We don't need hash- prefix so i'm removing it
  await voting.setContractHash(contractHash);

  //balanceof
  const supportRequiredPct = await voting.supportRequiredPct();
  console.log(contractHash +` =... supportRequiredPct : ${supportRequiredPct}`);

  return supportRequiredPct;
  
};

export const voteTime = async (contractHash:string) => {
  
  // We don't need hash- prefix so i'm removing it
  await voting.setContractHash(contractHash);

  //balanceof
  const voteTime = await voting.voteTime();
  console.log(contractHash +` =... voteTime : ${voteTime}`);

  return voteTime;
  
};

export const token = async (contractHash:string) => {
  
  // We don't need hash- prefix so i'm removing it
  await voting.setContractHash(contractHash);

  //balanceof
  const token = await voting.token();
  console.log(contractHash +` =... token : ${token}`);

  return token;
  
};

export const minAcceptQuorumPct = async (contractHash:string) => {
  
  // We don't need hash- prefix so i'm removing it
  await voting.setContractHash(contractHash);

  //balanceof
  const minAcceptQuorumPct = await voting.minAcceptQuorumPct();
  console.log(contractHash +` =... minAcceptQuorumPct : ${minAcceptQuorumPct}`);

  return minAcceptQuorumPct;
  
};
