const mongoose = require('mongoose');
const quizSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  exp: {
    type: Number,
    default: 0,
  },
  difficult: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  questions: {
    type: [mongoose.Types.ObjectId],
    ref: 'Question',
  },
});

module.exports = mongoose.model('Quiz', quizSchema);
