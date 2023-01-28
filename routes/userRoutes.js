const {
  login,
  register,
  changePassword,
  logout,
  signInWithGoogle,
  verifyAccount,
} = require('../controllers/userController');
const express = require('express');

const userRouter = express.Router();

userRouter.post('/login', login);
userRouter.post('/register', register);
userRouter.post('/changePassword', changePassword);
userRouter.post('/logout', logout);
userRouter.post('/signInGoogle', signInWithGoogle);
userRouter.post('/verifyAccount', verifyAccount);

module.exports = userRouter;
