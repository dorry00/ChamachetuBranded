const mongoose = require("mongoose")

const contributionSchema = new mongoose.Schema({
    groupId:{
        type:String,
        required:true,
    },
    userId:{
        type:String,
        required:true,
    },
    peopleToContribute:{
        type:Array,
        required:true,
    },
    amountToBeContributed:{
        type:Number,
        required:true,
        },
    amountFromEachMember:{
        type:Number,
        required:true,
    }, 
    peopleWhoHaveContributed:{
        type:Array,
        required:true,
    },
    amountContributed:{
        type:Number,

    },
    amountRemainingToBeContributed:{
        type:Number,
    }
   

} ,  { timestamps: true }, { collection: "contributions" })

module.exports = mongoose.Schema("Contribution", contributionSchema)