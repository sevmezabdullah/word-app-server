const mongoose = require('mongoose');
const WordSchema = mongoose.Schema({
  comparations: {
    type: Object,
  },
  sentences: {
    type: Object,
  },
});
module.exports = mongoose.model('Word', WordSchema);
