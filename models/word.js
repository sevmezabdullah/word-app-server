const mongoose = require('mongoose');
const WordSchema = mongoose.Schema({});
module.exports = mongoose.model('Word', WordSchema);
