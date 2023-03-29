const express = require('express');
const requestRouter = express.Router();
const {
  createRequest,
  getRequests,
} = require('../controllers/requestsController');

requestRouter.post('/create', createRequest);
requestRouter.get('/', getRequests);
module.exports = requestRouter;
