const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const morgan = require('morgan');
require('dotenv').config({ path: './config/config.env' });
const app = express();

const server = http.createServer(app);
const io = new Server(server);

const userRouter = require('./routes/userRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const { connectDB } = require('./utils/db');
const languageRouter = require('./routes/languageRoutes');
const quizRouter = require('./routes/quizRoutes');
const questionRouter = require('./routes/questionRoutes');

const PORT = process.env.PORT;

app.use(require('./middlewares/middlewares').global.socketIo(io));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({ origin: 'http://localhost:3001', credentials: false }));
app.use('/users', userRouter);
app.use('/category', categoryRouter);
app.use('/language', languageRouter);
app.use('/quiz', quizRouter);
app.use('/question', questionRouter);

server.listen(PORT, serverStart);

function serverStart() {
  console.log('App Started : ', PORT);
  connectDB();
}
