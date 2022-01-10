const mongoose = require("mongoose")

const meetingSchema = new mongoose.Schema({
    location:{
        type:String,
        required:true,
    },    
    groupId:{
        type:String,
        required:true,
        default:[]
    },
    type:{
        type:String,
        required
          },

    location:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        required:true,
    },
    agenda:{
        type:Array,
        default:[]        
    },
    members:{
        type:Array,
    }
   

} ,  { timestamps: true }, { collection: "meetings" })

module.exports = mongoose.Schema("Meeting", meetingSchema)