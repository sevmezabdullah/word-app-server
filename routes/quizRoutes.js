const express = require('express');
const {
  getAllQuestion,
  getQuizById,
  getQuestionByTitle,
  create,
  deleteQuiz,
  getQuizByDifficulty,
} = require('../controllers/quizController');
const quizRouter = express.Router();

quizRouter.get('/getAll', getAllQuestion);
quizRouter.get('/:id', getQuizById);
quizRouter.get(
  '/difficulty/:difficulty/:currentLang/:userId',
  getQuizByDifficulty
);
quizRouter.get('/:title', getQuestionByTitle);
quizRouter.post('/post', create);
quizRouter.post('/delete', deleteQuiz);
module.exports = quizRouter;
