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
