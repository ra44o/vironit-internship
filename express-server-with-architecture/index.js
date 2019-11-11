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

app.get('/', (req, res) => {
  res.send(users);
});

app.listen(PORT, () => console.log(`Server on port ${PORT}`));