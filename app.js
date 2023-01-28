const express = require('express');
const { Server } = require('socket.io');
const morgan = require('morgan');
require('dotenv').config({ path: './config/config.env' });
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const userRouter = require('./routes/userRoutes');
const { connectDB } = require('./utils/db');

const PORT = process.env.PORT;

app.use(express.json());
app.use(morgan('dev'));
app.use('/users', userRouter);

server.listen(PORT, serverStart);

function serverStart() {
  console.log('App Started : ', PORT);
  connectDB();
}
module.exports = {
  io,
};
