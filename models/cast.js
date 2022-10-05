var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const castSchema = new Schema({
    id: {
        type:String
    },
    
    vote: {
        type: Schema.Types.ObjectId, ref: 'vote' 
    },

    voter:{
        type: Schema.Types.ObjectId, ref: 'voter'
    },

    supports: {
        type:Boolean
    },

    voterStake: {
        type:String
    },

    createdAt: {
        type:String
    },
});

var cast = mongoose.model("cast", castSchema);
module.exports = cast;
