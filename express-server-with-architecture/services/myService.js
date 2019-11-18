const User = require('../models/user');

const get = async () => {
  return await User.find(
    { isActive: true },
    err => {
      if (err) {
        throw new Error('Can not get users');
      }
    }
  );
}

const create = async requestBody => {
  if (!requestBody.name || !requestBody.surname) {
    throw new Error("Bad request");
  } else {
    const newUser = new User({
      name: requestBody.name,
      surname: requestBody.surname
    });
    await newUser.save();

    return 'User created';
  }
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
      $set: { "isActive": false }
    }
  );

  return 'User deleted';
}

module.exports = {
  get,
  create,
  update,
  del
}