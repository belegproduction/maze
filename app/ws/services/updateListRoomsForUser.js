const { pushRooms } = require('../constants/actions');

module.exports = (rooms) => {
  global.clients.forEach((client) => {
    if (client.ws.readyState === client.ws.OPEN) {
      client.ws.send(pushRooms(rooms));
    }
  });
};
