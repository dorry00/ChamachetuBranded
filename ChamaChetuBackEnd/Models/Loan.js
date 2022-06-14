const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema(
  {
    groupId: {
      type: String,
      required: true,
    },
    amountRequested: {
      type: Number,
      required: true,
    },
    guarantors: {
      type: Array,
      default: [],
    },
    intrestRate: {
      type: Number,
    },
    phone: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    borrowDate: {
      type: Date,
      required: true,
    },

    dueDate: {
      type: Date,
      required: true,
    },
    loanGoal: {
      type: Date,
      required: true,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    loanRepaymentStatus:{
        type:Boolean,
        enum:['paid','pending','overdue']

    },
    loanPenalty:{
        type:Number,
        default:0
    }
  },
  { timestamps: true },
  { collection: "loans" }
);

module.exports = mongoose.Schema("Loan", loanSchema);
