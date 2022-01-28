const { celebrate, Joi } = require('celebrate');
const { Router } = require('express');
const { allUsers } = require('../controllers/users');
const { currentUser } = require('../controllers/users');
const { updateUser } = require('../controllers/users');
const { updateUserAvatar } = require('../controllers/users');
const { oneUser } = require('../controllers/users');

const userRouter = new Router();

userRouter.get('/', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string(),
  }).unknown(true),
}), allUsers);

userRouter.get('/me', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string(),
  }).unknown(true),
}), currentUser);

userRouter.get('/:userid', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string(),
  }).unknown(true),
  params: Joi.object().keys({
    userid: Joi.string().required().alphanum().length(24),
  }),
}), oneUser);

userRouter.patch('/me', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string(),
  }).unknown(true),
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

userRouter.patch('/me/avatar', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string(),
  }).unknown(true),
  body: Joi.object().keys({
    avatar: Joi.string().required().min(2),
  }),
}), updateUserAvatar);

module.exports = userRouter;
