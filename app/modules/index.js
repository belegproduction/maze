const Router = require('koa-router');
const { routerUser } = require('./users');
const routeRooms = require('./rooms');
const routeGrids = require('./grids');

const router = new Router({ prefix: '/api' });

router.use(routerUser);
router.use(routeRooms);
router.use(routeGrids);

module.exports = router.routes();
