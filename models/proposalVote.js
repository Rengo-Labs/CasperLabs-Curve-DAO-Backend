var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const proposalVoteSchema = new Schema({
    
    id: {
        type:String
    },
    
    proposal: {
        type:String
    },
    supports: {
        type:Boolean
    },
    stake: {
        type:String
    },
    voter: {
        type:String
    },

    created:{
        type:String
    },
    createdAtBlock: {
        type:String
    },
    createdAtTransaction: {
        type:String
    },
    
});

var proposalVote = mongoose.model("proposalVote", proposalVoteSchema);
module.exports = proposalVote;
