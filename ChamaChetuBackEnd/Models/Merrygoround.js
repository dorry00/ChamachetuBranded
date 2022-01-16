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
      type: String,
      required: true,
    },
    startDate:{
      type:Date,
      required:true
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
  { collection: "merrygorounds" }
);

module.exports = mongoose.Schema("MerryGoRound", MerrygoroundSchema);
