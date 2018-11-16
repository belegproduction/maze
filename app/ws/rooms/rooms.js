const RoomServices = require('../../modules/rooms/services');
const { pushRooms } = require('../constants/actions');

global.clients = [];

module.exports = {
  async saveWebSocket(ctx) {
    global.clients.push({ ws: ctx.websocket, user: ctx.state.user });
    const rooms = await RoomServices.getAll();
    ctx.websocket.send(pushRooms(rooms));
    ctx.websocket.on('close', () => {
      global.clients  = global.clients.filter((client) => (client.ws.readyState === client.ws.OPEN));
      console.log('close', global.clients.length, ctx.state.user.nickname);
    });
  }
};
