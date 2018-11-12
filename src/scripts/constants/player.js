// const player = {
//   x: 0,
//   y: 0,
//   width: 10,
//   height: 10,
//   posX: 3,
//   posY: 3
// };

const player = {
  x: 0,
  y: 0,
  width: 40,
  height: 40,
  posX: 12,
  posY: 12,
};

export const pathFirst = {
  posX: player.posX + player.width / 2,
  posY: player.posY + player.height / 2,
};

export default player;
