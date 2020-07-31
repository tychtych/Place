const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { Joi, celebrate, errors } = require('celebrate');
const validator = require('validator');

const app = express();
const users = require('./routes/users');
const cards = require('./routes/cards');
const { login, createNewUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const serverErr = require('./middlewares/serverErr');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const urlValidate = (link) => {
  if (!validator.isURL(link)) {
    throw new Error('Invalid Link');
  }
  return link;
};

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { PORT = 3000 } = process.env;

app.use(requestLogger); // подключаем логгер запросов

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().custom(urlValidate),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
}), createNewUser);

app.use(auth);

app.use('/users', users);
app.use('/cards', cards);
app.use('/', serverErr);

app.use(errorLogger); // подключаем логгер ошибок
// обработчик ошибок celebrate
app.use(errors());

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
