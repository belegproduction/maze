const Router = require('koa-router');
const User = require('./models');
const UsersController = require('./controllers/user-controller.js');
const checkUser = require('../../helpers/checkUser');

const router = new Router({ prefix: '/users' });

router
    .post('/signup', UsersController.signUp)
    .post('/signin', UsersController.signIn)
    .get('/current', checkUser(), UsersController.getCurrentUser);


module.exports = {
  User,
  routerUser: router.routes(),
};
