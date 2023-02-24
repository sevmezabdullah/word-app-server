const Word = require('../models/word');
async function create(request, response) {
  const { words, sentences } = request.body;
  console.log(words, sentences);
  const word = {
    words: words,
    sentences: sentences,
  };
  const saveWord = new Word(word);
  const result = await saveWord.save();
  return response.status(201).json(result);
}
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
