const Grid = require('../models');

module.exports = {
  async createGrid(data) {
    return Grid.create(data);
  },
  async updateGrid(data, grid) {
    grid.set(data);
    try {
      return grid.save();
    } catch (e) {
      throw new AppError({ status: 400, ...e });
    }
  },
};
