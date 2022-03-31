var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const votingAppSchema = new Schema({
    
    // Equals to app address 
    id: {
        type:String
    },
    
    //Voting app instance 
    address: {
        type:String
    },

    // App codename 
    codename:{
        type:String
    },

    // Minimum balance needed to create a proposal
    minimumBalance: {
        type:String
    },

    // Percentage of positive votes in total possible votes for a proposal to be accepted
    minimumQuorum: {
        type:String
    },

    // Minimum time needed to pass between user's previous proposal and a user creating a new proposal
    minimumTime: {
        type:String
    },

    // Percentage of positive votes needed for a proposal to be accepted
    requiredSupport: {
        type:String
    },

    // Seconds that a proposal will be open for vote (unless enough votes have been cast to make an early decision)
    voteTime: {
        type:String
    },

    // Number of proposals created with this app
    proposalCount: {
        type:String
    },

    // Number of votes received by all the proposals created with this app
    voteCount: {
        type:String
    },

    // Address of the token used for voting
    token:{
        type:String
    },

    // Proposals created through this app instance
    proposals: [{
        type:String
    }]
    
});

var votingApp = mongoose.model("votingApp", votingAppSchema);
module.exports = votingApp;
