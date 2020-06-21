const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const usersPath = path.join(__dirname, '../data/users.json');
const usersData = fs.readFileSync(usersPath, { encoding: 'utf8' });
const parsedUsersData = JSON.parse(usersData);

router.get('/', (req, res) => {
  res.send(parsedUsersData);
});

router.get('/:id', (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    res.status(404).send({ message: 'Нет пользователя с таким id' });
    return;
  }
  // eslint-disable-next-line no-underscore-dangle
  res.send(parsedUsersData.find((user) => user._id === req.params.id));
});

module.exports = router;
