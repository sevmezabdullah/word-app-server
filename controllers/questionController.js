const Question = require('../models/question');
async function create(request, response) {
  const {
    question,
    answerA,
    answerB,
    answerC,
    answerD,
    langCode,
    difficulty,
    answerCorrect,
  } = request.body;

  try {
    const createdQuestion = new Question({
      question,
      answerA,
      answerB,
      answerC,
      answerD,
      langCode,
      difficulty,
      answerCorrect,
    });
    const result = await createdQuestion.save();
    if (result !== null) {
      return response.status(201).json(result);
    }
  } catch (error) {
    if (error) {
      return response.status(404).json(error);
    }
  }
}
async function deleteQuestion(request, response) {
  const { id } = request.body.id;

  try {
    const result = await Question.findByIdAndDelete(id);
    if (result !== null) {
      return response.json(result);
    }
  } catch (error) {
    return response.status(404).json({ error: error, message: 'Hata oluştu' });
  }
}
async function updateQuestion(request, response) {}
async function getQuestionById(request, response) {}
async function getAllQuestion(request, response) {
  try {
    const questions = await Question.find();
    if (questions) {
      return response.status(200).json(questions);
    } else {
      return response.status(200).json([]);
    }
  } catch (error) {
    return response.status(404).json({ error: error });
  }
}

module.exports = {
  create,
  deleteQuestion,
  getQuestionById,
  updateQuestion,
  getAllQuestion,
};
