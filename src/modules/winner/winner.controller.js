const Result = require('./winner.model');

async function list(req, res, next) {
  try {
    const results = await Result.find().limit(10).sort({ wincount: -1, address: 1 });
    
    let rankedResults = [];
    let currentRank = 1;
    let previousWincount = null;
    
    results.forEach((result, index) => {
      if (result.winCount !== previousWincount) {
        currentRank = index + 1;
      }
      
      rankedResults.push({
        rank: currentRank,
        address: result.address,
        winCount: result.winCount
      });
      
      previousWincount = result.winCount;
    });
    
    return res.json(rankedResults);
  } catch (error) {
    return next(error);
  }
}

function get(req, res) {
  const result = Result.find();
  return res.json(result);
}

async function create(req, res, next) {
  const result = new Result(req.body);
  try {
    const savedResult = await result.save();

    req.io.to("fightRoom").emit("savedWinner", savedResult);

    return res.json(savedResult);
  } catch (error) {
    return next(error);
  }
}

async function update(req, res, next) {
  const winner = req.body;
  try {
    const foundWinner = await Result.findOne({ address : winner.address }).exec();
    foundWinner.winCount = winner.winCount;
    const savedWinner = await foundWinner.save();

    req.io.to("fightRoom").emit("savedWinner", savedWinner);

    return res.json(savedWinner);
  } catch (error) {
    return next(error);
  }
}

async function findOne(req, res, next) {
  const winner = req.query;
  try {
    const foundWinner = await Result.findOne({ address : winner.address }).exec();
    return res.json(foundWinner);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  get,
  findOne,
  create,
  update,
  list,
};
