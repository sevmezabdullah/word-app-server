const Category = require('../models/category');

async function getAllCategories(request, response) {
  const categories = await Category.find();
  return response.status(200).json(categories);
}

async function getCategoriesByLangCodes(request, response) {
  const { nativeLang, currentLang } = request.params;

  const categories = await Category.find({
    'titles.langCode': nativeLang,
    'titles.langCode': currentLang,
  });
  return response.status(200).json({ categories });
}
async function getWordsByCategoryId(request, response) {
  const { categoryId } = request.params;
  try {
    const result = await Category.findById(categoryId)
      .populate('words')
      .select('words');

    if (result) {
      return response.status(200).json(result.words);
    }
  } catch (error) {
    return response.status(404).json(error);
  }
}

async function removeWordFromCategory(request, response) {
  const { categoryId, wordId } = request.body.wordId;
  try {
    const result = await Category.findByIdAndUpdate(categoryId, {
      $pull: { words: wordId },
    });

    if (result) {
      const category = await Category.findById(categoryId);
      return response.status(200).json(category);
    }
  } catch (error) {
    return response.status(404).json(error);
  }
}
async function getCategoryById(request, response) {
  const { categoryId } = request.params;
  const category = await Category.findById(categoryId);
  console.log(category);
  return response.status(200).json(category);
}
async function postCategory(request, response) {
  try {
    const imageUri = request.file.filename;

    const { titles, awardId } = request.body;
    console.log(titles);
    const formattedTitles = JSON.parse(titles);

    const category = {
      titles: formattedTitles,
      logo:
        process.env.PROTOCOL +
        request.hostname +
        ':' +
        process.env.PORT +
        '/' +
        'uploads/' +
        imageUri,
      awardId,
    };
    const createdCategory = new Category(category);
    const result = await createdCategory.save();

    return response.status(201).json(result);
  } catch (error) {
    return response.status(404).json(error);
  }
}
async function deleteCategoryById(request, response) {
  const { id } = request.body;

  await Category.findByIdAndDelete(id);
  const categories = await Category.find();
  return response.status(200).json(categories);
}
async function getCategoryById(request, response) {
  const { categoryId } = request.params;

  try {
    const category = await Category.findById(categoryId);
    return response.status(200).json(category);
  } catch (error) {
    return response.status(502).json(error);
  }
}

async function addWordToCategory(request, response) {
  const { categoryId, wordId } = request.body;

  try {
    const result = await Category.findByIdAndUpdate(categoryId, {
      $push: { words: wordId },
    });

    if (result) {
      const category = await Category.findById(categoryId);
      return response.status(200).json(category);
    }
  } catch (error) {
    return response.status(404).json(error);
  }
}
async function addQuizToCategory(request, response) {
  const { categoryId, quizId } = request.body.quizId;
  const result = await Category.findByIdAndUpdate(categoryId, {
    quizId: quizId,
  });
  return response.status(200).json(result);
}
async function deleteQuizToCategory(request, response) {
  const categoryId = request.body.categoryId;

  const result = await Category.findByIdAndUpdate(categoryId, { quizId: null });
  console.log(result);
  return response.status(200).json(result);
}
module.exports = {
  getAllCategories,
  postCategory,
  getCategoryById,
  deleteCategoryById,
  addWordToCategory,
  getWordsByCategoryId,
  deleteQuizToCategory,
  removeWordFromCategory,
  addQuizToCategory,
  getCategoriesByLangCodes,
};
