/* src/server.js */

const express = require("express");
// const graphqlHTTP = require("express-graphql");
const { graphqlHTTP } = require("express-graphql");
const { startReplicaSet } = require("../mock-database/database");
const schema = require("../../graphql/schema");
const allcontractsData = require("../../models/allcontractsData");
// const resolvers = require("./resolvers");
// const expressPlayground = require("graphql-playground-middleware-express")
//   .default;

var adminRouter = require("../../routes/adminroutes");
var afterDeploymentRouter = require("../../routes/afterDeploymentRoutes");
var coinsmarketcapapiRouter = require("../../routes/coinsmarketcapapi");
var erc20crvRouter = require("../../routes/erc20CrvRoutes");
var gaugeControllerRouter = require("../../routes/gaugeControllerRoutes");
var vestingEscrowRouter = require("../../routes/vestingEscrowRoutes");
var votingEscrowRouter = require("../../routes/votingEscrowRoutes");
var readWasmRouter = require("../../routes/readWasm");


// Create a context for holding contextual data (db info in this case)
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

startReplicaSet().then(
  async res => {
  await allcontractsData.create([
    {contractHash : process.env.VOTING_ESCROW_CONTRACT_HASH, packageHash: process.env.VOTING_ESCROW_PACKAGE_HASH},
    {contractHash : process.env.GAUGE_CONTROLLER_CONTRACT_HASH, packageHash: process.env.GAUGE_CONTROLLER_PACKAGE_HASH},
  ]);
  console.log("Connected to test mongo database");
}).catch(err => {
  console.log(err.message);
});

app.use("/", adminRouter);
app.use("/", afterDeploymentRouter);
app.use("/", coinsmarketcapapiRouter);
app.use("/", erc20crvRouter);
app.use("/", gaugeControllerRouter);
app.use("/", vestingEscrowRouter);
app.use("/", votingEscrowRouter);
app.use("/", readWasmRouter);

app.use(
  "/graphqL",
  graphqlHTTP({
    schema : schema,
    graphiql: true,
  })
);

//Graphql Playground route
// app.get("/playground", expressPlayground({ endpoint: "/graphql" }));

module.exports = app;