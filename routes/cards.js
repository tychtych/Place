const express = require('express');
const path = require('path');
const fsPromises = require('fs').promises;

const router = express.Router();

const cardsPath = path.join(__dirname, '../data/cards.json');

async function getCardsData() {
  try {
    // TODO separate error catching while parsing
    const parsedData = JSON.parse(await fsPromises.readFile(cardsPath, { encoding: 'utf-8' }));
    return parsedData;
  } catch (error) {
    throw new Error('Ошибка чтения файла');
  }
}

router.get('/', async (req, res) => {
  try {
    const cardData = await getCardsData();
    res.send(cardData);
  } catch (e) {
    res.status(500)
      .send({ message: e.message });
  }
});

module.exports = router;
