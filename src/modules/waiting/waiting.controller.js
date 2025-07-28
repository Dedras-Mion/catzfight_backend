const Waiting = require('./waiting.model');

async function list(req, res, next) {
  try {
    const randoms = await Waiting.find();

    return res.json(randoms);
  } catch (error) {
    return next(error);
  }
}

function get(req, res) {
  const waitings = Waiting.find();
  return res.json(waitings);
}

async function create(req, res, next) {
  const waiting = new Waiting(req.body);
  try {
    const savedWaiting = await waiting.save();

    return res.json(savedWaiting);
  } catch (error) {
    return next(error);
  }
}

async function remove(req, res, next) {
  const address = req.params.address;
  try {
    const deletedRoom = await Waiting.deleteOne({ address: address });

    return res.json(deletedRoom);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  get,
  create,
  list,
  remove,
};
