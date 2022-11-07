require("dotenv").config();
var express = require("express");
var router = express.Router();
var erc20CrvJsClient=require('../JsClients/ERC20-CRV/src/utils')

router.route("/getErc20ErvWasmData").get(async function (req, res, next) {
  try {

    let wasmData= erc20CrvJsClient.getWasmDataInBuffer('Scripts/ERC20-CRV/wasm/erc20-crv-session-code.wasm');
    console.log(wasmData);
    
    return res.status(200).json({
        success: true,
        message: "Erc20-Crv SessionCode Wasm data successfully read and converted. ",
        wasmData: wasmData,
    });
    
  } catch (error) {
    console.log("error (try-catch) : " + error);
    return res.status(500).json({
      success: false,
      err: error,
    });
  }
});

module.exports = router;