const express = require('express');

const {
  create,
  deleteQuestion,
  getQuestionById,
  updateQuestion,
  getAllQuestion,
} = require('../controllers/questionController');
const questionRouter = express.Router();

questionRouter.get('/getAll', getAllQuestion);
questionRouter.post('/post', create);
questionRouter.post('/delete', deleteQuestion);

module.exports = questionRouter;
