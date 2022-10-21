import { config } from "dotenv";
config();
import { GaugeControllerClient ,utils, constants} from "../../../JsClients/GAUGECONTROLLER/src";
import { sleep, getDeploy } from "./utils";

import {
  Keys,
} from "casper-js-sdk";
import { 
  get_total_weight_session_code, 
  get_weights_sum_per_type_session_code,
  gauge_relative_weight_write_session_code,
  gauge_relative_weight_session_code, 
  gauge_types_session_code,
  get_gauge_weight_session_code, 
  get_type_weight_session_code
} from "./gaugeControllerContract";

const { GAUGECONTROLLEREVENTS } = constants;

const {
  NODE_ADDRESS,
  EVENT_STREAM_ADDRESS,
  CHAIN_NAME,
  GAUGE_CONTROLLER_MASTER_KEY_PAIR_PATH,
  GAUGE_CONTROLLER_PAYMENT_AMOUNT
} = process.env;


const KEYS = Keys.Ed25519.parseKeyFiles(
  `${GAUGE_CONTROLLER_MASTER_KEY_PAIR_PATH}/public_key.pem`,
  `${GAUGE_CONTROLLER_MASTER_KEY_PAIR_PATH}/secret_key.pem`
);

const gaugeController = new GaugeControllerClient(
  NODE_ADDRESS!,
  CHAIN_NAME!,
  EVENT_STREAM_ADDRESS!
);

