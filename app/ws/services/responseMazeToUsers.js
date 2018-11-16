const { letsStart } = require('../constants/actions');

module.exports = (math, roomHash) => {
  global.clientsOfRoom[roomHash].forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(letsStart(math));
    }
  });
  delete global.clientsOfRoom[roomHash];
};
