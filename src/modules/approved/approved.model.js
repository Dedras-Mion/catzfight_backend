const mongoose = require("mongoose");

const ApproveSchema = new mongoose.Schema({
  address: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  symbol: {
    type: String,
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ApproveSchema.method({});

module.exports = mongoose.model("Approve", ApproveSchema);
