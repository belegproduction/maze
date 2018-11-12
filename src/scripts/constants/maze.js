// const maze = {
//   el: "#maze",
//   width: 10,
//   height: 10,
//   scale: 13,
//   border: 3,
//   cell: 10
// };

const maze = {
  el: '#maze',
  cellWidth: 40,
  cellHeight: 40,
  scale: 52,
  borderWidth: 12,
  cellCount: 40,
};

maze.width = maze.scale * maze.cellWidth + maze.borderWidth;
maze.height = maze.scale * maze.cellHeight + maze.borderWidth;

export default maze;
