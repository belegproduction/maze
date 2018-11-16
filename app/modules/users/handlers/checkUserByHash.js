const { User } = require('../models');

module.exports = () => async (hash, ctx, next) => {
  const user = await User.findOne({ hash });
  
  if (!user) {
    ctx.throw(404, `User with hash "${hash}" no found`);
  }
  
  ctx.state.user = user;
  
  await next();
};