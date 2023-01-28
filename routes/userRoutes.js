const express = require('express');
const {
  login,
  register,
  changePassword,
  logout,
  signInWithGoogle,
  verifyAccount,
} = require('../controllers/userController');
const userRoutes = express.Router();

userRoutes.post('/login', login);
userRoutes.post('/register', register);
userRoutes.post('/changePassword', changePassword);
userRoutes.post('/logout', logout);
userRoutes.post('/signInGoogle', signInWithGoogle);
userRoutes.post('/verifyAccount', verifyAccount);

module.exports = {
  userRoutes,
};
