const express = require('express');
const { getAllWords, create } = require('../controllers/wordController');
const wordRouter = express.Router();

wordRouter.get('/', getAllWords);
wordRouter.post('/create', create);

module.exports = wordRouter;
