const cardSchems = require('../models/card');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  cardSchems
    .create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при создании карточки',
        });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.allCards = (req, res) => {
  cardSchems
    .find()
    .then((cards) => res.status(200).send(cards))
    .catch(() => {
      res.status(400).send({ message: 'Произошла ошибка' });
    });
};

module.exports.delCard = (req, res) => {
  const { cardId } = req.params;

  cardSchems
    .findByIdAndDelete(cardId)
    .then((card) => res.status(200).send(card))
    .catch(() => {
      res.status(400).send({ message: 'Произошла ошибка' });
    });
};

module.exports.likeCard = (req, res) => {
  cardSchems
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .then((card) => {
      res.status(200).json(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else if (err.message === 'NotFound') {
        res
          .status(404)
          .send({ message: 'Передан несуществующий _id карточки' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  cardSchems
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .then((card) => {
      res.status(200).json(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else if (err.message === 'NotFound') {
        res
          .status(404)
          .send({ message: 'Передан несуществующий _id карточки' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};