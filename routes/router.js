const { Router } = require('express');
const cardsRouter = require('./cards');
const userRouter = require('./users');

const router = new Router();

router.use('/cards', cardsRouter);
router.use('/users', userRouter);
router.use((req, res) => {
  res.status(404).json('данные отсутствуют по указанному роуту');
});

module.exports = router;
