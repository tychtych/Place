const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const users = require('./routes/users');
const cards = require('./routes/cards');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { PORT = 3000 } = process.env;

app.use((req, res, next) => {
  req.user = {
    _id: '5efe3149cc91b1cbdd0c0327',
  };
  next();
});

app.use('/users', users);
app.use('/cards', cards);

// TODO please be consistent with language for error messsages
app.use((req, res) => {
  res.status(404).send({ message: "It's not you, it's us" });
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
