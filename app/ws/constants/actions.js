
const pushRooms = (rooms) => (JSON.stringify({
  type: 'ALL_ROOMS',
  value: rooms,
}));

const pushRoom = (room) => (JSON.stringify({
  type: 'UPDATE_ROOM',
  value: room,
}));

const letsStart = (math) => (JSON.stringify({
  type: 'STARTING',
  value: math,
}));

module.exports = {
  pushRooms,
  pushRoom,
  letsStart,
};
