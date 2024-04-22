const mongoose = require("mongoose");

const OperatorManagerSchema = new mongoose.Schema(
  {
    operator: {
      type: String,
      required: true,
    },
    uniqueStakers: {
      type: String,
      required: false,
    },
    strategy: {
      type: String,
      required: false,
    },
    shares: {
      type: Number,
      required: false,
    },
    metadataURI: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const OperatorManager = mongoose.model(
  "DelegationManager",
  OperatorManagerSchema
);

module.exports = OperatorManager;
