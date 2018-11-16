// const jwt = require('jsonwebtoken');
const pick = require('lodash/pick');
const User = require('../models');
const jwtService = require('../../../services/jwr-service');
const { UserService } = require('../services');


module.exports = {
  async signUp(ctx) {
    const userData = pick(ctx.request.body, User.createFields);
    const {_id} = await UserService.createUser(userData);
    const user = await UserService.getUserWithPublicFields({_id});
    const token = await jwtService.genToken({ nickname: user.nickname });
    ctx.status = 201;
    ctx.body = {
      hash: user.hash,
      nickname: user.nickname,
      token,
      success: true,
    };
  },
  async signIn(ctx) {
    const { nickname, password } = ctx.request.body;
    if (!nickname || !password) {
      ctx.throw(400, {message: 'Invalid data'});
    }
    const user = await User.findOne({ nickname });
    if (!user) {
      ctx.throw(400, {message: 'User not found'});
    }
    if (!user.comparePasswords(password)) {
      ctx.throw(400, {message: 'Invalid data'});
    }
    const token = await jwtService.genToken({ nickname });
    ctx.body = {
      hash: user.hash,
      nickname: user.nickname,
      token,
      success: true,
    };
  },
  async getCurrentUser(ctx) {
    const { state: { user: { _id }} } = ctx;
    const user = await UserService.getUserWithPublicFields({ _id });
    ctx.body = {
      hash: user.hash,
      nickname: user.nickname,
      success: true,
    };
  },
}
