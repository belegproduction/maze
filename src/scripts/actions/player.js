import Obj from './obj';
import setting from '../constants/index';

class Player extends Obj {
  create(options) {
    return super.create(options);
  }

  move(obj, grid, moveX, moveY) {
    return super.move(obj, grid, moveX, moveY);
  }

  createDistance(cell, width, height) {
    const distance = {
      posX: cell.posX + width / 2,
      posY: cell.posY + height / 2,
    };
    return distance;
  }
}

export default new Player();
