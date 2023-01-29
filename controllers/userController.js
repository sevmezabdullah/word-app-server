const { sendEmail } = require('../service/emailService');
const User = require('../models/user');
const { hashPassword } = require('../utils/securityManager');
const { getResponses } = require('../utils/lang');
const { generateJWT, comparePassword } = require('../utils/securityManager');
const io = require('../app');

async function register(request, response) {
  const responses = getResponses(request.body.lang);
  try {
    const { name, surname, email, password } = request.body;
    const hashedPassword = await hashPassword(password);
    const user = { name, surname, email };
    user.password = hashedPassword;
    user.authSource = 'classic';
    user.role = 2011;
    const createdUser = new User(user);
    const result = await createdUser.save();

    const isSent = await sendEmail(result.email);
    if (isSent) {
      return response.status(201).json({ message: responses.success_register });
    }
  } catch (error) {
    if (error.code === 11000) {
      return response.status(400).json({
        message: responses.already_registered,
      });
    }
    return response.status(502).json({ err: error });
  }
}
//Done
async function login(request, response) {
  const responses = getResponses(request.body.lang);
  const { email, password } = request.body;

  const user = await User.findOne({ email: email });

  if (user) {
    const passwordVerify = await comparePassword(password, user.password);
    if (passwordVerify) {
      const token = await generateJWT({ user });
      return response.json({ message: responses.signed_success, token: token });
    } else {
      return response.status(401).json({ message: responses.sign_fail });
    }
  }
  if (!user) {
    return response.status(404).json({ message: responses.not_found_user });
  }
}

async function logout(request, response) {}
async function changePassword(request, response) {}
async function verifyAccount(request, response) {}
async function signInWithGoogle(request, response) {}
async function getUsers(request, response) {
  const allUser = await User.find().select('-password -__v');
  return response.status(200).json({ users: allUser, count: allUser.length });
}
module.exports = {
  register,
  login,
  logout,
  changePassword,
  verifyAccount,
  signInWithGoogle,
  getUsers,
};
