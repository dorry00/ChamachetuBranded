const mongoose = require("mongoose")

const GroupSchema = new mongoose.Schema({
    groupname:{
        type:String,
        required:true,
        unique:true
    },    
    members:{
        type:Array,
        required:true,
    },
    objectives:{
        type:Array,
        default:[]
    },
    description:{
        type:String,
        required:true,
    },
    logo:{
        type:String,        
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