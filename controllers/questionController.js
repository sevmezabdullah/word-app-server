const Question = require('../models/question');
async function create(request, response) {
  const { word, answerA, answerB, answerC, answerD } = request.body;

  const createdQuestion = new Question({
    word,
    answerA,
    answerB,
    answerC,
    answerD,
  });
  const result = await createdQuestion.save();
  if (result !== null) {
    return response.status(201).json({ message: 'Soru oluşturuldu.' });
  }
}
async function deleteQuestion(request, response) {
  const { id } = request.body;
  try {
    const result = await Question.findByIdAndDelete(id);
    if (result !== null) {
      return response.json({ message: 'Soru Silindi' });
    }
  } catch (error) {
    return response.json({ error: error, message: 'Hata oluştu' });
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
