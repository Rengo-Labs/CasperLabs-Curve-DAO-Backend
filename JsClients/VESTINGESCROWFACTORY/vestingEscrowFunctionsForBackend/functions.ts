import { config } from "dotenv";
config();
import { VESTINGESCROWFACTORYClient} from "../src";

const {
  NODE_ADDRESS,
  EVENT_STREAM_ADDRESS,
  CHAIN_NAME,
} = process.env; 

const vestingEscrow = new VESTINGESCROWFACTORYClient(
  NODE_ADDRESS!,
  CHAIN_NAME!,
  EVENT_STREAM_ADDRESS!,
);

export const balanceOf = async (contractHash:string,account:string) => {

  // We don't need hash- prefix so i'm removing it
  await vestingEscrow.setContractHash(contractHash);

  //balanceof
  const balance = await vestingEscrow.balanceOf(account);
  console.log(contractHash +` =... balanceof : ${balance}`);

  return balance;

};

export const vestedOf = async (contractHash:string,addr:string) => {

  // We don't need hash- prefix so i'm removing it
  await vestingEscrow.setContractHash(contractHash);

  //balanceof
  const vestedOf = await vestingEscrow.vestedOf(addr);
  console.log(contractHash +` =... vestedOf : ${vestedOf}`);

  return vestedOf;

};

export const lockedOf = async (contractHash:string, addr : string) => {

  // We don't need hash- prefix so i'm removing it
  await vestingEscrow.setContractHash(contractHash);

  //lockedOf
  const lockedOf = await vestingEscrow.lockedOf(addr);
  console.log(contractHash +` =... lockedOf : ${lockedOf}`);

  return lockedOf;

};