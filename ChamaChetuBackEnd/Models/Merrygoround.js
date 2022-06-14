const mongoose = require("mongoose");

const MerrygoroundSchema = new mongoose.Schema(
  {
    groupId: {
      type: String,
      required: true,
    },
     members:{
      type:Array,
    },
    contributionAmountPerMember: {
      type: Number,
      required: true,
    },
    isFinished:{
      type:Boolean,
      default:false
    },
    isStarted:{
      type:Boolean,
      default:false,

    },
    interval: {
      type:String,
      enum:['daily','weekly','monthly'],
      required:true
    },
    isOngoing:{
      type:Boolean,
      default:false,

    },
    currentBeneficiary:{
type:String,
    },
    startDate:{
      type:Date,
        },
    dueDate: {
      type: Date,
     
    },
  },
  { timestamps: true },
  { collection: "merrygorounds" }
);

module.exports = mongoose.model("MerryGoRound", MerrygoroundSchema);
