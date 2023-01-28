const { sendEmail } = require('../service/emailService');

async function register(request, response) {}
async function login(request, response) {}
async function logout(request, response) {}
async function changePassword(request, response) {}
async function verifyAccount(request, response) {}
async function signInWithGoogle(request, response) {}

module.exports = {
  register,
  login,
  logout,
  changePassword,
  verifyAccount,
  signInWithGoogle,
};
