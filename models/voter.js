var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const voterSchema = new Schema({
     id: {
        type:String
    },
    address: {
        type: String
    },
    castVotes: [{
        type: Schema.Types.ObjectId, ref: 'cast' 
    }]
});

var voter = mongoose.model("voter", voterSchema);
module.exports = voter;
