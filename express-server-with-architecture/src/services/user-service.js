const User = require('../models/user-model');
const ObjectId = require('mongoose').Types.ObjectId;
const { generateAuthToken } = require('../middlewares/authentication/auth');
const bcrypt = require('bcryptjs');

const getAll = async () => {
  return await User.aggregate(
    [
      {
        $lookup: {
          from: "cities",
          localField: "cityID",
          foreignField: "_id",
          as: "cityData"
        }
      },
      {
        $unwind: "$cityData"
      },
      {
        $project: {
          "name": "$name",
          "surname": "$surname",
          "isUserActive": "$isUserActive",
          "fromCity": "$cityData.cityName",
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
          localField: "cityID",
          foreignField: "_id",
          as: "cityData"
        }
      },
      {
        $unwind: "$cityData"
      },
      {
        $project: {
          "name": "$name",
          "surname": "$surname",
          "isUserActive": "$isUserActive",
          "fromCity": "$cityData.cityName",
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
  requestBody.password = await encryptPass(requestBody.password);

  const user = new User({
    ...requestBody
  });
  await user.save();
  const token = generateAuthToken(user);

  return { user, token };
}

const login = async (login, password) => {
  const user = await User.findOne({ login });
  if (!user) {
    throw new Error('User does not exist');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Wrong password');
  }
  const token = generateAuthToken(user);

  return { token };
}

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

  return 'User updated';
}

const del = async requestId => {
  await User.updateOne(
    { _id: requestId },
    {
      $set: { "isUserActive": false }
    }
  );

  return 'User deleted';
}

module.exports = {
  getAll,
  getOne,
  create,
  login,
  update,
  del
}