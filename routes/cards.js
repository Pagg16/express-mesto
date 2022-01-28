const { celebrate, Joi } = require('celebrate');
const { Router } = require('express');
const { createCard } = require('../controllers/cards');
const { allCards } = require('../controllers/cards');
const { delCard } = require('../controllers/cards');
const { likeCard } = require('../controllers/cards');
const { dislikeCard } = require('../controllers/cards');

const cardsRouter = new Router();

cardsRouter.post('/', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string(),
  }).unknown(true),
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }),
}), createCard);

cardsRouter.get('/', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string(),
  }).unknown(true),
}), allCards);

cardsRouter.delete('/:cardId', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string(),
  }).unknown(true),
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24),
  }),
}), delCard);

cardsRouter.put('/:cardId/likes', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string(),
  }).unknown(true),
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24),
  }),
}), likeCard);

cardsRouter.delete('/:cardId/likes', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string(),
  }).unknown(true),
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24),
  }),
}), dislikeCard);

module.exports = cardsRouter;
