import { config } from "dotenv";
config();
import { CERC20Client ,utils} from "../../../JsClients/CERC20/src";
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
  CERC20_CONTRACT_HASH,
  CERC20_MASTER_KEY_PAIR_PATH,
  MINT_AMOUNT,
  CERC20_PAYMENT_AMOUNT,
  REDEEM_TOKEN,
  REDEEM_AMOUNT,
  BORROW_AMOUNT,
  REPAY_AMOUNT,
  BORROWER,
  TOKEN_COLLATERAL,
  SWEEP_TOKEN,
  DELEGATEE
} = process.env;


const KEYS = Keys.Ed25519.parseKeyFiles(
  `${CERC20_MASTER_KEY_PAIR_PATH}/public_key.pem`,
  `${CERC20_MASTER_KEY_PAIR_PATH}/secret_key.pem`
);

function splitdata(data:string)
{
    var temp=data.split('(');
    var result=temp[1].split(')');
    return result[0];
}

const cerc20 = new CERC20Client(
  NODE_ADDRESS!,
  CHAIN_NAME!,
  EVENT_STREAM_ADDRESS!
);

const deploy = async () => {

  await cerc20.setContractHash(CERC20_CONTRACT_HASH!);

 
  //mint
  const mintDeployHash = await cerc20.mint(
    KEYS!,
    MINT_AMOUNT!,
    CERC20_PAYMENT_AMOUNT!
  );
  console.log("... Mint deploy hash: ", mintDeployHash);

  await getDeploy(NODE_ADDRESS!, mintDeployHash);
  console.log("... Mint function called successfully.");

  //redeem
  const redeemDeployHash = await cerc20.redeem(
    KEYS!,
    REDEEM_TOKEN!,
    CERC20_PAYMENT_AMOUNT!
  );
  console.log("... redeem deploy hash: ", redeemDeployHash);

  await getDeploy(NODE_ADDRESS!, redeemDeployHash);
  console.log("... Redeem function called successfully.");

  //redeemUnderLying
  const redeemUnderLyingDeployHash = await cerc20.redeemUnderLying(
    KEYS!,
    REDEEM_AMOUNT!,
    CERC20_PAYMENT_AMOUNT!
  );
  console.log("... redeemUnderLying deploy hash: ", redeemUnderLyingDeployHash);

  await getDeploy(NODE_ADDRESS!, redeemUnderLyingDeployHash);
  console.log("... redeemUnderLying function called successfully.");

  //borrow
  const borrowDeployHash = await cerc20.borrow(
    KEYS!,
    BORROW_AMOUNT!,
    CERC20_PAYMENT_AMOUNT!
  );
  console.log("... borrow deploy hash: ", borrowDeployHash);

  await getDeploy(NODE_ADDRESS!, borrowDeployHash);
  console.log("... borrow function called successfully.");

  //repayBorrow
  const repayBorrowDeployHash = await cerc20.repayBorrow(
    KEYS!,
    REPAY_AMOUNT!,
    CERC20_PAYMENT_AMOUNT!
  );
  console.log("... repayBorrow deploy hash: ", repayBorrowDeployHash);

  await getDeploy(NODE_ADDRESS!, repayBorrowDeployHash);
  console.log("... repayBorrow function called successfully.");

  //repayBorrowBehalf
  const repayBorrowBehalfDeployHash = await cerc20.repayBorrowBehalf(
    KEYS,
    BORROWER!,
    REPAY_AMOUNT!,
    CERC20_PAYMENT_AMOUNT!
  );
  console.log("... repayBorrowBehalf deploy hash: ", repayBorrowBehalfDeployHash);

  await getDeploy(NODE_ADDRESS!, repayBorrowBehalfDeployHash);
  console.log("... repayBorrowBehalf function called successfully");

  //liquidateBorrow
  const liquidateBorrowDeployHash = await cerc20.liquidateBorrow(
    KEYS,
    BORROWER!,
    REPAY_AMOUNT!,
    TOKEN_COLLATERAL!,
    CERC20_PAYMENT_AMOUNT!
  );
  console.log("... liquidateBorrow deploy hash: ", liquidateBorrowDeployHash);

  await getDeploy(NODE_ADDRESS!, liquidateBorrowDeployHash);
  console.log("... liquidateBorrow function called successfully");

  //sweepToken
  const sweepTokenDeployHash = await cerc20.sweepToken(
    KEYS,
    SWEEP_TOKEN!,
    CERC20_PAYMENT_AMOUNT!
  );
  console.log("... sweepToken deploy hash: ", sweepTokenDeployHash);

  await getDeploy(NODE_ADDRESS!, sweepTokenDeployHash);
  console.log("... sweepToken function called successfully");

  //delegatCompLikeTo
  const delegatCompLikeToDeployHash = await cerc20.delegatCompLikeTo(
    KEYS,
    DELEGATEE!,
    CERC20_PAYMENT_AMOUNT!
  );
  console.log("... delegatCompLikeTo deploy hash: ", delegatCompLikeToDeployHash);

  await getDeploy(NODE_ADDRESS!, delegatCompLikeToDeployHash);
  console.log("... delegatCompLikeTo function called successfully");



};


deploy();
