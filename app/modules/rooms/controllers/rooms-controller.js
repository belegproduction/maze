const bcrypt = require('bcrypt');
const pick = require('lodash/pick');
const Room = require('../models');
const RoomServices = require('../services');
const unionBy = require('lodash/unionBy');


module.exports = {
  async create(ctx, next) {
    if (!ctx.state.user) {
      ctx.throw(401, { message: 'Unauthorized. Invalid Token' });
    }
    const roomData = {
      ...pick(ctx.request.body, Room.createFields),
      userHash: ctx.state.user.hash,
      users: [{
        hash: ctx.state.user.hash,
        nickname: ctx.state.user.nickname,
        ready: false,
      }],
    };
    const { _id } = await RoomServices.createRoom(roomData);
    const room = await Room.findOne({ _id });
    ctx.status = 201;
    ctx.body = {
      room: pick(room, Room.createFields),
      success: true,
    };
    await next();
  },
  async get(ctx) {
    const { state: { room } } = ctx;
    ctx.body = {
      room: pick(room, Room.createFields),
      success: true,
    };
  },
  async update(ctx, next) {
    const {
      request: {
        body,
      },
      state: {
        room,
      },
    } = ctx;
    const newData = pick(body, Room.createFields);
    if (newData.users) {
      newData.users = unionBy([...newData.users, ...room.users], 'hash');
    }
    const updateRoom = await RoomServices.updateRoom(newData, room);
    ctx.state.room = pick(updateRoom, Room.createFields);
    ctx.body = {
      success: true,
      room: ctx.state.room,
    };
    await next();
  },
  async destroy(ctx, next) {
    const {
      state: {
        user: {
          hash,
        },
        room,
      },
    } = ctx;
    if (room.userHash !== hash) {
      ctx.throw(403, `Forbidden. Room with hash "${room.userHash}" dont belong user with hash "${hash}"`);
    }
    await room.remove();
    ctx.body = {
      hash: room.hash,
      success: true,
    };
    await next();
  },
  async getAll(ctx) {
    const rooms = await RoomServices.getAll();
    ctx.body = {
      rooms,
      success: true,
    };
  },
};
