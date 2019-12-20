const jwt = require('jsonwebtoken');
const { secret, tokens } = require('../../../config/jwt.model').jwt;
const uuid = require('uuid/v4');
const Token = require('../../models/token-model');

const generateAccessToken = userId => {
  const payload = {
    userId,
    type: tokens.access.type
  };

  const options = {
    expiresIn: tokens.access.expiresIn
  };

  return jwt.sign(payload, secret, options);
};

const generateRefreshToken = () => {
  const payload = {
    id: uuid(),
    type: tokens.refresh.type
  };

  const options = {
    expiresIn: tokens.refresh.expiresIn
  };

  return {
    id: payload.id,
    token: jwt.sign(payload, secret, options)
  };
};

const replaceDbRefreshToken = async (tokenId, userId) => {
  await Token.findOneAndRemove({ userId });
  return await Token.create({ tokenId, userId });
}

const refreshTokens = async userId => {
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken();

  await replaceDbRefreshToken(refreshToken.id, userId);

  return {
    accessToken: {
      token: accessToken,
      expiresIn: tokens.access.expiresIn
    },
    refreshToken: {
      token: refreshToken.token,
      expiresIn: tokens.refresh.expiresIn
    }
  }
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  replaceDbRefreshToken,
  refreshTokens
}
