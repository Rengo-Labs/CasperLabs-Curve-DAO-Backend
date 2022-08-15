//for all env variables imports
require("dotenv").config();

//importing listener router
var listenerRouter = require("./routes/listenerroutes");

//setting up kafka
const kafka=require("./kafka"); 

//creating a consumer
const consumer = kafka.consumer({ groupId: process.env.TOPIC });

// import library to serialize Events Data
var serialize = require('serialize-javascript');


async function consumeEvent (redis)
{
    try {
        //connection a producer
        await consumer.connect();

        //subcribing the topic to consume data
        await consumer.subscribe({ topic: process.env.TOPIC, fromBeginning: true });

        //consuming data
        await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            
          console.log(`Consumed event from topic ${topic}: value = ${message.value}`);
            
          let _value = JSON.parse(message.value.toString());

          //push event to redis queue
          redis.client.RPUSH(process.env.GRAPHQLREDISQUEUE,serialize({obj:_value}));
          console.log("Event pushed to queue...");
        },
        });

        process.on('SIGINT', () => {
          console.log('\nDisconnecting consumer and shutting down Graphql backend ...');
          consumer.disconnect();
          process.exit(0);
        });
    } 
    catch (error) {
        console.error('Error publishing message', error)
    }
}

module.exports = {consumeEvent};