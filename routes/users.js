const express = require('express');

const router = express.Router();

const { celebrate, Joi } = require('celebrate');

const { getUsers, getUserById } = require('../controllers/users');

router.get('/', getUsers);

router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }),
}), getUserById);

module.exports = router;
