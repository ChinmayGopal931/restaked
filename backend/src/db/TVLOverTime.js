const mongoose = require('mongoose');

const totalTVLOverTimeSchema = new mongoose.Schema({
  operator: {
    type: String,
    required: true
  },
  totalTVL: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const TotalTVLOverTime = mongoose.model('TotalTVLOverTime', totalTVLOverTimeSchema);

module.exports = TotalTVLOverTime;
