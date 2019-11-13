const fs = require('fs');
const path = require('path');

let localUsers;
fs.readFile(
  path.join(__dirname, '..', 'storage.json'),
  (err, data) => {
    if (err) {
      throw new Error(err);
    }
    localUsers = JSON.parse(data);
  }
);

const get = () => {
  return localUsers;
}

const create = requestBody => {
  // we must pass the whole object to write it
  if (!requestBody.id || !requestBody.name || !requestBody.surname) {
    throw new Error("Bad request");
  } else {
    if (localUsers.some(user => user.id === requestBody.id)) {
      throw new Error(`User with id ${requestBody.id} exists`);
    } else {
      const user = {
        id: requestBody.id,
        name: requestBody.name,
        surname: requestBody.surname
      };
      localUsers.push(user);
      fs.writeFile(
        'storage.json',
        JSON.stringify(localUsers),
        err => {
          if (err) {
            throw new Error("Failed to write file");
          }
        }
      );
      return localUsers;
    }
  }
}

const update = requestBody => {
  // here we must pass the id and can pass name and surname or both of them
  if (!localUsers.some(user => user.id === requestBody.id)) {
    throw new Error(`User with id ${requestBody.id} does not exist`);
  } else {
    const currentUser = localUsers.filter(user => user.id === requestBody.id)[0];
    if (requestBody.name) {
      currentUser.name = requestBody.name;
    } else if (requestBody.surname) {
      currentUser.surname = requestBody.surname;
    }
    fs.writeFile(
      'storage.json',
      JSON.stringify(localUsers),
      err => {
        if (err) {
          throw new Error("Failed to write file");
        }
      }
    );
    return localUsers;
  }
}

const del = requestId => {
  // here we must pass the id of the user to delete it
  const passedId = parseInt(requestId);
  if (!localUsers.some(user => user.id === passedId)) {
    throw new Error(`User with id ${passedId} does not exist`);
  } else {
    const currentUserPosition = localUsers.findIndex(user => user.id === passedId);
    localUsers.splice(currentUserPosition, 1);
    fs.writeFile(
      'storage.json',
      JSON.stringify(localUsers),
      err => {
        if (err) {
          throw new Error("Failed to write file");
        }
      }
    );
    return localUsers;
  }
}

module.exports = {
  get,
  create,
  update,
  del
}