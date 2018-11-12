
class Maze {
  constructor(selector, width, height) {
    // this.el = document.querySelector(selector);
    // this.canvas = Snap(this.el);
    // this.grid = this.createEmptyGrid(width, height);

    // this.width = width;
    // this.height = height;

    // this.setSize(width, height);

    // let canvasPosition = this.el.getBoundingClientRect();

    // this.canvasPositionX = canvasPosition.top;
    // this.canvasPositionY = canvasPosition.left;

    // this.create()
  }

  // create() {

  //   this.createGrid();

  //   this.draw(this.grid);

  //   this.createAppBorder();

  //   this.createExit();

  //   return this.grid;
  // }

  createEmptyGrid(width, height, scale, border) {
    const grid = {};
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        grid[`${i}.${j}`] = {
          x: j,
          y: i,
          posX: j * scale + border,
          posY: i * scale + border,
        };
      }
    }

    return grid;
  }

  createBorder(grid, width, height, border, scale, cell) {
    grid['top'] = {
      type: 'border',
      x: 0,
      y: 0,
      width: width * scale,
      height: border,
    };

    grid['left'] = {
      type: 'border',
      x: 0,
      y: 0,
      width: border,
      height: width * scale,
    };

    grid['right'] = {
      type: 'border',
      x: 0,
      y: height * scale,
      width: width * scale,
      height: border,
    };

    grid['bottom'] = {
      type: 'border',
      x: width * scale,
      y: 0,
      width: border,
      height: height * scale + border,
    };

    return grid;
  }

  createExit(grid, width, height, border, scale, cell) {
    grid[`${0}.${height}`] = {
      type: 'exit',
      x: scale * width,
      y: border,
      width: cell + cell/2,
      height: cell,
      posX: scale * width + border,
      posY: border,
    };

    return grid;
  }

  createGrid(width, height, border, scale, cell) {
    // Объявим массивы для хранения значения множества текущей ячейки, для значения стенки справа и для значения стенки снизу
    const a = Array(width);


    const b = Array(width);


    const k = Array(width);

    // Текущее множество

    let q = 1;


    let grid = this.createEmptyGrid(width, height, scale, border);

    for (let cr_l = 0; cr_l < height; cr_l++) {
      // Проверка принадлежности ячейки в строке к какому-либо множеству
      for (var i = 0; i < width; i++) {
        if (0 == cr_l) {
          a[i] = 0;
        }

        // Рисуем правою стенку
        if (i < width - 1) {
          grid[`${ cr_l }.${ i }`].border_right = {
            x: scale * (i + 1),
            y: scale * cr_l + border,
            width: border,
            height: scale,
          };
        }

        // Рисуем нижнею стенку
        if (cr_l < height - 1) {
          grid[`${ cr_l }.${ i }`].border_down = {
            x: scale * i,
            y: scale * (cr_l + 1),
            width: scale + border,
            height: border,
          };
        }

        k[i] = 0;
        if (1 == b[i]) {
          b[i] = a[i] = 0;
        }
        if (0 == a[i]) {
          a[i] = q++;
        }
      }

      // Удаление случайным образом стенок справа и снизу
      for (var i = 0; i < width; i++) {
        k[i] = Math.floor(2 * Math.random());
        b[i] = Math.floor(2 * Math.random());

        if ((0 == k[i] || cr_l == height - 1) &&
          i != width -1 && a[i + 1] != a[i]) {
          var l = a[i + 1];
          for (var j = 0; j < width; j++) {
            a[j] == l && (a[j] = a[i]);
          }

          grid[`${ cr_l }.${ i }`].border_right = false;
        }

        if (cr_l != height - 1 && 0 == b[i]) {
          grid[`${ cr_l }.${ i }`].border_down = false;
        }
      }

      // Проверка на замкнутые области.
      for (var i = 0; i < width; i++) {
        let p = l = 0;
        for (j = 0; j < width; j++) {
            a[i] == a[j] && 0 == b[j] ? p++ : l++;
        }
        if (0 == p) {
          grid[`${ cr_l }.${ i }`].border_down = false;

          b[i] = 0;
        }
      }
    }

    grid = this.createBorder(grid, width, height, border, scale, cell);

    grid = this.createExit(grid, width, height, border, scale, cell);

    return grid;
  }


  checkPosition(obj, grid, moveX, moveY) {
    const new_x = obj.x + moveX;

    const new_y = obj.y + moveY;

    let cell = grid[`${new_y}.${new_x}`];

    console.log('Параметры', cell, obj.x, obj.y, new_x, new_y );

    // такой ячейки нету
    if (!cell) {
      console.info('Такой ячейки нету');
      return false;
    }

    if (cell.type === 'exit') {
      return 'exit';
    }

    if (moveY == 1 || moveX == 1) {
      cell = grid[`${obj.y}.${obj.x}`];
    }

    // определяет направление
    // шаг вниз или верх
    if (moveY == 1 || moveY == -1) {
      return !cell.border_down;
    }
    // шаг вправо или влево
    else {
      return !cell.border_right;
    }
  }

  getCell(obj, grid, moveX, moveY) {
    const new_x = obj.x + moveX;


    const new_y = obj.y + moveY;

    return grid[`${new_y}.${new_x}`];
  }
}


const maze = new Maze();

export default maze;
