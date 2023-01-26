require("dotenv").config();
var express = require("express");
var router = express.Router();
var gaugeController = require("../JsClients/GAUGECONTROLLER/gaugeControllerFunctionsForBackend/functions");

router
  .route("/gaugeRelativeWeight/:contractHash")
  .get(async function (req, res, next) {
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
          message: "address not found in request params",
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
  .get(async function (req, res, next) {
    try {
      debugger
      if (!req.params.contractHash) {
        return res.status(400).json({
          success: false,
          message: "contractHash not found in request params",
        });
      }

      if (!req.body.address) {
        return res.status(400).json({
          success: false,
          message: "address not found in request params",
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
  .get(async function (req, res, next) {
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


  module.exports = router;