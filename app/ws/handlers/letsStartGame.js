const pick = require('lodash/pick');
const uuid = require('uuid/v4');
const Room = require('../../modules/rooms/models');
const Grids = require('../../modules/grids/models');
const responseMazeToUser = require('../services/responseMazeToUsers');

module.exports = async (roomHash) => {
  const room = await Room.findOne({ hash: roomHash });
  const grid = await Grids.findOne({ hash: room.gridHash });
  const mazeHash = uuid();
  const users = room.users;
  responseMazeToUser({
    grid: pick(grid, Grids.createFields).content,
    mazeHash,
    enemies: users,
  }, roomHash);
  room.remove();
};
