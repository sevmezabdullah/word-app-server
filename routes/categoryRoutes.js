const express = require('express');
const { verifyUser } = require('../middlewares/auth');
const ROLES_LIST = require('../config/roles');
const {
  getAllCategories,
  postCategory,
} = require('../controllers/categoryController');
const categoryRoutes = express.Router();

categoryRoutes.get(
  '/categories',

  getAllCategories
);
categoryRoutes.post('/create', postCategory);
module.exports = categoryRoutes;
