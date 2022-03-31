var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const proposalSchema = new Schema({
    
    // Equals to app address 
    id: {
        type:String
    },
    
    //Sequential number in related to the realted voting app
    number: {
        type:String
    },

    // Voting app instance
    app: {
        type:String
    },

    // Proposal creator's account
    creator: {
        type:String
    },


    executionScript:{
        type:String
    },

    
    expireDate: {
        type:String
    },

    // Percentage of positive votes in total possible votes for this proposal to be accepted
    minimumQuorum: {
        type:String
    },

    // Percentage of positive votes needed for this proposal to be accepted
    requiredSupport: {
        type:String
    },

    
    snapshotBlock: {
        type:String
    },

    
    votingPower: {
        type:String
    },

    // Link to metadata file
    metadata: {
        type:String
    },

    // Proposal description text
    text: {
        type:String
    },

    // Number of votes received by the proposal
    voteCount: {
        type:String
    },

    // Number of positive votes (yes) received by the proposal
    positiveVoteCount: {
        type:String
    },

    //Number of negative votes (no) received by the proposal
    negativeVoteCount: {
        type:String
    },

    
    currentQuorum: {
        type:String
    },

    
    currentSupport: {
        type:String
    },

    
    stakedSupport: {
        type:String
    },


    totalStaked: {
        type:String
    },

    
    created: {
        type:String
    },

    
    createdAtBlock: {
        type:String
    },

    createdAtTransaction: {
        type:String
    },


    updated: {
        type:String
    },


    updatedAtBlock: {
        type:String
    },


    updatedAtTransaction: {
        type:String
    },

    
    executed: {
        type:String
    },

    
    executedAtBlock: {
        type:String
    },

    
    executedAtTransaction: {
        type:String
    },

    votes: [{
            type:String
    }]
    
});

var proposal = mongoose.model("proposal", proposalSchema);
module.exports = proposal;
