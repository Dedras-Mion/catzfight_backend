const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../../helpers/APIError');

const BettingSchema = new mongoose.Schema({
  roomNum: {
    type: Number,
    required: true,
    unique: true,
  },
  fightRoom: {
    type: Number,
    require: false,
  },
  firstAddress: {
    type: String,
    required: false,
  },
  secondAddress: {
    type: String,
    required: false,
  },
  firstNFT: {
    type: String,
    required: false,
  },
  secondNFT: {
    type: String,
    required: false,
  },
  tokenId: {
    type: Number,
    require: false,
  },
  secondId: {
    type: Number,
    require: false,
  },
  firstRandom: {
    type: Number,
    require: false,
  },
  secondRandom: {
    type: Number,
    require: false,
  },
  nftAddress: {
    type: String,
    require: true,
  },
  nftName: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

BettingSchema.method({});

BettingSchema.statics = {
  async get(id) {
    const book = await this.findById(id).populate('owner').exec();
    if (!book) {
      throw new APIError('No such room exists!', httpStatus.NOT_FOUND);
    }
    return book;
  },

  list() {
    return this.find()
      .populate('owner')
      .exec();
  },

  listLazy({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('owner')
      .exec();
  },
};

module.exports = mongoose.model('Betting', BettingSchema);
