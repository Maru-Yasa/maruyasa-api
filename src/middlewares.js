const jwt = require('jsonwebtoken')
require('dotenv').config()

function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
  /* eslint-enable no-unused-vars */
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  });
}

const authJWT = (req, res, next) => {
  const authHeader = req.headers.authorization
  if(!authHeader) return res.status(403).json({
    message : "Unauthoized"
  })

  const token = authHeader.split(' ')[1]
  jwt.verify(token, process.env.SECRET, (err, user) => {
    if(err) return res.status(403).json({
      message : "Unauthoized"
    })

    req.user = user
    return next()
  })
}

module.exports = {
  notFound,
  errorHandler,
  authJWT
};
