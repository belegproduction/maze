const RoomServices = require('../../modules/rooms/services');
const updateListRoomsForUser = require('../services/updateListRoomsForUser');

module.exports = () => async (ctx, next) => {
  if (global.clients.some((client) => (client.ws.readyState === client.ws.OPEN))) {
    const rooms = await RoomServices.getAll();
    updateListRoomsForUser(rooms);
  }
  await next();
};
