const mongoose = require("mongoose");

const UserWalletSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    balance: {
      type: String,
      default: 0,
    },
    transaction_history: {
      type: Array,
    },
    groups: [
      {
        groupId: {
          type: String,
        },
        groupbalance: {
          type: String,
          default: 0,
        },
      },
    ],
  },
  { timestamps: true },
  { collection: "userwallets" }
);

module.exports = mongoose.model("UserWallet", UserWalletSchema);
