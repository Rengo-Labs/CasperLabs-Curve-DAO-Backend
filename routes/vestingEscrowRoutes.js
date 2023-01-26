require("dotenv").config();
var express = require("express");
var router = express.Router();
var vestingEscrow = require("../JsClients/VESTINGESCROWFACTORY/vestingEscrowFunctionsForBackend/functions");

router.route("/balanceOf/:contractHash").get(async function (req, res, next) {
  try {
    debugger;
    if (!req.params.contractHash) {
      return res.status(400).json({
        success: false,
        message: "contractHash not found in request params",
      });
    }

    if (!req.body.account) {
      return res.status(400).json({
        success: false,
        message: "account not found in request params",
      });
    }

    let balance = await vestingEscrow.balanceOf(
      req.params.contractHash,
      req.body.account
    );

    return res.status(200).json({
      success: true,
      balance: balance,
    });
  } catch (error) {
    console.log("error (try-catch) : " + error);
    return res.status(500).json({
      success: false,
      err: error,
    });
  }
});

router.route("/vestedOf/:contractHash").get(async function (req, res, next) {
  try {

    if (!req.params.contractHash) {
      return res.status(400).json({
        success: false,
        message: "contractHash not found in request params",
      });
    }

    if (!req.body.account) {
      return res.status(400).json({
        success: false,
        message: "account not found in request params",
      });
    }

    let vestedOf = await vestingEscrow.vestedOf(
      req.params.contractHash,
      req.body.account
    );

    return res.status(200).json({
      success: true,
      vestedOf: vestedOf,
    });
  } catch (error) {
    console.log("error (try-catch) : " + error);
    return res.status(500).json({
      success: false,
      err: error,
    });
  }
});

router.route("/lockedOf/:contractHash").get(async function (req, res, next) {
    try {

      if (!req.params.contractHash) {
        return res.status(400).json({
          success: false,
          message: "contractHash not found in request params",
        });
      }
  
      if (!req.body.account) {
        return res.status(400).json({
          success: false,
          message: "account not found in request params",
        });
      }

      let lockedOf = await vestingEscrow.lockedOf(
        req.params.contractHash,
        req.body.account
      );

      return res.status(200).json({
        success: true,
        lockedOf: lockedOf,
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