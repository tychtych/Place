const express = require('express');

const router = express.Router();
const { users } = require('../data/users.js');

// get all users
router.get('/', (req, res) => {
  res.send(users);
});

// get a single user
router.get('/:id', (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  const foundUser = users.some((user) => user._id === req.params.id);
  if (foundUser) {
    // eslint-disable-next-line no-underscore-dangle
    res.send(users.filter((user) => user._id === req.params.id));
  } else {
    res.status(404).send({ message: 'Нет пользователя с таким id' });
  }
});

module.exports = router;
