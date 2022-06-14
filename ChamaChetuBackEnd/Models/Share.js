const mongoose = require("mongoose")

const ShareSchema = new mongoose.Schema({
    groupId:{
        type:String,
    },
    TotalAmountContributed:{
        type:Number,
        default:0,
    },
    description:{
        type:String

    },
    rulesRegardingShares:{
        type:Array,
        default:0
    } , 
    membersWhoHaveWithAmountContributed:[
        {
        userid:{
            type:String,
        },
        phone:{
            type:String
        },
        dayOfContribution:{
            type:Date
        },
        amount:{
            type:Number,
        },
        transactionId:{
            type:String,
        }
        
        }],
    

},  { timestamps: true }, { collection: "shares" })

module.exports = mongoose.model("Share", ShareSchema)