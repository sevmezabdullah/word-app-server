const Quiz = require('../models/quiz');
async function getAllQuestion(request, response) {
  const quizs = await Quiz.find();
  if (quizs) {
    return response.status(200).json(quizs);
  } else {
    return response.status(404).json([]);
  }
}
async function getQuestionById(request, response) {
  const { id } = request.params;
  const quiz = await Quiz.findById(id);
  if (quiz) {
    return response.status(200).json(quiz);
  } else {
    return response.status(404).json(null);
  }
}
async function getQuestionByTitle(request, response) {
  const { title } = request.params;
  const quiz = await Quiz.findOne({ title: title });
  if (quiz) {
    return response.status(200).json(quiz);
  } else {
    return response.status(404).json(null);
  }
}

module.exports = {
  getAllQuestion,
  getQuestionById,
  getQuestionByTitle,
};
