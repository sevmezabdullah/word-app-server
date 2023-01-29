const jwt = require('jsonwebtoken');
const { getResponses } = require('../utils/lang');
const { response } = require('express');
const User = require('../models/user');
const verifyUser = (allowedRole) => {
  return async (req, res, next) => {
    const responses = getResponses(req.body.lang);
    const authHeader = req.headers.authorization || req.headers.Authorization;
    try {
      if (!authHeader?.startsWith('Bearer '))
        return res.status(401).json({
          message: responses.unauth_request,
        });
      const token = authHeader.split(' ')[1];

      if (!token) {
        return res.status(403).json({ message: responses.unauth_request });
      }
      const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
      if (!decodedUser) {
        return res.status(404).json({
          message: responses.invalid_token,
        });
      }

      if (decodedUser) {
        const id = decodedUser.id;
        const user = await User.findOne({ id: id });
        if (user.role === allowedRole) {
          next();
        } else {
          return res.status(403).json({
            message: responses.not_allowded,
          });
        }
      }
    } catch (error) {
      return res.status(502).json({
        message: responses.invalid_access,
      });
    }
  };
};

module.exports = {
  verifyUser,
};
