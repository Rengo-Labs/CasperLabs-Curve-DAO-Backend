var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const gaugeVoteSchema = new Schema({

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
    gaugeWeights : [{
        type : mongoose.Schema.Types.ObjectId, ref: 'gaugeWeight'
    }],
    total_weight : {type:String},
    veCRV : {type:String},
    totalveCRV : {type:String},
    gaugeWeights : [{
      type : mongoose.Schema.Types.ObjectId, ref: 'gaugeWeight'
  }],
});

var gaugeVote = mongoose.model("gaugeVote", gaugeVoteSchema);
module.exports = gaugeVote;
