const { errors } = require('celebrate');
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/router');
const singinSingup = require('./routes/singinSingup');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/error-handler');

const { PORT = 3000 } = process.env;

// mongodb+srv://Pagg16:Pagg16@cluster0.edkvs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

// mongodb://localhost:27017/mestodb

const DB_URL = 'mongodb+srv://Pagg16:Pagg16@cluster0.edkvs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const app = express();

app.use(express.json());

app.use(singinSingup);

app.use(auth, router);

app.use((req, res) => {
  res.status(404).json('данные отсутствуют по указанному роуту');
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
