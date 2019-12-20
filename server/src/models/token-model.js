const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    tokenId: {
      type: String
    },
    userId: {
      type: String
    }
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model('Token', schema);