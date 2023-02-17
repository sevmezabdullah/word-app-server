const mongoose = require('mongoose');

const LanguageSchema = mongoose.Schema({
  langCode: {
    type: String,
    required: true,
  },
  lang: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
});

module.exports = mongoose.model('Language', LanguageSchema);
