const mongoose = require("mongoose");

const WinnerSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    unique: true,
  },
  winCount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

WinnerSchema.method({});

WinnerSchema.statics = {
  async get(id) {
    const book = await this.findById(id).populate("owner").exec();
    if (!book) {
      throw new APIError("No such room exists!", httpStatus.NOT_FOUND);
    }
    return book;
  },

  list() {
    return this.find().populate("owner").exec();
  },

  listLazy({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("owner")
      .exec();
  },
};

module.exports = mongoose.model("Winner", WinnerSchema);
