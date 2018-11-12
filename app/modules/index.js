const Router = require('koa-router');
const multiplayer = require('./multiplayer');

const router = new Router({ prefix: '/api' });

router.use(multiplayer);

module.exports = router.routes();
