const RoomServices = require('../../modules/rooms/services');
const updateRoomWithUsers = require('../services/updateRoomForUsers');
const updateListRoomsForUser = require('../services/updateListRoomsForUser');
const pick = require('lodash/pick');
const Room = require('../../modules/rooms/models');

module.exports = async (roomHash, userHash) => {
  const room = await Room.findOne({ hash: roomHash });
  if (room.userHash === userHash) {
    await room.remove();
    updateRoomWithUsers(null, roomHash);
  } else {
    const updateRoom = await RoomServices.updateRoom({
      users: room.users.filter((user) => (user.hash !== userHash)),
    }, room);
    updateRoomWithUsers(pick(updateRoom, Room.createFields), roomHash);
  }
  const rooms = await RoomServices.getAll();
  updateListRoomsForUser(rooms);
};
