const Category = require('../models/category');

async function getAllCategories(request, response) {
  const categories = await Category.find();
  return response.status(200).json(categories);
}

async function postCategory(request, response) {
  const { titles, imageUri, awardId } = request.body;

  const category = { titles, imageUri, awardId };
  const createdCategory = new Category(category);
  const result = await createdCategory.save();
  return response.status(201).json({ message: result });
}

module.exports = {
  getAllCategories,
  postCategory,
};
