const mongoose = require("mongoose");

const OperatorSchema = new mongoose.Schema(
  {
    operatorName: { type: String, required: true },
    operatorAddress: { type: String, required: true },
    operatorWebsite: { type: String },
    operatorTwitter: { type: String },
    operatorLogo: { type: String },
    operatorDescription: { type: String },
    uniqueStrategies: [{ type: String }],
    uniqueStakers: { type: Number, default: 0 },
    totalTVL: { type: Number, required: true },
    avsOptIns: { type: Array, required: true, default: [] },
    averageStakingTime: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const OperatorProfile = mongoose.model("Operator", OperatorSchema);

module.exports = OperatorProfile;
