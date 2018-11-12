const config = require('config');
const dotenv = require('dotenv');
const envs = require('./constants/envs');
const { ENV } = require('./utils/env');

dotenv.config();

if (!envs[ENV]) {
  throw Error(`unknow env '${ENV}'`);
}

const PORT = process.env.PORT || config.get('port');
const MONGO_URI = process.env.MONGO_URI || config.get('mongo.uri');
const JWT_SECRET = config.get('jwt.secret');

if (!JWT_SECRET) {
  throw Error('You must pass jwt secret string');
}

module.exports = {
  PORT,
  MONGO_URI,
  JWT_SECRET,
};
