const express = require('express');
const {
  getAllWords,
  create,
  deleteWord,
} = require('../controllers/wordController');
const wordRouter = express.Router();

wordRouter.get('/', getAllWords);
wordRouter.post('/create', create);
wordRouter.post('/delete', deleteWord);

module.exports = wordRouter;
