const User = require('../models/user-model');
const { generateAuthTokens, verifyRefreshToken } = require('../middlewares/authentication/auth');
const bcrypt = require('bcryptjs');
const ObjectId = require('mongoose').Types.ObjectId;
const Token = require('../models/token-model');

const getAll = async () => {
  return await User.aggregate(
    [
      {
        $match: { "is_user_active": true }
      },
      {
        $lookup: {
          from: "cities",
          localField: "city_id",
          foreignField: "_id",
          as: "cityData"
        }
      },
      {
        $unwind: "$cityData"
      },
      {
        $project: {
          "_id": "$_id",
          "name": "$name",
          "surname": "$surname",
          "is_user_active": "$is_user_active",
          "fromCity": "$cityData.city_name",
          "login": "$login",
        }
      }
    ]
  );
}

const getOne = async userId => {
  return await User.aggregate(
    [
      {
        $match: { _id: ObjectId(userId) }
      },
      {
        $lookup: {
          from: "cities",
          localField: "city_id",
          foreignField: "_id",
          as: "cityData"
        }
      },
      {
        $unwind: "$cityData"
      },
      {
        $project: {
          "_id": "$_id",
          "name": "$name",
          "surname": "$surname",
          "is_user_active": "$is_user_active",
          "fromCity": "$cityData.city_name",
          "login": "$login",
        }
      }
    ]
  );
}

const encryptPass = async (password) => {
  return await bcrypt.hash(password, 8);
};

const create = async requestBody => {
  try {
    requestBody.password = await encryptPass(requestBody.password);

    const user = new User({
      ...requestBody
    });
    await user.save();
    const tokens = await generateAuthTokens(user._id);

    return {
      user,
      accessToken: {
        token: tokens.accessToken.token,
        expiresIn: tokens.accessToken.expiresIn
      },
      refreshToken: {
        token: tokens.refreshToken.token,
        expiresIn: tokens.refreshToken.expiresIn
      },
      expiresIn: process.env.TOKEN_EXPIRATION_TIME,
      msg: "User created"
    };
  } catch (err) {
    throw new Error('A user with this login already exists');
  }
}

const login = async (login, password) => {
  let user = await User.findOne({ login });
  if (!user) {
    throw new Error('User does not exist');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Wrong password');
  }

  user = await User.aggregate(
    [
      {
        $match: { "login": login }
      },
      {
        $lookup: {
          from: "cities",
          localField: "city_id",
          foreignField: "_id",
          as: "cityData"
        }
      },
      {
        $unwind: "$cityData"
      },
      {
        $project: {
          "_id": "$_id",
          "name": "$name",
          "surname": "$surname",
          "is_user_active": "$is_user_active",
          "fromCity": "$cityData.city_name",
          "login": "$login",
        }
      }
    ]
  );

  return {
    user,
    ...await generateAuthTokens(user[0]._id)
  };
}

const refresh = async (refreshToken) => {
  let decodedTokenData;
  try {
    decodedTokenData = verifyRefreshToken(refreshToken);
    if (decodedTokenData.type !== 'refresh') {
      throw new Error('Invalid type of the token');
    }
  } catch (err) {
    throw new Error(err);
  }

  const tokenData = await Token.findOne({ tokenId: decodedTokenData.id });
  if (!tokenData) {
    throw new Error('There is no such token');
  }

  return await generateAuthTokens(tokenData.userId);
};

const update = async (requestId, requestBody) => {
  if (requestBody.password) {
    requestBody.password = await encryptPass(requestBody.password);
  }
  await User.updateOne(
    { _id: requestId },
    {
      $set: { ...requestBody }
    }
  );

  return {
    msg: 'User updated'
  };
}

const del = async requestId => {
  await User.updateOne(
    { _id: requestId },
    {
      $set: { "is_user_active": false }
    }
  );

  return {
    msg: 'User deleted'
  };
}

module.exports = {
  getAll,
  getOne,
  create,
  login,
  refresh,
  update,
  del
}