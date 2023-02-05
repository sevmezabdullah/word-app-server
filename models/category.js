const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imageUri: {
    type: String,
    required: true,
  },
  nativeLangCode: {
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
