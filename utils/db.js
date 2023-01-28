const mongoose = require('mongoose');
require('dotenv').config({ path: './config/config.env' });
async function connectDB() {
  mongoose.set('strictQuery', false);
  await mongoose.connect(process.env.DB_ADDRESS, {}, async () => {
    console.log('DB Connected');
  });
}
async function disconnectDB() {
  mongoose.set('strictQuery', false);
  await mongoose.disconnect();
}
module.exports = {
  connectDB,
};
