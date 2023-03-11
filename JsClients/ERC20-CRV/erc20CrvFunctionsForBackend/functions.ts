import { config } from "dotenv";
config();
import { ERC20CRVClient } from "../src";

const {
  NODE_ADDRESS,
  EVENT_STREAM_ADDRESS,
  CHAIN_NAME
} = process.env;

const erc20Crv = new ERC20CRVClient(
  NODE_ADDRESS!,
  CHAIN_NAME!,
  EVENT_STREAM_ADDRESS!,
);

export const balanceOf = async (contractHash:string, ownerkey:string) => {
  
  console.log(`... Contract Hash: ${contractHash}`);

  // We don't need hash- prefix so i'm removing it
  await erc20Crv.setContractHash(contractHash);

  let balance = await erc20Crv.balanceOf(ownerkey);

  console.log(`... Balance Of: ${balance}`);

  return balance;

};

export const allowances = async (contractHash:string, ownerkey:string, spenderkey:string) => {
  
  console.log(`... Contract Hash: ${contractHash}`);

  // We don't need hash- prefix so i'm removing it
  await erc20Crv.setContractHash(contractHash);

  let allowance = await erc20Crv.allowances(ownerkey,spenderkey);

  console.log(`... Allowance: ${allowance}`);

  return allowance;

};


