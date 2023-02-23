const Category = require('../models/category');

async function getAllCategories(request, response) {
  const categories = await Category.find();
  return response.status(200).json(categories);
}

async function postCategory(request, response) {
  const imageUri = request.file.filename;

  const { titles, awardId } = request.body;

  const formattedTitles = JSON.parse(titles);

  const category = {
    titles: formattedTitles,
    imageUri:
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

  console.log(request.hostname);
  return response.status(201).json({ message: result });
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

module.exports = {
  getAllCategories,
  postCategory,
  getCategoryById,
  deleteCategoryById,
};
