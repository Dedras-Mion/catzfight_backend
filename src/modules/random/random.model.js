const { string } = require("joi");
const mongoose = require("mongoose");

const RandomSchema = new mongoose.Schema({
  roomNum: {
    type: Number,
    require: true
  },
  randomNumber1: {
    type: Number,
    require: false
  },
  randomNumber2: {
    type: Number,
    require: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

RandomSchema.method({});

RandomSchema.statics = {
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

module.exports = mongoose.model("Random", RandomSchema);
