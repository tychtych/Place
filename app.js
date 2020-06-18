const express = require('express');

const app = express();
const path = require('path');
const users = require('./routes/users');

const { PORT = 3000 } = process.env;

app.use('/users', users);

app.use(express.static(path.join(__dirname, '/public')));

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
