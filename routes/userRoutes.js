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

module.exports = userRouter;
