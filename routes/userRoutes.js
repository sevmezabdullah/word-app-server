const {
  login,
  register,
  changePassword,
  logout,
  signInWithGoogle,
  verifyAccount,
  getUsers,
  getUserByStats,
  updateLang,
  addWordToKnown,
  addDeckToUser,
  getUserAwardDeck,
  addCompletedQuiz,
  getUserStat,
  resetProcess,
  incrementExp,
  getUserAwards,
  getWordCountByDate,
  getUserById,
  forgetPassword,
} = require('../controllers/userController');

const express = require('express');
const { verifyUser } = require('../middlewares/auth');
const ROLES_LIST = require('../config/roles');

const userRouter = express.Router();

userRouter.post('/login', login);
userRouter.post('/register', register);
userRouter.post('/changePassword', changePassword);
userRouter.post('/logout', logout);
userRouter.post('/signInGoogle', signInWithGoogle);
userRouter.get('/verifyAccount/:registerCode', verifyAccount);
userRouter.get('/stats/:year', getUserByStats);
userRouter.get('/getAllUser', getUsers);
userRouter.put('/updateLang', updateLang);
userRouter.post('/addWordToKnown', addWordToKnown);
userRouter.post('/addAwardToUser', addDeckToUser);
userRouter.get('/getUserAwardDeck/:userId', getUserAwardDeck);
userRouter.post('/addCompletedQuiz', addCompletedQuiz);
userRouter.get('/getUserStat/:userId', getUserStat);
userRouter.get('/getUserAward/:userId', getUserAwards);
userRouter.post('/resetProcess', resetProcess);
userRouter.post('/incrementExp', incrementExp);
userRouter.get('/getWordCountByDate/:userId', getWordCountByDate);
userRouter.get('/:userId', getUserById);
userRouter.post('/forgetPassword', forgetPassword);

module.exports = userRouter;
