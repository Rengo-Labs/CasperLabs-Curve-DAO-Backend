
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const votingEscrowSchema = new Schema({

    id:{
      type:String
    },
    provider:{
      type:String
    },
    value:{
        type:String
      },
    locktime : {type:String},
    type : {type:String},
    timestamp : {type:String},
    totalPower : {type:String},
});

var votingEscrow = mongoose.model("votingEscrow", votingEscrowSchema);
module.exports = votingEscrow;
