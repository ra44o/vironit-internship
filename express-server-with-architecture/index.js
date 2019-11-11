const path = require('path');
const fs = require('fs');

const helmet = require('helmet');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let users;
fs.readFile(
  path.join(__dirname, 'storage.json'),
  (err, data) => {
    if (err) {
      throw new Error(err);
    }
    users = JSON.parse(data).users;
  }
);

app.get('/api/users/get-users', (req, res) => {
  res.json(users);
  res.end();
});

app.post('/api/users/create-user', (req, res) => {
  if (!req.body.id || !req.body.name || !req.body.surname) {
    res.json({ msg: "Bad request" });
    res.end();
  } else {
    if (users.some(user => user.id === req.body.id)) {
      res.json({ msg: `User with id ${req.body.id} exists` });
      res.end();
    } else {
      users.push(req.body);
      fs.writeFile(
        'storage.json',
        JSON.stringify({ users }),
        err => {
          throw new Error(err);
        }
      );
      res.json(users);
      res.end();
    }
  }
});

app.put('/api/users/update-user', (req, res) => {
  if (!users.some(user => user.id === req.body.id)) {
    res.json({ msg: `User with id ${req.body.id} does not exist` });
    res.end();
  } else {
    const currentUser = users.filter(user => user.id === req.body.id)[0];
    if (req.body.name) {
      currentUser.name = req.body.name;
    } else if (req.body.surname) {
      currentUser.surname = req.body.surname;
    }
    fs.writeFile(
      'storage.json',
      JSON.stringify({ users }),
      err => {
        throw new Error(err);
      }
    );
    res.json(users);
    res.end();
  }
});

app.delete('/api/users/delete-user', (req, res) => {
  // we must pass the whole object to delete it
  if (users.some(user => user.id === req.body.id)) {
    res.json({ msg: `User with id ${req.body.id} does not exist` });
    res.end();
  } else {
    const currentUserPosition = users.indexOf(req.body.user);
    users.splice(currentUserPosition, 1);
    fs.writeFile(
      'storage.json',
      JSON.stringify({ users }),
      err => {
        throw new Error(err);
      }
    );
    res.json(users);
    res.end();
  }
});

app.listen(PORT, () => console.log(`Server on port ${PORT}`));