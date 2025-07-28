const httpStatus = require('http-status');
const Betting = require('./betting.model');
const APIError = require('../../helpers/APIError');

function get(req, res) {
  const betting = Betting.find();
  return res.json(betting);
}

async function create(req, res, next) {
  const room = new Betting(req.body);
  try {
    const savedRoom = await room.save();

    req.io.to('fightRoom').emit('savedRoom', savedRoom);

    return res.json(savedRoom);
  } catch (error) {
    return next(error);
  }
}

async function update(req, res, next) {
  const room = req.body;
  try {
    const foundRoom = await Betting.findOne({ roomNum: room.roomNum }).exec();
    if (foundRoom.secondNFT) {
      return next(
        new APIError(httpStatus.BAD_REQUEST, 'Player already exists'),
      );
    }
    foundRoom.secondNFT = room.secondNFT;
    foundRoom.secondAddress = room.secondAddress;
    foundRoom.secondRandom = room.secondRandom;
    const savedRoom = await foundRoom.save();
    req.io.to('fightRoom').emit('savedRoom', savedRoom);
    return res.json(savedRoom);
  } catch (error) {
    return next(error);
  }
}

async function find(req, res, next) {
  const room = req.query;
  try {
    const foundRoom = await Betting.findOne({
      fightRoom: room.fightRoom,
    }).exec();
    return res.json(foundRoom);
  } catch (error) {
    return next(error);
  }
}

async function list(req, res, next) {
  try {
    const bettings = await Betting.list();
    return res.json(bettings);
  } catch (error) {
    return next(error);
  }
}

async function socketlist() {
  try {
    const bettings = await Betting.list();
    return bettings;
  } catch (error) {
    return error;
  }
}

async function remove(req, res, next) {
  const { roomNum } = req.params;
  try {
    const deletedRoom = await Betting.deleteOne({ roomNum });

    req.io.to('fightRoom').emit('savedRoom', { delRoomNum: roomNum });

    return res.json(deletedRoom);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  get,
  create,
  update,
  list,
  remove,
  find,
  socketlist,
};
