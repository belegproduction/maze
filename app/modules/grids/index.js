const Router = require('koa-router');
const RoomsController = require('./controllers/grids-controllers');
const checkUser = require('../../handlers/checkUser');
const checkGrid = require('./handlers/checkGrid');

const router = new Router({ prefix: '/grids' });

router
    .post('/', checkUser(), RoomsController.create)
    .param('hash', checkGrid())
    .put('/:hash', checkUser(), RoomsController.update)
    .delete('/:hash', checkUser(), RoomsController.destroy)
    .get('/:hash', RoomsController.get);


module.exports = router.routes();
