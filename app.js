var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var app = express();
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql/schema");

//importing all routers
var indexRouter = require('./routes/index');
var adminRouter = require("./routes/adminroutes");
var afterDeploymentRouter = require("./routes/afterDeploymentRoutes");
var listenerRouter = require("./routes/listenerroutes");
var coinsmarketcapapiRouter = require("./routes/coinsmarketcapapi");
var erc20CrvRouter = require("./routes/erc20CrvRoutes");
var votingEscrowRouter = require("./routes/votingEscrowRoutes");
var vestingEscrowRouter = require("./routes/vestingEscrowRoutes");
var gaugeControllerRouter = require("./routes/gaugeControllerRoutes");
var readWasmRouter = require("./routes/readWasm");

//kafka setup
const consumer = require("./consumer");

// connecting to the database
require("./dbConnection");

//connecting database's backup file  
require("./backupDatabase");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Connect to Redis
var redis = require("./connectRedis");

//Defining all routes
app.use("/", adminRouter);
app.use("/", afterDeploymentRouter);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use('/', indexRouter);
app.use("/", listenerRouter.router);
app.use("/", erc20CrvRouter);
app.use("/", coinsmarketcapapiRouter);
app.use("/votingEscrow", votingEscrowRouter);
app.use("/vestingEscrow", vestingEscrowRouter);
app.use("/gaugeController",gaugeControllerRouter);
app.use("/", readWasmRouter);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

consumer.consumeEvent(redis);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;