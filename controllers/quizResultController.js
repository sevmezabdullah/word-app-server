const QuizResults = require('../models/quizResults');

async function createQuizResult(request, response) {
  const { userId, result, quizId } = request.body;

  const findedData = await QuizResults.findOne({
    userId: userId,
    quizId: quizId,
  });
  console.log(
    '🚀 ~ file: quizResultController.js:10 ~ createQuizResult ~ findedData:',
    findedData
  );

  if (findedData !== null) {
    const updatedResult = await QuizResults.findByIdAndUpdate(findedData.id, {
      result: result,
      userId: userId,
      quizId: quizId,
    });
    console.log(
      '🚀 ~ file: quizResultController.js:16 ~ createQuizResult ~ updatedResult:',
      updatedResult
    );
    return response.status(200).json(updatedResult);
  } else {
    const createdResult = new QuizResults({ userId, result, quizId });
    const savedResult = await createdResult.save();
    console.log(
      '🚀 ~ file: quizResultController.js:21 ~ createQuizResult ~ savedResult:',
      savedResult
    );
    if (savedResult) {
      return response.status(200).json({ savedResult });
    } else {
      return response.status(404).json({ message: 'hata oluştu' });
    }
  }
}

module.exports = {
  createQuizResult,
};
