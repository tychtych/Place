const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const usersPath = path.join(__dirname, '../data/users.json');
const usersData = fs.readFileSync(usersPath, { encoding: 'utf8' });

// get all users
router.get('/', (req, res) => {
  res.send(usersData);
});

// get a single user
router.get('/:id', (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  const foundUser = usersData.some((user) => user._id === req.params.id);
  if (foundUser) {
    // eslint-disable-next-line no-underscore-dangle
    res.send(usersData.filter((user) => user._id === req.params.id));
  } else {
    res.status(404).send({ message: 'Нет пользователя с таким id' });
  }
});

module.exports = router;
