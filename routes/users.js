const { Router } = require('express');
const { createUser } = require('../controllers/users');
const { allUsers } = require('../controllers/users');
const { oneUser } = require('../controllers/users');
const { updateUser } = require('../controllers/users');
const { updateUserAvatar } = require('../controllers/users');

const userRouter = new Router();

userRouter.post('/', createUser);
userRouter.get('/', allUsers);
userRouter.get('/:userid', oneUser);
userRouter.patch('/me', updateUser);
userRouter.patch('/me/avatar', updateUserAvatar);

module.exports = userRouter;
