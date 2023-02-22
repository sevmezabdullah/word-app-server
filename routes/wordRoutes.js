const express = require('express');
const { getAllWords } = require('../controllers/wordController');
const wordRouter = express.Router();

wordRouter.get('/', getAllWords);

module.exports = wordRouter;
