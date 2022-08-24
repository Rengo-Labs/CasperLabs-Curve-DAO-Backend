const { startReplicaSet } = require("./mock-database/database");
require("./address-provider.test");
require("./gauge-controller.test");
require("./gauge.test");
require("./kernel.test");
require("./pool.test");
require("./registry.test");
require("./voting.test");

before(async function(){
    //start in-memory database for tests
await startReplicaSet();
});


