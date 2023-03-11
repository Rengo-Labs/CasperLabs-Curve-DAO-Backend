import { config } from "dotenv";
config();
import { LIQUIDITYGAUGEV3Client} from "../src";

const {
  NODE_ADDRESS,
  EVENT_STREAM_ADDRESS,
  CHAIN_NAME
} = process.env;

const liquidityGaugeV3 = new LIQUIDITYGAUGEV3Client(
  NODE_ADDRESS!,
  CHAIN_NAME!,
  EVENT_STREAM_ADDRESS!,
);

export const name = async (contractHash : string) => {
 
  // We don't need hash- prefix so i'm removing it
 await liquidityGaugeV3.setContractHash(contractHash);

 //pointsTypeWeight
 const name = await liquidityGaugeV3.name();
 console.log(`... Gauge name: ${name}`);

 return name;
}


