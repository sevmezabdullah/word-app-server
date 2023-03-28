const express = require('express');
const quizResultRouter = express.Router();

const {
  createQuizResult,
  updateQuizResult,
} = require('../controllers/quizResultController');

quizResultRouter.post('/create', createQuizResult);
quizResultRouter.post('/update', updateQuizResult);

module.exports = quizResultRouter;
