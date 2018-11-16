const bcrypt = require('bcrypt');
const pick = require('lodash/pick');
const Grid = require('../models');
const GridServices = require('../services');


module.exports = {
  async create(ctx, next) {
    if (!ctx.state.user) {
      ctx.throw(401, { message: 'Unauthorized. Invalid Token' });
    }
    const gridData = pick(ctx.request.body, Grid.createFields);
    const { _id } = await GridServices.createGrid(gridData);
    const grid = await Grid.findOne({ _id });
    ctx.status = 201;
    ctx.body = {
      grid: pick(grid, Grid.createFields),
      success: true,
    };
  },
  async get(hash, ctx) {
    const { state: { grid } } = ctx;
    ctx.body = {
      grid: pick(grid, Grid.createFields),
      success: true,
    };
  },
  async update(ctx) {
    const {
      request: {
        body,
      },
      state: {
        grid,
      },
    } = ctx;
    const newData = pick(body, Grid.createFields);
    const updateGrid = await GridServices.updateGrid(newData, grid);
    ctx.body = {
      grid: updateGrid,
      success: true,
    };
  },
  async destroy(ctx) {
    const {
      state: {
        user,
        grid,
      },
    } = ctx;
    if (user) {
      ctx.throw(401, { message: 'Unauthorized. Invalid Token' });
    }
    await grid.remove();
    ctx.body = {
      hash: grid.hash,
      success: true,
    };
  },
};
