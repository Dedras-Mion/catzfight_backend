const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({
  randomNumber1: {
    type: Number,
    required: true,
  },
  randomNumber2: {
    type: Number,
    required: true,
  },
  nftUrl1: {
    type: String,
    required: true,
  },
  nftUrl2: {
    type: String,
    required: true,
  },
  address1: {
    type: String,
    required: true,
  },
  address2: {
    type: String,
    required: true,
  },
  roomNum: {
    type: Number,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Result", ResultSchema);
