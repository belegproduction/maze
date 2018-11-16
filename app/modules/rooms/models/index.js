const mongoose = require('mongoose');
const uuid = require('uuid/v4');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  title: {
    type: String,
    required: 'Name is required',
    trim: true,
  },
  hash: {
    type: String,
    unique: 'Hash must be unique',
  },
  userHash: {
    type: String,
    required: 'User hash is required',
  },
  gridHash: {
    type: String,
    trim: true,
    required: 'GridHash is required',
  },
  gridSize: {
    type: String,
    trim: true,
    required: 'gridSize is required',
  },
  users: [
    {
      hash: {
        type: String,
        trim: true,
        required: 'Users hash is required',
      },
      nickname: {
        type: String,
        trim: true,
        required: 'Users nickname is required',
      },
      color: {
        type: String,
        trim: true,
      },
      ready: {
        type: Boolean,
        trim: true,
      },
    },
  ],
}, {
  timestamps: true,
});

RoomSchema.pre('save', function(next) {
  if (!this.hash) {
    this.hash = uuid();
  }
  next();
});

RoomSchema.statics.createFields = ['title', 'hash', 'gridSize', 'gridHash', 'userHash', 'users'];

module.exports = mongoose.model('rooms', RoomSchema);
