const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    transaction_id: {
      type: String,
    },
    groupId: {
      type: String,
    },
    MerchantRequestID: {
      type: String,
    },
    CheckOutRequestID: {
      type: String,
    },
    amount: {
      type: String,
    },
    timestamp: {
      type: Date,
    },
    userId: {
      type: String,
    },
    payment_method: {
      type: String,
      default: "m-pesa",
    },
    phone: {
      type: String,
    },
  },
  { timestamps: true },
  { collection: "payments" }
);

module.exports = mongoose.model("Payment", paymentSchema);
