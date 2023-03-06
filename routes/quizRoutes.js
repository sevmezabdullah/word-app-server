const express = require('express');
const {
  getAllQuestion,
  getQuestionById,
  getQuestionByTitle,
  create,
  deleteQuiz,
} = require('../controllers/quizController');
const quizRouter = express.Router();

quizRouter.get('/getAll', getAllQuestion);
quizRouter.get('/:id', getQuestionById);
quizRouter.get('/:title', getQuestionByTitle);
quizRouter.post('/post', create);
quizRouter.post('/delete', deleteQuiz);
module.exports = quizRouter;
