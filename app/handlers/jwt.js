const jwtService = require('../services/jwr-service');
const { User } = require('../modules/users');

module.exports = () => async (ctx, next) => {
  let authorization;
  if (ctx.websocket) {
    authorization = ctx.websocket.protocol;
  } else {
    authorization = ctx.headers.authorization;
  }
  if (authorization) {
    try {
      const { nickname } = await jwtService.verify(authorization);
      ctx.state.user = await User.findOne({ nickname });
    } catch (e) {
      console.error(e);
      ctx.throw(401, { message: 'Unauthorized. Invalid Token' });
    }
  }
  await next();
};
