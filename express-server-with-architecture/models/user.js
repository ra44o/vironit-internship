const { Schema, model } = require('mongoose');

const schema = new Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: false,
    required: true
  }
});

module.exports = model('User', schema);