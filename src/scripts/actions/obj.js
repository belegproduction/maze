export default class Obj {
  create(options) {
    const obj = {};
    obj.x = options.x;
    obj.y = options.y;
    obj.width = options.width;
    obj.height = options.height;
    obj.posX = options.posX;
    obj.posY = options.posY;
    obj.id = Date.now();
    return obj;
  }

  move(obj, cell, moveX, moveY) {
    const new_x = obj.x + moveX;
    const new_y = obj.y + moveY;

    return {
      x: new_x,
      y: new_y,
      posX: cell.posX,
      posY: cell.posY,
    };
  }
}
