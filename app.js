const express = require('express');
const app = express();
require('dotenv').config({ path: './config/config.env' });
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log('App Started : ', PORT);
});
