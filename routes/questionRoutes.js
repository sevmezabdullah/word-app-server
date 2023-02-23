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

module.exports = questionRouter;
