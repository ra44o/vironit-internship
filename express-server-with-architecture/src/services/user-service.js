const User = require('../models/user-model');
const ObjectId = require('mongoose').Types.ObjectId;

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
          "fromCity": "$cityData.cityName"
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
          "fromCity": "$cityData.cityName"
        }
      }
    ]
  );
}

const create = async requestBody => {
  const newUser = new User({ ...requestBody });
  await newUser.save();

  return 'User created';
}

const update = async (requestId, requestBody) => {
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
  update,
  del
}