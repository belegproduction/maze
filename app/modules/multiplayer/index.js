const Router = require('koa-router');
const multiplayerController = require('./controllers/multiplayer-controller.js');

const router = new Router();

router.all('/game', multiplayerController.handler);


module.exports = router.routes();
