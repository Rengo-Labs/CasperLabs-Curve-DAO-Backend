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
} from "casper-js-sdk";
import { Some, None } from "ts-results";
import * as blake from "blakejs";
import { concat } from "@ethersproject/bytes";
import * as utils from "./utils";
import { RecipientType, IPendingDeploy } from "./types";
import {createRecipientAddress } from "./utils";

class CERC20Client {
  private contractName: string = "cerc20";
  private contractHash: string= "cerc20";
  private contractPackageHash: string= "cerc20";
  private namedKeys: {
    balances:string
    metadata: string;
    nonces: string;
    allowances: string;
    ownedTokens: string;
    owners: string;
    paused: string;
    
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
      balances:"null",
      metadata: "null",
      nonces: "null",
      allowances: "null",
      ownedTokens: "null",
      owners: "null",
      paused: "null"
    }; 
  }

  public async install(
    keys: Keys.AsymmetricKey,
    underlying: string,
    comptroller: string,
    interestRateModel: string,
    initialExchangeRateMantissa: string,
    name: string,
    tokenSymbol: string,
    decimals: string,
    paymentAmount: string,
    wasmPath: string
  ) {
    const _underlying = new CLByteArray(
			Uint8Array.from(Buffer.from(underlying, "hex"))
		);
    const _comptroller = new CLByteArray(
			Uint8Array.from(Buffer.from(comptroller, "hex"))
		);
    const _interestRateModel = new CLByteArray(
			Uint8Array.from(Buffer.from(interestRateModel, "hex"))
		);
    const runtimeArgs = RuntimeArgs.fromMap({
      underlying: utils.createRecipientAddress(_underlying),
      comptroller: utils.createRecipientAddress(_comptroller),
      interest_rate_model: utils.createRecipientAddress(_interestRateModel),
      initial_exchange_rate_mantissa: CLValueBuilder.u256(initialExchangeRateMantissa),
      name: CLValueBuilder.string(name),
      symbol: CLValueBuilder.string(tokenSymbol),
      decimals: CLValueBuilder.u8(decimals),
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
      'balances',
      'nonces',
      'allowances',
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

  public async mint(
    keys: Keys.AsymmetricKey,
    mintAmount: string,
    paymentAmount: string
  ) {
    //const tobytearray = new CLByteArray(Uint8Array.from(Buffer.from(to, 'hex')));
    const runtimeArgs = RuntimeArgs.fromMap({
      mint_amount: CLValueBuilder.u256(mintAmount)
    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "mint",
      keys,
      nodeAddress: this.nodeAddress,
      paymentAmount,
      runtimeArgs,
    });

    if (deployHash !== null) {
 
      return deployHash;
    } else {
      throw Error("Invalid Deploy");
    }
  }

  public async redeem(
    keys: Keys.AsymmetricKey,
    redeemTokens: string,
    paymentAmount: string
  ) {
    const runtimeArgs = RuntimeArgs.fromMap({
      redeem_tokens: CLValueBuilder.u256(redeemTokens)
    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "redeem",
      keys,
      nodeAddress: this.nodeAddress,
      paymentAmount,
      runtimeArgs,
    });

    if (deployHash !== null) {
 
      return deployHash;
    } else {
      throw Error("Invalid Deploy");
    }
  }

  public async redeemUnderLying(
    keys: Keys.AsymmetricKey,
    redeemAmount: string,
    paymentAmount: string
  ) {
    const runtimeArgs = RuntimeArgs.fromMap({
      redeem_amount: CLValueBuilder.u256(redeemAmount)
    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "redeem_under_lying",
      keys,
      nodeAddress: this.nodeAddress,
      paymentAmount,
      runtimeArgs,
    });

    if (deployHash !== null) {
 
      return deployHash;
    } else {
      throw Error("Invalid Deploy");
    }
  }

  public async borrow(
    keys: Keys.AsymmetricKey,
    borrowAmount: string,
    paymentAmount: string
  ) {
    const runtimeArgs = RuntimeArgs.fromMap({
      borrow_amount: CLValueBuilder.u256(borrowAmount)
    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "borrow",
      keys,
      nodeAddress: this.nodeAddress,
      paymentAmount,
      runtimeArgs,
    });

    if (deployHash !== null) {
 
      return deployHash;
    } else {
      throw Error("Invalid Deploy");
    }
  }

  public async repayBorrow(
    keys: Keys.AsymmetricKey,
    repayAmount: string,
    paymentAmount: string
  ) {
    const runtimeArgs = RuntimeArgs.fromMap({
      repay_amount: CLValueBuilder.u256(repayAmount)
    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "repay_borrow",
      keys,
      nodeAddress: this.nodeAddress,
      paymentAmount,
      runtimeArgs,
    });

    if (deployHash !== null) {
 
      return deployHash;
    } else {
      throw Error("Invalid Deploy");
    }
  }

  public async repayBorrowBehalf(
    keys: Keys.AsymmetricKey,
    borrower: string,
    repayAmount: string,
    paymentAmount: string
  ) {
    const _borrower = new CLByteArray(
			Uint8Array.from(Buffer.from(borrower, "hex"))
		);
    const runtimeArgs = RuntimeArgs.fromMap({
      borrower: utils.createRecipientAddress(_borrower),
      repay_amount: CLValueBuilder.u256(repayAmount)
    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "repay_borrow_behalf",
      keys,
      nodeAddress: this.nodeAddress,
      paymentAmount,
      runtimeArgs,
    });

    if (deployHash !== null) {
      
      return deployHash;
    } else {
      throw Error("Invalid Deploy");
    }
  }

  public async liquidateBorrow(
    keys: Keys.AsymmetricKey,
    borrower: string,
    repayAmount: string,
    cTokenCollateral: string,
    paymentAmount: string
  ) {
    const _borrower = new CLByteArray(
			Uint8Array.from(Buffer.from(borrower, "hex"))
		);
    const _cTokenCollateral = new CLByteArray(
			Uint8Array.from(Buffer.from(cTokenCollateral, "hex"))
		);
    const runtimeArgs = RuntimeArgs.fromMap({
      borrower: utils.createRecipientAddress(_borrower),
      repay_amount: CLValueBuilder.u256(repayAmount),
      c_token_collateral: utils.createRecipientAddress(_cTokenCollateral)
    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "liquidate_borrow",
      keys,
      nodeAddress: this.nodeAddress,
      paymentAmount,
      runtimeArgs,
    });
    if (deployHash !== null) {
      
      return deployHash;
    } else {
      throw Error("Invalid Deploy");
    }
  }

  public async sweepToken(
    keys: Keys.AsymmetricKey,
    token: string,
    paymentAmount: string
  ) {
    const _token = new CLByteArray(
			Uint8Array.from(Buffer.from(token, "hex"))
		);
    const runtimeArgs = RuntimeArgs.fromMap({
      token: utils.createRecipientAddress(_token),
    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "sweep_token",
      keys,
      nodeAddress: this.nodeAddress,
      paymentAmount,
      runtimeArgs,
    });
    if (deployHash !== null) {
      
      return deployHash;
    } else {
      throw Error("Invalid Deploy");
    }
  }

  public async delegatCompLikeTo(
    keys: Keys.AsymmetricKey,
    compLikeDelegatee: string,
    paymentAmount: string
  ) {
    const _compLikeDelegatee = new CLByteArray(
			Uint8Array.from(Buffer.from(compLikeDelegatee, "hex"))
		);
    const runtimeArgs = RuntimeArgs.fromMap({
      comp_like_delegatee: utils.createRecipientAddress(_compLikeDelegatee),
    });
    const deployHash = await contractCall({
      chainName: this.chainName,
      contractHash: this.contractHash,
      entryPoint: "delegat_comp_like_to",
      keys,
      nodeAddress: this.nodeAddress,
      paymentAmount,
      runtimeArgs,
    });
    if (deployHash !== null) {
      
      return deployHash;
    } else {
      throw Error("Invalid Deploy");
    }
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

export default CERC20Client;
