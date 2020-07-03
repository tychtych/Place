const express = require('express');

const router = express.Router();

const { getCards, createNewCard, deleteCard } = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createNewCard);
router.delete('/:cardId', deleteCard);

module.exports = router;
