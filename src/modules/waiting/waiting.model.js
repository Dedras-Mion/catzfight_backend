const mongoose = require("mongoose");

const WaitingSchema = new mongoose.Schema({
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

module.exports = mongoose.model("Waiting", WaitingSchema);
