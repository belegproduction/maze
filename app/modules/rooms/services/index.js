const Room = require('../models');
const pick = require('lodash/pick');

module.exports = {
  async createRoom(data) {
    const { userHash } = data;
    const roomCountByUserHash = await Room.count({ userHash });
    if (roomCountByUserHash > 0) {
      throw new AppError({ status: 400, message: 'User cannot to create more 1 a room' });
    }
    return Room.create(data);
  },
  async updateRoom(data, room) {
    room.set(data);
    try {
      return room.save();
    } catch (e) {
      throw new AppError({ status: 400, ...e });
    }
  },
  async getAll() {
    const rooms = await Room.find({}).limit(10);
    return rooms.map((room) => (
      pick(room, Room.createFields)
    ));
  },
  async getOne(hash) {
    const room = await Room.findOne({hash});
    return pick(room, Room.createFields);
  },
};
