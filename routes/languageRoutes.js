const express = require('express');
const { createLang, getAll } = require('../controllers/languageController');
const languageRouter = express.Router();

languageRouter.post('/create', createLang);
languageRouter.get('/getAll', getAll);

module.exports = languageRouter;
