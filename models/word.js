const mongoose = require('mongoose');
const WordSchema = mongoose.Schema({
  words: {
    type: [mongoose.Schema.Types.Mixed],
    default: [],
  },
  sentences: {
    type: [mongoose.Schema.Types.Mixed],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model('Word', WordSchema);
