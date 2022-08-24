/* src/server.js */

const express = require("express");
// const graphqlHTTP = require("express-graphql");
const { graphqlHTTP } = require("express-graphql");
const { startDatabase } = require("../mock-database/database");
const schema = require("../../graphql/schema");
// const resolvers = require("./resolvers");
// const expressPlayground = require("graphql-playground-middleware-express")
//   .default;

// Create a context for holding contextual data (db info in this case)
const app = express();

startDatabase().then(res => {
  console.log("Connected to test mongo database");
}).catch(err => {
  console.log(err.message);
});

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