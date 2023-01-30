require("dotenv").config();
var express = require("express");
var router = express.Router();
var votingEscrow = require("../JsClients/VOTINGESCROW/votingEscrowFunctionsForBackend/functions");

router.route("/balanceagainstuser/:contractHash/:user").post(async function (req, res, next) {
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

router.route("/totalSupply/:contractHash").post(async function (req, res, next) {
  try {
    
    if (!req.params.contractHash) {
      return res.status(400).json({
        success: false,
        message: "contractHash not found in request params",
      });
    }

    if(!req.body.unlockTimes){
      let t = new Date().getTime();
      let totalSupply = await votingEscrow.totalSupply(req.params.contractHash,t);
      return res.status(200).json({
        success: true,
        totalSupplies: [totalSupply],
      });
    }

    if(req.body.unlockTimes){
      if(!Array.isArray(req.body.unlockTimes)){
        return res.status(400).json({
          success: false,
          message: "Send unlock times in array.",
        });
      }else{
        let fetchTotalSupplyPromisesArray = [];
        req.body.unlockTimes.forEach(unlockTime => {
          fetchTotalSupplyPromisesArray.push(votingEscrow.totalSupply(req.params.contractHash, unlockTime));
        });

        let totalSupplies = await Promise.all(fetchTotalSupplyPromisesArray);
        return res.status(200).json({
          success: true,
          totalSupplies: totalSupplies,
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

router.route("/totalSupplyAt/:contractHash").post(async function (req, res, next) {
  try {
    
    if (!req.params.contractHash) {
      return res.status(400).json({
        success: false,
        message: "contractHash not found in request params",
      });
    }

    if(!req.body.blockNumbers){
      const AVG_BLOCK_TIME_IN_MS = 45000;
      let block = (new Date().getTime()) / AVG_BLOCK_TIME_IN_MS;
      let totalSupply = await votingEscrow.totalSupplyAt(req.params.contractHash,block);
      return res.status(200).json({
        success: true,
        totalSupplies: [totalSupply],
      });
    }

    if(req.body.blockNumbers){
      if(!Array.isArray(req.body.blockNumbers)){
        return res.status(400).json({
          success: false,
          message: "Send block numbers in array.",
        });
      }else{
        let fetchTotalSupplyPromisesArray = [];
        req.body.blockNumbers.forEach(block => {
          fetchTotalSupplyPromisesArray.push(votingEscrow.totalSupplyAt(req.params.contractHash, block));
        });

        let totalSupplies = await Promise.all(fetchTotalSupplyPromisesArray);
        return res.status(200).json({
          success: true,
          totalSupplies: totalSupplies,
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

router.route("/balanceOf/:contractHash").post(async function (req, res, next) {
  try {
    
    if (!req.params.contractHash) {
      return res.status(400).json({
        success: false,
        message: "contractHash not found in request params",
      });
    }

    if(!req.body.account){
      return res.status(400).json({
        success: false,
        message: "account not found in request body",
      });
    }

    if(!req.body.timestamps){
      let timestamp = new Date().getTime();
      let balances = await votingEscrow.balanceOf(req.params.contractHash,req.body.account,timestamp);
      return res.status(200).json({
        success: true,
        balances: [balances],
      });
    }    

    if(req.body.timestamps){
      if(!Array.isArray(req.body.timestamps)){
        return res.status(400).json({
          success: false,
          message: "Send timestamps in array.",
        });
      }else{
        let fetchBalanceOfPromisesArray = [];
        req.body.timestamps.forEach(timestamp => {
          fetchBalanceOfPromisesArray.push(votingEscrow.balanceOf(req.params.contractHash,req.body.account, timestamp));
        });

        let balances = await Promise.all(fetchBalanceOfPromisesArray);
        return res.status(200).json({
          success: true,
          balances: balances,
        });}
    }
  } catch (error) {
    console.log("error (try-catch) : " + error);
    return res.status(500).json({
      success: false,
      err: error,
    });
  }
});

router.route("/balanceOfAt/:contractHash").post(async function (req, res, next) {
  try {
    
    if (!req.params.contractHash) {
      return res.status(400).json({
        success: false,
        message: "contractHash not found in request params",
      });
    }

    if(!req.body.account){
      return res.status(400).json({
        success: false,
        message: "account not found in request body",
      });
    }

    if(!req.body.blockNumbers){
      const AVG_BLOCK_TIME_IN_MS = 45000;
      let block = Math.floor((new Date().getTime()) / AVG_BLOCK_TIME_IN_MS);
      let balances = await votingEscrow.balanceOfAt(req.params.contractHash,req.body.account, block);
      return res.status(200).json({
        success: true,
        balances: [balances],
      });
    } 

    if(req.body.blockNumbers){
      if(!Array.isArray(req.body.blockNumbers)){
        return res.status(400).json({
          success: false,
          message: "Send block numbers in array.",
        });
      }else{
        let fetchBalanceOfPromisesArray = [];
        req.body.blockNumbers.forEach(block => {
          fetchBalanceOfPromisesArray.push(votingEscrow.balanceOfAt(req.params.contractHash,req.body.account, block));
        });

        let balances = await Promise.all(fetchBalanceOfPromisesArray);
        return res.status(200).json({
          success: true,
          balances: balances,
        });}
    }
  } catch (error) {
    console.log("error (try-catch) : " + error);
    return res.status(500).json({
      success: false,
      err: error,
    });
  }
});

router.route("/getlastUserSlope/:contractHash").post(async function (req, res, next) {
  try {
    
    if (!req.params.contractHash) {
      return res.status(400).json({
        success: false,
        message: "contractHash not found in request params",
      });
    }

    if(!req.body.address){
      return res.status(400).json({
        success: false,
        message: "address not found in request body",
      });
    }
    
    let lastUserSlope = await votingEscrow.getLastUserSlope(req.params.contractHash,req.body.address);
    return res.status(200).json({
      success: true,
      lastUserSlope: lastUserSlope,
    });
    
  } catch (error) {
    console.log("error (try-catch) : " + error);
    return res.status(500).json({
      success: false,
      err: error,
    });
  }
});

router.route("/lockedEnd/:contractHash").post(async function (req, res, next) {
  try {
    
    if (!req.params.contractHash) {
      return res.status(400).json({
        success: false,
        message: "contractHash not found in request params",
      });
    }

    if(!req.body.account){
      return res.status(400).json({
        success: false,
        message: "account not found in request body",
      });
    }
    
    let lockedEnd = await votingEscrow.lockedEnd(req.params.contractHash,req.body.account);
    return res.status(200).json({
      success: true,
      lockedEnd: lockedEnd,
    });
    
  } catch (error) {
    console.log("error (try-catch) : " + error);
    return res.status(500).json({
      success: false,
      err: error,
    });
  }
});

router.route("/CRVStats/:contractHash/:user").post(async function (req, res, next) {
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

router.route("/lockedEnd/:contractHash").post(async function (req, res, next) {
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