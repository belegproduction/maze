const RoomServices = require('../../modules/rooms/services');
const updateRoomWithUsers = require('../services/updateRoomForUsers');

module.exports = () => async (ctx, next) => {
  const { hash } = ctx.state.room;
  if (Array.isArray(global.clientsOfRoom[hash]) && global.clientsOfRoom[hash].length) {
    const room = await RoomServices.getOne(hash);
    updateRoomWithUsers(room, hash);
  }
  await next();
};
