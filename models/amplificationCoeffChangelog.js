var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const amplificationCoeffChangelogSchema = new Schema({

    id: {
        type:String
    },
    pool:{
        type:String
    },
    value: {
        type:String
    },
    block: {
        type:String
    },
    timestamp: {
        type:String
    },
    transaction: {
        type:String
    },
    PoolEvent: {
        type:String
    },
    
});

var amplificationCoeffChangelog = mongoose.model("amplificationCoeffChangelog", amplificationCoeffChangelogSchema);
module.exports = amplificationCoeffChangelog;
