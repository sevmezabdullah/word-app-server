const Quiz = require('../models/quiz');
const User = require('../models/user');
async function getAllQuestion(request, response) {
  const quizs = await Quiz.find();
  if (quizs) {
    return response.status(200).json(quizs);
  } else {
    return response.status(404).json([]);
  }
}
async function getQuizById(request, response) {
  const { id } = request.params;
  console.log('Quiz ID : ', id);
  if (id !== null && id !== 'undefined') {
    const quiz = await Quiz.findById(id).populate('questions');
    if (quiz) {
      return response.status(200).json(quiz);
    } else {
      return response.status(404).json(null);
    }
  }
  if (id === null || id === undefined) {
    return response.status(200).json([]);
  }
}
async function getQuizByDifficulty(request, response) {
  const { difficulty, currentLang, userId } = request.params;

  if (difficulty !== 'undefined') {
    const user = await User.findById(userId);
    console.log(user.completedQuiz);

    const quiz = await Quiz.findOne({
      difficult: difficulty,
      currentLangCode: currentLang,
    }).populate('questions');

    const quizId = quiz._id;
    console.log(
      '🚀 ~ file: quizController.js:39 ~ getQuizByDifficulty ~ quizId:',
      quizId
    );

    return response.status(200).json(quiz);
  } else {
    return response.status(200).json([]);
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

async function create(request, response) {
  const { title, exp, difficult, questions, currentLangCode } = request.body;

  console.log(request.body);
  const quiz = new Quiz({
    title: title,
    exp: exp,
    difficult: difficult,
    questions: questions,
    currentLangCode: currentLangCode,
  });
  const result = await quiz.save();
  return response.status(201).json(result);
}

async function deleteQuiz(request, response) {
  const { id } = request.body;
  await Quiz.findByIdAndDelete(id);
  const result = await Quiz.find();
  return response.status(200).json(result);
}
module.exports = {
  getAllQuestion,
  getQuizById,
  getQuestionByTitle,
  create,
  deleteQuiz,
  getQuizByDifficulty,
};
