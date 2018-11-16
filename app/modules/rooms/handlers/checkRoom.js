const Room = require('../models');

module.exports = () => async (hash, ctx, next) => {
  const room = await Room.findOne({ hash });
  if (!room) {
    ctx.throw(404, `Room with id "${hash}" not found`);
  }
  ctx.state.room = room;
  await next();
};
