const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
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
      default: true
    }
  },
  {
    versionKey: false
  });

module.exports = model('User', schema);