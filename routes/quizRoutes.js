const express = require('express');
const {
  getAllQuestion,
  getQuestionById,
  getQuestionByTitle,
} = require('../controllers/quizController');
const quizRouter = express.Router();

quizRouter.get('/getAll', getAllQuestion);
quizRouter.get('/:id', getQuestionById);
quizRouter.get('/:title', getQuestionByTitle);
module.exports = quizRouter;
