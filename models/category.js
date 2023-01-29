const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({});

module.exports = mongoose.model('Category', CategorySchema);
