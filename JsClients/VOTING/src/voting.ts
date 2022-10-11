import {
  CasperClient,
  CLPublicKey,
  CLAccountHash,
  CLByteArray,
  CLKey,
  CLString,
  CLTypeBuilder,
  CLValue,
  CLValueBuilder,
  CLValueParsers,
  CLMap,
  DeployUtil,
  EventName,
  EventStream,
  Keys,
  RuntimeArgs,
  CLList,
} from "casper-js-sdk";
import { Some, None } from "ts-results";
import * as blake from "blakejs";
import { concat } from "@ethersproject/bytes";
import { VOTINGEvents } from "./constants";
import * as utils from "./utils";
import { RecipientType, IPendingDeploy } from "./types";
import {createRecipientAddress } from "./utils";

class VotingClient {
  private contractName: string = "minter";
  private contractHash: string= "minter";
  private contractPackageHash: string= "minter";
  private namedKeys: {
    allowed_to_mint_for : string, 
    minted : string
  };

  private isListening = false;
  private pendingDeploys: IPendingDeploy[] = [];

  constructor(

    private nodeAddress: string,
    private chainName: string,
    private eventStreamAddress?: string,
    
  ) 
  {
    this.namedKeys= {
      allowed_to_mint_for : "null",
      minted : "null"
    }; 
  }

  public async install(
    keys: Keys.AsymmetricKey,
    token : string,
    controller : string,
    contractName: string,
    paymentAmount: string,
    wasmPath: string
  ) {

    const _token = new CLByteArray(Uint8Array.from(Buffer.from(token, 'hex')));
    const _controller = new CLByteArray(Uint8Array.from(Buffer.from(controller, 'hex')));

    const runtimeArgs = RuntimeArgs.fromMap({
      token: CLValueBuilder.key(_token),
      controller: CLValueBuilder.key(_controller),
      contract_name: CLValueBuilder.string(contractName),
    });

    const deployHash = await installWasmFile({
      chainName: this.chainName,
      paymentAmount,
      nodeAddress: this.nodeAddress,
      keys,
      pathToContract: wasmPath,
      runtimeArgs,
    });

    if (deployHash !== null) {
      return deployHash;
    } else {
      throw Error("Problem with installation");
    }
  }

  public async setContractHash(hash: string) {
    const stateRootHash = await utils.getStateRootHash(this.nodeAddress);
    const contractData = await utils.getContractData(
      this.nodeAddress,
      stateRootHash,
      hash
    );

    const { contractPackageHash, namedKeys } = contractData.Contract!;
    this.contractHash = hash;
    this.contractPackageHash = contractPackageHash.replace(
      "contract-package-wasm",
      ""
    );
    const LIST_OF_NAMED_KEYS = [
      'allowed_to_mint_for',
      'minted',
      `${this.contractName}_package_hash`,
      `${this.contractName}_package_hash_wrapped`,
      `${this.contractName}_contract_hash`,
      `${this.contractName}_contract_hash_wrapped`,
      `${this.contractName}_package_access_token`,
    ];
    // @ts-ignore
    this.namedKeys = namedKeys.reduce((acc, val) => {
      if (LIST_OF_NAMED_KEYS.includes(val.name)) {
        return { ...acc, [utils.camelCased(val.name)]: val.key };
      }
      return acc;
    }, {});
  }

  public async getveCRV() {
    const result = await contractSimpleGetter(
      this.nodeAddress,
      this.contractHash,
      ["veCRV"]
    );
    return result.value();
  }

  public async gettotalveCRV() {
    const result = await contractSimpleGetter(
      this.nodeAddress,
      this.contractHash,
      ["totalveCRV"]
    );
    return result.value();
  }

