const mongoose = require('mongoose');

const quizResultsSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  result: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'quiz',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model('QuizResults', quizResultsSchema);
