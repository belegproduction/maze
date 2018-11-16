const Router = require('koa-router');
const routerRooms = require('./rooms');
const routerRoom = require('./room');
const routerMultiplayer = require('./multiplayer');

const router = new Router({ prefix: '/ws' });

router.use(routerRoom);
router.use(routerRooms);
router.use(routerMultiplayer);

module.exports = router.routes();
