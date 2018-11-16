const Koa = require('koa');
const { connectorsInit } = require('./connectors');
const websockify = require('koa-websocket');
const serve = require('koa-static');
const initHandlers = require('./handlers');
const modules = require('./modules');
const websockets = require('./ws');
const AppError = require('./helpers/appError');

connectorsInit();
global.AppError = AppError;

const app = websockify(new Koa());

initHandlers(app, app.ws);
app.use(modules);
app.ws.use(websockets);

app.use(serve('./dist', { index: 'index.html' }));

module.exports = app;
