const mongoose = require("mongoose")

const GroupSchema = new mongoose.Schema({
    groupname:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:"Group description is required"
    },
    logo:{
        type:String,
    },   
    members:{
        type:Array,
        default:[]
    },
    objectives:{
        type:Array,
        default:[]
    },
    rules:{
        type:Array,
        default:[]
    }, 
    chairPerson:{
        type:String,
        
     },
     intrestRateforLoans:{
         type:Number,
     },
     secretary:{
         type:String,
     },
     onGoingMerryGoRound:{
         type:String,
     },
     endedMerryGoRounds:{
         type:Array,
         default:[]
     },
     loans:{
         type:Array,
         default:[]
     }

      

} ,  { timestamps: true }, { collection: "groups" })

module.exports = mongoose.model("Group", GroupSchema)