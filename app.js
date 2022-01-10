const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/router');

const { PORT = 3000 } = process.env;

// mongodb+srv://Pagg16:Pagg16@cluster0.edkvs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const DB_URL = 'mongodb://localhost:27017/mestodb';

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '61d968ca294fc3000745a4e4',
  };

  next();
});

app.use(router);

async function startApp() {
  try {
    await mongoose.connect(DB_URL, () => {
      console.log('Подключение к базе данных прошло успешно');
    });
    app.listen(PORT, () => console.log(`Сервер запущен на порту + ${PORT}`));
  } catch (err) {
    console.log(err);
  }
}

startApp();
