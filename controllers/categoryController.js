const Category = require('../models/category');

async function getAllCategories(request, response) {
  const categories = await Category.find();
  return response.json(categories);
}

async function postCategory(request, response) {
  const { title, imageUri, nativeLangCode, awardId } = request.body;

  const category = { title, imageUri, nativeLangCode, awardId };
  const createdCategory = new Category(category);
  const result = await createdCategory.save();
  return response.status(201).json({ message: result });
}

module.exports = {
  getAllCategories,
  postCategory,
};
