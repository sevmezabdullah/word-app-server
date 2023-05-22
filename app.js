const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const morgan = require('morgan');
require('dotenv').config({ path: './config/config.env' });
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const userRouter = require('./routes/userRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const { connectDB } = require('./utils/db');
const languageRouter = require('./routes/languageRoutes');
const quizRouter = require('./routes/quizRoutes');
const questionRouter = require('./routes/questionRoutes');
const wordRouter = require('./routes/wordRoutes');
const multer = require('multer');
const quizResultRouter = require('./routes/quizResults');
const requestRouter = require('./routes/requestsRoute');
const upload = multer();
const PORT = process.env.PORT;

app.use(require('./middlewares/middlewares').global.socketIo(io));
app.use(express.json());
/* app.use(upload.array()); */
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(morgan('dev'));
app.use(cors({ origin: 'http://localhost:3001', credentials: false }));

app.use('/status',(req,res)=>{
  return res.json({status:"ok"})
})
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use('/users', userRouter);
app.use('/category', categoryRouter);
app.use('/language', languageRouter);
app.use('/quiz', quizRouter);
app.use('/question', questionRouter);
app.use('/words', wordRouter);
app.use('/quizResult', quizResultRouter);
app.use('/requests', requestRouter);
server.listen(PORT, serverStart);

function serverStart() {
  console.log('App Started : ', PORT);
  connectDB();
}
