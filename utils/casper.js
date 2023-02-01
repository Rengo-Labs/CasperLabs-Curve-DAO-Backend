require("dotenv").config()
const { CasperServiceByJsonRPC } = require("casper-js-sdk");
// // creating a connection to a node for RPC API endpoints
const casperService = new CasperServiceByJsonRPC(
    process.env.JSON_RPC_API_NODE_URL
  );

const sleep = (num) => {
return new Promise((resolve) => setTimeout(resolve, num));
};

// to get the last block height when the server shut down
async function getBlockHeight(retry, blockHash) {
    try {
      
      if (blockHash == null) {
        return null;
      } else {
        const interval = setTimeout(function () {
          retry.rpcNotResponded = true;
          console.log("RPC not responded for block: ", blockHash);
        }, 30000);
  
        let flag = 0;
        let blockHashInfoResult = null;
        casperService
          .getBlockInfo(blockHash)
          .then(function (blockData) {
            blockHashInfoResult = blockData.block.header.height;
            flag = 1;
          })
          .catch(function (error) {
            console.log("RPC failed: in fecthing last blockData");
            console.log("error is : ", error);
            retry.rpcFailed = true;
          });
  
        while (
          flag == 0 &&
          retry.rpcNotResponded == false &&
          retry.rpcFailed == false
        ) {
          console.log("Checking for RPC response Type...");
          await sleep(1000);
        }
  
        if (flag == 1) {
          clearInterval(interval);
          return blockHashInfoResult;
        } else if (retry.rpcNotResponded == true || retry.rpcFailed == true) {
          return false;
        }
      }
    } catch (error) {
      console.log("error is : ", error);
    }
  }
  
// This function is to retry last block Height upon RPC Failures
async function fetchBlockHeightHelper(blockHash) {
try {
    let retry = {
    rpcFailed: false,
    rpcNotResponded: false,
    };
    let blockResult = await getBlockHeight(retry,blockHash);

    if (blockResult == false) {
    if (retry.rpcNotResponded == true || retry.rpcFailed == true) {
        while (blockResult == false) {
        retry.rpcFailed = false;
        retry.rpcNotResponded = false;
        console.log("Retrying the RPC Call for last blockData...");
        blockResult = await getBlockHeight(retry,blockHash);
        }
        console.log(
        "Retrying Attempts to fetch last blockData is Successfull..."
        );
        return blockResult;
    }
    } else {
    return blockResult;
    }
} catch (error) {
    console.log("Error : ", error);
}
}

module.exports = {
    fetchBlockHeightHelper
}
