const path = require('path');
const fs = require('fs');

const helmet = require('helmet');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let localUsers;
fs.readFile(
  path.join(__dirname, 'storage.json'),
  (err, data) => {
    if (err) {
      throw new Error(err);
    }
    // localUsers = JSON.parse(data).users;
    localUsers = JSON.parse(data);
  }
);

app.get('/api/users/get-users', (req, res) => {
  res.json(localUsers);
  res.end();
});

app.post('/api/users/create-user', (req, res) => {
  // we must pass the whole object to write it
  if (!req.body.id || !req.body.name || !req.body.surname) {
    res.json({ msg: "Bad request" });
    res.end();
  } else {
    if (localUsers.some(user => user.id === req.body.id)) {
      res.json({ msg: `User with id ${req.body.id} exists` });
      res.end();
    } else {
      localUsers.push(req.body);
      fs.writeFile(
        'storage.json',
        JSON.stringify(localUsers),
        err => {
          throw new Error(err);
        }
      );
      res.json(localUsers);
      res.end();
    }
  }
});

app.put('/api/users/update-user', (req, res) => {
  // here we must pass the id and can pass name and surname or both of them
  if (!localUsers.some(user => user.id === req.body.id)) {
    res.json({ msg: `User with id ${req.body.id} does not exist` });
    res.end();
  } else {
    const currentUser = localUsers.filter(user => user.id === req.body.id)[0];
    if (req.body.name) {
      currentUser.name = req.body.name;
    } else if (req.body.surname) {
      currentUser.surname = req.body.surname;
    }
    fs.writeFile(
      'storage.json',
      JSON.stringify(localUsers),
      err => {
        throw new Error(err);
      }
    );
    res.json(localUsers);
    res.end();
  }
});

app.delete('/api/users/delete-user', (req, res) => {
  // we must pass the whole object to delete it
  if (!localUsers.some(user => user.id === req.body.id)) {
    res.json({ msg: `User with id ${req.body.id} does not exist` });
    res.end();
  } else {
    const currentUserPosition = localUsers.indexOf(req.body.user);
    localUsers.splice(currentUserPosition, 1);
    fs.writeFile(
      'storage.json',
      JSON.stringify(localUsers),
      err => {
        throw new Error(err);
      }
    );
    res.json(localUsers);
    res.end();
  }
});

app.listen(PORT, () => console.log(`Server on port ${PORT}`));