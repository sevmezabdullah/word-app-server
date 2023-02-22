const Word = require('../models/word');
async function create(request, response) {}
async function deleteWord(request, response) {}
async function updateWord(request, response) {}
async function getAllWords(request, response) {
  try {
    const words = await Word.find();
    return response.status(200).json(words);
  } catch (error) {
    return response.status(404).json([]);
  }
}

module.exports = {
  create,
  deleteWord,
  updateWord,
  getAllWords,
};
