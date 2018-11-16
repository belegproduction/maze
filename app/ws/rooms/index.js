const Router = require('koa-router');
const roomsController = require('./rooms');
const checkUser = require('../../modules/users/handlers/checkUser');

const router = new Router({ prefix: '/list' });

router.get('/rooms', checkUser(), roomsController.saveWebSocket);

module.exports = router.routes();
