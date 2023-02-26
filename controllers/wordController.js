const Word = require('../models/word');
async function create(request, response) {
  const { words, sentences } = request.body;

  const word = {
    words: words,
    sentences: sentences,
  };
  const saveWord = new Word(word);
  const result = await saveWord.save();
  return response.status(201).json(result);
}
async function deleteWord(request, response) {
  const { wordId } = request.body;
  try {
    if (wordId) {
      const result = await Word.findByIdAndDelete(wordId);
      return response.status(200).json(result);
    }
  } catch (error) {
    return response.status(400).json(error);
  }
}
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
