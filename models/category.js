const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
  titles: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  imageUri: {
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
});

module.exports = mongoose.model('Category', CategorySchema);
