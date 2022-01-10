const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema(
  {
    groupId: {
      type: String,
      required: true,
    },
    propertyName: {
      type: String,
      required: true,
    },
    propertyGoal: {
      type: String,
    },
    description: {
      type: String,
    },
    propertyBuyingPrice: {
      type: Number,
    },
    propertySellingPrice: {
      type: Number,
    },
    propertyProfit: {
      type: Number,
    },
    propertyBuyingDate: {
      type: Date,
    },
  },
  { timestamps: true },
  { collection: "properties" }
);

module.exports = mongoose.Schema("Property", PropertySchema);
