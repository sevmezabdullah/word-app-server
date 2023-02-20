const express = require('express');

const {
  create,
  deleteQuestion,
  getQuestionById,
  updateQuestion,
} = require('../controllers/questionController');
const questionRouter = express.Router();

module.exports = questionRouter;
