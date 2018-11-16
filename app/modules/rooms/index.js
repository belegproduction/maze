const Router = require('koa-router');
const RoomsController = require('./controllers/rooms-controller');
const checkUser = require('../../handlers/checkUser');
const checkRoom = require('./handlers/checkRoom');
const shareRoomsWithUsers = require('../../ws/handlers/shareRoomsWithUsers');
const updateRoomWIthUsers = require('../../ws/handlers/updateRoomWIthUsers');

const router = new Router({ prefix: '/rooms' });

router
    .post('/', checkUser(), RoomsController.create, shareRoomsWithUsers())
    .get('/', RoomsController.getAll)
    .param('hash', checkRoom())
    .put('/:hash', checkUser(), RoomsController.update, shareRoomsWithUsers(), updateRoomWIthUsers())
    .delete('/:hash', checkUser(), RoomsController.destroy, shareRoomsWithUsers())
    .get('/:hash', RoomsController.get);


module.exports = router.routes();
