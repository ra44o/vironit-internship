const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    city_name: {
      type: String,
      required: true
    },
    foundation_year: {
      type: Number,
      required: true
    },
    is_city_active: {
      type: Boolean,
      default: true
    }
  },
  {
    versionKey: false
  }
);

module.exports = model('City', schema);