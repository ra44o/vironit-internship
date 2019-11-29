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
    isUserActive: {
      type: Boolean,
      default: true
    },
    cityID: {
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