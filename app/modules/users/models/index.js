const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uuid = require('uuid/v4');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

mongoose.plugin(uniqueValidator);

const UserShema = new Schema({
  nickname: {
    type: String,
    unique: 'User with nickname "{VALUE}" already exist',
    lowercase: true,
    required: 'Nickname is required',
    trim: true,
  },
  hash: {
    type: String,
    unique: 'Hash must be unique',
  },
  password: {
    type: String,
    required: 'Password is required',
    trim: true,
  },
}, {
  timestamps: true,
});

UserShema.statics.createFields = ['nickname', 'password'];

UserShema.pre('save', function(next) {
  if (this.isModified('password')) {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }
  
  if (!this.hash) {
    this.hash = uuid();
  }
  next();
});

UserShema.methods.comparePasswords = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('user', UserShema);
