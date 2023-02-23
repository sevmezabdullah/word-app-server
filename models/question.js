const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
  word: { type: mongoose.Schema.Types.ObjectId, ref: 'Word' },
  answerA: { type: mongoose.Schema.Types.ObjectId, ref: 'Word' },
  answerB: { type: mongoose.Schema.Types.ObjectId, ref: 'Word' },
  answerC: { type: mongoose.Schema.Types.ObjectId, ref: 'Word' },
  answerD: { type: mongoose.Schema.Types.ObjectId, ref: 'Word' },
  answerCorrect: { type: mongoose.Schema.Types.ObjectId, ref: 'Word' },
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
