const express = require('express');
const quizResultRouter = express.Router();

const { createQuizResult } = require('../controllers/quizResultController');

quizResultRouter.post('/create', createQuizResult);

module.exports = quizResultRouter;
