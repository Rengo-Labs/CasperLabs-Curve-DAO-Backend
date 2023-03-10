const { connectReplicaSet } = require("./mock-database/database");

require("./gauge-controller.test");
require("./gauge.test");
require("./voting-escrow.test");
require("./api-endpoints.test")

before(async function(){
await connectReplicaSet();
});


