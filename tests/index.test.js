const { connectReplicaSet } = require("./mock-database/database");
// require("./address-provider.test");
require("./gauge-controller.test");
require("./gauge.test");
// require("./kernel.test");
// require("./pool.test");
// require("./registry.test");
// require("./voting.test");
require("./voting-escrow.test");

before(async function(){
await connectReplicaSet();
});


