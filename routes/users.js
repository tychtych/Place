const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const usersPath = path.join(__dirname, '../data/users.json');
const usersData = fs.readFileSync(usersPath, { encoding: 'utf8' });
const parsedUsersData = JSON.parse(usersData);

// get all users
router.get('/', (req, res) => {
  res.send(parsedUsersData);
});

// get a single user
router.get('/:id', (req, res) => {
  // TODO array is array check
  if (!parsedUsersData[req.params.id]) {
    res.status(404).send({ message: 'Нет пользователя с таким id' });
    return;
  }

  // eslint-disable-next-line no-underscore-dangle
  res.send(parsedUsersData.find((user) => user._id === req.params.id));
});

module.exports = router;
