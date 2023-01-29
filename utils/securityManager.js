const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function generateJWT(user) {
  const encodeUser = user.user;
  const token = jwt.sign({ encodeUser: encodeUser.id }, process.env.JWT_SECRET);
  return token;
}
async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, 10, null);
  return hashedPassword;
}

async function comparePassword(inputPassword, currentPassword) {
  const compare = await bcrypt.compare(inputPassword, currentPassword);
  return compare;
}

module.exports = {
  hashPassword,
  comparePassword,
  generateJWT,
};
