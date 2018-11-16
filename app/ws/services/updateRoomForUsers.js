const { pushRoom } = require('../constants/actions');

module.exports = (room, roomHash) => {
  global.clientsOfRoom[roomHash].forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(pushRoom(room));
    }
  });
};
