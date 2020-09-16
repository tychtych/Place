const express = require('express');

const router = express.Router();

const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const { getCards, createNewCard, deleteCard } = require('../controllers/cards');

const urlValidate = (link) => {
  if (!validator.isURL(link)) {
    throw new Error('Invalid Link');
  }
  return link;
};

router.get('/', getCards);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(urlValidate),
  }),
}), createNewCard);

router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
}), deleteCard);

module.exports = router;
