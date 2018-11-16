const Router = require('koa-router');
const multiplayerController = require('./controllers/multiplayer-controller.js');
const checkUser = require('../../modules/users/handlers/checkUser');

const router = new Router({prefix: '/game'});

router.param('hash', async (hash, ctx, next) => {
  ctx.state.mazeHash = hash;
  await next();
}).all('/:hash', checkUser(), multiplayerController.handler);

module.exports = router.routes();
