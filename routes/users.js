const express = require('express');

const router = express.Router();

const { getUsers, getUserById, createNewUser } = require('../controllers/users');

router.get('/', getUsers);
router.post('/', createNewUser);
router.get('/:id', getUserById);

module.exports = router;
