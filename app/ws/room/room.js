const getOutFromRoom = require('../handlers/getOutFromRoom');
const letsStartGame = require('../handlers/letsStartGame');
global.clientsOfRoom = {};

module.exports = {
  async saveWebSocket(ctx, next) {
    const roomHash = ctx.state.room.hash;
    const userHash = ctx.state.user.hash;
    if (global.clientsOfRoom[roomHash]) {
      global.clientsOfRoom[roomHash].push(ctx.websocket);
    } else {
      global.clientsOfRoom[roomHash] = [ctx.websocket];
    }
    ctx.websocket.on('close', () => {
      if (Array.isArray(global.clientsOfRoom[roomHash])) {
        global.clientsOfRoom[roomHash] = global.clientsOfRoom[roomHash].filter((client) => (client.readyState === client.OPEN));
        getOutFromRoom(roomHash, userHash);
      }
    });
    ctx.websocket.on('message', (json) => {
      const request = JSON.parse(json);
      if (request.type === 'LETS_START') {
        letsStartGame(roomHash);
      }
    });
  },
};
