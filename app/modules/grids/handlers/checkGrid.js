const Grid = require('../models');

module.exports = () => async (hash, ctx, next) => {
  const grid = await Grid.findOne({ hash });
  if (!grid) {
    ctx.throw(404, `Grid with id "${hash}" not found`);
  }
  ctx.state.grid = grid;
  await next();
};
