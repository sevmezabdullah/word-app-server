const express = require('express');
const multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});
const upload = multer({
  dest: 'uploads/',

  storage: storage,
});

const { verifyUser } = require('../middlewares/auth');
const ROLES_LIST = require('../config/roles');
const {
  getAllCategories,
  postCategory,
  getCategoryById,
  deleteCategoryById,
  addWordToCategory,
  getWordsByCategoryId,
  removeWordFromCategory,
  addQuizToCategory,
  deleteQuizToCategory,
  getCategoriesByLangCodes,
} = require('../controllers/categoryController');
const categoryRoutes = express.Router();
const type = upload.single('logo');
categoryRoutes.get('/categories', getAllCategories);
categoryRoutes.get(
  '/categories/:nativeLang/:currentLang',
  getCategoriesByLangCodes
);
categoryRoutes.post('/create', type, postCategory);
categoryRoutes.get('/:categoryId', getCategoryById);

categoryRoutes.post('/delete', deleteCategoryById);
categoryRoutes.post('/addWord', addWordToCategory);
categoryRoutes.post('/addQuizToCategory', addQuizToCategory);
categoryRoutes.post('/deleteQuizToCategory', deleteQuizToCategory);
categoryRoutes.post('/removeWord', removeWordFromCategory);
categoryRoutes.get('/getWords/:categoryId', getWordsByCategoryId);

module.exports = categoryRoutes;
