const mongoose = require('mongoose');
const quizSchema = mongoose.Schema({
  difficult: {
    type: String,
    required: true,
  },
  questions: {
    type: [mongoose.Types.ObjectId],
    ref: 'Question',
  },
});

module.exports = mongoose.model('Quiz', quizSchema);
