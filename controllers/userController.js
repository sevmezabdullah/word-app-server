const { sendEmail } = require('../service/emailService');
const User = require('../models/user');
const { hashPassword } = require('../utils/securityManager');
const { getResponses } = require('../utils/lang');
const { generateJWT, comparePassword } = require('../utils/securityManager');
const randomize = require('randomatic');
const QuizResults = require('../models/quizResults');
let onlineUsers = [];

async function getUserById(request, response) {
  try {
    const { userId } = request.params;

    const user = await User.findById(userId);
    return response.status(200).json(user);
  } catch (error) {
    return response.status(404).json(error);
  }
}
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
    console.log(error.code);
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
    const { email, password, sessionId } = request.body;

    const user = await User.findOne({ email: email });

    if (user) {
      const passwordVerify = await comparePassword(password, user.password);
      if (passwordVerify && user.isVerify) {
        const token = await generateJWT({ user });
        const session = { email: user.email, sessionId: sessionId };
        onlineUsers.push(session);
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
          id: user._id,
          categoryAwardsIds: user.categoryAwardsIds,
          isLogged: true,
          user: user,
        });
      } else if (!user.isVerify) {
        return response
          .status(200)
          .json({ message: responses.unverify_account, isLogged: false });
      } else {
        return response
          .status(200)
          .json({ message: responses.sign_fail, isLogged: false });
      }
    }
    if (!user) {
      return response
        .status(200)
        .json({ message: responses.not_found_user, isLogged: false });
    }
  } catch (error) {
    return response.status(200).json({ message: error, isLogged: false });
  }
}

async function logout(request, response) {
  const { userEmail, sessionId } = request.body;
  const io = request.io;

  const newOnlineUsers = onlineUsers.filter(
    (session) => session.sessionId !== sessionId
  );
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
  try {
    const allUser = await User.find().select('-password -__v');
    return response.status(200).json({ users: allUser, count: allUser.length });
  } catch (error) {
    return response.status(404).json({ users: [], error: error });
  }
}

async function getUserByStats(request, response) {
  const { year } = request.params;
  const january = await User.find({
    createdAt: {
      $gte: new Date(`${year}-01-01`),
      $lt: new Date(`${year}-01-31`),
    },
  });
  const february = await User.find({
    createdAt: {
      $gte: new Date(`${year}-02-01`),
      $lt: new Date(`${year}-02-31`),
    },
  });
  const march = await User.find({
    createdAt: {
      $gte: new Date(`${year}-03-01`),
      $lt: new Date(`${year}-03-31`),
    },
  });
  const april = await User.find({
    createdAt: {
      $gte: new Date(`${year}-04-01`),
      $lt: new Date(`${year}-04-31`),
    },
  });
  const may = await User.find({
    createdAt: {
      $gte: new Date(`${year}-05-01`),
      $lt: new Date(`${year}-05-31`),
    },
  });
  const june = await User.find({
    createdAt: {
      $gte: new Date(`${year}-06-01`),
      $lt: new Date(`${year}-06-31`),
    },
  });
  const july = await User.find({
    createdAt: {
      $gte: new Date(`${year}-07-01`),
      $lt: new Date(`${year}-07-31`),
    },
  });
  const august = await User.find({
    createdAt: {
      $gte: new Date(`${year}-08-01`),
      $lt: new Date(`${year}-08-31`),
    },
  });
  const september = await User.find({
    createdAt: {
      $gte: new Date(`${year}-09-01`),
      $lt: new Date(`${year}-09-31`),
    },
  });
  const october = await User.find({
    createdAt: {
      $gte: new Date(`${year}-10-01`),
      $lt: new Date(`${year}-10-31`),
    },
  });
  const november = await User.find({
    createdAt: {
      $gte: new Date(`${year}-11-01`),
      $lt: new Date(`${year}-11-31`),
    },
  });
  const december = await User.find({
    createdAt: {
      $gte: new Date(`${year}-12-01`),
      $lt: new Date(`${year}-12-31`),
    },
  });
  return response.json({
    january: january.length,
    february: february.length,
    march: march.length,
    april: april.length,
    may: may.length,
    june: june.length,
    july: july.length,
    august: august.length,
    september: september.length,
    october: october.length,
    november: november.length,
    december: december.length,
  });
}

async function updateLang(request, response) {
  const { userId, currentLang, nativeLang } = request.body;

  try {
    const user = await User.findByIdAndUpdate(userId, {
      currentLang: currentLang,
      nativeLang: nativeLang,
    }).select('currentLang nativeLang');

    if (user !== null) {
      return response.json({ user, currentLang, nativeLang });
    }
  } catch (error) {
    return response.json({ message: 'Hata oluştu', error: error });
  }
}

async function addWordToKnown(request, response) {
  const { id, knownWords } = request.body;

  try {
    const result = await User.findByIdAndUpdate(id, {
      $addToSet: { knownWords: knownWords },
    });
    return response.status(200).json(result);
  } catch (error) {
    return response.status(404).json(error);
  }
}

