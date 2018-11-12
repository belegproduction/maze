const app = require('./app');
const { PORT } = require('./config');
const { ENV, IS_DEV } = require('./utils/env');


const server = app.listen(PORT, (error) => {
  if (error) {
    console.error(error);
  }

  console.log(ENV, IS_DEV);
  console.log('Server run!');
});

module.exports = server;
