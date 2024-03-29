const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
  titles: {
    type: [mongoose.Schema.Types.Mixed],
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },

  awardId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  words: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Word' }],
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
  },
});

module.exports = mongoose.model('Category', CategorySchema);
