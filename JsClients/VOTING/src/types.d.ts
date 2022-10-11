import { CLAccountHash, CLByteArray, CLPublicKey } from "casper-js-sdk";
import {VOTINGEvents} from "./constants";

export type RecipientType = CLPublicKey | CLAccountHash | CLByteArray;

export interface IPendingDeploy {
  deployHash: string;
  deployType: VOTINGEvents;
}
