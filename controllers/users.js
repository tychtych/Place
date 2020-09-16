const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotFoundError = require('../errors/notFound');
const NotAuthorized = require('../errors/notAuthor');
const ConflictErr = require('../errors/conflictErr');

const { SecretKey } = require('../secretpath/secret');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .orFail(new NotFoundError('There are no users'))
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User is not found');
      } else {
        res.send({ data: user });
      }
    })
    .catch(next);
};

module.exports.createNewUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.send({ data: { name: user.name, about: user.about, email: user.email } }))
    .catch((err) => {
      if (err.errors.email && err.errors.email.kind === 'unique') {
        throw new ConflictErr('The user with this email already exists');
      }
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        SecretKey,
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          maxAge: 60 * 60 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send({ token });
    })
    .catch(() => next(new NotAuthorized('Please check email or password')));
};
