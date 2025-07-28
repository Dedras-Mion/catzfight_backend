const Random = require('./random.model');

async function list(req, res, next) {
  try {
    const randoms = await Random.find().limit(10).sort({ createdAt: -1 });

    return res.json(randoms);
  } catch (error) {
    return next(error);
  }
}

function get(req, res) {
  const random = Random.find();
  return res.json(random);
}

async function create(req, res, next) {
  const random = new Random(req.body);
  try {
    const savedRandom = await random.save();

    req.io.to("fightRoom").emit("savedRandom", savedRandom);

    return res.json(savedRandom);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  get,
  create,
  list,
};
