import { config } from "dotenv";
config();
import { MINTERClient} from "../src";

const {
  NODE_ADDRESS,
  EVENT_STREAM_ADDRESS,
  CHAIN_NAME,
  MINTER_CONTRACT_HASH
} = process.env;

const minter = new MINTERClient(
  NODE_ADDRESS!,
  CHAIN_NAME!,
  EVENT_STREAM_ADDRESS!
);

  export const allowed_to_mint_for = async (owner:string, spender : string) => {
  
    // We don't need hash- prefix so i'm removing it
    await minter.setContractHash(MINTER_CONTRACT_HASH!);
  
    //allowed_to_mint_for
    const result = await minter.allowed_to_mint_for(owner, spender);
    console.log(MINTER_CONTRACT_HASH +` =... allowed to mint for : ${result}`);
  
    return result;
  };

  export const getMinted = async (owner:string, spender : string) => {
  
    // We don't need hash- prefix so i'm removing it
    await minter.setContractHash(MINTER_CONTRACT_HASH!);
  
    //minted
    const result = await minter.minted(owner, spender);
    console.log(MINTER_CONTRACT_HASH +` =... minted : ${result}`);
  
    return result;
  };


  export const getToken = async () => {
  
    // We don't need hash- prefix so i'm removing it
    await minter.setContractHash(MINTER_CONTRACT_HASH!);
  
    //token
    const result = await minter.token();
    console.log(MINTER_CONTRACT_HASH +` =... token : ${result}`);
  
    return result;
  };


  export const getController = async () => {
  
    // We don't need hash- prefix so i'm removing it
    await minter.setContractHash(MINTER_CONTRACT_HASH!);
  
    //controller
    const result = await minter.controller();
    console.log(MINTER_CONTRACT_HASH +` =... controller : ${result}`);
  
    return result;
  };
