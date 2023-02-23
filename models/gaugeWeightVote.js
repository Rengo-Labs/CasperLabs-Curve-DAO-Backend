var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const gaugeWeightVoteSchema = new Schema({

    id:{
      type:String
    },
    gauge:{
      type:String
    },
    user:{
        type:String
      },
    time:{
        type:String
    },
    weight:{
        type:String
    },
    block : {
      type : String
    }
});

var gaugeWeightVote = mongoose.model("gaugeWeightVote", gaugeWeightVoteSchema);
module.exports = gaugeWeightVote;
