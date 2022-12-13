require("dotenv").config();
var express = require("express");
var router = express.Router();
var votingEscrow = require("../JsClients/VOTINGESCROW/votingEscrowFunctionsForBackend/functions");

router.route("/balanceagainstuser/:contractHash/:user").get(async function (req, res, next) {
  try {
    if (!req.params.contractHash) {
      return res.status(400).json({
        success: false,
        message: "contractHash not found in request params",
      });
    }

    if (!req.params.user) {
      return res.status(400).json({
        success: false,
        message: "user not found in request params",
      });
    }

    let balance = await votingEscrow.balanceOf(req.params.contractHash, req.params.user);
    return res.status(200).json({
      success: true,
      message: "Balance has been found against this user",
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

router.route("/CRVStats/:contractHash/:user").get(async function (req, res, next) {
    try {

      if (!req.params.contractHash) {
            return res.status(400).json({
            success: false,
            message: "contractHash not found in request params",
        });
      }
      if (!req.params.user) {
        return res.status(400).json({
          success: false,
          message: "user not found in request params",
        });
      }
  
      let balance = await votingEscrow.balanceOf(req.params.contractHash, req.params.user);
      let totalSupply = await votingEscrow.totalSupply(req.params.contractHash);
      let data={CRVLOCKED: balance, supply:totalSupply};
      return res.status(200).json({
        success: true,
        message: "CRVStats has been found against this user",
        data: data
      });

    } catch (error) {
      console.log("error (try-catch) : " + error);
      return res.status(500).json({
        success: false,
        err: error,
      });
    }
});

router.route("/lockedEnd/:contractHash").get(async function (req, res, next) {
    try {
      if (!req.params.contractHash) {
        return res.status(400).json({
            success: false,
            message: "contractHash not found in request params",
        });
      }
  
      let lockedEnd = await votingEscrow.lockedEnd(req.params.contractHash);
      return res.status(200).json({
        success: true,
        message: "Lock succesfully ended...",
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