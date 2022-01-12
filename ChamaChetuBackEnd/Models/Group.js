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
     treasurer:{
         type:String,
        },
     secretary:{
         type:String,
     }

      

} ,  { timestamps: true }, { collection: "groups" })

module.exports = mongoose.model("Group", GroupSchema)