import { config } from "dotenv";
config();
import { MULTICALLClient ,utils} from "../../../JsClients/MULTICALL/src";
import { sleep, getDeploy } from "./utils";

import {
  CLValueBuilder,
  Keys,
  CLPublicKey,
  CLAccountHash,
  CLPublicKeyType,
  Contracts,
  CLByteArray
} from "casper-js-sdk";


const {
  NODE_ADDRESS,
  EVENT_STREAM_ADDRESS,
  CHAIN_NAME,
  
  MULTICALL_MASTER_KEY_PAIR_PATH,
  MULTICALL_PAYMENT_AMOUNT,
  MULTICALL_CONTRACT_HASH,

} = process.env;


const KEYS = Keys.Ed25519.parseKeyFiles(
  `${MULTICALL_MASTER_KEY_PAIR_PATH}/public_key.pem`,
  `${MULTICALL_MASTER_KEY_PAIR_PATH}/secret_key.pem`
);

function splitdata(data:string)
{
    var temp=data.split('(');
    var result=temp[1].split(')');
    return result[0];
}

const multicall = new MULTICALLClient(
  NODE_ADDRESS!,
  CHAIN_NAME!,
  EVENT_STREAM_ADDRESS!
);

const test = async () => {

  await multicall.setContractHash(MULTICALL_CONTRACT_HASH!);

   //aggregate
 const aggregateDeployHash = await multicall.aggregate(
  KEYS!,
  []!,
  MULTICALL_PAYMENT_AMOUNT!
 );
 console.log("... aggregate deploy hash: ", aggregateDeployHash);

 await getDeploy(NODE_ADDRESS!, aggregateDeployHash);
 console.log("... aggregate function called successfully.");



};


test();
