const Router = require('koa-router');
const roomController = require('./room');
const checkUser = require('../../modules/users/handlers/checkUser');
const checkRoom = require('../../modules/rooms/handlers/checkRoom');

const router = new Router({ prefix: '/rooms' });

router.param('hash', checkRoom()).all('/:hash', checkUser(), roomController.saveWebSocket);


module.exports = router.routes();
