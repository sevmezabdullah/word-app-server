const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
  question: { type: String, required: true },
  answerA: { type: mongoose.Schema.Types.Mixed, required: true },
  answerB: { type: mongoose.Schema.Types.Mixed, required: true },
  answerC: { type: mongoose.Schema.Types.Mixed, required: true },
  answerD: { type: mongoose.Schema.Types.Mixed, required: true },
  answerCorrect: { type: mongoose.Schema.Types.Mixed, required: true },
  langCode: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  difficulty: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Question', questionSchema);
