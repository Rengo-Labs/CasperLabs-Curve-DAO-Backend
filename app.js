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

//kafka setup
const consumer = require('./consumer');

var eventsDataModel = require("./models/eventsData");

//routers

var listenerRouter = require("./routes/listenerroutes");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

var DB_URL;
var queuePopFlag=0;

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

//Connect to Redis
var redis = require('./connectRedis');

//function to deserialize Event Data
function deserialize(serializedJavascript){
  return eval('(' + serializedJavascript + ')');
}


app.use(headerMiddleware);

app.use("/", indexRouter);
app.use("/", listenerRouter.router);


app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);


consumer.consumeEvent(redis);


async function callMutations()
{
  if(queuePopFlag==0)
  {
    let redisLength=await redis.client.LLEN(process.env.GRAPHQLREDISQUEUE);
    //console.log("Redis queue length: ",redisLength);
    //check redis queue length
    if(redisLength>0)
    {
        queuePopFlag=1;
        let headValue=await redis.client.LRANGE(process.env.GRAPHQLREDISQUEUE,0,0);
        let deserializedHeadValue=(deserialize(headValue)).obj;
        console.log("Event Read from queue's head: ", deserializedHeadValue);

        //check if event is in the database
        let eventResult= await eventsDataModel.findOne({
          deployHash:deserializedHeadValue.deployHash,
          eventName:deserializedHeadValue.eventName,
          timestamp:deserializedHeadValue.timestamp,
          block_hash: deserializedHeadValue.block_hash
        });

        if (eventResult==null)
        {
          //store new event Data
          eventResult= new eventsDataModel ({
            deployHash:deserializedHeadValue.deployHash,
            eventName:deserializedHeadValue.eventName,
            timestamp:deserializedHeadValue.timestamp,
            block_hash: deserializedHeadValue.block_hash,
            status:"pending",
            eventsdata: deserializedHeadValue.eventsdata
          });
          await eventsDataModel.create(eventResult);

          console.log("Event is New, Calling Mutation...");
          //call mutation
          await listenerRouter.geteventsdata(eventResult,deserializedHeadValue.deployHash, deserializedHeadValue.timestamp, deserializedHeadValue.block_hash, deserializedHeadValue.eventName, deserializedHeadValue.eventsdata);
          await redis.client.LPOP(process.env.GRAPHQLREDISQUEUE);
          queuePopFlag=0;
        }
        else if(JSON.stringify(eventResult.eventsdata) != JSON.stringify(deserializedHeadValue.eventsdata))
        {
          console.log("Event has same EventName, Calling Mutation...");
          //call mutation
          await listenerRouter.geteventsdata(eventResult,deserializedHeadValue.deployHash, deserializedHeadValue.timestamp, deserializedHeadValue.block_hash, deserializedHeadValue.eventName, deserializedHeadValue.eventsdata);
          await redis.client.LPOP(process.env.GRAPHQLREDISQUEUE);
          queuePopFlag=0;
        }
        else if (eventResult.status == "pending"){
          console.log("Event is Not performed Yet, Calling Mutation...");
          //call mutation
          await listenerRouter.geteventsdata(eventResult,deserializedHeadValue.deployHash, deserializedHeadValue.timestamp, deserializedHeadValue.block_hash, deserializedHeadValue.eventName, deserializedHeadValue.eventsdata);
          await redis.client.LPOP(process.env.GRAPHQLREDISQUEUE);
          queuePopFlag=0;
        }
        else{
          console.log("Event is repeated, skipping Mutation...");
          await redis.client.LPOP(process.env.GRAPHQLREDISQUEUE);
          queuePopFlag=0;
        }  
    }
    else{
      console.log("There are currently no Events in the Redis queue...");
      return;
    }
  }
  else{
    console.log("Already, one Event is calling the mutation...");
    return;
  }
}

setInterval(() => {
  callMutations();
}, 2000);

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
