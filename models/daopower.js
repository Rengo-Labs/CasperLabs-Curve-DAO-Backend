var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const daoPowerSchema = new Schema({
    id:{
      type:String
    },
    block:{
      type:String
    },
    timestamp:{
        type:String
    },
    totalPower:{
        type:String
    }  
});

var daoPower = mongoose.model("daoPower", daoPowerSchema);
module.exports = daoPower;