const deploy = async () => {
  //Setting contract hash
  await gaugeController.setContractHash("1f5de252ad46855e8dbcbc02104484fc79cac4d44b47cd888d424abb292a9394");


  //SIMPLE GETTERS

  //time_total
  const time_total = await gaugeController.time_total();
  console.log(`... Contract time_total: ${time_total}`);

  //admin
  const admin = await gaugeController.admin();
  console.log(`... Contract admin: ${admin}`);

  //future_admin
  const future_admin = await gaugeController.future_admin();
  console.log(`... Contract future_admin: ${future_admin}`);

  //token
  let token = await gaugeController.token();
  console.log(`... Contract token: ${token}`);

  //n_gauges
  let n_gauges = await gaugeController.n_gauges();
  console.log(`... Contract n_gauges: ${n_gauges}`);

  //n_gauge_types
  let n_gauge_types = await gaugeController.n_gauge_types();
  console.log(`... Contract n_gauge_types: ${n_gauge_types}`);

  //voting_escrow
  let voting_escrow = await gaugeController.voting_escrow();
  console.log(`... Contract voting_escrow: ${voting_escrow}`);  

  //DICTIONARY GETTERS
    
  //gauge_types_
  let gauge_types_ = await gaugeController.gauge_types_("owner");
  console.log(`... Contract gauge_types_: ${gauge_types_}`);

  //gauge_type_names
  let gauge_type_names = await gaugeController.gauge_type_names("owner");
  console.log(`... Contract gauge_type_names: ${gauge_type_names}`);

  //vote_user_power
  let vote_user_power = await gaugeController.vote_user_power("owner");
  console.log(`... Contract vote_user_power: ${vote_user_power}`);

  //time_weight
  let time_weight = await gaugeController.time_weight("owner");
  console.log(`... Contract time_weight: ${time_weight}`);

  // gauges
  let gauges = await gaugeController.gauges("owner");
  console.log(`... Contract gauges: ${gauges}`);

  //vote_user_slopes
  let vote_user_slopes = await gaugeController.vote_user_slopes("owner", "spender");
  console.log(`... Contract vote_user_slopes: ${vote_user_slopes}`);

  //last_user_vote
  let last_user_vote = await gaugeController.last_user_vote("owner", "spender");
  console.log(`... Contract last_user_vote: ${last_user_vote}`);

  //points_weight
  let points_weight = await gaugeController.points_weight("owner", "spender");
  console.log(`... Contract points_weight: ${points_weight}`);

  //changes_weight
  let changes_weight = await gaugeController.changes_weight("owner", "spender");
  console.log(`... Contract changes_weight: ${changes_weight}`);

  //time_sum
  let time_sum = await gaugeController.time_sum("owner");
  console.log(`... Contract time_sum: ${time_sum}`);

  // points_sum
  let points_sum = await gaugeController.points_sum("owner", "spender");
  console.log(`... Contract points_sum: ${points_sum}`);

  //changes_sum
  let changes_sum = await gaugeController.changes_sum("owner", "spender");
  console.log(`... Contract changes_sum: ${changes_sum}`);
  
  // points_total
  let points_total = await gaugeController.points_total("owner");
  console.log(`... Contract points_total: ${points_total}`);

  //points_type_weight
  let points_type_weight = await gaugeController.points_type_weight("owner", "spender");
  console.log(`... Contract points_type_weight: ${points_type_weight}`);

  //time_type_weight
  let time_type_weight = await gaugeController.time_type_weight("owner");
  console.log(`... Contract time_type_weight: ${time_type_weight}`);

  //CONTRACT CALLS

  // commit_transfer_ownership
  const commitTransferOwnershipDeployHash = await gaugeController.commit_transfer_ownership(
    KEYS,
    "address",
    GAUGE_CONTROLLER_PAYMENT_AMOUNT!
  );
  console.log("... commit_transfer_ownership deploy hash: ", commitTransferOwnershipDeployHash);

  await getDeploy(NODE_ADDRESS!, commitTransferOwnershipDeployHash);
  console.log("... commit_transfer_ownership called successfully.");

  
  // apply_transfer_ownership
  const applyTransferOwnershipDeployHash = await gaugeController.apply_transfer_ownership(
    KEYS,
    GAUGE_CONTROLLER_PAYMENT_AMOUNT!
  );
  console.log("... apply_transfer_ownership deploy hash: ", applyTransferOwnershipDeployHash);

  await getDeploy(NODE_ADDRESS!, applyTransferOwnershipDeployHash);
  console.log("... apply_transfer_ownership called successfully.");

  // checkpoint_gauge
  const checkpointGaugeDeployHash = await gaugeController.checkpoint_gauge(
    KEYS,
    "address",
    GAUGE_CONTROLLER_PAYMENT_AMOUNT!
  );
  console.log("... checkpoint_gauge deploy hash: ", checkpointGaugeDeployHash);

  await getDeploy(NODE_ADDRESS!, checkpointGaugeDeployHash);
  console.log("... checkpoint_gauge called successfully.");

    // checkpoint
    const checkpointDeployHash = await gaugeController.checkpoint(
      KEYS,
      GAUGE_CONTROLLER_PAYMENT_AMOUNT!
    );
    console.log("... checkpoint deploy hash: ", checkpointDeployHash);
  
    await getDeploy(NODE_ADDRESS!, checkpointDeployHash);
    console.log("... checkpoint called successfully.");

    // change_type_weight
    const changeTypeWeightDeployHash = await gaugeController.change_type_weight(
      KEYS,
      "typeId",
      "weight",
      GAUGE_CONTROLLER_PAYMENT_AMOUNT!
    );
    console.log("... change_type_weight deploy hash: ", changeTypeWeightDeployHash);
  
    await getDeploy(NODE_ADDRESS!, changeTypeWeightDeployHash);
    console.log("... change_type_weight called successfully.");
    
    // change_gauge_weight
    const changeGaugeWeightDeployHash = await gaugeController.change_gauge_weight(
      KEYS,
      "address",
      "weight",
      GAUGE_CONTROLLER_PAYMENT_AMOUNT!
    );
    console.log("... change_gauge_weight deploy hash: ", changeGaugeWeightDeployHash);
  
    await getDeploy(NODE_ADDRESS!, changeGaugeWeightDeployHash);
    console.log("... change_gauge_weight called successfully.");

    // add_type
    const addTypeDeployHash = await gaugeController.add_type(
      KEYS,
      "name",
      "weight",
      GAUGE_CONTROLLER_PAYMENT_AMOUNT!
    );
    console.log("... add_type deploy hash: ", addTypeDeployHash);
  
    await getDeploy(NODE_ADDRESS!, addTypeDeployHash);
    console.log("... add_type called successfully.");

    // add_gauge
    const addGaugeDeployHash = await gaugeController.add_gauge(
      KEYS,
      "address",
      "gaugeType",
      "weight",
      GAUGE_CONTROLLER_PAYMENT_AMOUNT!
    );
    console.log("... add_gauge deploy hash: ", addGaugeDeployHash);
  
    await getDeploy(NODE_ADDRESS!, addGaugeDeployHash);
    console.log("... add_gauge called successfully.");
    
  // vote_for_gauge_weights
  const voteForGaugeWeightsDeployHash = await gaugeController.vote_for_gauge_weights(
    KEYS,
    "gaugeAddress",
    "userWeight",
    GAUGE_CONTROLLER_PAYMENT_AMOUNT!
  );
  console.log("... vote_for_gauge_weights deploy hash: ", voteForGaugeWeightsDeployHash);

  await getDeploy(NODE_ADDRESS!, voteForGaugeWeightsDeployHash);
  console.log("... vote_for_gauge_weights called successfully.");
  

  //SESSION CODES
  //get_total_weight
  await get_total_weight_session_code();
  
  // get_weights_sum_per_type
  await get_weights_sum_per_type_session_code("typeId");

  // get_type_weight
  await get_type_weight_session_code("typeId");

   // gauge_relative_weight_write
  await gauge_relative_weight_write_session_code("address");

  // gauge_relative_weight
  await gauge_relative_weight_session_code("address");

  // gauge_types
  await gauge_types_session_code("address");  

  // get_gauge_weight
  await get_gauge_weight_session_code("address");

};


// deploy();
