const mongoose = require("mongoose");

const WelfareSchema = new mongoose.Schema(
  {
    groupId: {
      type: String,
      required: true,
    },
    amountRequested: {
      type: Number,
      required: true,
    },
    Beneficiary: {
      type: String,
      },
    purpose: {
      type: Number,
    },
   
    

   
    
  },
  { timestamps: true },
  { collection: "loans" }
);

module.exports = mongoose.model("Welfare", WelfareSchema);
