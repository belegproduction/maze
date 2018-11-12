import { createAction } from 'redux-actions';
import Maze from './maze';
import Player from './player';
import setting from '../constants/index';


export const saveGridAction = createAction('CREATE_GRID', (grid) => ({
  grid,
}));

export const updateEnemiesAction = createAction('UPDATE_ENEMIES', (enemies) => ({
  enemies,
}));

export const createGridAction = ((ws) => {
  return async (distpatch) => {
    const grid = Maze.createGrid(
      setting.maze.cellWidth,
      setting.maze.cellHeight,
      setting.maze.borderWidth,
      setting.maze.scale,
      setting.maze.cellCount
    );
  
    ws.send(JSON.stringify({
      type: 'CREATE_GRID',
      value: {
        grid
      }
    }));
  
    distpatch(saveGridAction(grid));
  }
});

export const createPlayerAction = createAction('CREATE_PLAYER', (ws) => {
  const player = Player.create({
    x: setting.player.x,
    y: setting.player.y,
    width: setting.player.width,
    height: setting.player.height,
    posX: setting.player.posX,
    posY: setting.player.posY,
  });
  ws.send(JSON.stringify({
    type: 'CREATE_PLAYER',
    value: {
      player,
    },
  }));
  return {
    player,
  };
});


export const checkPosition = (obj, grid, moveX, moveY) => {
  return Maze.checkPosition(obj, grid, moveX, moveY);
};

export const movePlayer = createAction('GO_PLAYER', (obj, grid, moveX, moveY, ws) => {
  const cell = Maze.getCell(obj, grid, moveX, moveY);
  ws.send(JSON.stringify({
    type: 'GO_PLAYER',
    value: {
      player: {
        id: obj.id,
        ...cell,
      },
    },
  }));
  return {
    data: Player.move(obj, cell, moveX, moveY),
  };
});

export const putDistanceTraveledAction = createAction('PUT_DISTANCE_TRAVELED', (obj, grid, moveX, moveY) => {
  const cell = Maze.getCell(obj, grid, moveX, moveY);
  return {
    pathPart: Player.createDistance(cell, obj.width, obj.height),
  };
});
