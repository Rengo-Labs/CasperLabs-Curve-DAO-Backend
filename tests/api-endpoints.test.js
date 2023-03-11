const fetch = require("node-fetch");
const chai = require("chai");
const assert = chai.assert;

require("dotenv").config();

const allcontractsData = require("../models/allcontractsData");

const adminLogin = async () => {
  const url = `http://localhost:${process.env.PORT || "3000"}/adminlogin`;

  const data = {
    username: "admin",
    password: "adminPass",
  };

  let response = await fetch(url, {
    method: "post",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });

  let parsedResponse = await response.json();

  return parsedResponse;
};

module.exports = describe("All api endpoints should work", async () => {
  try {
    let token;

    describe("adminroutes should work for admin user", async () => {
      it("admin user should be logged in successfully", async () => {
        let response = await adminLogin();
        token = response.token;
        assert(response.success, true);
      });
    });

    describe("afterDeploymentroutes should work for admin user", async () => {
      it("addcontractandpackageHash should add contract and package hash", async () => {
        const url = `http://localhost:${
          process.env.PORT || "3000"
        }/addcontractandpackageHash`;

        const data = {
          contractHash: "contract hash",
          packageHash: "package hash",
        };

        let response = await fetch(url, {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        let parsedResponse = await response.json();

        assert.equal(parsedResponse.success, true);

        let hashes = await allcontractsData.findOne({
          contractHash: "contract hash",
          packageHash: "package hash",
        });

        assert.equal(hashes.contractHash, "contract hash");
        assert.equal(hashes.packageHash, "package hash");
      });
    });

    describe("coinsmarketcapapi should return response from coinmarketcap", async () => {
      it("getworthinUSD should return worth in USD", async () => {
        const url = `http://localhost:${
          process.env.PORT || "3000"
        }/getworthinUSD`;

        const data = {
          symbol: "ETH",
          amount: 10,
        };

        let response = await fetch(url, {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });

        let parsedResponse = await response.json();

        assert.equal(parsedResponse.success, true);
      });

      it("tokensworthconversion should return converted amount", async () => {
        const url = `http://localhost:${
          process.env.PORT || "3000"
        }/tokensworthconversion`;

        const data = {
          symbolforconversion: "BTC",
          symboltoconvertto: "ETH",
          amounttoconvertto : 10,
          start : 1,
          end : 20
        };

        let response = await fetch(url, {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });

        let parsedResponse = await response.json();

        assert.equal(parsedResponse.success, true);
      });

      it("priceconversion should return converted price", async () => {
        const url = `http://localhost:${
          process.env.PORT || "3000"
        }/priceconversion`;

        const data = {
          symbolforconversion: "BTC",
          symboltoconvertto: "ETH",
          amount : 10,
        };

        let response = await fetch(url, {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });

        let parsedResponse = await response.json();

        assert.equal(parsedResponse.success, true);
      });
    });

    describe("erc20routes should return response from erc20 contract", async () => {
      it("balanceagainstuser should return balance for user", async () => {
        const url = `http://localhost:${
          process.env.PORT || "3000"
        }/balanceagainstuser/${process.env.ERC20_CRV_CONTRACT_HASH}/015d4d230841ae93139f23124597468f4e9d7f7f68479f5394ccd0079814661504`;

        let response = await fetch(url, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        });

        let parsedResponse = await response.json();

        assert.equal(parsedResponse.success, true);
      });

      it("allowanceagainstownerandspender should return allowance for owner and spender", async () => {
        const url = `http://localhost:${
          process.env.PORT || "3000"
        }/allowanceagainstownerandspender/${process.env.ERC20_CRV_CONTRACT_HASH}/owner/spender`;

        let response = await fetch(url, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        });

        let parsedResponse = await response.json();

        assert.equal(parsedResponse.success, true);
      });
    });

    describe("vestingEscrowRoutes should return response from vesting escrow contract", async () => {
      it("balanceOf should return balance", async () => {
        const url = `http://localhost:${
          process.env.PORT || "3000"
        }/balanceOf/${process.env.VESTING_ESCROW_CONTRACT_HASH}`;

        const data = {
          account : "24a56544c522eca7fba93fb7a6cef83e086706fd87b2f344f5c3dad3603d11f1"
        };

        let response = await fetch(url, {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });

        let parsedResponse = await response.json();

        assert.equal(parsedResponse.success, true);
      });

      it("vestedOf should return vested amount", async () => {
        const url = `http://localhost:${
          process.env.PORT || "3000"
        }/vestedOf/${process.env.VESTING_ESCROW_CONTRACT_HASH}`;

        const data = {
          account : "24a56544c522eca7fba93fb7a6cef83e086706fd87b2f344f5c3dad3603d11f1"
        };

        let response = await fetch(url, {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });

        let parsedResponse = await response.json();

        assert.equal(parsedResponse.success, true);
      });

      it("lockedOf should return locked amount", async () => {
        const url = `http://localhost:${
          process.env.PORT || "3000"
        }/lockedOf/${process.env.VESTING_ESCROW_CONTRACT_HASH}`;

        const data = {
          account : "24a56544c522eca7fba93fb7a6cef83e086706fd87b2f344f5c3dad3603d11f1"
        };

        let response = await fetch(url, {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });

        let parsedResponse = await response.json();

        assert.equal(parsedResponse.success, true);
      });
    });

    describe("gaugeControllerRoutes should return response from gauge controller contract", async () => {
      it("gaugeRelativeWeight should return gauge relative weight", async () => {
        const url = `http://localhost:${
          process.env.PORT || "3000"
        }/gaugeRelativeWeight/${process.env.GAUGE_CONTROLLER_CONTRACT_HASH}`;

        const data = {
          address : "24a56544c522eca7fba93fb7a6cef83e086706fd87b2f344f5c3dad3603d11f1"
        };

        let response = await fetch(url, {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });

        let parsedResponse = await response.json();

        assert.equal(parsedResponse.success, true);
      });

      it("getGaugeWeight should return gauge weight", async () => {
        const url = `http://localhost:${
          process.env.PORT || "3000"
        }/getGaugeWeight/${process.env.GAUGE_CONTROLLER_CONTRACT_HASH}`;

        const data = {
          address : "24a56544c522eca7fba93fb7a6cef83e086706fd87b2f344f5c3dad3603d11f1"
        };

        let response = await fetch(url, {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });

        let parsedResponse = await response.json();

        assert.equal(parsedResponse.success, true);
      });

      it("getTotalWeight should return total weight", async () => {
        const url = `http://localhost:${
          process.env.PORT || "3000"
        }/getTotalWeight/${process.env.GAUGE_CONTROLLER_CONTRACT_HASH}`;

        let response = await fetch(url, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
        });

        let parsedResponse = await response.json();

        assert.equal(parsedResponse.success, true);
      });

      it("voteUserSlopes should return vote user slopes", async () => {
        const url = `http://localhost:${
          process.env.PORT || "3000"
        }/voteUserSlopes/${process.env.GAUGE_CONTROLLER_CONTRACT_HASH}`;

        const data = {
          owner : "owner",
          spender : "spender"
        };

        let response = await fetch(url, {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });

        let parsedResponse = await response.json();

        assert.equal(parsedResponse.success, true);
      });

      it("pointsWeight should return points weight", async () => {
        const url = `http://localhost:${
          process.env.PORT || "3000"
        }/pointsWeight/${process.env.GAUGE_CONTROLLER_CONTRACT_HASH}`;

        const data = {
          owner : "owner",
          spender : "spender"
        };

        let response = await fetch(url, {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });

        let parsedResponse = await response.json();

        assert.equal(parsedResponse.success, true);
      });
    });

    describe("votingEscrowRoutes should return response from voting escrow contract", async () => {
      it("balanceagainstuser should return balance", async () => {
        const url = `http://localhost:${
          process.env.PORT || "3000"
        }/balanceagainstuser/${process.env.VOTING_ESCROW_CONTRACT_HASH}/24a56544c522eca7fba93fb7a6cef83e086706fd87b2f344f5c3dad3603d11f1`;

        // const data = {
        //   account : "24a56544c522eca7fba93fb7a6cef83e086706fd87b2f344f5c3dad3603d11f1"
        // };

        let response = await fetch(url, {
          method: "post",
          // body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });

        let parsedResponse = await response.json();

        assert.equal(parsedResponse.success, true);
      });

      it("totalSupply should return total supply", async () => {
        const url = `http://localhost:${
          process.env.PORT || "3000"
        }/totalSupply/${process.env.VOTING_ESCROW_CONTRACT_HASH}`;

        let response = await fetch(url, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
        });

        let parsedResponse = await response.json();

        assert.equal(parsedResponse.success, true);
      });

      // it("totalSupplyAt should return total supply", async () => {
      //   const url = `http://localhost:${
      //     process.env.PORT || "3000"
      //   }/totalSupplyAt/${process.env.VOTING_ESCROW_CONTRACT_HASH}`;

      //   let response = await fetch(url, {
      //     method: "post",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   });

      //   let parsedResponse = await response.json();

      //   assert.equal(parsedResponse.success, true);
      // });

      it("balanceOf should return balance", async () => {
        const url = `http://localhost:${
          process.env.PORT || "3000"
        }/balanceOf/${process.env.VOTING_ESCROW_CONTRACT_HASH}`;

        const data = {
          account : "24a56544c522eca7fba93fb7a6cef83e086706fd87b2f344f5c3dad3603d11f1"
        };

        let response = await fetch(url, {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });

        let parsedResponse = await response.json();

        assert.equal(parsedResponse.success, true);
      });

      it("balanceOfAt should return balance", async () => {
        const url = `http://localhost:${
          process.env.PORT || "3000"
        }/balanceOfAt/${process.env.VOTING_ESCROW_CONTRACT_HASH}`;

        const data = {
          account : "24a56544c522eca7fba93fb7a6cef83e086706fd87b2f344f5c3dad3603d11f1"
        };

        let response = await fetch(url, {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });

        let parsedResponse = await response.json();

        assert.equal(parsedResponse.success, true);
      });

      it("getlastUserSlope should return last user slope", async () => {
        const url = `http://localhost:${
          process.env.PORT || "3000"
        }/getlastUserSlope/${process.env.VESTING_ESCROW_CONTRACT_HASH}`;

        const data = {
          address : "24a56544c522eca7fba93fb7a6cef83e086706fd87b2f344f5c3dad3603d11f1"
        };

        let response = await fetch(url, {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });

        let parsedResponse = await response.json();

        assert.equal(parsedResponse.success, true);
      });

      it("lockedEnd should return locked end amount", async () => {
        const url = `http://localhost:${
          process.env.PORT || "3000"
        }/lockedEnd/${process.env.VOTING_ESCROW_CONTRACT_HASH}`;

        const data = {
          account : "24a56544c522eca7fba93fb7a6cef83e086706fd87b2f344f5c3dad3603d11f1"
        };

        let response = await fetch(url, {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });

        let parsedResponse = await response.json();

        assert.equal(parsedResponse.success, true);
      });

      it("CRVStats should return crv stats", async () => {
        const url = `http://localhost:${
          process.env.PORT || "3000"
        }/CRVStats/${process.env.VOTING_ESCROW_CONTRACT_HASH}/24a56544c522eca7fba93fb7a6cef83e086706fd87b2f344f5c3dad3603d11f1`;

        let response = await fetch(url, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
        });

        let parsedResponse = await response.json();

        assert.equal(parsedResponse.success, true);
      });
    });

    describe("readWasm should return wasm data", async () => {
      it("readWasm should return wasm data", async () => {
        
        const url = `http://localhost:${
          process.env.PORT || "3000"
        }/getErc20ErvWasmData`;

        let response = await fetch(url, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        });

        let parsedResponse = await response.json();

        assert.equal(parsedResponse.success, true);
      })
    });
  } catch (error) {
    console.log("error : ", error);
  }
});
