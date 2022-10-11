import { config } from "dotenv";
config();
import { VotingClient } from "../src";
import {
    Keys,
  } from "casper-js-sdk";

const {
  NODE_ADDRESS,
  EVENT_STREAM_ADDRESS,
  CHAIN_NAME,
  VOTING_MASTER_KEY_PAIR_PATH,
  VOTING_INSTALL_PAYMENT_AMOUNT,
  VOTING_CONTRACT
} = process.env;

const voting = new VotingClient(
  NODE_ADDRESS!,
  CHAIN_NAME!,
  EVENT_STREAM_ADDRESS!
);

const KEYS = Keys.Ed25519.parseKeyFiles(
    `${VOTING_MASTER_KEY_PAIR_PATH}/public_key.pem`,
    `${VOTING_MASTER_KEY_PAIR_PATH}/secret_key.pem`
  );

  export const getveCRV = async (owner:string, spender : string) => {
  
    // We don't need hash- prefix so i'm removing it
    await voting.setContractHash(VOTING_CONTRACT!);
  
    //name
    const result = await voting.getveCRV();
    console.log(VOTING_CONTRACT +` =... veCRV: ${result}`);
  
    return result;
  };


  export const gettotalveCRV = async (owner:string, spender : string) => {
  
    // We don't need hash- prefix so i'm removing it
    await voting.setContractHash(VOTING_CONTRACT!);
  
    //name
    const result = await voting.gettotalveCRV();
    console.log(VOTING_CONTRACT +` =... gettotalveCRV: ${result}`);
  
    return result;
  };
