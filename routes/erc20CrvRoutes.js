require("dotenv").config();
var express = require("express");
var router = express.Router();
var erc20Crv = require("../JsClients/ERC20-CRV/erc20CrvFunctionsForBackend/functions");

router
  .route("/allowanceagainstownerandspender/:contractHash/:owner/:spender")
  .get(async function (req, res, next) {
    try {
      if (!req.params.contractHash) {
        return res.status(400).json({
          success: false,
          message: "contractHash not found in request params",
        });
      }

      if (!req.params.owner) {
        return res.status(400).json({
          success: false,
          message: "owner not found in request params",
        });
      }

      if (!req.params.spender) {
        return res.status(400).json({
          success: false,
          message: "spender not found in request params",
        });
      }

      let allowance = await erc20Crv.allowances(
        req.params.contractHash,
        req.params.owner,
        req.params.spender
      );
      console.log("Allowance: ", allowance);

      return res.status(200).json({
        success: true,
        message: "Allowance has been found against this owner and spender",
        allowance: allowance,
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