const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    cityName: {
      type: String,
      required: true
    },
    foundationYear: {
      type: Number,
      required: true
    },
    isCityActive: {
      type: Boolean,
      default: true
    }
  },
  {
    versionKey: false
  }
);

module.exports = model('City', schema);