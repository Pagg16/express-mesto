const { errors } = require('celebrate');
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/router');
const singinSingup = require('./routes/singinSingup');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/error-handler');
const NotFound = require('./errors/not-found');

const { PORT = 3000 } = process.env;

const { DB_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

// mongodb+srv://Pagg16:Pagg16@cluster0.edkvs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const app = express();

app.use(express.json());

app.use(singinSingup);

app.use(auth, router);

app.use((req, res, next) => {
  next(new NotFound('данные отсутствуют по указанному роуту'));
});

app.use(errors());

app.use(errorHandler);

function startApp() {
  try {
    app.listen(PORT, () => console.log(`Сервер запущен на порту + ${PORT}`));
    mongoose.connect(DB_URL, () => {
      console.log('Подключение к базе данных прошло успешно');
    });
  } catch (err) {
    console.log(err);
  }
}

startApp();
