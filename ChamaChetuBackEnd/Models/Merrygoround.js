const mongoose = require("mongoose");

const merrygoroundSchema = new mongoose.Schema(
  {
    groupId: {
      type: String,
      required: true,
    },
    useId: {
      type: String,
      required: true,
    },
    contributionAmount: {
      type: Number,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    membersToPay: {
      type: Array,
    },
    interval: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
  { collection: "merrygorounds" }
);

module.exports = mongoose.Schema("MerryGoRound", merrygoroundSchema);
