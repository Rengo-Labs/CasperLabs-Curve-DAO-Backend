require("dotenv").config();
var express = require("express");
var router = express.Router();
var gaugeController = require("../JsClients/GAUGECONTROLLER/gaugeControllerFunctionsForBackend/functions");

router
  .route("/gaugeRelativeWeight/:contractHash")
  .post(async function (req, res, next) {
    try {
      if (!req.params.contractHash) {
        return res.status(400).json({
          success: false,
          message: "contractHash not found in request params",
        });
      }

      if (!req.body.address) {
        return res.status(400).json({
          success: false,
          message: "address not found in request body",
        });
      }

      if(!req.body.timestamps){
        let timestamp = new Date().getTime();
        let gaugeRelativeWeight = await gaugeController.gauge_relative_weight(
            req.params.contractHash,
            req.body.address,
            timestamp
          );
        return res.status(200).json({
        success: true,
        gaugeRelativeWeights: [gaugeRelativeWeight],
        });  
      }

      if (req.body.timestamps) {
        if (!Array.isArray(req.body.timestamps)) {
          return res.status(400).json({
            success: false,
            message: "Send timestamps in array.",
          });
        } else {
          let fetchGaugeRelativeWeightPromisesArray = [];
          req.body.timestamps.forEach((timestamp) => {
            fetchGaugeRelativeWeightPromisesArray.push(
              gaugeController.gauge_relative_weight(
                req.params.contractHash,
                req.body.address,
                timestamp
              )
            );
          });

          let gaugeRelativeWeights = await Promise.all(
            fetchGaugeRelativeWeightPromisesArray
          );
          return res.status(200).json({
            success: true,
            gaugeRelativeWeights: gaugeRelativeWeights,
          });
        }
      }
    } catch (error) {
      console.log("error (try-catch) : " + error);
      return res.status(500).json({
        success: false,
        err: error,
      });
    }
  });

router
  .route("/getGaugeWeight/:contractHash")
  .post(async function (req, res, next) {
    try {
      
      if (!req.params.contractHash) {
        return res.status(400).json({
          success: false,
          message: "contractHash not found in request params",
        });
      }

      if (!req.body.address) {
        return res.status(400).json({
          success: false,
          message: "address not found in request body",
        });
      }

      let gaugeWeight = await gaugeController.get_gauge_weight(
        req.params.contractHash,
        req.body.address
      );

      return res.status(200).json({
        success: true,
        gaugeWeight: gaugeWeight,
      });
    } catch (error) {
      console.log("error (try-catch) : " + error);
      return res.status(500).json({
        success: false,
        err: error,
      });
    }
  });

router
  .route("/getTotalWeight/:contractHash")
  .post(async function (req, res, next) {
    try {
      
      if (!req.params.contractHash) {
        return res.status(400).json({
          success: false,
          message: "contractHash not found in request params",
        });
      }

      let totalWeight = await gaugeController.get_total_weight(
        req.params.contractHash
      );
      
      return res.status(200).json({
        success: true,
        totalWeight: totalWeight,
      });
    } catch (error) {
      console.log("error (try-catch) : " + error);
      return res.status(500).json({
        success: false,
        err: error,
      });
    }
  });

  router
  .route("/voteUserSlopes/:contractHash")
  .post(async function (req, res, next) {
    try {
      
      if (!req.params.contractHash) {
        return res.status(400).json({
          success: false,
          message: "contractHash not found in request params",
        });
      }

      if (!req.body.owner || !req.body.spender) {
        return res.status(400).json({
          success: false,
          message: `${!req.body.owner ? "owner" : "spender"} not found in request body`,
        });
      }

      let voteUserSlopes = await gaugeController.vote_user_slopes(
        req.params.contractHash, req.body.owner, req.body.spender
      );
      
      return res.status(200).json({
        success: true,
        voteUserSlope: voteUserSlopes,
      });
    } catch (error) {
      console.log("error (try-catch) : " + error);
      return res.status(500).json({
        success: false,
        err: error,
      });
    }
  });

  router
  .route("/pointsWeight/:contractHash")
  .post(async function (req, res, next) {
    try {
      
      if (!req.params.contractHash) {
        return res.status(400).json({
          success: false,
          message: "contractHash not found in request params",
        });
      }

      if (!req.body.owner || !req.body.spender) {
        return res.status(400).json({
          success: false,
          message: `${!req.body.owner ? "owner" : "spender"} not found in request body`,
        });
      }

      let pointsWeight = await gaugeController.points_weight(
        req.params.contractHash, req.body.owner, req.body.spender
      );
      
      return res.status(200).json({
        success: true,
        pointsWeight: pointsWeight,
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