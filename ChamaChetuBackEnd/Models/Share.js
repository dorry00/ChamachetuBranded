const mongoose = require("mongoose")

const ShareSchema = new mongoose.Schema({
    groupId:{
        type:String,
    },
    amountContributed:{
        type:Number,
        default:0,
    },
    membersWhoHaveContributed:{
        type:Array,
        required:true,
    },
    

} ,  { timestamps: true }, { collection: "shares" })

module.exports = mongoose.model("Share", ShareSchema)