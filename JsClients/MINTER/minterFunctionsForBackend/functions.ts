import { config } from "dotenv";
config();
import { MINTERClient} from "../src";
import {
    Keys,
  } from "casper-js-sdk";

const {
  NODE_ADDRESS,
  EVENT_STREAM_ADDRESS,
  CHAIN_NAME,
  MINTER_MASTER_KEY_PAIR_PATH,
  MINTER_INSTALL_PAYMENT_AMOUNT,
  MINTER_CONTRACT
} = process.env;

const minter = new MINTERClient(
  NODE_ADDRESS!,
  CHAIN_NAME!,
  EVENT_STREAM_ADDRESS!
);

const KEYS = Keys.Ed25519.parseKeyFiles(
    `${MINTER_MASTER_KEY_PAIR_PATH}/public_key.pem`,
    `${MINTER_MASTER_KEY_PAIR_PATH}/secret_key.pem`
  );

export const mint = async (gaugeAddress:string) => {
  
  // We don't need hash- prefix so i'm removing it
  await minter.setContractHash(MINTER_CONTRACT!);

  //mint
  const result = await minter.mint(KEYS,gaugeAddress,MINTER_INSTALL_PAYMENT_AMOUNT!);
  console.log(MINTER_CONTRACT +` =... mint result : ${result}`);

  return result;
};

export const mint_for = async (gaugeAddress:string, _for :string) => {
  
    // We don't need hash- prefix so i'm removing it
    await minter.setContractHash(MINTER_CONTRACT!);
  
    //name
    const result = await minter.mint_for(KEYS,gaugeAddress,_for,MINTER_INSTALL_PAYMENT_AMOUNT!);
    console.log(MINTER_CONTRACT +` =... minted for result : ${result}`);
  
    return result;
  };

  export const toggle_approve_mint = async (minting_user:string) => {
  
    // We don't need hash- prefix so i'm removing it
    await minter.setContractHash(MINTER_CONTRACT!);
  
    //name
    const result = await minter.toggle_approve_mint(KEYS,minting_user,MINTER_INSTALL_PAYMENT_AMOUNT!);
    console.log(MINTER_CONTRACT +` =... toggle approve mint : ${result}`);
  
    return result;
  };

  

  export const allowed_to_mint_for = async (owner:string, spender : string) => {
  
    // We don't need hash- prefix so i'm removing it
    await minter.setContractHash(MINTER_CONTRACT!);
  
    //name
    const result = await minter.allowed_to_mint_for(owner, spender);
    console.log(MINTER_CONTRACT +` =... allowed to mint for : ${result}`);
  
    return result;
  };

  export const getMinted = async (owner:string, spender : string) => {
  
    // We don't need hash- prefix so i'm removing it
    await minter.setContractHash(MINTER_CONTRACT!);
  
    //name
    const result = await minter.minted(owner, spender);
    console.log(MINTER_CONTRACT +` =... minted : ${result}`);
  
    return result;
  };


  export const getToken = async (owner:string, spender : string) => {
  
    // We don't need hash- prefix so i'm removing it
    await minter.setContractHash(MINTER_CONTRACT!);
  
    //name
    const result = await minter.token();
    console.log(MINTER_CONTRACT +` =... token : ${result}`);
  
    return result;
  };


  export const getController = async (owner:string, spender : string) => {
  
    // We don't need hash- prefix so i'm removing it
    await minter.setContractHash(MINTER_CONTRACT!);
  
    //name
    const result = await minter.controller();
    console.log(MINTER_CONTRACT +` =... controller : ${result}`);
  
    return result;
  };
