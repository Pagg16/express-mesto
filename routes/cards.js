const { Router } = require('express');
const { createCard } = require('../controllers/cards');
const { allCards } = require('../controllers/cards');
const { delCard } = require('../controllers/cards');
const { likeCard } = require('../controllers/cards');
const { dislikeCard } = require('../controllers/cards');

const cardsRouter = new Router();

cardsRouter.post('/', createCard);
cardsRouter.get('/', allCards);
cardsRouter.delete('/:cardId', delCard);
cardsRouter.put('/:cardId/likes', likeCard);
cardsRouter.delete('/:cardId/likes', dislikeCard);

module.exports = cardsRouter;
