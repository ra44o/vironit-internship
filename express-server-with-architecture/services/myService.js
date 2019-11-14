const fs = require('fs');
const path = require('path');

const User = require('../models/user');

let localUsers;

const initializeDB = async () => {
  localUsers = await User.find(
    { isActive: true },
    err => {
      if (err) {
        throw new Error('Can not get users');
      }
    });
}

initializeDB();

const get = async () => {
  return localUsers;
}

const create = async requestBody => {
  // we must pass the whole object to write it
  if (!requestBody.id || !requestBody.name || !requestBody.surname || !requestBody.isActive) {
    throw new Error("Bad request");
  } else {
    if (localUsers.some(user => user.id === requestBody.id)) {
      throw new Error(`User with id ${requestBody.id} exists`);
    } else {
      const newUser = new User({
        id: requestBody.id,
        name: requestBody.name,
        surname: requestBody.surname,
        isActive: requestBody.isActive
      });
      localUsers.push(newUser);
      await newUser.save();

      return 'User created';
    }
  }
}

const update = async requestBody => {
  // here we must pass the id and can pass name and surname or both of them
  if (!localUsers.some(user => user.id === requestBody.id)) {
    throw new Error(`User with id ${requestBody.id} does not exist`);
  } else {
    const currentUser = localUsers.filter(user => user.id === requestBody.id)[0];

    if (requestBody.name && requestBody.surname) {

      currentUser.name = requestBody.name;
      currentUser.surname = requestBody.surname;
      await User.updateOne(
        { id: currentUser.id },
        {
          $set: { "name": requestBody.name, "surname": requestBody.surname }
        }
      );
    }
    else if (requestBody.name) {
      currentUser.name = requestBody.name;
      await User.updateOne(
        { id: currentUser.id },
        {
          $set: { "name": requestBody.name }
        }
      );
    } else if (requestBody.surname) {
      currentUser.surname = requestBody.surname;
      await User.updateOne(
        { id: currentUser.id },
        {
          $set: { "surname": requestBody.surname }
        }
      );
    }

    return 'User updated';
  }
}

const del = async requestId => {
  // here we must pass the id of the user to delete it
  const passedId = parseInt(requestId);
  if (!localUsers.some(user => user.id === passedId)) {
    throw new Error(`User with id ${passedId} does not exist`);
  } else {
    const currentUserPosition = localUsers.findIndex(user => user.id === passedId);
    localUsers[currentUserPosition].isActive = false;
    await User.updateOne(
      { id: passedId },
      {
        $set: { "isActive": false }
      }
    );

    return 'User deleted';
  }
}

module.exports = {
  get,
  create,
  update,
  del
}