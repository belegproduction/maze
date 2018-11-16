const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

module.exports = {
  genToken(data) {
    return jwt.sign(data, JWT_SECRET);
  },
  verify(token) {
    return jwt.verify(token, JWT_SECRET);
  },
};
