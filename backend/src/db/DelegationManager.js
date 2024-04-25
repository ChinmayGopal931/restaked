const mongoose = require("mongoose");

const DelegationManagerSchema = new mongoose.Schema(
  {
    event: {
      type: String,
      required: true,
    },
    operator: {
      type: String,
      required: true,
    },
    staker: {
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
    block: {
      type: Number,
      required: true,
    },
    timestamp: {
      type: Number,
      required: true,
    },
    metadataURI: {
      type: String,
      required: false,
    },
    avsOptIns: {
      type: Array,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const DelegationManager = mongoose.model(
  "DelegationManager",
  DelegationManagerSchema
);

module.exports = DelegationManager;