  public onEvent(
    eventNames: VOTINGEvents[],
    callback: (
      eventName: VOTINGEvents,
      deployStatus: {
        deployHash: string;
        success: boolean;
        error: string | null;
      },
      result: any | null
    ) => void
  ): any {
    if (!this.eventStreamAddress) {
      throw Error("Please set eventStreamAddress before!");
    }
    if (this.isListening) {
      throw Error(
        "Only one event listener can be create at a time. Remove the previous one and start new."
      );
    }
    const es = new EventStream(this.eventStreamAddress);
    this.isListening = true;

    es.subscribe(EventName.DeployProcessed, (value: any) => {
      const deployHash = value.body.DeployProcessed.deploy_hash;

      const pendingDeploy = this.pendingDeploys.find(
        (pending) => pending.deployHash === deployHash
      );

      if (!pendingDeploy) {
        return;
      }

      if (
        !value.body.DeployProcessed.execution_result.Success &&
        value.body.DeployProcessed.execution_result.Failure
      ) {
        callback(
          pendingDeploy.deployType,
          {
            deployHash,
            error:
              value.body.DeployProcessed.execution_result.Failure.error_message,
            success: false,
          },
          null
        );
      } else {
        const { transforms } =
          value.body.DeployProcessed.execution_result.Success.effect;

        const VOTINGEvents = transforms.reduce((acc: any, val: any) => {
          if (
            val.transform.hasOwnProperty("WriteCLValue") &&
            typeof val.transform.WriteCLValue.parsed === "object" &&
            val.transform.WriteCLValue.parsed !== null
          ) {
            const maybeCLValue = CLValueParsers.fromJSON(
              val.transform.WriteCLValue
            );
            const clValue = maybeCLValue.unwrap();
            if (clValue && clValue instanceof CLMap) {
              const hash = clValue.get(
                CLValueBuilder.string("contract_package_hash")
              );
              const event = clValue.get(CLValueBuilder.string("event_type"));
              if (
                hash &&
                // NOTE: Calling toLowerCase() because current JS-SDK doesn't support checksumed hashes and returns all lower case value
                // Remove it after updating SDK
                hash.value() === this.contractPackageHash.toLowerCase() &&
                event &&
                eventNames.includes(event.value())
              ) {
                acc = [...acc, { name: event.value(), clValue }];
              }
            }
          }
          return acc;
        }, []);

        VOTINGEvents.forEach((d: any) =>
          callback(
            d.name,
            { deployHash, error: null, success: true },
            d.clValue
          )
        );
      }

      this.pendingDeploys = this.pendingDeploys.filter(
        (pending) => pending.deployHash !== deployHash
      );
    });
    es.start();

    return {
      stopListening: () => {
        es.unsubscribe(EventName.DeployProcessed);
        es.stop();
        this.isListening = false;
        this.pendingDeploys = [];
      },
    };
  }

  public addPendingDeploy(deployType: VOTINGEvents, deployHash: string) {
    this.pendingDeploys = [...this.pendingDeploys, { deployHash, deployType }];
  }
}

interface IInstallParams {
  nodeAddress: string;
  keys: Keys.AsymmetricKey;
  chainName: string;
  pathToContract: string;
  runtimeArgs: RuntimeArgs;
  paymentAmount: string;
}

const installWasmFile = async ({
  nodeAddress,
  keys,
  chainName,
  pathToContract,
  runtimeArgs,
  paymentAmount,
}: IInstallParams): Promise<string> => {
  const client = new CasperClient(nodeAddress);

  // Set contract installation deploy (unsigned).
  let deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      CLPublicKey.fromHex(keys.publicKey.toHex()),
      chainName
    ),
    DeployUtil.ExecutableDeployItem.newModuleBytes(
      utils.getBinary(pathToContract),
      runtimeArgs
    ),
    DeployUtil.standardPayment(paymentAmount)
  );

  // Sign deploy.
  deploy = client.signDeploy(deploy, keys);

  // Dispatch deploy to node.
  return await client.putDeploy(deploy);
};

interface IContractCallParams {
  nodeAddress: string;
  keys: Keys.AsymmetricKey;
  chainName: string;
  entryPoint: string;
  runtimeArgs: RuntimeArgs;
  paymentAmount: string;
  contractHash: string;
}

const contractCall = async ({
  nodeAddress,
  keys,
  chainName,
  contractHash,
  entryPoint,
  runtimeArgs,
  paymentAmount,
}: IContractCallParams) => {
  const client = new CasperClient(nodeAddress);
  const contractHashAsByteArray = utils.contractHashToByteArray(contractHash);

  let deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(keys.publicKey, chainName),
    DeployUtil.ExecutableDeployItem.newStoredContractByHash(
      contractHashAsByteArray,
      entryPoint,
      runtimeArgs
    ),
    DeployUtil.standardPayment(paymentAmount)
  );

  // Sign deploy.
  deploy = client.signDeploy(deploy, keys);

  // Dispatch deploy to node.
  const deployHash = await client.putDeploy(deploy);

  return deployHash;
};

const contractSimpleGetter = async (
  nodeAddress: string,
  contractHash: string,
  key: string[]
) => {
  const stateRootHash = await utils.getStateRootHash(nodeAddress);
  const clValue = await utils.getContractData(
    nodeAddress,
    stateRootHash,
    contractHash,
    key
  );

  if (clValue && clValue.CLValue instanceof CLValue) {
    return clValue.CLValue!;
  } else {
    throw Error("Invalid stored value");
  }
};

const toCLMap = (map: Map<string, string>) => {
  const clMap = CLValueBuilder.map([
    CLTypeBuilder.string(),
    CLTypeBuilder.string(),
  ]);
  for (const [key, value] of Array.from(map.entries())) {
    clMap.set(CLValueBuilder.string(key), CLValueBuilder.string(value));
  }
  return clMap;
};

const fromCLMap = (map: Map<CLString, CLString>) => {
  const jsMap = new Map();
  for (const [key, value] of Array.from(map.entries())) {
    jsMap.set(key.value(), value.value());
  }
  return jsMap;
};

export default VotingClient;
