const userSchems = require('../models/user');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  userSchems
    .create({ name, about, avatar })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при создании пользователя',
        });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.allUsers = async (req, res) => {
  userSchems
    .find()
    .then((users) => res.status(200).send(users))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.oneUser = async (req, res) => {
  userSchems
    .findById(req.params.userid)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(() => {
      res.status(500).json({ message: 'Запрашиваемый пользователь не найден' });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  userSchems
    .findByIdAndUpdate(req.body._id, { name, about }, { new: true })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при обновлении профиля',
        });
      } else if (err.message === 'NotFound') {
        res
          .status(404)
          .send({ message: 'Пользователь с указанным _id не найден' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  userSchems
    .findByIdAndUpdate(
      req.body._id,
      { avatar },
      {
        new: true,
      },
    )
    .find((updateUserAvatar) => res.send(200).json(updateUserAvatar))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при обновлении профиля',
        });
      } else if (err.message === 'NotFound') {
        res
          .status(404)
          .send({ message: 'Пользователь с указанным _id не найден' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};
