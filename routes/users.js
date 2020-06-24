const express = require('express');
const path = require('path');
const fsPromises = require('fs').promises;

const router = express.Router();
const usersPath = path.join(__dirname, '../data/users.json');

async function getUsersData() {
  try {
    // TODO separate error catching while parsing
    const parsedData = JSON.parse(await fsPromises.readFile(usersPath, { encoding: 'utf-8' }));
    return parsedData;
  } catch (error) {
    throw new Error('Ошибка чтения файла');
  }
}

router.get('/', async (req, res) => {
  try {
    const userData = await getUsersData();
    res.send(userData);
  } catch (e) {
    res.status(500)
      .send({ message: e.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const usersData = await getUsersData();
    if (Array.isArray(usersData)) {
      const foundUser = await usersData
        // eslint-disable-next-line no-underscore-dangle
        .find((user) => user._id === req.params.id);
      if (!foundUser) {
        res.status(404)
          .send({ message: 'Нет пользователя с таким id' });
      }
      // eslint-disable-next-line no-underscore-dangle
      res.send(foundUser);
    } else {
      res.status(500)
        .send({ message: 'Некорректные данные' });
    }
  } catch (e) {
    res.status(500)
      .send({ message: e.message });
  }
});

module.exports = router;
