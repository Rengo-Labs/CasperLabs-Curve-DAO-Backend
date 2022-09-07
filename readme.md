# CasperLabs-Curve-DAO-Backend

This is the official Curve graphQL code for the Casper network.

## Running Locally

npm install to install the require packages

npm start to start the server

Heroku App Link:

Endpoints Documentation Link:  


Smart Contract Documentation Link: 

## Running Testcases 

- Change NODE_MODE to developement (For not mixing the real database)
- npm install to install the require packages,
- npm start to start the server
- open another terminal and node test.js to run the test cases




## Deployment of Contracts

#### Generate the keys

Paste this command on the ubuntu terminal, that will create a keys folder for you containing public key , public key hex and secret key.

```
casper-client keygen keys

```
#### Paste the keys

Paste the keys folder created by the above command to 
Scripts/ERC20-CRV,
Scripts/LIQUIDITYGAUGEREWARD,
Scripts/LIQUIDITYGAUGEV3,
Scripts/VESTINGESCROWFACTORY,
Scripts/GAUGECONTROLLER,
Scripts/MINTER,
Scripts/VOTINGESCROW,
Scripts/CURVE-REWARDS
Scripts/MULTICALL
folders.

#### Fund the key

We can fund the keys from casper live website faucet page on testnet.

Use the script file in package.json to perform the deployments
```
  "scripts": {
    "start": "ts-node ./bin/www",
    "deploy:erc20Crv": "ts-node Scripts/ERC20-CRV/deploy/erc20CrvContract.ts",
    "deploy:erc20CrvFunctions": "ts-node Scripts/ERC20-CRV/deploy/erc20CrvContractFunctions.ts",
    "deploy:liquidityGaugeReward": "ts-node Scripts/LIQUIDITYGAUGEREWARD/deploy/liquidityGaugeRewardContract.ts",
    "deploy:liquidityGaugeRewardFunctions": "ts-node Scripts/LIQUIDITYGAUGEREWARD/deploy/liquidityGaugeRewardContractFunctions.ts",
    "deploy:liquidityGaugeV3": "ts-node Scripts/LIQUIDITYGAUGEV3/deploy/liquidityGaugeV3Contract.ts",
    "deploy:liquidityGaugeV3Functions": "ts-node Scripts/LIQUIDITYGAUGEV3/deploy/liquidityGaugeV3ContractFunctions.ts",
    "deploy:vestingEscrowFactory": "ts-node Scripts/VESTINGESCROWFACTORY/deploy/vestingEscrowContract.ts",
    "deploy:vestingEscrowFactoryFunctions": "ts-node Scripts/VESTINGESCROWFACTORY/deploy/vestingEscrowContractFunctions.ts",
    "deploy:gaugeController": "ts-node Scripts/GAUGECONTROLLER/deploy/gaugeControllerContract.ts",
    "deploy:gaugeControllerFunctions": "ts-node Scripts/GAUGECONTROLLER/deploy/GaugeControllerFunctions.ts",
    "deploy:minter": "ts-node Scripts/MINTER/deploy/minterContract.ts",
    "deploy:minterFunctions": "ts-node Scripts/MINTER/deploy/minterContractFunctions.ts",
    "deploy:votingEscrow": "ts-node Scripts/VOTINGESCROW/deploy/votingEscrowContract.ts",
    "deploy:votingEscrowFunctions": "ts-node Scripts/VOTINGESCROW/deploy/votingEscrowContractFunctions.ts",
    "deploy:curveRewards": "ts-node Scripts/CURVE-REWARDS/deploy/curveRewardsContract.ts",
    "deploy:curveRewardsFunctions": "ts-node Scripts/CURVE-REWARDS/deploy/curveRewardsContractFunctions.ts",
    "deploy:multicall": "ts-node Scripts/MULTICALL/deploy/multicallContract.ts",
    "deploy:multicallFunctions": "ts-node Scripts/MULTICALL/deploy/multicallContractFunctions.ts"
  },

Use the following commands to perform deployments
```

npm run deploy:erc20Crv
npm run deploy:erc20CrvFunctions

npm run deploy:liquidityGaugeReward
npm run deploy:liquidityGaugeRewardFunctions

npm run deploy:liquidityGaugeV3
npm run deploy:liquidityGaugeV3Functions

npm run test:vestingEscrowFactory
npm run test:vestingEscrowFactoryFunctions

npm run deploy:cerc20
npm run deploy:cerc20Functions

npm run deploy:gaugeController
npm run deploy:gaugeControllerFunctions

npm run deploy:minter
npm run deploy:minterFunctions

npm run test:votingEscrow
npm run test:votingEscrowFunctions

npm run test:curveRewards
npm run test:curveRewardsFunctions

npm run test:multicall
npm run test:multicallFunctions