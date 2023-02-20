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

module.exports = {
  create,
  deleteQuestion,
  getQuestionById,
  updateQuestion,
};
