const mongoose = require('mongoose');
const uuid = require('uuid/v4');
const Schema = mongoose.Schema;

const GridSchema = new Schema({
  title: {
    type: String,
    required: 'Name is required',
    trim: true,
  },
  hash: {
    type: String,
    unique: 'Hash must be unique',
  },
  content: {
    type: String,
    trim: true,
    required: 'Content is required',
  },
  size: {
    type: String,
    required: 'Size is required',
  },
}, {
  timestamps: true,
});

GridSchema.pre('save', function(next) {
  if (!this.hash) {
    this.hash = uuid();
  }
  next();
});

GridSchema.statics.createFields = ['title', 'hash', 'content', 'size'];

module.exports = mongoose.model('grids', GridSchema);
