const mongoose = require("mongoose")

const meetingSchema = new mongoose.Schema({
    groupId:{
        type:String,
        required:true,
    },   
    amount:{
        type:Number,
        required:true,
    }, 
    guarantorss:{
        type:Array,
        default:[],
    }, 
    intrest:{
        type:Number
    },
    userId:{
        type:String,
        required:true,
           },
    borrowDate:{
        type:Date,
        required:true
          },

    dueDate:{
        type:Date,
        required:true,
    },
    loanGoal:{
        type:Date,
        required:true,
    },
    approved:{
        type:Boolean,
        default:false        
    },
    
   

} ,  { timestamps: true }, { collection: "meetings" })

module.exports = mongoose.Schema("Meeting", meetingSchema)