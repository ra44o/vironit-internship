const jwt = require('jsonwebtoken');
const User = require('../../models/user-model');
const { secret } = require('../../../config/jwt.model').jwt;
const { refreshTokens } = require('./authHelper');

const authorize = async (req, res, next) => {
  try {
    if (!req.header('Authorization')) {
      throw new Error('Authorization token not found');
    }
    const token = req.header('Authorization').replace('Bearer ', '');
    if (token) {
      let decodedUser;
      try {
        decodedUser = jwt.verify(token, secret);
      } catch (error) {
        throw new Error(`Token ${token} has expired`);
      }
      const dbUser = await User.findOne({ _id: decodedUser.userId });
      if (!dbUser) {
        throw new Error('User not found');
      }
      req.params.id = decodedUser.userId;
      next();
    } else {
      throw new Error('Please, log in');
    }
  } catch (err) {
    res.status(401).send({ msg: err.message });
  }
}

const generateAuthTokens = async (userId) => {
  return await refreshTokens(userId);
}

const verifyRefreshToken = token => {
  return jwt.verify(token, secret);
};

module.exports = {
  authorize,
  generateAuthTokens,
  verifyRefreshToken
};