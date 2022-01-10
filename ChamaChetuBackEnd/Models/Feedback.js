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
    
   

} ,  { timestamps: true }, { collection: "feedback" })

module.exports = mongoose.Schema("Feedback",FeedbackSchema)