var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql/schema");
const headerMiddleware = require("./middlewares/HeaderMiddleware");
var indexRouter = require("./routes/index");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

var DB_URL;

if (process.env.NODE_MODE == "deployed") {
  DB_URL = process.env.DATABASE_URL_ONLINE;
} else {
  DB_URL = process.env.DATABASE_URL_LOCAL;
}

console.log("DB_URL : " + DB_URL);

const connect = mongoose.connect(DB_URL);
// connecting to the database
connect.then(
  (db) => {
    console.log("Connected to the MongoDB server\n\n");
  },
  (err) => {
    console.log(err);
  }
);

app.use(headerMiddleware);

app.use("/", indexRouter);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

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
