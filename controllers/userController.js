const { sendEmail } = require('../service/emailService');
const User = require('../models/user');
const { hashPassword } = require('../utils/securityManager');
const { getResponses } = require('../utils/lang');
const { generateJWT, comparePassword } = require('../utils/securityManager');
const randomize = require('randomatic');

let onlineUsers = [];
async function register(request, response) {
  const responses = getResponses(request.body.lang);

  try {
    const { name, surname, email, password } = request.body;

    const registerCode = randomize('Aa0', 10);

    const hashedPassword = await hashPassword(password);
    const user = { name, surname, email };
    user.password = hashedPassword;
    user.authSource = 'classic';
    user.role = 2011;
    user.registerCode = registerCode;
    const createdUser = new User(user);
    const result = await createdUser.save();
    // sendEmail(email, responses.register_subject, user.registerCode, name);
    // const isSent = await sendEmail(result.email);
    /*  if (isSent) {
 
    } */
    return response.status(201).json({ message: responses.success_register });
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
  const io = request.io;
  try {
    const responses = getResponses(request.body.lang);
    const { email, password } = request.body;

    const user = await User.findOne({ email: email });

    if (user) {
      const passwordVerify = await comparePassword(password, user.password);
      if (passwordVerify && user.isVerify) {
        const token = await generateJWT({ user });
        onlineUsers.push(user.email);
        io.emit('online', onlineUsers);

        return response.json({
          message: responses.signed_success,
          token: token,
          name: user.name,
          surname: user.surname,
          currentLang: user.currentLang,
          nativeLang: user.nativeLang,
          level: user.level,
          profilePic: user.profilePic,
          exp: user.exp,
          isVerify: user.isVerify,
        });
      } else if (!user.isVerify) {
        return response
          .status(200)
          .json({ message: responses.unverify_account });
      } else {
        return response.status(401).json({ message: responses.sign_fail });
      }
    }
    if (!user) {
      return response.status(404).json({ message: responses.not_found_user });
    }
  } catch (error) {
    return response.status(502).json({ message: error });
  }
}

async function logout(request, response) {
  const { userEmail } = request.body;
  const io = request.io;

  const newOnlineUsers = onlineUsers.filter((email) => email !== userEmail);
  onlineUsers = [...newOnlineUsers];
  io.emit('online', onlineUsers);

  return response.status(200).json({ message: 'User logout' });
}
async function changePassword(request, response) {}

async function verifyAccount(request, response) {
  const registerCode = request.params.registerCode;
  const user = await User.findOneAndUpdate(
    { registerCode: registerCode },
    { isVerify: true, registerCode: '' },
    { new: true }
  );
  if (user) {
    return response.status(200).json({ message: 'Kullanıcı doğrulandı' });
  }
  return response.status(200).json({
    message:
      'Kullanıcı doğrulaması başarısız. Kullanıcıyı daha önce doğrulamış yada kayıt oluşturmamış olabilirsiniz. Lütfen giriş yapmayı deneyin.',
  });
}
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
