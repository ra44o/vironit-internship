const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    surname: {
      type: String,
      required: true
    },
    is_user_active: {
      type: Boolean,
      default: true
    },
    city_id: {
      type: mongoose.Types.ObjectId
    },
    login: {
      type: String,
      unique: true
    },
    password: {
      type: String
    }
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model('User', schema);