const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const cardsPath = path.join(__dirname, '../data/cards.json');
const cardData = fs.readFileSync(cardsPath, { encoding: 'utf8' });

router.get('/', (req, res) => {
  res.send(cardData);
});

module.exports = router;
