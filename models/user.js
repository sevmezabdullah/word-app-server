const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Lütfen isminizi girin'],
  },
  surname: {
    type: String,
    required: [true, 'Lütfen soyadınızı girin.'],
  },
  email: {
    type: String,
    required: [true, 'Lütfen geçerli bir email adresi giriniz.'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Lütfen geçerli bir email adresi girin',
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  isVerify: {
    type: Boolean,
    default: false,
  },
  categoryAwardsIds: {
    type: [String],
    default: [],
  },
  password: {
    type: String,

    required: true,
  },
  authSource: {
    type: String,
    enum: ['classic', 'google'],
    default: 'classic',
  },
  role: {
    type: String,
    default: 2011,
  },
  profilePic: {
    type: String,
    default:
      'https://www.seekpng.com/png/detail/847-8474751_download-empty-profile.png',
  },
  registerCode: {
    type: String,
  },
  currentLang: {
    type: String,
    default: null,
  },
  nativeLang: {
    type: String,
    default: null,
  },
  level: {
    type: Number,
    default: 1,
  },
  exp: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  //Tamamlanan Quiz ID,Tarih ve Doğru(hangi soru doğru) Yanlış(hangi soru yanlış) şeklinde bilgisi eklenecek
  completedQuiz: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'QuizResults',
  },

  // Öğrenilen kelimeler
  // Öğrenildiği tarih ve saat
  knownWords: {
    type: [mongoose.Schema.Types.Mixed],
    default: [],
  },
});

module.exports = mongoose.model('User', userSchema);
