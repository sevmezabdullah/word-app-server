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
  point: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Quiz', quizSchema);
