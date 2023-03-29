const mongoose = require('mongoose');
const requestSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  message: {
    type: String,
  },
});

module.exports = mongoose.model('Requests', requestSchema);
