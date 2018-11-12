const envs = require('../constants/envs');

const ENV = process.env.NODE_ENV || 'development';
const IS_DEV = ENV === envs.development;
const IS_PROD = ENV === envs.production;

module.exports = {
  ENV,
  IS_DEV,
  IS_PROD,
};
