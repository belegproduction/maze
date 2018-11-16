const User = require('../models');

module.exports = {
  async createUser(data) {
    try {
      return await User.create(data);
    } catch (e) {
      // console.error(e);
      throw new AppError({ status: 400, ...e });
    }
  },
  getUserWithPublicFields(params) {
    return User.findOne(params).select({ password: 0, createdAt: 0, updatedAt: 0, __v: 0 });
  },
};
