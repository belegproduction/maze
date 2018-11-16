const bodyparser = require('koa-bodyparser');
// const logger = require('koa-logger');
const error = require('./error');
const jwt = require('./jwt');
const { IS_DEV } = require('../utils/env');

module.exports = (app, appWs) => {
  // if (IS_DEV) {
  //   app.use(logger());
  //   appWs.use(logger());
  // }

  app.use(error());
  app.use(bodyparser());
  app.use(jwt());
  appWs.use(jwt());
};
