var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const voteSchema = new Schema({
    id: {
        type:String,
        unique : true,
        required : true
    },
    orgAddress: {
        type:String
    },

    appAddress:{
        type:String
    },

    creator: {
        type:String
    },

    originalCreator: {
        type:String
    },

    metadata: {
        type:String
    },

    executed: {
        type:Boolean
    },

    executedAt: {
        type:String
    },

    startDate: {
        type:String
    },

    snapshotBlock: {
        type:String
    },

    supportRequiredPct:{
        type:String
    },

    minAcceptQuorum: {
        type:String
    },

    yea: {
        type:String
    },

    nay: {
        type:String
    },

    votingPower: {
        type:String
    },

    script:{
        type:String
    },

    voteNum: {
        type:String
    },

    creatorVotingPower: {
        type:String
    },

    transactionHash: {
        type:String
    },

    castCount: {
        type:String
    },

    voteCountSeq: {
        type:String
    },
    
    // castVotes: [{
    //     type: Schema.Types.ObjectId, ref: 'cast' 
    // }]
});

var vote = mongoose.model("vote", voteSchema);
module.exports = vote;
