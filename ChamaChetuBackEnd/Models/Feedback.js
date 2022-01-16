const mongoose = require("mongoose")

const FeedbackSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },    
    email:{
        type:String,
        required:true,
        
    },
    message:{
        type:String,
        required:true
        },
    subject:{
        type:String,
        default:false
    },
    isDeleted:{
    type:Boolean,
    default:false
    },
     deletedAt:{
    type:Date
}
   

} ,  { timestamps: true })

module.exports = mongoose.model("Feedback",FeedbackSchema)