async function addDeckToUser(request, response) {
  const { awardId, userId } = request.body;

  const result = await User.findByIdAndUpdate(userId, {
    $addToSet: { categoryAwardsIds: `${awardId}` },
  });
  return response.status(200).json(result);
}

async function addCompletedQuiz(request, response) {
  const { resultId, userId } = request.body;

  try {
    const dbResult = await User.findByIdAndUpdate(userId, {
      $push: { completedResult: resultId },
    });

    if (dbResult) {
      return response.status(200).json(dbResult);
    }
  } catch (error) {
    return response.status(404).json({ error });
  }
}

async function incrementExp(request, response) {
  const { userId, exp } = request.body;
  console.log(
    '🚀 ~ file: userController.js:290 ~ incrementExp ~ userId:',
    userId
  );

  try {
    const result = await User.findByIdAndUpdate(userId.userId, {
      $inc: { exp: userId.exp },
    });
    return response.status(200).json({ exp: result.exp });
  } catch (error) {
    return response.status(404).json(error);
  }
}

async function getUserAwardDeck(request, response) {
  const { userId } = request.params;
  console.log(
    '🚀 ~ file: userController.js:303 ~ getUserAwardDeck ~ userId:',
    userId
  );
  try {
    const result = await User.findById(userId).select({
      categoryAwardsIds: 1,
      _id: 0,
    });
    return response.status(200).json(result);
  } catch (error) {
    return response.status(404).json(error);
  }
}

async function getUserStat(request, response) {
  const { userId } = request.params;
  console.log(
    '🚀 ~ file: userController.js:316 ~ getUserStat ~ userId:',
    userId
  );

  const results = await User.findById(userId);
  const quizResults = await QuizResults.find({ userId: userId });
  let totalCorrectAnswer = 0;
  let totalWrongAnswer = 0;

  const knownWordsIds = [];
  quizResults.forEach((item) => {
    totalCorrectAnswer += item.result.correctCount;
  });

  quizResults.forEach((item) => {
    totalWrongAnswer += item.result.wrongCount;
  });

  results.knownWords.forEach((item) => {
    knownWordsIds.push(item.word);
  });

  return response.status(200).json({
    result: {
      completedQuizCount: quizResults.length,
      knownWordCount: results.knownWords.length,
      correctAnswerCount: totalCorrectAnswer,
      wrongAnswerCount: totalWrongAnswer,
    },
  });
}

async function resetProcess(request, response) {
  const { userId } = request.body;
  console.log(
    '🚀 ~ file: userController.js:347 ~ resetProcess ~ userId:',
    userId
  );

  try {
    const result = await User.findByIdAndUpdate(userId, {
      knownWords: [],
      completedQuiz: [],
      categoryAwardsIds: [],
      exp: 0,
      level: 1,
    });
    await QuizResults.deleteMany({ userId: userId });
    if (result) {
      return response.status(200).json(result);
    }
  } catch (error) {
    return response.status(404).json({ message: 'Hata meydana geldi' });
  }
}

async function getUserAwards(request, response) {
  const { userId } = request.params;
  console.log(
    '🚀 ~ file: userController.js:367 ~ getUserAwards ~ userId:',
    userId
  );

  try {
    const user = await User.findById(userId);
    const quizResults = await QuizResults.find({ userId: userId });

    let totalCorrectAnswer = 0;
    let nonWrongQuiz = 0;
    quizResults.forEach((item) => {
      totalCorrectAnswer += item.result.correctCount;
      if (item.result.wrongCount === 0) {
        nonWrongQuiz++;
      }
    });
    return response.status(200).json({
      knownWordCount: user.knownWords.length,
      quizResultsCount: quizResults.length,
      totalCorrectAnswer: totalCorrectAnswer,
      nonWrongQuiz: nonWrongQuiz,
    });
  } catch (error) {
    if (error) {
      return response.status(404).json(error);
    }
  }
}

async function getWordCountByDate(request, response) {
  const { userId } = request.params;
  const date = new Date();
  const month = date.getDay();
  const today = date.getDate() + '-' + month + '-' + date.getFullYear();
  const user = await User.findById(userId);
  let wordCount = 0;
  user.knownWords.map((item, index) => {
    if (item.date === today) {
      wordCount++;
    }
  });

  return response.status(200).json({ learnedWordCount: wordCount });
}

module.exports = {
  register,
  login,
  addWordToKnown,
  logout,
  changePassword,
  verifyAccount,
  signInWithGoogle,
  getUsers,
  updateLang,
  getUserByStats,
  addDeckToUser,
  getUserAwardDeck,
  addCompletedQuiz,
  getUserStat,
  resetProcess,
  incrementExp,
  getUserAwards,
  getWordCountByDate,
  getUserById,
};
