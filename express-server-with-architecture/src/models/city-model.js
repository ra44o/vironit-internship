const { Schema, model } = require('mongoose');

const schema = new Schema({
  cityName: {
    type: String,
    required: true
  },
  foundationYear: {
    type: Number,
    required: true
  }
});

module.exports = model('City', schema);