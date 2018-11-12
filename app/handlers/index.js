// const bodyparser = require('koa-bodyparser');
const error = require('./error');
// const jwt = require('./jwt');
const { IS_DEV } = require('../utils/env');

module.exports = (app) => {
  if (IS_DEV) {
    const logger = require('koa-logger');
    app.use(logger());
  }

  app.use(error());
  // app.use(bodyparser());
  // app.use(jwt());
};
